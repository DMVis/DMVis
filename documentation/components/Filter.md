# Filter

The filter component adds a filter to the right side of the visualisation. It can be used to filter and sort the data displayed in the visualisation.

## Required Attributes

## dataUtil

- Type: `DataUtils`

Class holding all the data. See [DataUtils](utils/dataUtils.md).

## Optional Attributes

## width

- Type: `number`
- Default: `150`

Width of the filter container.

## columnHeight

- Type: `number`
- Default: `100`

Height for each column in the filter.

## styleUtils

- Type: `StyleUtils`
- Default: `new StyleUtils()`

Class holding all the styles. See [StyleUtils](utils/styleUtils.md).

## Example Usage

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
  <Filter {dataUtil} width={200} />
  <ScatterplotMatrix {dataUtil} />
{/await}
```
