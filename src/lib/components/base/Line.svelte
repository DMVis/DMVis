<script lang="ts">
  import * as d3 from 'd3';
  import { getContext, tick } from 'svelte';

  import Label from './Label.svelte';
  import { OriginX } from '$lib/Enums.js';
  import { SpacerEqual, SpacerSide } from '$lib/utils/Spacer.js';
  import type { VisualisationStore } from '$lib/store.js';

  export let focusColor: string = '#F44';
  export let color: string = '#BBB';
  export let lineWidth: number = 1;
  export let hoverable: boolean = false;
  export let alignment: 'start' | 'end' | 'spaced' = 'spaced';

  const { yScales, width, marginLeft, marginRight, data, columns } =
    getContext<VisualisationStore>('store');

  let spacer: d3.ScaleBand<string> | d3.ScalePoint<string>;
  switch (alignment) {
    case 'start':
    case 'end':
      spacer = SpacerSide($width, $marginLeft, $marginRight, $columns, alignment);
      break;
    case 'spaced': {
      spacer = SpacerEqual($width, $marginLeft, $marginRight, $columns);
      break;
    }
    default:
      throw new Error('Invalid alignment provided.');
  }

  let highlightedLine: number = -1;
  let clickedLine: boolean = false;
  interface LineConfig {
    path: string;
    xPos: number[];
    yPos: number[];
  }
  let paths: LineConfig[] = [];
  $: {
    $data.forEach((row) => {
      let xPos: number[] = [];
      let yPos: number[] = [];
      let path: string = 'M';

      row.forEach((value, index) => {
        let yBandOffset = 0;
        if (typeof value === 'string' && 'bandwidth' in $yScales[index]) {
          const yScaleBand = $yScales[index] as d3.ScaleBand<string>;
          yBandOffset = yScaleBand.bandwidth() * 0.5;
        }
        xPos.push(spacer($columns[index])!);
        // @ts-expect-error Safe because we guarantee string for scaleband and number for scalelinear
        yPos.push($yScales[index](value as unknown)! + yBandOffset);
        path =
          path +
          `${spacer($columns[index])!},${
            // @ts-expect-error Safe because we guarantee string for scaleband and number for scalelinear
            $yScales[index](value as unknown)! + yBandOffset
          }` +
          'L';
      });
      paths.push({
        xPos: xPos,
        yPos: yPos,
        path: path.slice(0, -1)
      } as LineConfig);
    });
  }

  async function redrawHoveredLine(id: number) {
    if (!hoverable) return;

    await tick();

    d3.select(`#line-${id}`).raise();
    d3.select(`#line-${id}-points`).raise();
  }
</script>

<!--
@component
### Line
The Line allows you to plot a line between given coordinates.
The line component will pull data out of the visualisation store, and .
It is used in combination with other components to create a chart.

#### Required attributes
  None

#### Optional attributes
  * alignment: 'start' | 'end' | 'spaced'  - Alignment of the points on the lines. If using DynamicAxis, choose the same alignment option. Defaults to 'spaced'.
  * hoverable: boolean                     - When set to true, the line will become hoverable and highlightable
  * color: string                          - Color of the line, defaulted to grey. Can be any hex-code, rgb or plain string colors
  * focusColor: string                     - Color of the line, when it is hovered. Defaulted to light red.
  * lineWidth: string                      - Width of the line, defaulted to 1
-->

<g class="line-group">
  {#each paths as path, i}
    <path
      role="treeitem"
      aria-selected="false"
      tabindex="0"
      id={`line-${i}`}
      class="line"
      d={path.path}
      stroke={highlightedLine !== -1 && hoverable
        ? highlightedLine === i
          ? focusColor
          : color
        : color}
      stroke-width={lineWidth}
      fill="none"
      on:mouseenter={() => {
        if (!clickedLine && hoverable && highlightedLine !== i) {
          highlightedLine = i;
          redrawHoveredLine(i);
        }
      }}
      on:mouseleave={() => {
        if (!clickedLine && hoverable) {
          highlightedLine = -1;
        }
      }}
      on:mousedown={() => {
        if (clickedLine && highlightedLine !== i && hoverable) {
          highlightedLine = i;
          redrawHoveredLine(i);
        } else {
          clickedLine = !clickedLine;
          highlightedLine = clickedLine ? highlightedLine : -1;
        }
      }} />
    {#if highlightedLine === i && hoverable}
      <g id={`line-${i}-points`}>
        {#each $data[i] as p, j}
          {#if typeof p === 'number'}
            <Label
              x={path.xPos[j]}
              y={path.yPos[j]}
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
