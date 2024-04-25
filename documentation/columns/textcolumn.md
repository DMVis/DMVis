# TextColumn

TextColumn is a column that shows the text of the given column.

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

### data

- Type: `string[]`

Data to display.

## Optional Attributes

### padding

- Type: `number`
- Default: `10`

Padding around the column.

### name

- Type: `string`
- Default: `'Column'`

Name of the column. Should contain the name of the attribute you're displaying.

## Example usage

```svelte
<TextColumn x={0} width={100} height={200} data={['A', 'B', 'C']} />
```
