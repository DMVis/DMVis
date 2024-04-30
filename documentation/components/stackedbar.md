# StackedBar

The StackedBar component is a visual representation of data in a stacked bar chart format. It is used to compare the parts to the whole, and show the relationship of individual items to the total.

# Required Attributes

## width

- Type: `number`

The size that the largest bar will take up. All other bars will scale according to this value.

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

Create a StackedBar with custom opacity. Retrieves data from a store.

```svelte
<script>
  // Set variables
  const visStore = new VisualisationStore();
  const opacity = 0.5;

  // Get & set data
  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();

  // Load promising
  $: load = (async () => {
    await dataUtil.parseCSV(dataUrl);
    visStore.data.set(dataUtils.data);
  })();
</script>

<StackedBar {opacity} />
```
