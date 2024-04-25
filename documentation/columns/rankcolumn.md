# RankColumn

RankColumn is a column that shows the index of the row in the table.

## Required Attributes

### x

- Type: `number`

X-coordinate of the column.

### width

- Type: `number`

Width of the column.

### height

- Type: `number`

Height of the column.

### length

- Type: `number`

Number of rows in the table.

## Optional Attributes

### padding

- Type: `number`
- Default: `10`

Padding around the column.

## Example usage

```svelte
<RankColumn x={0} width={100} height={200} length={10} />
```
