<script lang="ts">
  import Label from './Label.svelte';
  import { anyPointClicked } from '$lib/selected.js';
  import { tick } from 'svelte';
  import * as d3 from 'd3';

  export let x: number;
  export let y: number;
  export let radius: number = 5;
  export let color: string = '#CCCCFF';
  export let borderColor: string = '#000';
  export let borderWidth: number = 1;
  export let opacity: number = 1;
  export let name: string = `(${x},${y})`;

  let thisPointClicked = false;
  let thisPointHighlighted = false;

  async function redrawLabel() {
    await tick();
    const label = document.getElementsByClassName(`label-${name}`)[0] ?? null;
    if (label) label.parentNode!.appendChild(label);
  }

  function mouseEnter() {
    if (!$anyPointClicked) {
      redrawLabel();
      thisPointHighlighted = true;
      d3.selectAll(`.${name}`).classed('highlighted', true);
    }
  }
  function mouseLeave() {
    if (!$anyPointClicked) {
      thisPointHighlighted = false;
      d3.selectAll('.highlighted').classed('highlighted', false);
    }
  }
</script>

<!--
@component
### Point
The point allows you to plot a point at a given coordinate.
It is used in combination with other components to create a chart.

#### Required attributes
  * x: number             - Scaled x-coordinate of the point
  * y: number             - Scaled y-coordinate of the point

#### Optional attributes
  * radius: number        - Radius of the point, defaulted to 5
  * color: string         - Color of the center of the point, defaulted to blue. Can be any hex-code, rgb or plain string colors
  * opacity: string       - Opacity of the circle
  * borderColor: string   - Color of the border of the point, defaulted to Black. Can be any hex-code, rgb or plain string colors
  * borderWidth: number   - Width of the border, defaulted to 1
  * opacity: number       - Opacity of the point where 0 is completely transparent and 1 is completely opaque, defaulted to 1
  * name: string          - Name of the point, is used as identifier. Defaults to (x-coordinate,y-coordinate)
-->
<circle
  cx={x}
  cy={y}
  r={radius}
  stroke={borderColor}
  fill={color}
  stroke-width={borderWidth}
  {opacity}
  class={'point ' + name}
  on:mouseenter={mouseEnter}
  on:focus={mouseEnter}
  on:mouseleave={mouseLeave}
  on:blur={mouseLeave}
  on:mousedown={() => {
    redrawLabel();
    thisPointClicked = !thisPointClicked;
    anyPointClicked.set(thisPointClicked);
  }}
  role="button"
  tabindex="0" />

{#if thisPointHighlighted}
  <Label
    x={x - 15}
    y={y - 16}
    text={name}
    color={'#FFF'}
    hasBackground={true}
    fontSize={'14'}
    fontWeight={'bold'}
    backgroundOpacity={0.7}
    {name}
    borderColor="none"
    padding={0} />
{/if}

<style>
  .highlighted {
    opacity: 1;
    stroke-width: 2;
  }
</style>
