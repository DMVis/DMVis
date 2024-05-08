# SelectColumn

The SelectColumn is a column that allows you to select a row using a checkbox.

## Required Attribute

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

Number of rows to display.

## Optional Attributes

### padding

- Type: `number`
- Default: `10`

Padding around the column.

## Example usage

```svelte
<SelectColumn x={0} width={100} height={200} length={10} />
```
