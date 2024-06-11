# TextColumn

TextColumn is a column that shows the text of the given column.

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

- Type: `string[]`

Data to display.

# Optional Attributes

## padding

- Type: `number`
- Default: `10`

Padding around the column.

## name

- Type: `string`
- Default: `'Column'`

Name of the column. It should contain the name of the attribute you're displaying.

## icons

- Type: `IconType[]`
- Default: `[IconType.Sort, IconType.Search, IconType.Filter, IconType.More]`

List of what icons to display in the top of the column. See [Icon](../components/Icon.md) for more information.

# Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`
- `mouseHover`
- `mouseLabelEnter`
- `mouseLabelLeave`
- `mouseRowClick`
- `search`
- `sort`

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

```svelte
<TextColumn x={0} width={100} height={200} data={['A', 'B', 'C']} />
```
