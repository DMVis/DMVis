# Parallel Coordinates

This is a visualisation that is capable of visualising multi-dimensional data.
It creates an axis for each column in the supplied table with data
and draws a line through each axis for each row in the table.

# Required Attributes

## dataUtil

- Type: `DataUtils`

Class holding all the data, see [DataUtils](utils/dataUtils.md).

# Optional Attributes

## width

- Type: `number`
- Default: `numberOfColumns * 175`

Width of the visualisation

## height

- Type: `number`
- Default: `numberOfRows * 15`

Height of the visualisation

## marginLeft

- Type: `number`
- Default: `40`

Margin left of the visualisation

## marginRight

- Type: `number`
- Default: `40`

Margin right of the visualisation

## marginTop

- Type: `number`
- Default: `40`

Margin above of the visualisation

## marginBottom

- Type: `number`
- Default: `40`

Margin under of the visualisation

## styleUtils

- Type: `StyleUtils`
- Default: `new StyleUtils()`

Class holding all the style information, see [StyleUtils](utils/styleUtils.md).

# Example usage

```svelte
<script>
  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();

  $: load = (async () => {
    await dataUtil.parseCSV(dataUrl);
  })();
</script>

{#await load then}
  <ParallelCoordinates
    marginLeft={100}
    marginTop={40}
    marginRight={50}
    {dataUtil}
    width={1750}
    height={1500} />
{/await}
```
