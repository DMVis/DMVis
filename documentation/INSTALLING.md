# How to use DMVis in your project

To use DMVis in your project, you will first need to set up a new project using the Svelte framework. Once you have a Svelte project, you can follow these steps to integrate DMVis components and utilities into your project.

1. Install DMVis as a dependency in your project:

```bash
npm install dmvis
```

2. Import the necessary components and utilities from DMVis in your project. You will always need the `DataUtils` utility, and you can import specific components based on your requirements. For example, to use the ScatterplotMatrix component, you can import it as follows:

```javascript
import { DataUtils, ParallelCoordinates } from 'dmvis';
```

3. Fetch the data using the DataUtils utility and pass it to the component you want to use. For example, to fetch data for the ScatterplotMatrix component, you can do the following:

```javascript
const dataUtil = new DataUtils();

$: load = (async () => {
  await dataUtil.parseCSV('/datasets/holidays-20.csv');
})();
```

4. Use the component in your project by passing the data as a prop. For example, to use the ScatterplotMatrix component, you can do the following:

```html
{#await load then}
<ParallelCoordinates {dataUtil} width="{1400}" height="{1000}" />
{/await}
```

5. Customize the component based on your requirements by passing additional props or modifying the component code.

6. Run your project to see the DMVis component in action.

By following these steps, you can easily integrate DMVis components into your own project and create complex decision matrix visualisations. For more information on using specific components and utilities, refer to the DMVis documentation.
