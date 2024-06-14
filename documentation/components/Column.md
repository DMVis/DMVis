# Column

The column is a component that represents a column in a table. It can be used to display data in a table or to create a visual representation of data.

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
      <td><a href="#/components/Draggable">Draggable</td>
      <td>Enables drag-and-drop interactions.</td>
    </tr>
    <tr>
      <td><a href="#/components/Icon.md">Icon</a></td>
      <td>Provides a way to display icons in the UI for visualisations</td>
    </tr>
    <tr>
      <td><a href="#/components/Label.md">Label</a></td>
      <td>Used for the column headers.</td>
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

## type

- Type: `ColumnType`

Signifies the type of the column. Influences the rendering of the column.

### ColumnType

An enum, containing types of columns. This can be selected by importing `ColumnType` and using it as the type of the `type` attribute. The types are:

- `'Bar'`
- `'Rank'`
- `'Select'`
- `'Separator'`
- `'Sum'`
- `'Text'`

# Optional Attributes

## y

- Type: `number`
- Default: `100`

Y-coordinate of the column.

## name

- Type: `string`
- Default: `'Column'`

The name is at the top of the column. Set this to the attribute name.

## padding

- Type: `number`
- Default: `10`

The padding around the column.

## icons

- Type: `IconType[]`
- Default `[]`

What icons to display in the top of the column. See [Icon](components/Icon.md) for more information.

## showSeparator

- Type: `boolean`
- Default: `true`

Whether to show the separator line at the bottom of the column header.

# Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`
- `filter`
- `group`
- `mouseHover`
- `mouseRowClick`
- `search`
- `sort`

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

<b>Creating a column.</b>

> Note: In itself the `Column` component does not do anything. Use one of the more specific column components for functionallity.

```svelte
<script lang="ts">
  import { Column } from '@dmvis/dmvis/components';
  import { ColumnType } from '@dmvis/dmvis/enums';
</script>

<svg width={500} height={1000}>
  <Column x={100} width={200} height={800} type={ColumnType.Bar} />
</svg>
```
