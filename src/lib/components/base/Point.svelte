<script lang="ts">
  import Label from './Label.svelte';
  import { selectedPoint, anyPointClicked } from '$lib/selected.js';
  import { tick } from 'svelte';

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
  let highlighted = false;
  $: {
    if (!$anyPointClicked) {
      highlighted = $selectedPoint == name;
    }
  }

  async function redrawPointAndLabel() {
    await tick();
    const label = document.getElementsByClassName(`label-${name}`)[0] ?? null;
    if (label) label.parentNode!.appendChild(label);
    const points = document.getElementsByClassName(name);
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const container = point.parentNode!;
      container.appendChild(point);
    }
  }

  function mouseEnter() {
    if (!$anyPointClicked) {
      thisPointHighlighted = true;
      selectedPoint.set(name);
      redrawPointAndLabel();
    }
  }
  function mouseLeave() {
    if (!$anyPointClicked) {
      thisPointHighlighted = false;
      selectedPoint.set('');
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
  stroke-width={highlighted ? 2 : borderWidth}
  opacity={highlighted ? 1 : opacity}
  class={'point ' + name}
  on:mouseenter={mouseEnter}
  on:focus={mouseEnter}
  on:mouseleave={mouseLeave}
  on:blur={mouseLeave}
  on:mousedown={() => {
    thisPointClicked = !thisPointClicked;
    anyPointClicked.set(thisPointClicked);
    redrawPointAndLabel();
  }}
  role="button"
  tabindex="0" />

{#if thisPointHighlighted}
  <Label
    x={x - 10}
    y={y - 10}
    text={name}
    color={'#FFF'}
    hasBackground={true}
    fontSize={'14'}
    fontWeight={'bold'}
    backgroundOpacity={0.7}
    {name}
    borderColor="none" />
{/if}
