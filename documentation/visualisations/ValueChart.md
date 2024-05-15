# ValueChart

ValueChart is a visualisation that lets the user give weights to different attributes to aid in decision-making, depending on how important the user thinks the attribute is. The visualisation exists of two major components; at the top, there are `BarColumn` components (one for each numerical attribute). These same bars are shown at the bottom as well, except for each row entry in the dataset, there is a `SumColumn`.
Both parts of the visualisation are scrollable, to allow for visualising large datasets in a compact window.

# Required Attributes

## width

- Type: `number`

Width of the visualisation.

## height

- Type: `number`

Height of the visualisation.

## dataUtil

- Type: `DataUtils`

Class holding all the data. See [DataUtils](utils/dataUtils.md).

# Optional Attributes

## styleUtil

- Type: `StyleUtils`
- Default: `new StyleUtils({ colorSet: 'Set1', numColors: dataUtil.columns.length - 1})`

Class holding all the styling. See [StyleUtils](utils/styleUtils.md).

## autoDistributeWeights

- Type: `boolean`
- Default: `true`

Determines whether the total of the weights should be 100. This will mean that when the weight of one attribute is changed, all of the other weights will be redistributed such that their sum will be equal to 100. When set to false, it will take the sum of all the weights as the total and scale with this number as opposed to 100%..

## marginLeft

- Type: `number`
- Default: `100`

Margin to the left of the visualisation.

## marginRight

- Type: `number`
- Default: `40`

Margin to the right of the visualisation.

## marginTop

- Type: `number`
- Default: `40`

Margin to the top of the visualisation.

## marginBottom

- Type: `number`
- Default: `40`

Margin to the bottom of the visualisation.

## padding

- Type: `number`
- Default: `0.1`

Padding between the different visualisations.

# Example usage

```svelte
<script lang="ts">
  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();

  // Load promising
  $: load = (async () => {
    await dataUtil.parseCSV(dataUrl);
  })();
</script>

{#await load then}
  <ValueChart {dataUtil} {height} {width} />
{/await}
```
