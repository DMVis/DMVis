# ScatterplotMatrix

This is a visualisation that consists of multiple scatterplots in a matrix.
It can be used to quickly find relations between attributes in a large dataset.

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

# Required Attributes

## dataUtil

- Type: `DataUtils`

Class holding all the data. See [DataUtils](utils/DataUtils.md).

# Optional Attributes

## width

- Type: `number`
- Default: `numberOfAttributes * 150`

Width of the visualisation.

## height

- Type: `number`
- Default: `numberOfAttributes * 150`

Height of the visualisation.

## padding

- Type: `number`
- Default: `0.1`

Padding between all of the different scatterplots.

## pointOpacity

- Type: `number`
- Default: `0.3`

Default opacity of the points of the scatterplots.

## display

- Type: `string`
- Default: `'full'`
- Options: `'full'`,`'top'`, `'bottom'`

Whether to draw the entire Scatterplot Matrix, or only the top, or only the bottom half.

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

## styleUtils

- Type: `StyleUtils`
- Default: `new StyleUtils()`

Class holding all the style information. See [StyleUtils](utils/StyleUtils.md).

## isScrollable

- Type: `boolean`
- Default: `false`

Determines whether the visualisation is [scrollable](components/Scrollable.md) in its parent container.

## showFilter

- Type: `boolean`
- Default: `false`

Determines whether the [Filter](components/Filter.md) component is displayed next to the visualisation.

# Example usage

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

<b>Creating a custom `ScatterplotMatrix` visualisation from a datapath.</b>

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
