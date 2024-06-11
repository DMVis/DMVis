# Scatterplot

This is a visualisation to display a dataset of points

> Note: By default the scatterplot assumes an existing pre-defined store. If this is not the case, the [dataUtil](#datautil) attribute is **required**!

# Table of contents

- [Referenced Components](#referenced-components)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Example usage](#example-usage)

# Referenced Components

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
      <td><a href="#/components/DynamicAxis.md">DynamicAxis</a></td>
      <td>The DynamicAxis component is responsible for rendering axes
based on the data with labels along the correct side of the visualisation.</td>
    </tr>
    <tr>
      <td><a href="#/components/Point.md">Point</a></td>
      <td>Produces a point at a given coordinate of certain color, size and style.</td>
    </tr>
  </tbody>
</table>

# Required Attributes

## width

- Type: `number`

Width of the visualisation.

## height

- Type: `number`

Height of the visualisation.

## xAxis

- Type: `string`

The name of the attribute should be plotted along the x-axis.

> Note: This should be the same name as the one that is provided in the input dataUtil.

## yAxis

- Type: `string`

The name of the attribute that should be plotted along the y-axis.

> Note: This should be the same name as the one that is provided in the input dataUtil.

# Optional Attributes

## dataUtil

- Type: `dataUtil`
- Default: `null`

The dataUtil adds the option to use the scatterplot without a predefined store. Note that this becomes a required attribite if you wish to do so.
See [DataUtils](utils/DataUtils.md) for more information.

## showAxis

- Type: `bool`
- Default: `true`

Whether or not to display the Left- and Bottom-axis.

## numTicks

- Type: `number`
- Default: `5`

Amount of ticks to display on each of the axes.

## pointOpacity

- Type: `number`
- Default: `1`

The opacity of the points of the scatterplot.

## marginLeft

- Type: `number`
- Default: `40`

Margin left of the visualisation.

## marginRight

- Type: `number`
- Default: `40`

Margin right of the visualisation.

## marginTop

- Type: `number`
- Default: `40`

Margin above the visualisation.

## marginBottom

- Type: `number`
- Default: `40`

Margin under the visualisation.

# Events

This component emits the following events:

- `mousePointEnter`
- `mousePointLeave`
- `mousePointClick`

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

Using the scatterplot with a pre-defined store.

```svelte
<script lang="ts">
  const width: number = 500;
  const height: number = 500;

  const marginLeft: number = 40;
  const marginRight: number = 40;
  const marginTop: number = 40;
  const marginBottom: number = 40;

  const data: Array<Array<string | number>> = [
    ['Name', 'weight', 'size', 'age'],
    ['Piet', 0, 0, 0],
    ['Jaap', 98, 295, 52],
    ['Klara', 152, 350, 61],
    ['Sarah', 73, 213, 43],
    ['Henk', 43, 112, 16],
    ['Pieter', 359, 429, 75]
  ];

  setVisualisationContext({
    data: data.slice(1),
    columns: data[0] as string[],
    height,
    width,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom
  });
</script>

<svg {width} {height}>
  <Scatterplot {height} {width} xAxis="age" yAxis="size" />
</svg>
```

Or creating a scatterplot with the dataUtil

```svelte
<script lang="ts">
  const dataUrl: string = '/datasets/holidays-20.csv';
  const dataUtil: DataUtils = new DataUtils();

  const width: number = 800;
  const height: number = 800;

  // Load promising
  $: load = (async () => {
    await dataUtil.parseCSV(dataUrl);
  })();
</script>

{#await load then}
  <svg {width} {height}>
    <Scatterplot {dataUtil} {height} {width} xAxis="hotel quality" yAxis="landscape interest" />
  </svg>
{/await}
```
