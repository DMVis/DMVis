# Handling data in visualisations

To make sure that every visualisation is consistent, we have created a set of utility functions that help with data manipulation. These functions are used to transform data into a format that can be easily used by the visualisation components.

## DataUtils

The `DataUtils` class contains a set of utility functions that help with data manipulation. The functions are as follows:

### parseCSV

The `parseCSV` function takes in a CSV string or the URL of a CSV file and returns a promise that resolves to an array of arrays containing either strings or numbers. This function then also sets the `data`, `columns`, and `rawData` properties of the class.

Below is an example of how to use the `parseCSV` function:

```javascript
import { onMount } from 'svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';

const dataUrl = '/datasets/holidays-20.csv';
const dataUtil = new DataUtils();

// OnMount
onMount(() => {
  (async () => {
    await dataUtil.parseCSV(dataUrl);
    console.log(dataUtil);
  })();
});
```

In the example above, the `parseCSV` function is used to parse a CSV file. The `dataUrl` variable represents the URL of the CSV file. The `dataUtil` variable is an instance of the `DataUtils` class. The `onMount` function is used to call the `parseCSV` function when the component is mounted.

### sortData

The `sortData` function allows you to sort the data based on a specific column. It takes in the following parameters:

- `column`: The column to sort the data by
- `ascending`: A boolean that determines whether the data should be sorted in ascending order

The function returns a sorted array of arrays.

Below is an example of how to use the `sortData` function:

```javascript
const sortedData = dataUtil.sortData('date', true);
console.log(sortedData);
```
