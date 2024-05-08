# SumColumn

SumColumn is a column that shows the stacked bar of the given columns. This is used to compare the values of multiple columns in one view.

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

# Optional Attributes

## padding

- Type: `number`
- Default: `10`

Padding around the column.

## name

- Type: `string`
- Default: `'Column'`

Name of the column. This should contain the names of the attributes you're comparing. It could also contain weights.

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

To read more about these events, see the [Events](../utils/events.md) documentation.

# Example usage

```svelte
<SumColumn x={0} width={100} height={200} />
```
