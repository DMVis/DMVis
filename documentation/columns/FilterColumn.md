# FilterColumn

FilterColumn is a component that displays a filter input for each column.

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
      <td><a href="#/components/Column.md">Column</a></td>
      <td>The column is a component that represents a column in a table. It can be used to display data in a table or to create a visual representation of data.</td>
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
      <td><a href="#/columns/FilterColumn?id=x">x</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/FilterColumn?id=y">y</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/FilterColumn?id=width">width</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/FilterColumn?id=height">height</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href="#/columns/FilterColumn?id=name">name</a></td>
      <td><code>string</code></td>
      <td><code>'Column'</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/FilterColumn?id=padding">padding</a></td>
      <td><code>number</code></td>
      <td><code>10</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/FilterColumn?id=type">type</a></td>
      <td><code>ColumnType</code></td>
      <td><code>ColumnType.Text</code></td>
    </tr>
    <tr>
      <td><a href="#/columns/FilterColumn?id=icons">icons</a></td>
      <td><code>IconType[]</code></td>
      <td>Depending on <code>type</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### x

- Type: `number`
- <span style="color: coral;">Required</span>

The x-coordinate of the column.

### y

- Type: `number`
- <span style="color: coral;">Required</span>

The y-coordinate of the column

### width

- Type: `number`
- <span style="color: coral;">Required</span>

The width of the column in pixels.

### height

- Type: `number`
- <span style="color: coral;">Required</span>

The height of the column in pixels.

## Optional Attributes

### name

- Type: `string`
- Default: `'Column'`

The name of the column that is displayed at its top. Set this to the attribute name.

### padding

- Type: `number`
- Default: `10`

The padding around the column in pixels.

### type

- Type: `ColumnType`
- Default: `ColumnType.Text`

The type of the column that is being filtered.

### icons

- Type: `IconType[]`
- Default: Depending on `type`.

A list of what icons that is displayed in the top of the column.

Defaults to `[IconType.Sort,IconType.Search,IconType.Filter,IconType.More]`. If the type is `ColumnType.Text`, otherwise it defaults to `[IconType.Sort,IconType.Filter,IconType.More]`.
See [Icon](../components/Icon.md) for more information.

## Events

This component emits the following events:

- `filter`
- `search`
- `sort`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Creating a working `FilterColumn` next to a `BarColumn`.</b>

```svelte
<script lang="ts">
  import { BarColumn, FilterColumn } from '@dmvis/dmvis/components';
  import { ColumnType } from '@dmvis/dmvis/enums';

  const inputValues = [80, 20, 40, 100, 10];
  let displayValues = [...inputValues];

  const textColumnWidth = 200;
  let selectedMin = -Infinity;
  let selectedMax = Infinity;
  function onFilter(e: CustomEvent) {
    const { isMin, value } = e.detail;
    if (isMin) {
      selectedMin = value ? value : -Infinity;
    } else {
      selectedMax = value ? value : Infinity;
    }
    displayValues = inputValues.filter((number) => {
      return number <= selectedMax && number >= selectedMin;
    });
  }
</script>

<svg width={1000} height={1000}>
  <BarColumn
    x={50}
    height={500}
    width={textColumnWidth}
    data={displayValues}
    barLabelVisibility="alwaysVisible" />
  <FilterColumn
    x={50 + textColumnWidth}
    y={100}
    width={150}
    height={200}
    type={ColumnType.Bar}
    on:filter={onFilter} />
</svg>
```
