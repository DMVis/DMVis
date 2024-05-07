# StackedBar

The StackedBar component is a visual representation of a data row. It is used to compare the parts to the whole, and show the relationship of individual items to the total.

> Note: This creates a single stacked bar, not the whole stacked barchart

# Required Attributes

## y

- Type: `number`

The y position of the stacked bar.

## barWidth

- Type: `number`

The width of the bar.

## row

- Type: `(number|string)[]`

An entire row of the dataUtil. Which will be represented as a stacked bar.

## xScale

- Type: `d3.ScaleLinear<number, number>`

The scale which is used for all the bars in the stacked bar. This will hold a range and a domain in which to fit the stacked bar.

> Note: If you plot multiple stacked bars below each other, keep this scale the same. Or the comparisons will not mean anything.

# Optional Attributes

## opacity

- Type: `number | string`
- Default: `1`

Sets the opacity of the bars. Either a number between 0 and 1, or a string representing a percentage between 0% and 100%.

## showLabel

- Type: `boolean`
- Default: `false`

Whether or not to display the sum of all bars at the end as a number.

# Example

Create a StackedBar of the 10th row of the data.

```svelte
<script>
  // Set variables
  const visStore = new VisualisationStore();
  const opacity = 0.5;
  const width = 1000;
  const maxValue = d3.max(visStore.data.map((row) => d3.sum(row.slice(1) as number[]))) ?? 0;
  const xScale = d3.scaleLinear().range([0, width]).domain([0, maxValue]);

  // Get & set data
  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();

  // Load promising
  $: load = (async () => {
    await dataUtil.parseCSV(dataUrl);
    visStore.data.set(dataUtils.data);
  })();
</script>

{#await load then}
  <StackedBar barWidth={10} y={10} {xScale} row={visStore.data.slice(10)} {opacity} />
{/await}
```
