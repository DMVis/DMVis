# BarColumn

BarColumn is a column that displays a bar chart. It is useful for visualising the relative size of values in a column.

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

To read more about these events, see the [Events](../utils/events.md) documentation.

# Example usage

```svelte
<BarColumn x={0} width={100} height={200} data={[10, 20, 30, 40]} />
```
