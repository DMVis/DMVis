# BarColumn

BarColumn is a column that displays a bar chart. It is useful for visualising the relative size of values in a column.

# Table of contents

- [Referenced Components](#referenced-components)
- [Required Attributes](#required-attributes)
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
    <tr>
      <td><a href="#/components/Bar.md">Bar</a></td>
      <td>A bar that can be used for bar visualisations.</td>
    </tr>
    <tr>
      <td><a href="#/components/Column.md">Column</a></td>
      <td>The column is a component that represents a column in a table. It can be used to display data in a table or to create a visual representation of data.</td>
    </tr>
    <tr>
      <td><a href="#/visualisations/Histogram.md">Histogram</a></td>
      <td>This visualisation shows frequencies of data. It can group data categorically or numerically.</td>
    </tr>
    <tr>
      <td><a href="#/components/Label.md">Label</a></td>
      <td>The label allows you to add text with a background.</td>
    </tr>
  </tbody>
</table>

# Required Attributes

## x

- Type: `number`

X-coordinate of the column.

## width

- Type: `number`

Width of the column.

## height

- Type: `number`

Height of the column.

## data

- Type: `number[]`

Data that is to be displayed as bars in the column.

# Optional Attributes

## name

- Type: `string`
- Default: `'Column'`

Name of the column to display at the top. Set this to the attribute name.

## padding

- Type: `number`
- Default: `10`

Padding around the column.

## icons

- Type: `IconType[]`
- Default: `[IconType.Sort,IconType.Filter,IconType.More]`

List of what icons to display in the top of the column. See [Icon](../components/Icon.md) for more information.

## scale

- Type: `d3.ScaleLinear<number,number>`
- Default: `d3.scaleLinear().domain([0, d3.max(data) ?? 0]).range([0, width - padding])`

What scale to use for the entire column. This default scale is nothing more than a scale that has a range that is equal to the width of the column and a domain that goes from 0 to the maximum value of the column.

## barOpacity

- Type: `number`
- Default: `1`

The opacity of each bar as a number in the range [0..1].

## barLabelVisibility

- Type: `Visibility`
- Default: `'none'`
- Options: `'none'`, `'alwaysVisible'`, `'visibleOnHighlight'`

Determines the behaviour of the labels on the bars.<br>
Setting this to `'none'`, means no label will be drawn.<br>
Setting this to `'alwaysVisible'`, means that there will always be a label inside the bar.<br>
Setting this to `'visibleOnHighlight'`, means that when the 'bar-number' label receives the class `'highlighted'`, the numbers will become visible.

## names

- Type: `string[]`
- Default: `[]`

The name for each point. Will be used for accessing the bars with classnames. The first entry of this array is linked with the first item of the data array, etc..

> Note: Setting this to `[]` will cause the bars to have no additional name

## overviewItem

- Type: `string`
- Options: `'histogram' | 'axis' | 'none'`
- Default: `'none'`

Determines what item to display in the overview section of the column header. <br>
Setting the value to `histogram` will cause `BarColumn` to display a histogram of the data in the column. <br>
Setting this to `'axis'`, will cause `BarColumn` to automatically create a `d3.axisTop` from the specified scale.

# Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`
- `filter`
- `mouseBarEnter`
- `mouseBarLeave`
- `mouseHover`
- `mouseRowClick`
- `sort`

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

<b> Creating a basic BarColumn with no icons and a histogram as overview item. </b>

```svelte
<script lang="ts">
  import { BarColumn } from '@dmvis/dmvis/components';

  const values = [84, 92, 14, 85, 39, 23, 89, 37, 71, 97, 61, 22, 36, 60, 55];
</script>

<svg width={500} height={1000}>
  <BarColumn x={50} width={100} height={900} data={values} icons={[]} overviewItem="histogram" />
</svg>
```

<b> Creating a BarColumn with sorting functionality. </b>

```svelte
<script lang="ts">
  import { BarColumn } from '@dmvis/dmvis/components';
  import { IconType } from '@dmvis/dmvis/enums';

  let values = [84, 92, 14, 85, 39, 23, 89, 37, 71, 97, 61, 22, 36, 60, 55];

  let sortedAsc = false;

  function onSort(e: CustomEvent) {
    values = sortedAsc ? values.sort((a, b) => b - a) : values.sort();

    sortedAsc = !sortedAsc;
  }
</script>

<svg width={500} height={1000}>
  <BarColumn
    x={50}
    width={200}
    height={900}
    data={values}
    icons={[IconType.Sort]}
    overviewItem="axis"
    on:sort={onSort} />
</svg>
```

<b> Creating multiple BarColumns next to each other. </b>

> Note that in this case each column holds the same values

```svelte
<script lang="ts">
  import { BarColumn } from '@dmvis/dmvis/components';

  const values = [84, 92, 14, 85, 39, 23, 89, 37, 71, 97, 61, 22, 36, 60, 55];

  const columnWidth = 200;
  const columnNames = ['Column 1', 'Column 2', 'Column 3', 'Column 4'];
</script>

<svg width={1000} height={1000}>
  {#each columnNames as columnName, i}
    <BarColumn
      x={50 + columnWidth * i}
      width={columnWidth}
      height={900}
      data={values}
      icons={[]}
      overviewItem="axis"
      name={columnName} />
  {/each}
</svg>
```
