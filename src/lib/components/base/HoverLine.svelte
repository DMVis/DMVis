<script lang="ts">
  import * as d3 from 'd3';
  import type { GraphStore, VisualisationStore } from '$lib/store.js';
  import { getContext, createEventDispatcher } from 'svelte';
  import Label from './Label.svelte';
  import { Spacer } from '$lib/utils/Spacer.js';

  export let color: string = '#944';
  export let focusColor: string = '#F44';
  export let notFocusColor: string = '#BBB';
  export let lineWidth: number = 1;
  export let id: number = 0;

  let hoveredLine: number;

  const { yScales, width, marginLeft, marginRight, data } = getContext<VisualisationStore>('store');

  let paths: string[] = [];
  $: {
    console.log($yScales[0]);
    $data.slice(1).forEach((row) => {
      console.log(paths);
      paths.push(
        `M${row
          .map(
            (value, index) =>
              `${$marginLeft + Spacer($width, $marginLeft, $marginRight, $data[0].length) * index},${$yScales[
                index
              ](value as any)}`
          )
          .join('L')}`
      );
    });
  }

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
  * lineWidth: string                   - Width of the line, defaulted to 1
  * anyLineHovered: boolean             - Whether any line in the graph is hovered. Defaulted to false.
  * id: number                          - Unique ID given to one instance of this line, used to redraw the line. Defaulted to 0.
-->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<g>
  {#each paths as path, i}
    <path
      id={`line-${i}`}
      d={path}
      stroke={hoveredLine === i ? focusColor : notFocusColor}
      stroke-width={lineWidth}
      fill="none"
      on:mouseenter={() => {
        hoveredLine = i;
        redrawHoveredLine(i);
      }}
      on:mouseleave={() => {
        hoveredLine = -1;
      }} />

    <!-- {#if thisHovered}
      {#each values as p}
        <Label
          x={xScaleLocal(Number(p)) - 10}
          y={yScaleLocal(Number(p)) - 10}
          text={p.toString()}
          color={'#777'}
          hasBackground={false} />
      {/each}
    {/if} -->
  {/each}
</g>
