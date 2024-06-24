# BarColumn

`BarColumn` is a column that displays a bar chart.
It is useful for visualising the relative size of values in a column.

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

## Attributes

<table style="width: 75%">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Type</th>
      <th>Default value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#/columns/BarColumn?id=x">x</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=width">width</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=height">height</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=data">data</a>*</td>
      <td><code>number[]</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=filter">filter</a></td>
      <td><code>Filter</code></td>
      <td><code>{ min: 0, max: 100 }</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=name">name</a></td>
      <td><code>string</code></td>
      <td><code>'Column'</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=padding">padding</a></td>
      <td><code>number</code></td>
      <td><code>10</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=icons">icons</a></td>
      <td><code>IconType[]</code></td>
      <td><code>[IconType.Sort, IconType.Filter, IconType.More]</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=weight">weight</a></td>
      <td><code>string</code></td>
      <td><code>'10'</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=overviewitem">overviewItem</a></td>
      <td><code>'histogram' | 'axis' | 'none'</code></td>
      <td><code>'none'</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=scale">scale</a></td>
      <td><code>d3.ScaleLinear<number,number></code></td>
      <td><code>d3.scaleLinear().domain([0, d3.max(data) ?? 0]).range([0, width - padding])</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=names">names</a></td>
      <td><code>string[]</code></td>
      <td><code>[]</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=barcolor">barColor</a></td>
      <td><code>string</code></td>
      <td><code>'red'</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=baropacity">barOpacity</a></td>
      <td><code>number</code></td>
      <td><code>1</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/BarColumn?id=barlabelvisibility">barLabelVisibility</a></td>
      <td><code>Visibility</code></td>
      <td><code>'none'</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### x

- Type: `number`
- <span style="color: coral">Required</span>

The x-coordinate of the column.

### width

- Type: `number`
- <span style="color: coral">Required</span>

The width of the column in pixels.

### height

- Type: `number`
- <span style="color: coral">Required</span>

The height of the column in pixels.

### data

- Type: `number[]`
- <span style="color: coral">Required</span>

The data that is to be displayed as bars in the column.

## Optional Attributes

### filter

- Type: `Filter`
- Default: `{ min: 0, max: 100 }`

The filter contains an object with attributes min and max, which are both numbers and represent the minimum and maximum values of the filter. The filter is used to filter the data that is displayed in the column.

### name

- Type: `string`
- Default: `'Column'`

The name of the column to display at its top. Set this to the attribute name.

### padding

- Type: `number`
- Default: `10`

The padding around the column in pixels.

### icons

- Type: `IconType[]`
- Default: `[IconType.Sort, IconType.Filter, IconType.More]`

A list of what icons to display in the top of the column. See [Icon](../components/Icon.md) for more information.

### weight

- Type: `string`
- Default: `'10'`

The weight of the column. This is used to determine the width for the columns in visualisations like [ValueChart](../visualisations/ValueChart.md). The weight is a string that represents a number. The higher the number, the wider the column will be.

### overviewItem

- Type: `string`
- Options: `'histogram' | 'axis' | 'none'`
- Default: `'none'`

Determines what item to display in the overview section of the column header. <br>
Setting the value to `histogram` will cause `BarColumn` to display a histogram of the data in the column. <br>
Setting this to `'axis'` will cause `BarColumn` to automatically create a `d3.axisTop` from the specified scale.

### scale

- Type: `d3.ScaleLinear<number,number>`
- Default: `d3.scaleLinear().domain([0, d3.max(data) ?? 0]).range([0, width - padding])`

What scale to use for the entire column.
Defaults to a scale that has a range that is equal to the width of the column and a domain that goes from `0` to the maximum value of the column.

### names

- Type: `string[]`
- Default: `[]`

The name for each point. It is used for accessing the bars with class names. The first entry of this array is linked with the first item of the data array and so on.

> Note: Setting this to `[]` will cause the bars to have no additional name.

### barColor

- Type: `string`
- Default: `'red'`

The colour of each bars.
Valid inputs include CSS colours specified as a string.

### barOpacity

- Type: `number`
- Default: `1`

The opacity of each bar of the column.
It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).

### barLabelVisibility

- Type: `Visibility`
- Default: `'none'`
- Options: `'none'`, `'alwaysVisible'`, `'visibleOnHighlight'`

Determines the behaviour of the labels on the bars.<br>
Setting this to `'none'`, means no label will be drawn.<br>
Setting this to `'alwaysVisible'`, means that there will always be a label inside the bar.<br>
Setting this to `'visibleOnHighlight'`, means that the numbers will become visible when the 'bar-number' label receives the class `'highlighted'`.

## Events

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

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Creating a basic BarColumn with no icons and a histogram as an overview item.</b>

```svelte
<script lang="ts">
  import { BarColumn } from '@dmvis/dmvis/components';

  const values = [84, 92, 14, 85, 39, 23, 89, 37, 71, 97, 61, 22, 36, 60, 55];
</script>

<svg width={500} height={1000}>
  <BarColumn x={50} width={100} height={900} data={values} icons={[]} overviewItem="histogram" />
</svg>
```

<b>Creating a BarColumn with sorting functionality.</b>

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

<b>Creating multiple BarColumns next to each other.</b>

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
