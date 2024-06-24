# Handling data in visualisations using `DataUtils`

To make sure that every visualisation is consistent, we have created a set of utility functions that help with data manipulation. These functions are used to transform data into a format that can be easily used by the visualisation components.

### Table of Contents

- [Constructor](#constructor)
- [Class Properties](#attributes)
- [Functions](#functions)
  - [parseData](#parsedata)
  - [parseCSV](#parsecsv)
  - [parseJSON](#parsejson)
  - [sortData](#sortdata)
  - [filterData](#filterdata)
  - [applyFilters](#applyfilters)
  - [reorderRows](#reorderrows)

## Constructor

To use the data utility, you will need a dataset prepared, either through a URL or a local file. The data utility can parse CSV and JSON files. The parsed data is stored in an instance of the `DataUtils` class. The class has a set of attributes and functions that help with data manipulation.

The `DataUtils` class can be initialized with an optional boolean parameter `includeId`. This parameter determines whether the data should include an ID column. This is used for visualisations that require a unique identifier for each row. The value can be set when creating an instance of the `DataUtils` class using `new DataUtils(true)`.

The example below can be used to parse a CSV file and log the parsed data, with the `includeId` parameter not set, which defaults to `false`:

```html
<script lang="ts">
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();

  // Parse the data
  (async () => {
    await dataUtil.parseCSV(dataUrl);
    console.log(dataUtil);
  })();
</script>
```

The following examples creates a `DataUtils` instance and parses a CSV file, which sets the `includeId` parameter to `true`. This is required for the [LineUp](/visualisations/LineUp.md) visualisation.

```html
<script lang="ts">
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils(true);

  // Parse the data
  (async () => {
    await dataUtil.parseCSV(dataUrl);
    console.log(dataUtil);
  })();
</script>
```

Both examples can be used with the functions mentioned below to manipulate the data.

## Attributes

Each instance of this class has seven attributes available

- `columnInfo`: An object containing the type of each column.
- `columns`: The column names of the data.
- `data`: The original parsed data in the form of an array of arrays.
- `dataMap`: A dictionary mapping the column names to their respective row values.
- `includeId`: A boolean that determines whether the data should include an ID column. This is used for visualisations that require a unique identifier for each row.
- `rawData`: An array of arrays with the columns prepended before the data.
- `visualisationData`: The parsed data in a writable store, used to update the data in the visualisation.

The `DataUtils` class contains a set of utility functions that help with data manipulation. The functions are as follows:

## Functions

- [parseData](#parsedata)
- [parseCSV](#parsecsv)
- [parseJSON](#parsejson)
- [sortData](#sortdata)
- [filterData](#filterdata)
- [applyFilters](#applyfilters)
- [reorderRows](#reorderrows)

### parseData

The `parseData` function takes in a string which is either a file location or a CSV/JSON string and returns a promise that resolves to an array of arrays containing either strings or numbers. You can optionally supply a `type` parameter to specify the type of data you are parsing (e.g., 'csv' or 'json'). This function calls either the `parseCSV` or `parseJSON` function based on the given or inferred type.

Below is an example of how to use the `parseData` function:

```html
<script lang="ts">
  import { onMount } from 'svelte';
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();

  // Parse the data
  (async () => {
    await dataUtil.parseData(dataUrl);
    console.log(dataUtil);
  })();
</script>
```

### parseCSV

The `parseCSV` function takes in a CSV string or the URL of a CSV file and returns a promise that resolves to an array of arrays containing either strings or numbers. This function then also sets the `data`, `columns`, `columnInfo`, and `rawData` properties of the class.

Below is an example of how to use the `parseCSV` function:

```html
<script lang="ts">
  import { onMount } from 'svelte';
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();

  // Parse the CSV file
  (async () => {
    await dataUtil.parseCSV(dataUrl);
    console.log(dataUtil);
  })();
</script>
```

In the example above, the `parseCSV` function is used to parse a CSV file. The `dataUrl` variable represents the URL of the CSV file. The `dataUtil` variable is an instance of the `DataUtils` class. The `onMount` function is used to call the `parseCSV` function when the component is mounted.

#### Supported formats

The `parseCSV` function supports CSV files with the following formats:

1. Comma-separated values (`,`)
2. Tab-separated values (`\t`)
3. Semicolon-separated values (`;`)
4. Pipe-separated values (`|`)

### parseJSON

The `parseJSON` function takes in a JSON string or the URL of a JSON file and returns a promise that resolves to an array of arrays containing either strings or numbers. This function then also sets the `data`, `columns`, `columnInfo`, and `rawData` properties of the class.

Below is an example of how to use the `parseJSON` function:

```html
<script lang="ts">
  import { onMount } from 'svelte';
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataUrl = '/datasets/holidays-20.json';
  const dataUtil = new DataUtils();

  // Parse the JSON file
  (async () => {
    await dataUtil.parseJSON(dataUrl);
    console.log(dataUtil);
  })();
</script>
```

In the example above, the `parseJSON` function is used to parse a JSON file. The `dataUrl` variable represents the URL of the JSON file. The `dataUtil` variable is an instance of the `DataUtils` class. The `onMount` function is used to call the `parseJSON` function when the component is mounted.

#### Supported formats

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

### sortData

The `sortData` function allows you to sort the data based on a specific column. It takes in the following parameters:

- `column`: The column to sort the data by
- `ascending`: A boolean that determines whether the data should be sorted in ascending order

The function returns a sorted array of arrays. This also sets the `visualisationData` store to the sorted data.

Below is an example of how to use the `sortData` function:

```javascript
const sortedData = dataUtil.sortData('date', true);
console.log(sortedData);
```

### filterData

The `filterData` function allows you to filter data based on the given ranges for every attribute. It takes in the following parameters:

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

### applyFilters

The `applyFilters` function allows you to apply filters to the data based on the given filters. It takes in the following parameters:

- `filters`: An object of filters where the key is the column name. With either a string for textual data or an object with `min` and `max` for numerical data.

This function changes the `visualisationData` store to the filtered data.

Below is an example of how to use the `applyFilters` function:

```javascript
const filters = {
  country: '',
  gpd: { min: 10, max: 20 },
  population: { min: 1000, max: 2000 }
};

dataUtil.applyFilters(filters);
```

### reorderRows

The `reorderRows` function allows you to reorder the rows of the data array. It takes in the following parameters:

- `oldIndex`: The index of the row to move
- `newIndex`: The index to move the row to

Below is an example of how to use the `reorderRows` function:

```javascript
dataUtil.reorderRows(0, 2);
```
