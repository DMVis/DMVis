<script lang="ts">
  import * as d3 from 'd3';
  import type { VisualisationStore } from '$lib/store.js';
  import { getContext, tick } from 'svelte';
  import Label from './Label.svelte';
  import { Spacer } from '$lib/utils/Spacer.js';
  import { OriginX } from '$lib/Enums.js';

  export let color: string = '#977';
  export let focusColor: string = '#F44';
  export let notFocusColor: string = '#BBB';
  export let lineWidth: number = 1;

  const { yScales, width, marginLeft, marginRight, data } = getContext<VisualisationStore>('store');

  // line id belonging to current hovered line, -1 represents no line hovered
  let hoveredLine: number = -1;
  interface LineConfig {
    path: string;
    xPos: number[];
    yPos: number[];
  }

  let rows: LineConfig[] = [];
  $: {
    $data.slice(1).forEach((row) => {
      let xPos: number[] = [];
      let yPos: number[] = [];
      let path: string = 'M';

      row.forEach((value, index) => {
        let yBandOffset = 0;
        if (typeof value === 'string' && 'bandwidth' in $yScales[index]) {
          const yScaleBand = $yScales[index] as d3.ScaleBand<string>;
          yBandOffset = yScaleBand.bandwidth() * 0.5;
        }
        xPos.push($marginLeft + Spacer($width, $marginLeft, $marginRight, $data[0].length) * index);
        yPos.push($yScales[index](value as any)! + yBandOffset);
        path =
          path +
          `${$marginLeft + Spacer($width, $marginLeft, $marginRight, $data[0].length) * index},${
            $yScales[index](value as any)! + yBandOffset
          }` +
          'L';
      });
      rows.push({
        xPos: xPos,
        yPos: yPos,
        path: path.slice(0, -1)
      } as LineConfig);
    });
  }

  async function redrawHoveredLine(id: number) {
    await tick();
    const lineElement = document.getElementById(`line-${id}`)!;
    const pointElements = document.getElementById(`line-${id}-points`)!;
    const container = lineElement.parentNode!;
    container.appendChild(lineElement);
    container.appendChild(pointElements);
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
None

#### Optional attributes
  * color: number                       - Color of the line, defaulted to red. Can be any hex-code, rgb or plain string colors
  * focusColor: number                  - Color of the line, when it is hovered. Defaulted to light red.
  * notFocusColor: number               - Color of the line, when any other line is hovered. Defaulted to grey.
  * lineWidth: string                   - Width of the line, defaulted to 1
-->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<g>
  {#each rows as row, i}
    <path
      id={`line-${i}`}
      d={row.path}
      stroke={hoveredLine !== -1 ? (hoveredLine === i ? focusColor : notFocusColor) : color}
      stroke-width={lineWidth}
      fill="none"
      on:mouseenter={() => {
        hoveredLine = i;
        redrawHoveredLine(i);
      }}
      on:mouseleave={() => {
        hoveredLine = -1;
      }} />
    {#if hoveredLine === i}
      <g id={`line-${i}-points`}>
        {#each $data[i + 1] as p, j}
          {#if typeof p === 'number'}
            <Label
              x={row.xPos[j]}
              y={row.yPos[j]}
              text={p.toString()}
              fontSize={'14'}
              fontWeight={'bold'}
              originX={OriginX.Left}
              hasBackground={false} />
          {/if}
        {/each}
      </g>
    {/if}
  {/each}
</g>
