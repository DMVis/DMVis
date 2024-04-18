<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { getContext, tick } from 'svelte';

  // DMVis imports
  import { OriginX } from '$lib/Enums.js';
  import Label from '$lib/components/base/Label.svelte';
  import { ThrowError } from '$lib/utils/ThrowError.js';
  import type { VisualisationStore } from '$lib/store.js';
  import { SpacerEqual, SpacerSide } from '$lib/utils/Spacer.js';

  // Optional attributes
  export let lineWidth: number = 1;
  export let hoverable: boolean = false;
  export let alignment: 'start' | 'end' | 'spaced' = 'spaced';

  // Private variables
  interface LineConfig {
    path: string;
    xPos: number[];
    yPos: number[];
  }
  // Number displaying which line is highlighted, where -1 means no line is highlighted
  let highlightedLine: number = -1;
  // Boolean displaying if any line is clicked
  let clickedLine: boolean = false;
  // Will hold the path for every single line
  let paths: LineConfig[] = [];

  // Get store information
  const { yScales, width, marginLeft, marginRight, data, columns, styleUtil } =
    getContext<VisualisationStore>('store');

  // Create a spacer, which is a scaleBand or scalePoint, which will handle the positions for all the axis
  let spacer: d3.ScaleBand<string> | d3.ScalePoint<string>;
  switch (alignment) {
    // The aligmnent will be the same for alignments `start` and `end`
    case 'start':
    case 'end':
      spacer = SpacerSide($width, $marginLeft, $marginRight, $columns, alignment);
      break;
    case 'spaced': {
      spacer = SpacerEqual($width, $marginLeft, $marginRight, $columns);
      break;
    }
    // When this point is reached, it means that the given alignment is not recognised
    // Note that due to Typescript, this should not happen
    default:
      throw ThrowError('Error', 'Invalid alignment provided.', 'Line');
  }

  $: {
    // Loop over all the rows of the data
    $data.forEach((row) => {
      let xPos: number[] = [];
      let yPos: number[] = [];
      let path: string = 'M';

      // Now loop over all the different attributes in a row
      row.forEach((value, index) => {
        let yBandOffset = 0;
        // Scalebands return the start of the band instead of the middle, so add 0.5*bandwith to the y-position
        if (typeof value === 'string' && 'bandwidth' in $yScales[index]) {
          const yScaleBand = $yScales[index] as d3.ScaleBand<string>;
          yBandOffset = yScaleBand.bandwidth() * 0.5;
        }
        // Calculate the position of the point
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
      // Add the path to the list of paths
      paths.push({
        xPos: xPos,
        yPos: yPos,
        path: path.slice(0, -1)
      } as LineConfig);
    });
  }

  async function redrawHoveredLine(id: number) {
    await tick();
    // Once the page has been updated, raise the line and points to be on top of all the other lines
    d3.select(`#line-${id}`).raise();
    d3.select(`#line-${id}-points`).raise();
  }
</script>

<!--
@component
### Line
The Line allows you to plot a line between given coordinates.
The line component will pull data out of the visualisation store, and create a line for each row.
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
  <!--  Group over all the paths -->
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
          ? $styleUtil.focusColor
          : $styleUtil.color
        : $styleUtil.color}
      stroke-width={lineWidth}
      fill="none"
      on:mouseenter={() => {
        /* Only update the highlight if the following criteria are met:
            - There is no line clicked, since clicking blocks all other highlighting
            - The lines are hoverable
            - This line is not already highlighted
        */
        if (!clickedLine && hoverable && highlightedLine !== i) {
          // Set the current line to be highlighted
          highlightedLine = i;
          // And raise it to be on top
          redrawHoveredLine(i);
        }
      }}
      on:mouseleave={() => {
        /* Only remove the highlight if the following criteria are met:
            - There is no line clicked, since clicking blocks all other highlighting
            - The lines are hoverable
        */
        if (!clickedLine && hoverable) {
          highlightedLine = -1;
        }
      }}
      on:mousedown={() => {
        // If this line is not interactable, return immediately
        if (!hoverable) return;

        /* There is a distinction to be made when a line is clicked
              - Either a line is already clicked, but it is not this line
                  -> In this case, the line that is clicked will take over the highlight
              - Or this is not the case
                  -> In this case invert the clicked line, and set the correct highlight
        */
        if (clickedLine && highlightedLine !== i) {
          highlightedLine = i;
          redrawHoveredLine(i);
        } else {
          clickedLine = !clickedLine;
          highlightedLine = clickedLine ? highlightedLine : -1;
        }
      }} />
    <!-- If the current line is highlighted, also display the points at the intersection of each axis -->
    {#if highlightedLine === i && hoverable}
      <g id={`line-${i}-points`}>
        <!-- Loop over all attributes and place a label holding the value of the point at this attribute -->
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
          <!-- End of loop over all attributes -->
        {/each}
      </g>
      <!-- End of if-statement about whether or not this line is highlighted -->
    {/if}
    <!-- End of loop over all paths -->
  {/each}
</g>
