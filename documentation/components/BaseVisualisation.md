# BaseVisualisation

The BaseVisualisation component is a wrapper component that handles a few default tasks for your visualisation. Certain styling standards are set and error handling is kept within the scope of the visualisation.

## Table of Contents

- [Referenced Components](#referenced-components)
- [Optional Attributes](#optional-attributes)
- [Example Usage](#example-usage)

## Referenced Components

This component utilises the following components:

<table style="width: 50%">
  <thead>
    <tr>
      <th style="width: 20%;">Component</th>
      <th style="width: 80%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#/components/Filter.md">Filter</a></td>
      <td>Adds a filter to the visualisation for sorting and filtering data. Recommended to use outside <code>BaseVisualisation</code> for multiple visualisations.</td>
    </tr>
    <tr>
      <td><a href="#/components/Scrollable.md">Scrollable</a></td>
      <td>Makes any visualisation scrollable, allowing for smaller display areas.</td>
    </tr>
  </tbody>
</table>

## Optional Attributes

### isScrollable

- Type: `boolean`
- Default: `false`

Whether the component that is wrapped by the `BaseVisualisation` component should be [scrollable](components/Scrollable.md).

### scrollableWidth

- Type: `number`
- Default: `'100%'`

The width of the visualisation that is shown. For this to be used, `isScrollable` must be set to `true`.

### scrollableHeight

- Type: `number`
- Default: `'100%'`

The height of the visualisation that is shown. For this to be used, `isScrollable` must be set to `true`.

### showFilter

- Type: `DataUtils`
- Default: `null`

Whether to show and use the [Filter](components/Filter.md) component within a visualisation using an instance of DataUtils.

## Example Usage

<b>Create a scrollable visualisation, in this case a scatterplot. </b>

```svelte
<script lang="ts">
  import { BaseVisualisation, Point, Axis } from '@dmvis/dmvis/components';
  import { axisBottom, axisLeft, scaleLinear } from 'd3';

  const visualisationSize = 1000;
  const containerSize = 500;

  // Points ranging from 0 to 500
  const points: { x: number; y: number }[] = [
    { x: 50, y: 400 },
    { x: 220, y: 300 },
    { x: 330, y: 90 },
    { x: 480, y: 250 },
    { x: 150, y: 50 }
  ];

  const marginLeft = 100;
  const marginBottom = 100;
  // Create a scale for both the x- and y-direction
  const scaleX = scaleLinear().range([marginLeft, visualisationSize]).domain([0, 500]);
  const scaleY = scaleLinear()
    .range([visualisationSize - marginBottom, 0])
    .domain([0, 500]);
</script>

<!-- Make the entire visualisation scrollable -->
<BaseVisualisation
  isScrollable={true}
  scrollableHeight={containerSize}
  scrollableWidth={containerSize}>
  <!-- Create a normal scatterplot -->
  <svg width={visualisationSize} height={visualisationSize} style="border: 1px solid black;">
    <Axis placementX={0} placementY={visualisationSize - marginBottom} axis={axisBottom(scaleX)} />
    <Axis placementX={marginLeft} placementY={0} axis={axisLeft(scaleY)} />
    {#each points as p}
      <Point x={scaleX(p.x)} y={scaleY(p.y)} />
    {/each}
  </svg>
</BaseVisualisation>
```
