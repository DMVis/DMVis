# FilterColumn

FilterColumn is a component that displays a filter input for each column.

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
      <td><a href="#/components/Column.md">Column</a></td>
      <td>The column is a component that represents a column in a table. It can be used to display data in a table or to create a visual representation of data.</td>
    </tr>
  </tbody>
</table>

## Required Attributes

### x

- Type: `number`

X-coordinate of the column.

### y

- Type: `number`

Y-coordinate of the column

### width

- Type: `number`

Width of the column.

### height

- Type: `number`

Height of the column.

## Optional Attributes

### name

- Type: `string`
- Default: `'Column'`

Name of the column to display at the top. Set this to the attribute name.

### padding

- Type: `number`
- Default: `10`

Padding around the column.

### type

- Type: `ColumnType`
- Default: `ColumnType.Text`

The type of the column that is being filtered.

### icons

- Type: `IconType[]`
- Default: Depending on `type`.

List of what icons to display in the top of the column.

Defaults to `[IconType.Sort,IconType.Search,IconType.Filter,IconType.More]` if type is `ColumnType.Text`, otherwise it defaults to `[IconType.Sort,IconType.Filter,IconType.More]`.
See [Icon](../components/Icon.md) for more information.

## Example usage

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
