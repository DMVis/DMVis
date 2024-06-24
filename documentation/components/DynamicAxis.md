# DynamicAxis

DynamicAxis is a component used for rendering any number of axes, depending on the given dataset.
By default, it will generate an axis per column in the dataset. This means that for a column with numerical data,
a numerical axis is generated, and for a column with text data, a text axis is generated.
DynamicAxis can generate axes in different orientations. Axes themselves can be both vertical and horizontal, and
the axes can also be placed vertically or horizontally with respect to each other. Two examples to differentiate these
are found in the following visualisations:

- [Parallel Coordinates](../visualisations/ParallelCoordinates.md): this visualisation contains _vertical_ axes which are placed _horizontally_ with respect to each other.
- [ScatterplotMatrix](../visualisations/ScatterplotMatrix.md): this visualisation contains both
  - _vertical_ axes which are placed _vertically_ with respect to each other, and
  - _horizontal_ axes which are placed _horizontally_ with respect to each other.

> Note: This component is made specifically for visualisations that require <u>one or more</u> axes. If you want to use a single axis, it is recommended to use the [Axis](../components/Axis.md) component.

## Table of Contents

- [Referenced Components](#referenced-components)
- [Attributes](#attributes)
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
      <td><a href="#/components/Axis.md">Axis</a></td>
      <td>Renders an axis using a provided D3 axis element, with options to place and label the axis on any side of a visualisation.</td>
    </tr>
  </tbody>
</table>

## Attributes

<table style="width: 50%">
  <thead>
    <tr>
      <th style="width: 33%;">Attribute</th>
      <th style="width: 33%;">Type</th>
      <th style="width: 33%;">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#components/DynamicAxis?id=axisorder">axisOrder</a></td>
      <td><code>string[]</code></td>
      <td><code>[]</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=squashouterticks'>squashOuterTicks</a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=alignment'>alignment</a></td>
      <td><code>Alignment</code></td>
      <td><code>'start'</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=fontsize'>fontSize</a></td>
      <td><code>number</code></td>
      <td><code>10</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=color'>color</a></td>
      <td><code>string</code></td>
      <td><code>'black'</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=renderlabel'>renderLabel</a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=labelposition'>labelPosition</a></td>
      <td><code>Position</code></td>
      <td><code>'top'</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=labeloffset'>labelOffset</a></td>
      <td><code>number</code></td>
      <td><code>20</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=hasticks'>hasTicks</a></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=offset'>offset</a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=ticksnumber'>ticksNumber</a></td>
      <td><code>number</code></td>
      <td><code>10</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=position'>position</a></td>
      <td><code>string</code></td>
      <td><code>'bottom'</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=spacingdirection'>spacingDirection</a></td>
      <td><code>Direction</code></td>
      <td><code>'horizontal'</code></td>
    </tr>
    <tr>
      <td><a href='#components/DynamicAxis?id=padding'>padding</a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
  </tbody>
</table>

## Optional Attributes

### axisOrder

- Type: `string[]`
- Default: `[]`

The order that the axes should be drawn in. The array should contain strings identical to column names in the dataset. Defaults to `[]`, which draws axes in the order they appear in the dataset.

> Note: You can exclude rows from the dataset by removing these entries from the array.

### squashOuterTicks

- Type: `boolean`
- Default: `false`

Specifies whether or not to tuck in the first and last tick.

### alignment

- Type: `Alignment`
- Default: `'start'`
- Options: `'start'`, `'end'`, `'spaced'`

The alignment of the axes (i.e. the side of the column where the axis is placed).

> Note: Check [`Spacer`](../utils/Spacer.md) for an explenation on the options.

### fontSize

- Type: `number`
- Default: `10`

The font size of the tick labels.

### color

- Type: `string`
- Default: `'black'`

The colour of the axis line. Valid inputs include CSS colours specified as a string.

### renderLabel

- Type: `boolean`
- Default: `false`

Specifies wether a label should be rendered next to the axis.

### labelPosition:

- Type: `Position`
- Default: `'top'`
- Options: `'left'`, `'right'`, `'top'`, `'bottom'`

The position of the label relative to the axis.

### labelOffset

- Type: `number`
- Default: `20`

The distance from the label to the axis in pixels.

### hasTicks

- Type: `boolean`
- Default: `true`

Specifies whether to display tick marks or not.

### offset

- Type: `number`
- Default: `0`

The offset of the axis from the side of the visualisation in pixels.

### ticksNumber

- Type: `number`
- Default: `10`

The number of ticks to display on the axes.

### position

- Type: `string`
- Default: `'bottom'`
- Options: `'bottom'`, `'top'`, `'left'`, `'right'`

The position of the axis.

### spacingDirection

- Type: `Direction`
- Default: `'horizontal'`
- Options: `'horizontal'`, `'vertical'`

The direction to space the axes.

### padding

- Type: `number`
- Default: `0`

The amount of padding between axes in pixels. This is important for either vertically spaced vertical axes or horizontally spaced horizontal axes.

## Events

This component emits the following events:

- `axisOrderChanged`
- `dragMove`
- `dragStop`
- `renderAxis`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Creates a `DynamicAxis`. Note that this component requires a predefined [dataUtil](../utils/DataUtils), which is to be set by a parent component.</b>

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
