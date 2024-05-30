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

## attributeScales

- Type: `d3.scaleLinear<number,number>[]`

An array of scales where the first entry is the scale for the first numerical entry in the row attribute, etc.

# Optional Attributes

## padding

- Type: `number`
- Default: `10`

Padding around the column.

## name

- Type: `string`
- Default: `'Column'`

Name of the column. This should contain the names of the attributes you're comparing. It could also contain weights.

## icons

- Type: `IconType[]`
- Default: `[IconType.Sort, IconType.Group, IconType.More]`

List of what icons to display in the top of the column.

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
<script lang="ts">
  const uniformScales = Array(data.columns.length - 1).fill(
    d3.ScaleLinear().domain([0, 100]).range([0, 100])
  );
</script>

<SumColumn x={0} width={100} height={200} {data} attributeScales={uniformScales} />
```
