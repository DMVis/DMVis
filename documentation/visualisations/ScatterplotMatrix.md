# ScatterplotMatrix

This is a visualisation that consists of multiple scatterplots in a matrix.
It can be used to quickly find relations between attributes in a large dataset.

# Required Attributes

## dataUtil

- Type: `DataUtils`

Class holding all the data. See [DataUtils](utils/dataUtils.md).

# Optional Attributes

## width

- Type: `number`
- Default: `numberOfAttributes * 150`

Width of the visualisation.

## height

- Type: `number`
- Default: `numberOfAttributes * 150`

Height of the visualisation.

## padding

- Type: `number`
- Default: `0.1`

Padding between all of the different scatterplots.

## pointOpacity

- Type: `number`
- Default: `0.3`

Default opacity of the points of the scatterplots.

## display

- Type: `string`
- Default: `'full'`
- Options: `'full'`,`'top'`, `'bottom'`

Whether to draw the entire Scatterplot Matrix, or only the top, or only the bottom half.

## marginLeft

- Type: `number`
- Default: `40`

Margin left of the visualisation.

## marginRight

- Type: `number`
- Default: `40`

Margin right of the visualisation.

## marginTop

- Type: `number`
- Default: `40`

Margin above of the visualisation.

## marginBottom

- Type: `number`
- Default: `40`

Margin under of the visualisation.

## styleUtils

- Type: `StyleUtils`
- Default: `new StyleUtils()`

Class holding all the style information. See [StyleUtils](utils/styleUtils.md).

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
  <ScatterplotMatrix {dataUtil} {height} {width} pointColor="red" pointOpacity={0.3} />
{/await}
```
