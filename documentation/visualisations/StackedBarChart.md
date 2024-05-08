# StackedBarChart

The stacked BarChart component is a visual representation of data in a stacked bar chart format. It is used to compare the parts to the whole and show the relationship of individual items to the total.

# Required attributes

## dataUtil

- Type: `DataUtils`

The `DataUtils` class which contains all the data to be displayed in the chart.

# Optional attributes

## height

- Type: `number`
- Default: `numberOfRows * 15`

The height of the visualisation.

## width

- Type: `number`
- Default: `1500`

The width of the visualisation.

## marginLeft

- Type: `number`
- Default: `40`

The margin on the left side of the chart.

## marginRight

- Type: `number`
- Default: `40`

The margin on the right side of the chart.

## marginTop

- Type: `number`
- Default: `40`

The margin on the top side of the chart.

## marginBottom

- Type: `number`
- Default: `40`

The margin on the bottom side of the chart.

## padding

- Type: `number`
- Default: `0.2`

Value for the distance between each bar in the range [0..1].

## opacity

- Type: `number | string`
- Default: `1`

Sets the opacity of the bars.
Either a number between 0 and 1, or a string representing a percentage between 0% and 100%.

## showTotals

- Type: `boolean`
- Default: `false`

Whether or not to display the sum of all bars at the end as a number.

## styleUtils

- Type: `StyleUtils`
- Default: `new StyleUtils({ colorSet: 'Set1', numColors: dataUtil.columns.length - 1})`

The `StyleUtils` class contains all the style information for the chart.

# Example usage

Create a StackedBarChart with custom opacity.

```svelte
<script>
  // Set variables
  const opacity = 0.5;

  // Get & set data
  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();

  // Load promising
  $: load = (async () => {
    await dataUtil.parseCSV(dataUrl);
  })();
</script>

<StackedBarChart {dataUtil} {height} {width} {opacity} />
```
