# SelectColumn

The SelectColumn is a column that allows you to select a row using a checkbox.

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

## length

- Type: `number`

Number of rows to display.

# Optional Attributes

## padding

- Type: `number`
- Default: `10`

Padding around the column.

## icons

- Type: `IconType[]`
- Default: `[IconType.Group, IconType.More]`

List of what icons to display in the top of the column. See [Icon](../components/Icon.md) for more information.

# Events

This component emits the following events:

- `check`
- `checkAll`
- `dragStart`
- `dragMove`
- `dragStop`
- `mouseHover`
- `mouseRowClick`
- `sort`

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

```svelte
<SelectColumn x={0} width={100} height={200} length={10} />
```
