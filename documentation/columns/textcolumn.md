# TextColumn

TextColumn is a column that shows the text of the given column.

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

List of what icons to display in the top of the column.

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

To read more about these events, see the [Events](../utils/events.md) documentation.

# Example usage

```svelte
<TextColumn x={0} width={100} height={200} data={['A', 'B', 'C']} />
```
