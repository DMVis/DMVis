# Line

The line component is used for visualisations that need lines. It generates lines dynamically from the provided dataset.

> Note: This component only works if `VisualisationStore` has been set, since it uses the dataset present in the store.

## Table of Contents

- [Referenced Components](#referenced-components)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
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
      <td><a href="#/components/Tooltip.md">Tooltip</a></td>
      <td>Used to quickly display a small amount of information to the user.</td>
    </tr>
  </tbody>
</table>

## Optional Attributes

### alignment

- Type: `Alignment`
- Default: `'spaced'`
- Options: `'start'`, `'end'`, `'spaced'`

Alignment of the points on the lines. If using `DynamicAxis`, choose the same alignment option.

### lineWidth

- Type: `number`
- Default: `1`

Width of the line that is drawn.

### hoverable

- Type: `boolean`
- Default: `false`

Whether or not the line should be hoverable. When set to `true`, the line will become highlighted if the line is hovered, and numbers will be displayed on all the points.

### axisOrder

- Type: `string[]`
- Default: `[]`

Order of the attributes, which determines the placement of points on each line.

### draggedAxis:

- Type: `UndefineableString`
- Default: `undefined`

The name of the axis that is being dragged, is used in visualisations that use draggable axes.

### draggingOffset

- Type: `number`
- Default: `0`

The offset of the axis that is being dragged.

## Events

This component emits the following events, when `hoverable` is set to true:

- `mouseLineEnter`
- `mouseLineLeave`
- `mouseLineClick`

To read more about these events, see the [Events](../utils/Events.md) documentation.

## Example Usage

<b>Creating a line for each data row in the `dataUtil`. Note that this component requires a predefined `dataUtil` to be set by the parent component. </b>

```svelte
<script lang="ts">
  import { setVisualisationContext, type DataUtils } from '@dmvis/dmvis/utils';
  import { Line } from '@dmvis/dmvis/components';

  export let dataUtil: DataUtils;

  const size = 500;

  // Set the data, columns and size which are used to calculate the scales
  setVisualisationContext({
    width: size,
    height: size,
    data: dataUtil.data,
    columns: dataUtil.columns
  });
</script>

<svg width={size} height={size}>
  <Line />
</svg>
```
