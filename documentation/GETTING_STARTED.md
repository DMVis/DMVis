# Getting started

**1.** Start a Svelte project and import DMVis as a dependency. You can follow [installation guide](INSTALLING.md).

**2**. Go to `+page.svelte` in an empty Svelte project, or just any displayed page in an existing project.

**3**. Import the necessary components and utilities from DMVis in your project. This code goes within the `<script>` tags of a Svelte page. You will need the `DataUtils` utility if you want to use data, and you can import specific components based on your requirements. For example, to use the ParallelCoordinates component, you can import it as follows:

```svelte
<script>
  import { ParallelCoordinates } from '@dmvis/dmvis';
  import { DataUtils } from '@dmvis/dmvis/utils';
</script>
```

**4**. Fetch data using the [DataUtils](./utils/DataUtils.md) utility and pass it to the component you want to use. For example, to fetch data for the ParallelCoordinates component, you can do the following:

```svelte
<script>
  import { ParallelCoordinates } from '@dmvis/dmvis';
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataUtil = new DataUtils();

  $: load = (async () => {
    await dataUtil.parseCSV('/datasets/holidays-20.csv');
  })();
</script>
```

You can place data wherever you like, but in this case `/datasets` refers to the folder `<my-svelte-project>/static/datasets`. More information about supported data types is on the page [Visualizing data](DATA.md). `$:` In svelte means this code will be dynamically reloaded. We also bind the dataUtil loading function running to the variable `load`.

**5**. You can now import a visualisation from dmvis and insert data into it. In this case we're going to use [ ParallelCoordinates ](./visualisations/ParallelCoordinates.md).

```svelte
<!-- below </script> -->
{#await load then}
  <ParallelCoordinates {dataUtil} width={1400} height={1000} />
{/await}
```

We wrap the `ParallelCoordinates`component in Svelte `{#await load then}{/await}`tags, to make sure the component is only loaded after `dataUtil`is done processing our data.

**6**. Run your project to see the DMVis component in action:

```bash
npm run dev
```

**7**. Try to customise this component based on your requirements by passing additional attributes, or simply changing `width` or `height`. Attributes are listed in the documentation ([ParallelCoordinates](./visualisations/ParallelCoordinates.md)) or you should be able to hover over the component with your mouse in your IDE.

By following these steps, you can easily integrate DMVis components into your own project and create complex visualisations. For more information on using specific components and utilities, refer to the DMVis documentation.

### An example `+page.svelte`:

```svelte
<script>
  import { ParallelCoordinates } from '@dmvis/dmvis';
  import { DataUtils } from '@dmvis/dmvis/utils';
  const dataUtil = new DataUtils();

  $: load = (async () => {
    await dataUtil.parseCSV('/datasets/holidays-20.csv');
  })();
</script>

{#await load then}
  <ParallelCoordinates {dataUtil} width={1400} height={1000} />
{/await}
```
