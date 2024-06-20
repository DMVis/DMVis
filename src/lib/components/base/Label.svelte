<script lang="ts">
  // Imports
  import { select, type Selection } from 'd3';
  import { createEventDispatcher, afterUpdate } from 'svelte';

  // DMVis imports
  import { formatClassName } from '$lib/utils/ClassNameFormat.js';
  import { getOriginOffsetX, getOriginOffsetY } from '$lib/utils/OriginMapper.js';
  import type { UndefineableString, NumberAuto, Origin } from '$lib/Types.js';

  // Required attributes
  export let x: number;
  export let y: number;
  export let text: string;

  // Optional attributes
  export let showEllipsis: boolean = false;
  export let backgroundColor: string = 'red';
  export let textOpacity: number | string = 1;
  export let origin: Origin = 'middle';
  export let rotationDegrees: number = 0;
  export let borderRadius: number = 0;
  export let padding: number = 20;
  export let textColor: string = 'black';
  export let fontSize: string = '12px';
  export let fontWeight: string = 'normal';
  export let fontFamily: string = 'Arial';
  export let hasBackground: boolean = true;
  export let backgroundOpacity: number | string = textOpacity;
  export let hasPointerEvents: boolean = false;
  export let name: UndefineableString = undefined;
  export let width: NumberAuto = 'auto';
  export let height: NumberAuto = 'auto';
  export let borderColor: string = 'black';

  // Private attributes
  let rectWidth: number = 50;
  let rectHeight: number = 25;
  let textBlock: SVGTextElement;
  let rectBlock: SVGRectElement;

  const dispatch = createEventDispatcher();

  /** Function that gets called on a TextElement, which wraps the text based on the given width */
  function wrapWords(
    textSelection: Selection<SVGTextElement, unknown, null, undefined>,
    width: number
  ) {
    const textContent = textSelection.text() || '';
    let selectedWords = textContent?.split(/\s+/).reverse() || [];
    // Cant wrap if there is only 1 word
    if (selectedWords.length === 1) return;
    let selectedWord,
      line: string[] = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      selectedX = textSelection.attr('x'),
      selectedY = textSelection.attr('y'),
      selectedDY = 0,
      tspan = textSelection
        //@ts-expect-error A text selection does have the .text() attribute
        .text(undefined)
        .append('tspan')
        .attr('x', selectedX)
        .attr('y', selectedY)
        .attr('dy', selectedDY + 'em');
    // Loop over all the words and keep appending them on this line if the maximum width has not been exceeded
    while ((selectedWord = selectedWords.pop())) {
      line.push(selectedWord);
      tspan.text(line.join(' '));
      const tspanNode = tspan.node();
      if (tspanNode && tspanNode.getComputedTextLength() + 5 > width) {
        /* Add 5 to the length to give the label some sort of padding,
        this prevents text from going too close to the border of the label */
        line.pop();
        tspan.text(line.join(' '));
        line = [selectedWord];
        tspan = textSelection
          .append('tspan')
          .attr('x', selectedX)
          .attr('y', selectedY)
          .attr('dy', ++lineNumber * lineHeight + selectedDY + 'em')
          .text(selectedWord);
      }
    }
    let yCorrection = (select(textBlock)?.node()?.getBBox()?.height || 0) / 4;
    tspan = textSelection.call(function (selection) {
      selection.selectAll('tspan').attr('y', (Number(selectedY) - yCorrection).toString());
    });
  }

  afterUpdate(() => {
    // Set attributes for the text
    select(textBlock)
      .attr('fill', textColor)
      .attr('font-size', fontSize)
      .attr('font-weight', fontWeight)
      .attr('font-family', fontFamily);

    // Calculate the height of the text
    if (height === 'auto') {
      const textHeight = select(textBlock)?.node()?.getBBox()?.height || 0;
      rectHeight = textHeight + padding;
    } else {
      rectHeight = height;
    }
    // Calculate the width of the text
    if (width === 'auto') {
      const textLen = select(textBlock)?.node()?.getComputedTextLength() || 0;
      rectWidth = textLen + padding;
    } else {
      rectWidth = width;
      if (showEllipsis && (select(textBlock)?.node()?.getComputedTextLength() || 0) > 0) {
        // Calculate length of text, minus 5 pixels for the ellipsis
        let textLength = Math.max((select(textBlock)?.node()?.getComputedTextLength() || 0) - 5, 0);

        // If the text is longer than the width, add ellipsis
        if (textLength > rectWidth) {
          // Check whether the label is small enough that even ellipsis do not fit
          select(textBlock).text('...');
          const textWidth = select(textBlock)?.node()?.getComputedTextLength() ?? 0;
          if (textWidth > rectWidth) {
            // If this is the case, we make the label empty and throw a warning
            select(textBlock).text('');
            console.warn(
              'A label has been created without any text, because no text fits within the label.'
            );
          } else {
            let newText = text;

            // Shorten the text until it fits
            while (textLength > rectWidth) {
              newText = newText.slice(0, -1);
              select(textBlock).text(newText + '...');
              textLength = select(textBlock)?.node()?.getComputedTextLength() || 0;
            }

            // Add a title to show the full text on hover
            select(textBlock).html(select(textBlock).html() + `<title>${text}</title>`);
          }
        }
      } else {
        select(textBlock).call(wrapWords, rectWidth);
      }
    }

    // Update the text
    select(textBlock)
      .attr('x', x + getOriginOffsetX(rectWidth, 'middle', origin))
      .attr('y', y + getOriginOffsetY(rectHeight, 'middle', origin));

    // Update the rectangle
    select(rectBlock)
      .attr('x', x + getOriginOffsetX(rectWidth, 'topLeft', origin))
      .attr('y', y + getOriginOffsetY(rectHeight, 'topLeft', origin))
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .attr('stroke', borderColor);
  });

  /** A function that fires when the mouse enters this label if `hasPointerEvents` is `true`. */
  function onMouseEnter() {
    // Fire an event to be picked up by parent components of this label
    dispatch('mouseLabelEnter', { name: name });
  }

  /** A function that fires when the mouse leaves this label if `hasPointerEvents` is `true`. */
  function onMouseLeave() {
    // Fire an event to be picked up by parent components of this label
    dispatch('mouseLabelLeave', { name: name });
  }

  /** A function that fires when the mouse is pressed down on this label if `hasPointerEvents` is `true`. */
  function onMouseDown() {
    // Fire an event to be picked up by parent components of this label
    dispatch('mouseLabelClick', { name: name });
  }
