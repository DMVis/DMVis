# StackedBarChart

The stacked BarChart component is a visual representation of data in a stacked bar chart format. It is used to compare the parts to the whole, and show the relationship of individual items to the total.

# Required attributes

## dataUtil

- Type: `DataUtils`

The `DataUtils` class which contains all the data to be displayed in the chart.

## height

- Type: `number`

The height of the visualisation.

## width

- Type: `number`

The width of the visualisation.

# Optional attributes

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

## opacity

- Type: `number | string`
- Default: `1`

Sets the opacity of the bars. Either a number between 0 and 1, or a string representing a percentage between 0% and 100%.

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
