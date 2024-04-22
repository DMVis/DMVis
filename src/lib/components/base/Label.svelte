<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  // DMVis Imports
  import { getOrigin } from '$lib/utils/OriginMapper.js';
  import { OriginX, OriginY } from '$lib/Enums.js';

  // Required attributes
  export let x: number;
  export let y: number;
  export let text: string;

  // Optional attributes
  export let color: string = 'red';
  export let opacity: number | string = 1;
  export let originX: OriginX = OriginX.Middle;
  export let originY: OriginY = OriginY.Middle;
  export let rotationDegrees: number = 0;
  export let radiusX: number | string = 0;
  export let radiusY: number | string = 0;
  export let padding: number = 20;
  export let textColor: string = 'black';
  export let fontSize: string = '12px';
  export let fontWeight: string = 'normal';
  export let fontFamily: string = 'Arial';
  export let hasBackground: boolean = true;
  export let backgroundOpacity: number | string = opacity;
  export let hasPointerEvents: boolean = false;
  export let name: string | undefined = undefined;
  export let width: number | 'auto' = 'auto';
  export let height: number | 'auto' = 'auto';
  export let borderColor: string = 'black';

  // Private attributes
  let rectWidth: number = 50;
  let rectHeight: number = 25;
  let textBlock: SVGTextElement;
  let rectBlock: SVGRectElement;

  // Function that gets called on a TextElement and will wrap the text based on the given width
  function wrapWords(textSelection: Selection, width: number) {
    // @ts-expect-error A text selection does have the .text() attribute
    let selectedWords = textSelection.text().split(/\s+/).reverse();
    // Cant wrap if there is only 1 word
    if (selectedWords.length == 1) return;
    let selectedWord,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      //@ts-expect-error A text selection does have the x attribute
      selectedX = textSelection.attr('x'),
      //@ts-expect-error A text selection does have the y attribute
      selectedY = textSelection.attr('y'),
      selectedDY = 0,
      tspan = textSelection
        //@ts-expect-error A text selection does have the .text() attribute
        .text(null)
        .append('tspan')
        .attr('x', selectedX)
        .attr('y', selectedY)
        .attr('dy', selectedDY + 'em');
    // Loop over all the words and keep appending them on this line if the maximum width has not been exceeded
    while ((selectedWord = selectedWords.pop())) {
      line.push(selectedWord);
      tspan.text(line.join(' '));
      /* Add 5 to the length to give the label some sort of padding,
        this prevents text from going too close to the border of the label */
      if (tspan.node().getComputedTextLength() + 5 > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [selectedWord];
        tspan = textSelection
          //@ts-expect-error A text selection does have the .append() attribute
          .append('tspan')
          .attr('x', selectedX)
          .attr('y', selectedY)
          .attr('dy', ++lineNumber * lineHeight + selectedDY + 'em')
          .text(selectedWord);
      }
    }
  }

  onMount(() => {
    // Set attributes for the text.
    d3.select(textBlock)
      .attr('fill', textColor)
      .attr('font-size', fontSize)
      .attr('font-weight', fontWeight)
      .attr('font-family', fontFamily);

    // Calculate the width of the text.
    if (width == 'auto') {
      const textLen = d3.select(textBlock)?.node()?.getComputedTextLength() || 0;
      rectWidth = textLen + padding;
    } else {
      rectWidth = width;
      // @ts-expect-error I'm assigning a D3 text selection, but Selections only have an interface.
      d3.select(textBlock).call(wrapWords, width);
    }
    // Calculate the height of the text.
    if (height == 'auto') {
      const textHeight = d3.select(textBlock)?.node()?.getBBox()?.height || 0;
      rectHeight = textHeight + padding;
    } else {
      rectHeight = height;
    }

    // Update the text.
    d3.select(textBlock)
      .attr('x', x + getOrigin(rectWidth, OriginX.Middle, originX))
      .attr('y', y + getOrigin(rectHeight, OriginY.Middle, originY));

    // Update the rectangle.
    d3.select(rectBlock)
      .attr('x', x + getOrigin(rectWidth, OriginX.Left, originX))
      .attr('y', y + getOrigin(rectHeight, OriginY.Top, originY))
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .attr('stroke', borderColor);
  });
</script>

<!--
@component
### Label
The label allows you to add text with a background.
It can be used in combination with other components.
Coordinates are relative to the parent SVG element.
The default origin is the middle of the label.

#### Required attributes
* x: number                 - X-coordinate of the label.
* y: number                 - Y-coordinate of the label.
* text: string              - Text to display in the label.

#### Optional attributes
* color: string             - Color of the rectangle behind the label. Defaults to `'red'`.
* opacity: number | string  - Opacity of the text of the label. Defaults to `1`.
* originX: OriginX          - Horizontal origin of the label.
                              Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
                              Which value is useful depends on your positioning logic.
                              Defauls to `OriginX.Middle`.
* originY: OriginY          - Vertical origin of the label.
                              Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
                              Which value is useful depends on your positioning logic.
                              Defaults to `OriginX.Middle`.
* rotationDegrees: number   - Rotation of the label in degrees. Defaults to `1`.
* radiusX: number | string  - Horizontal corner radius of the bar as a number in range [0..1] or
                              a percentage string formatted as '{number}%'. Defaults to `0`.
* radiusY: number | string  - Vertical corner radius of the bar as a number in range [0..1] or
                              a percentage string formatted as '{number}%'. Defaults to `0`.
* padding: number           - Padding around the text in the label. Defaults to `20`.
* textColor: string         - Color of the text in the label. Defaults to `'black'`.
* fontSize: string          - Font size of the text in the label. Defaults to `'12px'`.
* fontWeight: string        - Font weight of the text in the label. Defaults to `'normal'`.
* fontFamily: string        - Font family of the text in the label. Defaults to `'Arial'`.
* hasBackground: bool       - Whether the label has a background. Defaults to `true`.
* backgroundOpacity: number - Opacity of the background behind the label. Defaults to `opacity`.
* hasPointerEvents          - Whether the label should respond to all pointer events (`true`) or none (`false`).
                              Defaults to `false`.
* name: string              - Class name of the label. It can be used as an identifier. Defaults to only `'label'`.
                              If set, the class names will be `'label'` and `'label-name'`.
* width: number | 'auto'    - Width of the rectangle of the label. Defaults to `'fit-text'`.
* height: number | 'auto'   - Height of the rectangle of the label. Defaults to `'fit-text'`.
* borderColor: string       - Color of the border around the label.
                              Defaults to `'black'`. Can be set to `none` for no border.
-->

<g
  transform="rotate({rotationDegrees}, {x}, {y})"
  class={name !== undefined ? `label label-${name}` : 'label'}
  style="pointer-events: {hasPointerEvents ? 'all' : 'none'}">
  <!-- Draw background behind text. -->
  {#if hasBackground}
    <rect
      bind:this={rectBlock}
      {x}
      {y}
      rx={radiusX}
      ry={radiusY}
      width={rectWidth}
      height={rectHeight}
      fill={color}
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
    {opacity}
    text-anchor="middle"
    alignment-baseline="middle"
    dominant-baseline="middle">{text}</text>
</g>

<!-- Styling to be set by any parent component -->
<style>
  .highlighted {
    font-weight: bold;
    stroke-width: 3px;
  }
</style>
