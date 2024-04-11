# Handling data in visualisations using `DataUtils`

To make sure that every visualisation is consistent, we have created a set of utility functions that help with data manipulation. These functions are used to transform data into a format that can be easily used by the visualisation components.

Each instance of this class has four attributes available

- `data`: The parsed data in the form of an array of arrays
- `columns`: The column names of the data
- `columnInfo`: An object containing the type of each column
- `rawData`: An array of arrays with the columns prepended before the data

The `DataUtils` class contains a set of utility functions that help with data manipulation. The functions are as follows:

# parseData

The `parseData` function takes in a string which is either a file location or a CSV/JSON string and returns a promise that resolves to an array of arrays containing either strings or numbers. You can optionally supply a `type` parameter to specify the type of data you are parsing (e.g., 'csv' or 'json'). This function calls either the `parseCSV` or `parseJSON` function based on the given or inferred type.

Below is an example of how to use the `parseData` function:

```javascript
import { onMount } from 'svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';

const dataUrl = '/datasets/holidays-20.csv';
const dataUtil = new DataUtils();

// OnMount
onMount(() => {
  (async () => {
    await dataUtil.parseData(dataUrl);
    console.log(dataUtil);
  })();
});
```

# parseCSV

The `parseCSV` function takes in a CSV string or the URL of a CSV file and returns a promise that resolves to an array of arrays containing either strings or numbers. This function then also sets the `data`, `columns`, `columnInfo`, and `rawData` properties of the class.

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

## Supported formats

The `parseCSV` function supports CSV files with the following formats:

1. Comma-separated values (`,`)
2. Tab-separated values (`\t`)
3. Semicolon-separated values (`;`)
4. Pipe-separated values (`|`)

# parseJSON

The `parseJSON` function takes in a JSON string or the URL of a JSON file and returns a promise that resolves to an array of arrays containing either strings or numbers. This function then also sets the `data`, `columns`, `columnInfo`, and `rawData` properties of the class.

Below is an example of how to use the `parseJSON` function:

```javascript
import { onMount } from 'svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';

const dataUrl = '/datasets/holidays-20.json';
const dataUtil = new DataUtils();

// OnMount
onMount(() => {
  (async () => {
    await dataUtil.parseJSON(dataUrl);
    console.log(dataUtil);
  })();
});
```

In the example above, the `parseJSON` function is used to parse a JSON file. The `dataUrl` variable represents the URL of the JSON file. The `dataUtil` variable is an instance of the `DataUtils` class. The `onMount` function is used to call the `parseJSON` function when the component is mounted.

## Supported formats

We currently support two JSON formats:

1. An array of objects where each object represents a row in the data. The keys of the objects are the column names. For example:

```json
[
  { "date": "2021-01-01", "holiday": "New Year's Day" },
  { "date": "2021-07-04", "holiday": "Independence Day" }
]
```

2. An object where the keys are the column names and the values are arrays representing the data for each column. For example:

```json
{
  "date": ["2021-01-01", "2021-07-04"],
  "holiday": ["New Year's Day", "Independence Day"]
}
```

# sortData

The `sortData` function allows you to sort the data based on a specific column. It takes in the following parameters:

- `column`: The column to sort the data by
- `ascending`: A boolean that determines whether the data should be sorted in ascending order

The function returns a sorted array of arrays.

Below is an example of how to use the `sortData` function:

```javascript
const sortedData = dataUtil.sortData('date', true);
console.log(sortedData);
```

# filterData

The `filterData` function allows you to filter data based on the given ranges for every attribute. It takes in the following parameter:

- `rangePerAttribute`: An object that contains the ranges for each attribute.

The function returns two arrays, one containing the data within the given ranges and the other containing the data outside the given ranges.

Below is an example of how to use the `filterData` function:

```javascript
const rangePerAttribute = {
  confirmed: [100, 200],
  deaths: [10, 20]
};

const [filteredData, excludedData] = dataUtil.filterData(rangePerAttribute);
```
