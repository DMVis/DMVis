# What data is supported in DMVis

Once you have installed DMVis after following [this](INSTALLING.md) guide, you can start using it to visualize your data. This guide will inform you about the types of data that DMVis supports and how to add data to your visualisation.

## Adding data to your visualisation

To add data to your visualisation, you need to parse the data using the `DataUtils` class. The `DataUtils` class provides utility functions to parse data from a file or a string. You can use the `parseData` function to parse data from a file or a string. If you want a more detailed explanation of the `DataUtils` class, you can refer to the [documentation](utils/dataUtils.md).

Below we will explain the different types of data that DMVis supports and how to parse them using the `DataUtils` class.

### CSV

To parse a CSV file, you can either use the `parseData` function or the `parseCSV` function. The `parseData` function automatically detects the type of data and calls the appropriate function. We support the following separators for CSV files:

- Comma (`,`)
- Tab (`\t`)
- Semicolon (`;`)
- Pipe (`|`)

### JSON

To parse a JSON file, you can use the `parseData` function with the `type` parameter set to `'json'`. The `parseData` function will call the `parseJSON` function to parse the JSON data.

We support the following formats for JSON files:

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
