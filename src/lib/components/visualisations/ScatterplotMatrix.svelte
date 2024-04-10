<script lang="ts">
  import Label from '$lib/components/base/Label.svelte';
  import Scatterplot from '$lib/components/visualisations/Scatterplot.svelte';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import { VisualisationStore } from '$lib/store.js';
  import { hoveredXLabel, hoveredYLabel } from '$lib/selected.js';
  import { onMount } from 'svelte';

  import * as d3 from 'd3';
  import { setContext, getContext } from 'svelte';
  import DynamicAxis from '../base/DynamicAxis.svelte';
  import StaticLine from '../base/StaticLine.svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';

  export let height: number;
  export let width: number;
  export let dataUtil: DataUtils;

  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginBottom: number = 40;
  export let marginTop: number = 40;

  export let padding: number = 0.1;
  export let pointColor: string = '#CCCCFF';
  export let pointOpacity: number = 0.3;

  let currentGreyPoints: string[] = [];
  //Current mouse coordinates, used for the tooltip lines
  let mouseX = 0;
  let mouseY = 0;

  //Scaled mouse coordinates, meaning they hold the actual coordinates of a point inside a scatterplot
  let scaledMouseX: number = 0;
  let scaledMouseY: number = 0;

  //Current x and y attribute that are hovered, go back to '' if nothing is hovered
  let currentX: string = '';
  let currentY: string = '';

  //Scales used to space the scatterplots, where you can put in an attribute name and get the starting position back
  let xScale: d3.ScaleBand<string>;
  let yScale: d3.ScaleBand<string>;

  //Order of the attributes from top-left to bottom-right
  let axisNames: string[];

  //Whether or not to display the tooltip lines
  let showLines = false;

  //Only one of these will be true, whether to draw the tooltip lines to the top-right corner or the bottom-left corner
  let showTopRightLines = false;
  let showBottomLeftLines = false;

  //Fill the store
  const visualisationStore = new VisualisationStore();
  $: {
    visualisationStore.data.set(dataUtil.data);
    visualisationStore.columns.set(dataUtil.columns);
    visualisationStore.marginLeft.set(marginLeft);
    visualisationStore.marginRight.set(marginRight);
    visualisationStore.marginTop.set(marginTop);
    visualisationStore.marginBottom.set(marginBottom);
    visualisationStore.width.set(width);
    visualisationStore.height.set(height);

    //The first column name is `label`, this is not relevant
    axisNames = dataUtil.columns.slice(1);

    //Create scalebands to get the positioning of all the scatterplots correct, and also include padding
    yScale = d3
      .scaleBand()
      .domain(axisNames)
      .range([marginTop, height - marginBottom])
      .paddingInner(padding);
    xScale = d3
      .scaleBand()
      .domain(axisNames)
      .range([marginLeft, width - marginRight])
      .paddingInner(padding);
  }
  setContext('store', visualisationStore);

  //Get the computed scales from the store
  const { xScales, yScales } = getContext<VisualisationStore>('store');

  //This function is called when the mouse is over a scatterplot
  function mouseOver(xAxis: string, yAxis: string) {
    //If there are no changes, there do not need to be any changes
    if (currentX == xAxis && currentY == yAxis) return;
    //Update the global variables
    currentX = xAxis;
    currentY = yAxis;

    //Tell the attribute label to update
    hoveredXLabel.set(xAxis);
    hoveredYLabel.set(yAxis);

    //If the mouse is over a scatterplot, there need to be tooltip lines displayed
    showLines = true;
  }

  //This function is called when the mouse leaves a scatterplot
  function mouseOut() {
    //There no longer are attributes that need to be highlighted
    currentX = '';
    currentY = '';

    hoveredXLabel.set('');
    hoveredYLabel.set('');

    showLines = false;
  }

  //This function is called when the mouse moves over the scatterplot
  function mouseMove(event: MouseEvent, xAxis: string, yAxis: string) {
    //Update global variables
    mouseX = event.offsetX;
    mouseY = event.offsetY;

    //Scatter coordinates are the absolute coordinates inside a scatterplot
    let scatterX = event.offsetX - (xScale(xAxis) ?? 0);
    let scatterY = event.offsetY - (yScale(yAxis) ?? 0);

    //The index of the x and y attribute
    let xIndex = dataUtil.columns.indexOf(xAxis);
    let yIndex = dataUtil.columns.indexOf(yAxis);

    //Get the corresponding scales and set the correct range
    let xScaleLinear = $xScales[xIndex] as d3.ScaleLinear<number, number>;
    xScaleLinear.range([xScale.bandwidth(), 0]);
    let yScaleLinear = $yScales[yIndex] as d3.ScaleLinear<number, number>;
    yScaleLinear.range([0, yScale.bandwidth()]);

    //Scaled mouse coordinates are the scaled coordinates of a scatterplot
    scaledMouseX = xScaleLinear.invert(scatterX);
    scaledMouseY = yScaleLinear.invert(scatterY);

    //Check which tooltip line to display
    showBottomLeftLines = (xScale(yAxis) ?? 0) > mouseX;
    showTopRightLines = !showBottomLeftLines;
  }

  let selectionMatrix: Array<Array<number[][] | null>>;
  onMount(() => {
    d3.selectAll('.scatterplot').call(
      //@ts-ignore Yea idk what type to put here
      d3
        .brush()
        .extent([
          [0, 0],
          [xScale.bandwidth(), yScale.bandwidth()]
        ])
        .on('end brush', brushing)
    );
    selectionMatrix = JSON.parse(
      JSON.stringify(Array(axisNames.length).fill(Array(axisNames.length).fill(null)))
    );
  });

  //Function is called when something happens to the brushed selection
  function brushing(ap: any) {
    //Calculate which attributes are being selected
    let xIndex = calculateAttributeIndex(xScale, ap.sourceEvent.offsetX - marginLeft);
    let yIndex = calculateAttributeIndex(yScale, ap.sourceEvent.offsetY - marginTop);
    let xAttr = xScale.domain()[xIndex];
    let yAttr = yScale.domain()[yIndex];
    //If the scatterplot is not recognised, do nothing
    if (!xAttr || !yAttr || xAttr === yAttr) return;
    let selection = scale(ap.selection, xIndex, yIndex);

    if (selection === null) {
      selectionMatrix[xIndex][yIndex] = null;
    } else {
      selectionMatrix[xIndex][yIndex] = selection.slice();
    }

    //Minmaxattr is an array that for each entry it holds [min,max] or null (meaning no filter specified)
    let minMaxAttr: (number[] | null)[] = calcMinMax();
    let excludedPoints = dataUtil.excludedDataForAll(minMaxAttr);

    //Put all the old grey points back to normal
    currentGreyPoints.forEach((name) => {
      changeFocus(name, false);
    });

    //Put the points outside of the selection to grey
    excludedPoints.forEach((name) => {
      changeFocus(name, true);
    });

    // //Update the current grey points in the scatterplot matrix
    currentGreyPoints = excludedPoints.slice();

    function calcMinMax() {
      let res: Array<number[] | null> = [];
      for (let i = 0; i < axisNames.length; i++) {
        let rowValues = selectionMatrix[i].filter((selection) => {
          return selection !== null;
        });
        // Get the highest minimum from all the scatterplots on the row
        let minRow =
          d3.max(rowValues, (selection) => {
            return (selection as number[][])[0][0];
          }) ?? -1;
        let maxRow =
          d3.min(rowValues, (selection) => {
            return (selection as number[][])[1][0];
          }) ?? -1;
        let columnValues = selectionMatrix
          .map((row) => {
            return row[i];
          })
          .filter((selection) => {
            return selection !== null;
          });
        //Get the highest minimum from all scatterplots on the column
        let minCol =
          d3.max(columnValues, (selection) => {
            return (selection as number[][])[0][1] ?? -1;
          }) ?? -1;
        let maxCol =
          d3.min(columnValues, (selection) => {
            return (selection as number[][])[1][1];
          }) ?? -1;
        //If there are no selections on the
        let min, max;
        if (minCol < 0 && minRow < 0) {
          res.push(null);
        } else {
          if (maxCol < 0) {
            max = maxRow;
          } else if (maxRow < 0) {
            max = maxCol;
          } else {
            max = Math.min(maxCol, maxRow);
          }
          min = Math.max(minCol, minRow);
          res.push([min, max]);
        }
      }
      return res;
    }
    //Takes a selection and returns a scaled selection
    function scale(selection: number[][], xIndex: number, yIndex: number) {
      //Empty selections don't need scaling
      if (selection === null) return null;
      //Get the relevant scales
      //The +1 is because the columnnames also has a scale, which we are not interested in
      let xScaleLinear = $xScales[xIndex + 1] as d3.ScaleLinear<number, number>;
      let yScaleLinear = $yScales[yIndex + 1] as d3.ScaleLinear<number, number>;

      let scaledSelection = [
        [xScaleLinear.invert(selection[0][0]), yScaleLinear.invert(selection[1][1])],
        [xScaleLinear.invert(selection[1][0]), yScaleLinear.invert(selection[0][1])]
      ];
      return scaledSelection;
    }
  }
  function changeFocus(pointName: string, needsToBeGrey: boolean) {
    d3.selectAll(`.${pointName}`).classed('greyed', needsToBeGrey);
  }

  function calculateAttributeIndex(scale: d3.ScaleBand<string>, coordinate: number) {
    const index = Math.floor(coordinate / scale.step());
    return index;
  }