</script>

<!--
@component
### Label
The label allows you to add text with a background.
It can be used in combination with other components.
Coordinates are relative to the parent SVG element.
Note that a `Label`'s origin is at its middle (see the `origin` attribute).

#### Required Attributes
* x: number                     - The x-coordinate of the label.
* y: number                     - The y-coordinate of the label.
* text: string                  - The text to display in the label.
                                  Words are automatically placed on a new line if they take up too much space depending on `width`'s value.

#### Optional Attributes
* backgroundColor: string       - The colour of the rectangle behind the label.
                                  Defaults to `'red'`.
* textOpacity: Opacity          - The opacity of the text of the label.
                                  It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).
                                  Defaults to `1`.
* origin: Origin                - The origin of the label.
                                  Which value is useful depends on your positioning logic.
                                  Defaults to `'middle'`.
* rotationDegrees: number       - The rotation of the label in degrees.
                                  Defaults to `1`.
* borderRadius: number          - The border radius of the background in pixels.
                                  Defaults to `0`.
* padding: number               - The padding around the text in the label.
                                  Defaults to `20`.
* textColor: string             - The colour of the text in the label.
                                  Valid inputs include CSS colours specified as a string.
                                  Defaults to `'black'`.
* fontSize: string              - The font size of the text in the label.
                                  Defaults to `'12px'`.
* fontWeight: string            - The font weight of the text in the label.
                                  Defaults to `'normal'`.
* fontFamily: string            - The font family of the text in the label.
                                  Defaults to `'Arial'`.
* hasBackground: bool           - Whether the label has a background.
                                  Defaults to `true`.
* backgroundOpacity: number     - The opacity of the background of the label.
                                  It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).
                                  Defaults to `textOpacity`.
* hasPointerEvents              - Whether the label should respond to all pointer events (`true`) or none (`false`).
                                  Defaults to `false`.
* name: UndefineableString      - The class name of the label. It can be used as an identifier.
                                  If set to `'name'`, for example, the class names will be `'label'` and `'label-name'`.
                                  Defaults to only `'label'`.
* width: NumberAuto             - The width of the rectangle of the label in pixels.
                                  Defaults to `'auto'`.
* height: NumberAuto            - The height of the rectangle of the label in pixels.
                                  Defaults to `'auto'`.
* borderColor: string           - The colour of the border around the background of the label.
                                  Valid inputs include CSS colours specified as a string or `'none'` for no border.
                                  Defaults to `'black'`.

#### Events
* Please check the documentation for detailed information about dispatches.
-->

<g
  transform="rotate({rotationDegrees}, {x}, {y})"
  class={name !== undefined ? `label label-${formatClassName(name)}` : 'label'}
  style="pointer-events: {hasPointerEvents ? 'all' : 'none'}"
  role="treeitem"
  tabindex="0"
  aria-selected="false"
  on:mousedown={onMouseDown}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  on:focus={onMouseEnter}
  on:blur={onMouseLeave}>
  <!-- Draw background behind text. -->
  {#if hasBackground}
    <rect
      bind:this={rectBlock}
      {x}
      {y}
      rx={borderRadius}
      ry={borderRadius}
      width={rectWidth}
      height={rectHeight}
      fill={backgroundColor}
      fill-opacity={backgroundOpacity} />
  {/if}
  <!--
    Draw text on top of background.
    The anchor and baseline settings ensure that the text is perfectly centered.
  -->
  <text
    bind:this={textBlock}
    {x}
    {y}
    opacity={textOpacity}
    text-anchor="middle"
    alignment-baseline="middle"
    dominant-baseline="middle">
    {text}
  </text>
</g>

<!-- Styling to be set by any parent component -->
<style>
  .highlighted {
    font-weight: bold;
    stroke-width: 3px;
  }
</style>
