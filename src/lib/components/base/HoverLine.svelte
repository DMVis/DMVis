<script lang="ts">
  import * as d3 from 'd3';
  import type { GraphStore } from '$lib/store.js';
  import { getContext, createEventDispatcher } from 'svelte';
  import Label from './Label.svelte';

  export let points: { x: number; y: number }[];
  export let color: string = '#944';
  export let focusColor: string = '#F44';
  export let notFocusColor: string = '#BBB';
  export let width: number = 1;
  export let anyLineHovered: boolean = false;
  export let id: number = 0;

  let thisHovered: boolean = false;

  const dispatch = createEventDispatcher();
  const { yScale, xScale } = getContext<GraphStore>('store');
  const yScaleLocal = $yScale as d3.ScaleLinear<number, number>;
  const xScaleLocal = $xScale as d3.ScaleLinear<number, number>;

  $: path = `M${points.map((p) => `${xScaleLocal(p.x)},${yScaleLocal(p.y)}`).join('L')}`;

  function redrawHoveredLine(id: number) {
    const lineElement = document.getElementById('line-' + id)!;
    const container = lineElement.parentNode;
    container?.appendChild(lineElement);
  }
</script>

<!--
@component
### HoverLine
The HoverLine allows you to plot a line between given coordinates.
It works the same as a normal Line component, except it changes color when it is hovered.
It can also be greyed out when any other line is hovered, if the parent passes the `anyLineHovered` prop.
It is used in combination with other components to create a chart.

#### Required attributes
  * points: [{ x: number; y: number }]  - List of non-scaled points on the graph

#### Optional attributes
  * color: number                       - Color of the line, defaulted to red. Can be any hex-code, rgb or plain string colors
  * focusColor: number                  - Color of the line, when it is hovered. Defaulted to light red.
  * notFocusColor: number               - Color of the line, when `anyLineHovered === true`. Defaulted to grey.
  * width: string                       - Width of the line, defaulted to 1
  * anyLineHovered: boolean             - Whether any line in the graph is hovered. Defaulted to false.
  * id: number                          - Unique ID given to one instance of this line, used to redraw the line. Defaulted to 0.
-->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg id="line-{id}">
  <path
    d={path}
    stroke={anyLineHovered ? (thisHovered ? focusColor : notFocusColor) : color}
    stroke-width={width}
    fill="none"
    on:mouseenter={() => {
      dispatch('mouseenter');
      redrawHoveredLine(id);
      thisHovered = true;
    }}
    on:mouseleave={() => {
      dispatch('mouseleave');
      thisHovered = false;
    }} />

  {#if thisHovered}
    {#each points as p}
      <Label
        x={xScaleLocal(p.x) - 10}
        y={yScaleLocal(p.y) - 10}
        text={p.y.toString()}
        color={'#777'}
        hasBackground={false} />
    {/each}
  {/if}
</svg>
