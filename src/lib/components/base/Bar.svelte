<script lang="ts">
  import * as d3 from 'd3';

  export let x: number;
  export let yScale: d3.ScaleLinear<number, number>;
  export let xScale: d3.ScaleLinear<number, number>;
  export let barWidth: number;
  export let barHeight: number;
  export let maxHeight: number;

  export let color: string = 'rgb(50, 50, 50)';
  export let xRounding: number = 0; // Rounding in percentage of width
  export let yRounding: number = 0;
  export let strokeWidth: number = 0; // Perimeter
  export let strokeColor: string = 'rgb(255, 255, 255)';
</script>

<!--
  @component
  ### Bar
  Allows you to place a bar at a given coordinate, with given size, color and outline.

  ### Required Attributes
    * x: number;                                - Non-scaled x coordinate of left-bottom of bar
    * yScale: d3.ScaleLinear<number, number>;   - Y scale
    * xScale: d3.ScaleLinear<number, number>;   - X scale
    * barWidth: number;                         - Width of bar
    * barHeight: number;                        - Height of bar (Data)
    * maxHeight: number;                        - Maximum height of any bar, usually largest data point.

  ### Optional Attributes
    * color: string                             - Color of bar
    * xRounding : number                        - [ 1-100 ], Rounding of corners of bar, in percentage of its width.
    * yRounding : number                        - [ 1-100 ], Rounding of corners of bar, in percentage of its height.
    * strokeWidth : number                      - Outline of bar
    * strokeColor : string                      - Color of outline of bar
-->

<rect
  x={xScale(x)}
  y={yScale(maxHeight - barHeight)}
  width={xScale(barWidth)}
  height={yScale(barHeight)}
  fill={color}
  rx="{xRounding}%"
  ry="{yRounding}%"
  stroke-width={strokeWidth}
  stroke={strokeColor} />
