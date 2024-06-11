# SumColumn

SumColumn is a column that shows the stacked bar of the given columns. This is used to compare the values of multiple columns in one view.

# Table of Contents

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
      <td><a href="#/components/Column.md">Column</a></td>
      <td>The column is a component that represents a column in a table. It can be used to display data in a table or to create a visual representation of data.</td>
    </tr>
    <tr>
      <td><a href="#/components/StackedBar.md">StackedBar</a></td>
      <td>It is used to compare the parts to the whole and show the relationship of individual items to the total.</td>
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

## attributeScales

- Type: `d3.scaleLinear<number,number>[]`

An array of scales where the first entry is the scale for the first numerical entry in the row attribute, etc.

# Optional Attributes

## padding

- Type: `number`
- Default: `10`

Padding around the column.

## name

- Type: `string`
- Default: `'Column'`

Name of the column. This should contain the names of the attributes you're comparing. It could also contain weights.

## icons

- Type: `IconType[]`
- Default: `[IconType.Sort, IconType.Group, IconType.More]`

List of what icons to display in the top of the column. See [Icon](../components/Icon.md) for more information.

# Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`
- `filter`
- `group`
- `mouseHover`
- `mouseRowClick`
- `sort`

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

```svelte
<script lang="ts">
  const uniformScales = Array(data.columns.length - 1).fill(
    d3.ScaleLinear().domain([0, 100]).range([0, 100])
  );
</script>

<SumColumn x={0} width={100} height={200} {data} attributeScales={uniformScales} />
```
