# Column

Column is a ....

## Required Attributes

### x

- Type: `number`

x-coordinate of the column.

### width

- Type: `number`

Width of the column.

### height

- Type: `number`

Height of the column.

### type

- Type: `ColumnType`

Signifies the type of the column. Influences the rendering of the column.

#### ColumnType

An enum, containing the following types:

- `Rank`
- `Select`
- `Text`
- `Bar`
- `Sum`
- `Separator`

## Optional Attributes

### name

- Type: `string`
- Default: `'Column'`

The title that will show at the top of the column. Set this to the attribute name.

### padding

- Type: `number`
- Default: `10`

The padding around the column.

## Example usage

Creating columns for each of the attributes in the data:

```javascript
<script lang="ts">
  const width: number = 100;
  const height: number = 1000;
</script>

<svg>
  {#each columns as column, i}
    <Column
      x={i * (column.width)}
      {width}
      {height}
      type={column.type}
      name={column.name}
      padding={column.padding}
    />
  {/each}
</svg>
```
