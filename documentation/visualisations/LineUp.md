# LineUp

LineUp is a visualisation technique for visualising different types of data in a set of columns. It is a table-based visualisation that allows users to sort, filter, and group data in a table.

# Required Attributes

## dataUtil

- Type: `DataUtils`

Class holding all the data. See [DataUtils](utils/dataUtils.md).

# Optional Attributes

## styleUtil

- Type: `StyleUtils`
- Default: `new StyleUtils()`

Class holding all the styling. See [StyleUtils](utils/styleUtils.md).

## columnWidth

- Type: `number`
- Default: `150`

Width of each column in the table.

## width

- Type: `number`
- Default: `dataUtil.columns.length * columnWidth`

The width of the visualisation. The default value is calculated based on the number of columns and `columnWidth`.

## height

- Type: `number`
- Default: `number of rows * 20 + 105`

Height of the visualisation. 105 is the height of the header, and each row is 20 pixels high.

## padding

- Type: `number`
- Default: `10`

Padding between columns.

# Example usage

```svelte
<script>
  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();

  // Load promising
  $: load = (async () => {
    await dataUtil.parseCSV(dataUrl);
  })();
</script>

{#await load then}
  <LineUp {dataUtil} />
{/await}
```