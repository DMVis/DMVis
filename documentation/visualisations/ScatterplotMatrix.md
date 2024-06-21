# ScatterplotMatrix

![ScatterplotMatrix example](../media/scatterplotmatrix-example.png ':size=500')

This visualisation is a combination of many [scatterplots](visualisations/Scatterplot.md), allowing for quickly finding relations between many different attributes in a dataset.

[N. Elmqvist, P. Dragicevic and J. -D. Fekete, "Rolling the Dice: Multidimensional Visual Exploration using Scatterplot Matrix Navigation," in IEEE Transactions on Visualization and Computer Graphics, vol. 14, no. 6, pp. 1539-1148, Nov.-Dec. 2008, doi: 10.1109/TVCG.2008.153.](https://ieeexplore.ieee.org/abstract/document/4658123)

## Table of Contents

- [Referenced Components](#referenced-components)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Interactivity](#interactivity)
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
      <td><a href="#/components/BaseVisualisation.md">BaseVisualisation</a></td>
      <td>The BaseVisualisation component is a wrapper component that handles a few default tasks for your visualisation.</td>
    </tr>
    <tr>
      <td><a href="#/components/Draggable.md">Draggable</a></td>
      <td>This wrapper makes it easier to drag components and execute some logic based on where the component is being dragged.</td>
    </tr>
    <tr>
      <td><a href="#/components/DynamicAxis.md">DynamicAxis</a></td>
      <td>The DynamicAxis component is responsible for rendering axes
based on the data with labels along the correct side of the visualisation.</td>
    </tr>
    <tr>
      <td><a href="#/components/Label.md">Label</a></td>
      <td>Provides labelling functionality for data points.</td>
    </tr>
    <tr>
      <td><a href="#/visualisations/Scatterplot.md">Scatterplot</a></td>
      <td>This is a visualisation to display a dataset of points.</td>
    </tr>
    <tr>
      <td><a href="#/components/StaticLine.md">StaticLine</a></td>
      <td>Produces a line between the points with a certain colour, size and style.</td>
    </tr>
    <tr>
      <td><a href="#/components/Tooltip.md">Tooltip</a></td>
      <td>Used to quickly display a small amount of information to the user.</td>
    </tr>
  </tbody>
</table>

## Required Attributes

### dataUtil

- Type: `DataUtils`

An instance of `dataUtils`, which holds all the data. See [DataUtils](utils/DataUtils.md) for more information.

## Optional Attributes

### width

- Type: `number`
- Default: `numberOfAttributes * 150`

The width of the visualisation in pixels.

### height

- Type: `number`
- Default: `numberOfAttributes * 150`

The height of the visualisation in pixels.

### padding

- Type: `number`
- Default: `0.1`

The padding between each scatterplot.

### pointColor

- Type: `string`
- Default: `'red'`

The colour of each point in each scatterplot. Valid inputs include CSS colours specified as a string.

### pointOpacity

- Type: `number`
- Default: `0.3`

The default opacity of each point in each scatterplot.
It can be a number between `0` and `1` (inclusive).

### display

- Type: `string`
- Default: `'full'`
- Options: `'full'`,`'top'`, `'bottom'`

Whether to draw the entire visualisation, or only the top, or only the bottom half.

### marginLeft

- Type: `number`
- Default: `40`

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

### styleUtil

- Type: `StyleUtils`
- Default: `new StyleUtils({ color: '#f42b03' })`

An instance of `StyleUtils`, which contains styling for the visualisation. See [StyleUtils](utils/StyleUtils.md) for more information.

### isScrollable

- Type: `boolean`
- Default: `false`

Whether the visualisation is [scrollable](components/Scrollable.md) in its parent container.

### showFilterPanel

- Type: `boolean`
- Default: `false`

Whether the [Filter](components/Filter.md) component is displayed next to the visualisation.

## Interactivity

### Switching attributes

![Scatterplotmatrix switching](../media/scatterplotmatrix-switching.png ':size=200')

Grab any attribute in the scatterplot matrix and drag it to another attribute to switch the two around.

### Selecting datapoints

![Scatterplotmatrix selecting](../media/scatterplotmatrix-selecting.png ':size=200')

To select a single datapoint, click on it. It shows its name, and two lines point to where in the axis it is located. The attributes that form the axis of this scatterplot light up, and all other occurences of this datapoint also light up. To remove your selection, press `escape`

![Scatterplotmatrix brushing](../media/scatterplotmatrix-brushing.png ':size=200')

To look at a collection of datapoints, press and hold anywhere in a scatterplot and drag to form a selection square. All datapoints in your selection in other scatterplots will also light up. You can move this selection around by grabbing it and dragging it. You can also make multiple selections in multiple scatterplots to refine your selection.
To remove your selection, press `escape`

## Example Usage

<b>Creating a basic `ScatterplotMatrix` visualisation from a csv string.</b>

```svelte
<script lang="ts">
  import { ScatterplotMatrix } from '@dmvis/dmvis';
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataCsv =
    'Name,Column1,Column2,Column3,Column4\nJohn,54,23,78,12\nSarah,87,45,91,63\nMichael,32,68,15,77\nEmily,96,42,19,55\nDavid,21,84,37,29\nLisa,73,10,56,88\nMatthew,49,27,83,14\nEmma,17,36,70,92\nJames,61,79,24,47\nSophia,38,52,66,31\n';

  const dataUtil = new DataUtils();

  // Load promise
  $: load = (async () => {
    await dataUtil.parseData(dataCsv);
  })();
</script>

{#await load then}
  <ScatterplotMatrix {dataUtil} />
{/await}
```

<b>Creating a custom `ScatterplotMatrix` visualisation from a data path.</b>

```svelte
<script lang="ts">
  import { ScatterplotMatrix } from '@dmvis/dmvis';
  import { DataUtils, StyleUtils } from '@dmvis/dmvis/utils';

  const dataUrl = 'FILEPATH';

  const dataUtil = new DataUtils();

  // Load promise
  $: load = (async () => {
    await dataUtil.parseData(dataUrl);
  })();

  const styleUtil = new StyleUtils({ color: 'lime', focusColor: 'magenta' });
</script>

{#await load then}
  <ScatterplotMatrix {dataUtil} {styleUtil} />
{/await}
```