</script>

<!--
@component
### Scatterplot Matrix
A matrix of scatterplots that can be used to quickly find relations between attributes in a large dataset.

#### Required attributes
* height: number                        - Height of the Scatterplot Matrix.
* width: number                         - Width of the Scatterplot Matrix.
* dataUtil: DataUtils;                  - Class holding all the data, see documentation.

#### Optional attributes
* padding: number  - Padding between the different scatterplots. Default is 0.1.
* pointColor: string - Color of the points in the scatterplots. Default is "#CCCCFF".
* pointOpacity: number - Default opacity of the points in the scatterplots. Default is 0.3

* marginLeft: number  - Margin to the left of the visualisation, defaults to 40
* marginRight: number  - Margin to the right of the visualisation, defaults to 40
* marginTop: number  - Margin to the top of the visualisation, defaults to 40
* marginBottom: number  - Margin to the bottom of the visualisation, defaults to 40
-->

{#await xScale}
  <p>Loading visualisation, please wait...</p>
{:then}
  <svg class="visualisation scatterplotMatrix" {width} {height}>
    {#key dataUtil}
      <g class="brushes"> </g>
      {#each axisNames as xAxis}
        {#each axisNames as yAxis}
          {#if xAxis != yAxis}
            <g
              style="cursor:crosshair"
              transform="translate({xScale(xAxis)},{yScale(yAxis)})"
              on:mouseover={() => {
                mouseOver(xAxis, yAxis);
              }}
              on:mouseout={() => {
                mouseOut();
              }}
              on:focus={() => {
                mouseOver(xAxis, yAxis);
              }}
              on:blur={() => {
                mouseOut();
              }}
              on:mousemove={(event) => {
                mouseMove(event, xAxis, yAxis);
              }}
              role="treeitem"
              aria-selected="false"
              tabindex={0}>
              <!--The rect will function as a border around the scatterplot  -->
              <rect
                width={xScale.bandwidth()}
                height={yScale.bandwidth()}
                x={0}
                y={0}
                stroke="black"
                fill="white">
              </rect>
              <Scatterplot
                {xAxis}
                {yAxis}
                width={xScale.bandwidth()}
                height={yScale.bandwidth()}
                showAxis={false}
                {pointColor}
                {pointOpacity} />
            </g>
          {:else}
            <g transform="translate({xScale(xAxis)},{yScale(yAxis)})">
              <Label
                x={xScale.bandwidth() / 2}
                y={yScale.bandwidth() / 2}
                text={xAxis}
                hasBackground={true}
                name={xAxis + '-attr'}
                width={xScale.bandwidth()}
                height={yScale.bandwidth()}
                color="white" />
            </g>
          {/if}
        {/each}
      {/each}
      {#if showLines}
        {#if showTopRightLines}
          <StaticLine
            points={[
              { x: mouseX, y: mouseY },
              { x: width - marginRight, y: mouseY }
            ]}
            opacity={0.5}
            dashLength="5" />
          <Label
            x={width - marginRight - 10}
            y={Math.round(mouseY) + 10}
            text={`${Math.round(scaledMouseY)}`}
            fontSize={'14'}
            fontWeight={'bold'}
            hasBackground={false} />
          <StaticLine
            points={[
              { x: mouseX, y: mouseY },
              { x: mouseX, y: marginTop }
            ]}
            opacity={0.5}
            dashLength="5" />
          <Label
            x={Math.round(mouseX) + 10}
            y={marginTop + 10}
            text={`${Math.round(scaledMouseX)}`}
            fontSize={'14'}
            fontWeight={'bold'}
            hasBackground={false} />
        {/if}
        {#if showBottomLeftLines}
          <StaticLine
            points={[
              { x: mouseX, y: mouseY },
              { x: marginLeft, y: mouseY }
            ]}
            opacity={0.5}
            dashLength="5" />
          <Label
            x={marginLeft + 10}
            y={Math.round(mouseY) + 10}
            text={`${Math.round(scaledMouseY)}`}
            fontSize={'14'}
            fontWeight={'bold'}
            originY={OriginY.Top}
            hasBackground={false} />
          <StaticLine
            points={[
              { x: mouseX, y: mouseY },
              { x: mouseX, y: height - marginBottom }
            ]}
            opacity={0.5}
            dashLength="5" />
          <Label
            x={Math.round(mouseX) + 15}
            y={height - marginBottom - 10}
            text={`${Math.round(scaledMouseX)}`}
            fontSize={'14'}
            fontWeight={'bold'}
            originX={OriginX.Left}
            hasBackground={false} />
        {/if}
      {/if}
    {/key}
    <DynamicAxis
      position="left"
      spacingDirection="vertical"
      ticksNumber={4}
      hasPadding={true}
      startColumn={1} />
    <DynamicAxis
      position="right"
      spacingDirection="vertical"
      ticksNumber={4}
      hasPadding={true}
      startColumn={1} />
    <DynamicAxis
      position="bottom"
      spacingDirection="horizontal"
      ticksNumber={4}
      hasPadding={true}
      startColumn={1} />
    <DynamicAxis
      position="top"
      spacingDirection="horizontal"
      ticksNumber={4}
      hasPadding={true}
      startColumn={1} />
  </svg>
{:catch}
  <p>Loading visualisation failed</p>
{/await}
