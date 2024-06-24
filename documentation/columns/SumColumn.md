# SumColumn

SumColumn is a column that shows the stacked bar of the given columns. This is used to compare the values of multiple columns in one view.

## Table of Contents

- [Referenced Components](#referenced-components)
- [Attributes](#attributes)
- [Required Attributes](#required-attributes)
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
      <td><a href="#/components/Column.md">Column</a></td>
      <td>The column is a component that represents a column in a table. It can be used to display data in a table or to create a visual representation of data.</td>
    </tr>
    <tr>
      <td><a href="#/components/StackedBar.md">StackedBar</a></td>
      <td>It is used to compare the parts to the whole and show the relationship of individual items to the total.</td>
    </tr>
  </tbody>
</table>

## Attributes

<table>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Type</th>
      <th>Default value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#/columns/SumColumn?id=x">x</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/SumColumn?id=width">width</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/SumColumn?id=height">height</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/SumColumn?id=data">data</a>*</td>
      <td><code>Array<Array<number>></code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/SumColumn?id=attributeScales">attributeScales</a>*</td>
      <td><code>d3.scaleLinear<number,number>[]</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/SumColumn?id=padding">padding</a></td>
      <td><code>number</code></td>
      <td><code>10</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/SumColumn?id=name">name</a></td>
      <td><code>string</code></td>
      <td><code>'Column'</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/SumColumn?id=icons">icons</a></td>
      <td><code>IconType[]</code></td>
      <td><code>[IconType.Sort, IconType.Group, IconType.More]</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### x

- Type: `number`
- <span style="color: coral;">Required</span>

The x-coordinate of the column.

### width

- Type: `number`
- <span style="color: coral;">Required</span>

The width of the column in pixels.

### height

- Type: `number`
- <span style="color: coral;">Required</span>

The height of the column in pixels.

### data

- Type: `Array<Array<number>>`
- <span style="color: coral;">Required</span>

The data for the column.

### attributeScales

- Type: `d3.scaleLinear<number,number>[]`
- <span style="color: coral;">Required</span>

An array of scales where the first entry is the scale for the first numerical entry in the row attribute and so on.

## Optional Attributes

### padding

- Type: `number`
- Default: `10`

The padding around the column in pixels.

### name

- Type: `string`
- Default: `'Column'`

The name of the column. It should contain the names of the attributes you're comparing. It could also contain weights.

### icons

- Type: `IconType[]`
- Default: `[IconType.Sort, IconType.Group, IconType.More]`

A list of what icons to display at the top of the column. See [Icon](../components/Icon.md) for more information.

## Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`
- `filter`
- `group`
- `mouseHover`
- `mouseRowClick`
- `sort`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Creating a `SumColumn` with a small dataset.</b>

```svelte
<script lang="ts">
  import { scaleLinear } from 'd3';

  import { SumColumn } from '@dmvis/dmvis/components';
  import { setVisualisationContext, StyleUtils } from '@dmvis/dmvis/utils';

  const data: number[][] = [
    [45, 78, 23, 56, 12],
    [34, 89, 67, 21, 9],
    [13, 47, 50, 80, 94],
    [66, 33, 72, 5, 88],
    [20, 99, 11, 42, 58],
    [100, 100, 100, 100, 100]
  ];
  const columnWidth = 500;
  const scales = Array(5).fill(
    scaleLinear()
      .domain([0, 100])
      .range([0, columnWidth / 5])
  );

  setVisualisationContext({ styleUtil: new StyleUtils({ colorSet: 'Set1', numColors: 5 }) });
</script>

<svg width={1000} height={1000}>
  <SumColumn x={50} width={columnWidth} height={800} {data} attributeScales={scales} />
</svg>
```
