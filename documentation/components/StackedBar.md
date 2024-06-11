# StackedBar

The StackedBar component is a visual representation of a data row. It is used to compare the parts to the whole and show the relationship of individual items to the total.

> Note: This creates a single stacked bar, not the whole stacked bar chart

# Table of contents

- [Referenced Components](#referenced-components)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Example](#example)

# Referenced Components

This component utilises the following components:

<table style="width: 50%">
  <thead>
    <tr>
      <th style="width: 20%;">Component</th>
      <th style="width: 80%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#/components/Bar.md">Bar</a></td>
      <td>A bar that can be used for bar visualisations.</td>
    </tr>
    <tr>
      <td><a href="#/components/Label.md">Label</a></td>
      <td>Provides labelling functionality for data points.</td>
    </tr>
  </tbody>
</table>

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

## attributeScales

- Type: `d3.scaleLinear<number,number>[]`

An array of scales where the first entry is the scale for the first numerical entry in the row attribute, etc.

# Optional Attributes

## opacity

- Type: `Opacity`
- Default: `1`

Sets the opacity of the bars. Either a number between 0 and 1, or a string representing a percentage between 0% and 100%.

## showLabel

- Type: `boolean`
- Default: `false`

Whether or not to display the sum of all bars at the end as a number.

# Example

Create a StackedBar of the 10th row of the data. Where each column is scaled the same

```svelte
<script>
  // Set variables
  const visStore = new VisualisationStore();
  const opacity = 0.5;
  const width = 1000;
  const maxValue = d3.max(visStore.data.map((row) => d3.sum(row.slice(1) as number[]))) ?? 0;
  const attributeScales = Array(visStore.columns.length - 1).fill(
    d3.scaleLinear().range([0, width]).domain([0, maxValue])
  );

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
  <StackedBar barWidth={10} y={10} {attributeScales} row={visStore.data.slice(10)} {opacity} />
{/await}
```
