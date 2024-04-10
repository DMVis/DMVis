# StackedBar

The StackedBar component is a visual representation of data in a stacked bar chart format. It is used to compare the parts to the whole, and show the relationship of individual items to the total.

# Optional Attributes

## opacity

- Type: `number | string`
- Default: `1`

Sets the opacity of the bars. Either a number between 0 and 1, or a string representing a percentage between 0% and 100%.

## colors

- Type: `array`
- Default:

```ts
[
  '#a6cee3',
  '#1f78b4',
  '#b2df8a',
  '#33a02c',
  '#fb9a99',
  '#e31a1c',
  '#fdbf6f',
  '#ff7f00',
  '#cab2d6',
  '#6a3d9a',
  '#ffff99',
  '#b15928'
];
```

Sets the colors of the bars, based on column index. Wraps if there are more columns than colors.

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
