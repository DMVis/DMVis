# Scatterplot

![Scatterplot example](../media/scatterplot-example.png ':size=600')

This is a visualisation to display a dataset of points.
A scatterplot displays two attributes of given datapoints and maps them in an X and Y axis. If you want to display every attribute, use a [ScatterplotMatrix](visualisations/ScatterplotMatrix.md).

> Note: By default the scatterplot assumes an existing pre-defined store. If this is not the case, the [dataUtil](#datautil) attribute is **required**!

## Table of Contents

- [Referenced Components](#referenced-components)
- [Attributes](#attributes)
- [Required Attributes](#required-attributes)
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

## Attributes

<table style="width: 60%">
  <thead>
    <tr>
      <th style="width: 33%;">Attribute</th>
      <th style="width: 33%;">Type</th>
      <th style="width: 33%;">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=width'>width</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=height'>height</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=xaxis'>xAxis</a>*</td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=yaxis'>yAxis</a>*</td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=datautil'>dataUtil</a></td>
      <td><code>dataUtil</code></td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=showaxis'>showAxis</a></td>
      <td><code>bool</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=numticks'>numTicks</a></td>
      <td><code>number</code></td>
      <td><code>5</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=pointopacity'>pointOpacity</a></td>
      <td><code>number</code></td>
      <td><code>1</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=marginleft'>marginLeft</a></td>
      <td><code>number</code></td>
      <td><code>50</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=marginright'>marginRight</a></td>
      <td><code>number</code></td>
      <td><code>40</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=margintop'>marginTop</a></td>
      <td><code>number</code></td>
      <td><code>40</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Scatterplot?id=marginbottom'>marginBottom</a></td>
      <td><code>number</code></td>
      <td><code>40</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### width

- Type: `number`
- <span style="color:coral">Required</span>

The width of the visualisation in pixels.

### height

- Type: `number`
- <span style="color:coral">Required</span>

The height of the visualisation in pixels.

### xAxis

- Type: `string`
- <span style="color:coral">Required</span>

The name of the attribute to be plotted along the x-axis.

> Note: This should be the same name as the one that is provided in the input `dataUtil`.

### yAxis

- Type: `string`
- <span style="color:coral">Required</span>

The name of the attribute to be plotted along the y-axis.

> Note: This should be the same name as the one that is provided in the input `dataUtil`.

## Optional Attributes

### dataUtil

- Type: `dataUtil`
- Default: `null`

An instance of `dataUtils`, which holds all the data.
It adds the possibility to use `Scatterplot` without a predefined store.
By default, the scatterplot assumes a defined store.
See [DataUtils](utils/DataUtils.md) for more information.

### showAxis

- Type: `bool`
- Default: `true`

Whether or not to display the Left- and Bottom-axis.

### numTicks

- Type: `number`
- Default: `5`

The amount of ticks to display on each axis.

### pointOpacity

- Type: `number`
- Default: `1`

The opacity of the points of the scatterplot.
It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).

### marginLeft

- Type: `number`
- Default: `50`

The margin left of the visualisation in pixels.

### marginRight

- Type: `number`
- Default: `40`

The margin right of the visualisation in pixels.

### marginTop

- Type: `number`
- Default: `40`

The margin above the visualisation in pixels.

### marginBottom

- Type: `number`
- Default: `40`

The margin under the visualisation in pixels.

## Events

This component emits the following events:

- `mousePointEnter`
- `mousePointLeave`
- `mousePointClick`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Using the scatterplot with a pre-defined store.</b>

```svelte
<script lang="ts">
  import { Scatterplot } from '@dmvis/dmvis';
  import { setVisualisationContext } from '@dmvis/dmvis/utils';

  const width: number = 500;
  const height: number = 500;

  const marginLeft: number = 40;
  const marginRight: number = 40;
  const marginTop: number = 40;
  const marginBottom: number = 40;

  const data: (number | string)[][] = [
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

<b>Or creating a scatterplot with the dataUtil.</b>

```svelte
<script lang="ts">
  import { Scatterplot } from '@dmvis/dmvis';
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataUrl: string = 'FILEPATH';
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
