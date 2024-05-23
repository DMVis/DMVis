<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { onMount, createEventDispatcher } from 'svelte';

  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import { OriginX, OriginY } from '$lib/Enums.js';
  import { getOrigin, getFlippedOrigin } from '$lib/utils/OriginMapper.js';

  // Required attributes
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;

  // Optional attributes
  export let showTextOnHover: boolean = false;
  export let isVertical: boolean = true;
  export let color: string = 'red';
  export let opacity: number | string = 1;
  export let originX: OriginX = OriginX.Middle;
  export let originY: OriginY = OriginY.Bottom;
  export let rotationDegrees: number = 0;
  export let radiusX: number | string = 0;
  export let radiusY: number | string = 0;
  export let showsNegativeHeight: boolean = false;
  export let hoverText: string = height.toString();
  export let name: string | undefined = undefined;
  export let labelType: 'none' | 'alwaysVisible' | 'visibleOnHighlight' = 'none';

  // Private attributes
  let rectBlock: SVGRectElement;
  let isMouseOnBar: boolean = false;

  const dispatch = createEventDispatcher();

  // Depending on the labelType, we get a couple of different css values for the `display` option
  let numberDisplayOption: string;
  if (labelType === 'none') {
    // This needs to be important in order to override the `display: block` set by highlight
    numberDisplayOption = 'none !important';
  } else if (labelType === 'alwaysVisible') {
    // In this case the label will always be visible
    numberDisplayOption = 'block';
  } else if (labelType === 'visibleOnHighlight') {
    // In this case the label will be invisible by default, but can be overridden by the highlight class
    numberDisplayOption = 'none';
  } else {
    throw DMVisError(`Labeltype ${labelType}, is not recognised`, 'Bar');
  }
  if (!isVertical) {
    // Swap width and height if the bar is horizontal
    const temp: number = width;
    width = height;
    height = temp;
  }

  onMount(() => {
    // Update the rectangle
    d3.select(rectBlock)
      .attr(
        'x',
        x +
          getOrigin(
            Math.abs(width),
            OriginX.Left,
            // Negative values get flipped
            width < 0 ? getFlippedOrigin(originX) : originX
          )
      )
      .attr(
        'y',
        y +
          getOrigin(
            Math.abs(height),
            OriginY.Top,
            // Negative values get flipped
            // `showsNegativeValue` determines whether this is visible for height < 0
            height < 0 ? getFlippedOrigin(originY) : originY
          )
      );
  });

  /** Fires when the mouse enters the bar. */
  function onMouseEnter() {
    if (showTextOnHover) isMouseOnBar = true;
    // Fire an event to be picked up by parent components of this bar
    dispatch('mouseBarEnter', { name });
  }

  /** Fires when the mouse leaves the bar. */
  function onMouseLeave() {
    if (showTextOnHover) isMouseOnBar = false;
    // Fire an event to be picked up by parent components of this bar
    dispatch('mouseBarLeave', { name });
  }

  /** Fires when the mouse is pressed down on the bar. */
  function onMouseDown() {
    // Fire an event to be picked up by parent components of this bar
    dispatch('mouseBarClick', { name });
  }
</script>

<!--
@component
### Bar
A bar that can be used for bar visualisations.
Coordinates are relative to the parent SVG element.
Only positive `width` values are visible.
Both positive and negative `height` values are visible
depending on `showsNegativeHeight`.
By default, the bar is vertical (i.e. `isVertical` is `true`)
and its origin is the bottom middle (see defaults for `originX` and `originY`).

#### Required attributes
* x: number                     - X-coordinate of the bar.
* y: number                     - Y-coordinate of the bar.
* width: number                 - Width of the bar.
* height: number                - Height of the bar.

#### Optional attributes
* showTextOnHover: boolean      - Whether the `hoverText` is shown when the bar is being hovered over. This defaults to `false`.
* isVertical: boolean           - Whether the bar is vertical bar or horizontal. This defaults to `true`.
* color: string                 - Color of the bar.
* opacity: string               - Opacity of the bar as a number in the range [0..1] or
                                  a percentage string formatted as '{number}%'.
                                  Defaults to `1`.
* originX: OriginX              - Horizontal origin of the bar.
                                  Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
                                  Which value is useful depends on one's positioning logic.
                                  Defaults to `OriginX.Middle`.
* originY: OriginY              - Vertical origin of the label.
                                  Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
                                  Which value is useful depends on one's positioning logic.
                                  Defaults to `OriginY.Bottom`.
* rotationDegrees: number       - Rotation of the bar in degrees. This defaults to `0`.
* radiusX: number | string      - Horizontal corner radius of the bar as a number
                                  or a percentage string formatted as '{number}%'.
                                  Defaults to `0`.
* radiusY: number | string      - Vertical corner radius of the bar as a number
                                  or a percentage string formatted as '{number}%'.
                                  Defaults to `0`.
* showsNegativeHeight: boolean  - Whether the bar flips its orientation when `height` is negative.
                                  Defaults to `false`.
* hoverText: string             - Text to display in the label when the mouse hovers over the bar.
                                  Defaults to the given `height` attribute.
* name: string                  - Class name of the bar. It can be used as an identifier. This defaults to only `bar`.
                                  If set, the class names will be `bar` and `bar-name`.
* labelType: 'none' | 'alwaysVisible' | 'visibleOnHighlight' - Determines the behaviour of the labels on the bars.
                                        Refer to the documentation for more information. This defaults to `'none'`


#### Events
* For detailed information about dispatches, check the documentation.
-->

<!-- The bar -->
<rect
  class={`bar` + `${name === undefined ? '' : ' bar-' + name}`}
  bind:this={rectBlock}
  transform="rotate({rotationDegrees}, {x}, {y})"
  {x}
  {y}
  rx={radiusX}
  ry={radiusY}
  {width}
  height={showsNegativeHeight && height < 0 ? -height : height}
  fill={color}
  fill-opacity={opacity}
  role="treeitem"
  tabindex="0"
  aria-selected="false"
  on:mousedown={onMouseDown}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  on:focus={onMouseEnter}
  on:blur={onMouseLeave} />

<!-- Create a tooltip that lies on top of the bar
  and is only visible if the class `highlighted` is active -->
<g
  class={'bar-number' +
    (name !== undefined ? ` bar-number-${name}` : '') +
    (isMouseOnBar ? ' highlighted' : '')}
  style={`display: ${numberDisplayOption}`}>
  <Label
    {x}
    {y}
    text={hoverText}
    hasBackground={false}
    originX={OriginX.Left}
    originY={OriginY.Middle}
    on:mouseLabelEnter={onMouseEnter}
    on:mouseLabelLeave={onMouseLeave}
    hasPointerEvents={true}
    name={`${name}`} />
</g>

<style>
  /* Styling for the bar, this class will be set by parent components of the bar */
  .highlighted {
    font-weight: bold;
    fill-opacity: 1;
    display: block !important;
  }
</style>
