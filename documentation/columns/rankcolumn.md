# RankColumn

RankColumn is a column that shows the index of the row in the table.

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

Number of rows in the table.

# Optional Attributes

## padding

- Type: `number`
- Default: `10`

Padding around the column.

## icons

- Type: `IconType[]`
- Default: `[IconType.More]`

List of what icons to display in the top of the column.

# Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`
- `mouseHover`
- `mouseRowClick`

To read more about these events, see the [Events](../utils/events.md) documentation.

# Example usage

```svelte
<RankColumn x={0} width={100} height={200} length={10} />
```
