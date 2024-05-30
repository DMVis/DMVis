# FilterColumn

FilterColumn is a component that displays a filter input for each column.

## Required Attributes

### x

- Type: `number`

X-coordinate of the column.

### y

- Type: `number`

Y-coordinate of the column

### width

- Type: `number`

Width of the column.

### height

- Type: `number`

Height of the column.

## Optional Attributes

### name

- Type: `string`
- Default: `'Column'`

Name of the column to display at the top. Set this to the attribute name.

### padding

- Type: `number`
- Default: `10`

Padding around the column.

### type

- Type: `ColumnType`
- Default: `ColumnType.Text`

The type of the column that is being filtered.

### icons

- Type: `IconType[]`
- Default: Depending on `type`.

List of what icons to display in the top of the column.

Defaults to `[IconType.Sort,IconType.Search,IconType.Filter,IconType.More]` if type is `ColumnType.Text`, otherwise it defaults to `[IconType.Sort,IconType.Filter,IconType.More]`.

## Example usage

```svelte
<FilterColumn x={0} y={100} width={100} height={200} />
```
