<script lang="ts">
  // Imports
  import { createEventDispatcher } from 'svelte';

  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import { OriginX, OriginY } from '$lib/Enums.js';
  import { getOrigin, getFlippedOrigin } from '$lib/utils/OriginMapper.js';
  import { formatClassName } from '$lib/utils/ClassNameFormat.js';

  // Required attributes
  export let x: number;
  export let y: number;
  export let barWidth: number;
  export let value: number;

  // Optional attributes
  export let isVertical: boolean = true;
  export let color: string = 'red';
  export let opacity: number | string = 1;
  export let originX: OriginX = OriginX.Middle;
  export let originY: OriginY = OriginY.Bottom;
  export let rotationDegrees: number = 0;
  export let borderRadius: number = 0;
  export let showsNegativeHeight: boolean = false;
  export let hoverText: string = value.toString();
  export let name: string | undefined = undefined;
  export let labelType: 'none' | 'alwaysVisible' | 'visibleOnHighlight' = 'none';

  // Private attributes
  let rectBlock: SVGRectElement;
  let isMouseOnBar: boolean = false;

  // These local values are possibly flipped depending on `isVertical`
  const localWidth = isVertical ? barWidth : value;
  const localValue = isVertical ? value : barWidth;

  const dispatch = createEventDispatcher();

  // If a bar has no numbers visible, then those numbers will also not receive pointer events
  let labelHasPointerEvents: boolean = labelType !== 'none';

  // Depending on the labelType, we get a couple of different css values for the `display` option
  let numberOpacity: string;
  if (labelType === 'none') {
    // This needs to be important in order to override the `display: block` set by highlight
    numberOpacity = '0 !important';
  } else if (labelType === 'alwaysVisible') {
    // In this case the label will always be visible
    numberOpacity = '1';
  } else if (labelType === 'visibleOnHighlight') {
    // In this case the label will be invisible by default, but can be overridden by the highlight class
    numberOpacity = '0';
  } else {
    throw DMVisError(`Labeltype ${labelType}, is not recognised`, 'Bar');
  }

  let xBar: number;
  $: xBar =
    x +
    getOrigin(
      Math.abs(localWidth),
      OriginX.Left,
      // Negative values get flipped
      localWidth < 0 ? getFlippedOrigin(originX) : originX
    );
  let yBar: number;

  $: yBar =
    y +
    getOrigin(
      Math.abs(localValue),
      OriginY.Top,
      // Negative values get flipped
      // `showsNegativeValue` determines whether this is visible for height < 0
      localValue < 0 ? getFlippedOrigin(originY) : originY
    );

  // On this point xBar and yBar are the top left corner of the bar
  // Depending on isVertical, do a translation to correctly place the text in either the left side or the bottom side
  let yLabel: number;
  let xLabel: number;
  $: {
    if (isVertical) {
      xLabel = xBar + localWidth / 2;
      yLabel = yBar + localValue;
    } else {
      yLabel = yBar + localValue / 2;
      xLabel = xBar;
    }
  }
  /** Fires when the mouse enters the bar. */
  function onMouseEnter() {
    isMouseOnBar = true;
    // Fire an event to be picked up by parent components of this bar
    dispatch('mouseBarEnter', { name });
  }

  /** Fires when the mouse leaves the bar. */
  function onMouseLeave() {
    isMouseOnBar = false;
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
* barWidth: number              - Width of the bar.
* value: number                 - The value of the bar, and therefore the length of the bar.

#### Optional attributes
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
* borderRadius: number          - Border radius of the bar in pixels. This defaults to `0`.
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
  class={`bar` + `${name === undefined ? '' : ' bar-' + formatClassName(name)}`}
  bind:this={rectBlock}
  transform="rotate({rotationDegrees}, {x}, {y})"
  x={xBar}
  y={yBar}
  rx={borderRadius}
  ry={borderRadius}
  width={localWidth}
  height={showsNegativeHeight && localValue < 0 ? -localValue : localValue}
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
    (name !== undefined ? ` bar-number-${formatClassName(name)}` : '') +
    (isMouseOnBar ? ' highlighted' : '')}
  style={`opacity: ${numberOpacity}`}>
  <Label
    x={xLabel}
    y={yLabel}
    text={hoverText}
    hasBackground={false}
    originX={isVertical ? OriginX.Middle : OriginX.Left}
    originY={isVertical ? OriginY.Bottom : OriginY.Middle}
    on:mouseLabelEnter={onMouseEnter}
    on:mouseLabelLeave={onMouseLeave}
    hasPointerEvents={labelHasPointerEvents}
    name={`${name}`}
    padding={10} />
</g>

<style>
  /* Styling for the bar, this class will be set by parent components of the bar */
  .highlighted {
    font-weight: bold;
    fill-opacity: 1;
    opacity: 1 !important;
  }
</style>
