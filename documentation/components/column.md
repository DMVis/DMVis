# Column

The column is a component that represents a column in a table. It can be used to display data in a table or to create a visual representation of data.

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

What icons to display in the top of the column.

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

To read more about these events, see the [Events](../utils/events.md) documentation.

# Example usage

Creating columns for each of the attributes in the data:

```svelte
<script lang="ts">
  const width: number = 100;
  const height: number = 1000;
</script>

<svg>
  {#each columns as column, i}
    <Column
      x={i * column.width}
      {width}
      {height}
      type={column.type}
      name={column.name}
      padding={column.padding} />
  {/each}
</svg>
```
