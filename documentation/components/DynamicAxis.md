# DynamicAxis component

The DynamicAxis component is a component used for rendering any number of axes, depending on the given dataset.
By default, it will generate an axis per column in the dataset. This means that for a column with numerical data,
a numerical axis is generated, and for a column with text data, a text axis is generated.
DynamicAxis can generate axes in different orientations. Axes themselves can be both vertical and horizontal, and
the axes can also be placed vertically or horizontally with respect to each other. Two examples to differentiate these
are found in the following visualisations:

- [Parallel Coordinates](../visualisations/ParallelCoordinates.md): this visualisation contains _vertical_ axes which are placed _horizontally_ with respect to each other.
- [ScatterplotMatrix](../visualisations/ScatterplotMatrix.md): this visualisation contains both
  - _vertical_ axes which are placed _vertically_ with respect to each other, and
  - _horizontal_ axes which are placed _horizontally_ with respect to each other.

> Note: This component is made specifically for visualisations that require <u>one or more</u> axes. If you want to just use a single axis, it is recommended to use the [Axis](../components/Axis.md) component.

# Table of contents

- [Referenced Components](#referenced-components)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
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
      <td><a href="#/components/Axis.md">Axis</a></td>
      <td>Renders an axis using a provided D3 axis element, with options to place and label the axis on any side of a visualisation.</td>
    </tr>
  </tbody>
</table>

# Optional Attributes

## axisOrder

- Type: `string[]`
- Default: `[]`

The order that the axes should be drawn in. The array should contain strings identical to column names in the dataset. This defaults to `[]`, which draws axes in the order that they appear in the dataset.

## squashOuterTicks

- Type: `boolean`
- Default: `false`

Whether or not to tuck in the first and last tick.

## alignment

- Type: `Alignment`
- Default: `'start'`
- Options: `'start'`, `'end'`, `'spaced'`

Alignment of the axes (i.e. the side of the column where the axis is placed).

## fontSize

- Type: `number`
- Default: `10`

The font size of the tick labels.

## color

- Type: `string`
- Default: `'#000000'`

Color of the axis line.

## renderLabel

- Type: `boolean`
- Default: `false`

Renders a label next to the axis.

## labelPosition:

- Type: `Position`
- Default: `'top'`
- Options: `'left'`, `'right'`, `'top'`, `'bottom'`

Position of the label relative to the axis.

## labelOffset

- Type: `number`
- Default: `20`

Distance from the label to the axis.

## hasTicks

- Type: `boolean`
- Default: `true`

Whether to display tick marks.

## offset

- Type: `number`
- Default: `0`

The offset of the axis from the side of the visualisation.

## ticksNumber

- Type: `number`
- Default: `10`

The number of ticks to display on the axes.

## position

- Type: `string`
- Default: `'bottom'`
- Options: `'bottom'`, `'top'`, `'left'`, `'right'`

The position of the axis.

## spacingDirection

- Type: `Direction`
- Default: `'horizontal'`
- Options: `'horizontal'`, `'vertical'`

The direction to space the axes.

## padding

- Type: `number`
- Default: `0`

The amount of padding between axes is important for either vertically spaced vertical axes or horizontally spaced horizontal axes.

# Events

This component emits the following events:

- `axisOrderChanged`
- `dragMove`
- `dragStop`
- `renderAxis`

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

<b>Creates a `DynamicAxis`. Note that this component requires a predefined [dataUtil](../utils/DataUtils), which in this case is to be set by a parent component.</b>

```svelte
<script lang="ts">
  import { setVisualisationContext, DataUtils } from '@dmvis/dmvis/utils';
  import { DynamicAxis } from '@dmvis/dmvis/components';

  export let dataUtil: DataUtils;
  const size = 500;

  setVisualisationContext({
    width: size,
    height: size,
    data: dataUtil.data,
    columns: dataUtil.columns
  });
</script>

<svg width={size} height={size}>
  <DynamicAxis spacingDirection="vertical" />
</svg>
```
