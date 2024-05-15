// Imports
import * as d3 from 'd3';

// DMVis imports
import { DMVisError } from './DMVisError.js';
import { writable, type Writable } from 'svelte/store';

/**
 * A class that provides utility functions to work with data.
 */
export class DataUtils {
  public rawData: Array<Array<string | number>>;
  public data: Array<Array<string | number>>;
  public columns: Array<string>;
  public columnInfo: { [key: string]: string };
  public visualisationData: Writable<Array<Array<string | number>>>;

  constructor() {
    this.rawData = [];
    this.data = [];
    this.columns = [];
    this.columnInfo = {};
    this.visualisationData = writable([]);
  }

  /**
   * Function to parse data as JSON or CSV
   * @param data - The data to parse. Can be a JSON string, a CSV string, or a string URL pointing to a JSON or CSV file.
   * @param type - The type of data to parse. Can be 'json' or 'csv'. If not provided, the function will try to infer the type.
   * @returns {Promise<Array<Array<string | number>>>} A promise that resolves with an array of arrays, each inner array representing a row of the data.
   */
  async parseData(data: string, type?: string): Promise<Array<Array<string | number>>> {
    if (type === 'json' || data.includes('.json')) {
      return this.parseJSON(data);
    } else if (type === 'csv' || data.includes('.csv')) {
      return this.parseCSV(data);
    } else {
      try {
        return await this.parseJSON(data);
      } catch (error) {
        try {
          return await this.parseCSV(data);
        } catch (error) {
          throw DMVisError(
            'Data could not be parsed as JSON or CSV. Please provide a valid type.',
            'DataUtils'
          );
        }
      }
    }
  }

  /**
   * @param {string} csvData - The CSV data to parse. Can be a csv string or a string URL pointing to the CSV file. URl to static file (\datasets\example.csv) can be passed as string.
   * @returns {Promise<Array<Array<String | Number>>>} A promise that resolves with an array of arrays, each inner array representing a row of the CSV file.
   * Each row's values are automatically typed based on their content, thanks to d3.autoType.
   */
  async parseCSV(csvData: string): Promise<Array<Array<string | number>>> {
    try {
      let text: string;
      if (csvData.includes('.csv') || this.isValidUrl(csvData)) {
        text = await d3.text(csvData);
      } else {
        text = csvData;
      }

      // Trim newline characters at the end of the file
      text = text.trim();

      // Get the separator used in the data and parse it
      const separator = this.#getSeparator(text);
      const csv_data = d3.dsvFormat(separator).parseRows(text, d3.autoType) as Array<
        Array<string | number>
      >;

      // Store the parsed data
      this.rawData = csv_data;
      this.data = csv_data.slice(1);
      this.columns = csv_data[0].map((d: string | number) => String(d));
      this.columnInfo = this.#inferColumnTypes();

      // Set the visualisation data
      this.visualisationData.set(this.data);

      // Return the parsed data
      return this.rawData;
    } catch (error) {
      throw DMVisError('CSV data that was supplied is not in the correct format.', 'DataUtils');
    }
  }

  /**
   * @param {string} jsonData - The JSON data to parse. Can be a JSON string or a string URL pointing to the JSON file.
   * @returns {Promise<Array<Array<String | Number>>>} A promise that resolves with an array of arrays, each inner array representing a row of the JSON file.
   * Each row's values are automatically typed based on their content, thanks to d3.autoType.
   * @throws {Error} If the data could not be parsed as JSON.
   */
  async parseJSON(jsonData: string): Promise<Array<Array<string | number>>> {
    try {
      let text: string;
      if (jsonData.includes('.json') || this.isValidUrl(jsonData)) {
        text = await d3.text(jsonData);
      } else {
        text = jsonData;
      }

      // Parse the JSON data
      let json_data:
        | Array<{ [key: string]: string | number }>
        | { [key: string]: Array<string | number> } = JSON.parse(text);

      // Store the parsed data
      if (Array.isArray(json_data) && typeof json_data[0] === 'object') {
        // Data should look like | [{col: row1, col2: row1}, {col: row2, col2: row2}]
        json_data = json_data as Array<{ [key: string]: string | number }>;
        this.columns = Object.keys(json_data[0]);
        this.data = json_data.map((row) => this.columns.map((col: string) => row[col]));
        this.rawData = [this.columns, ...this.data];
      } else if (typeof json_data === 'object' && Object.values(json_data)[0] instanceof Array) {
        // Data should look like | {col:[row1, row2], col2:[row1, row2]}
        json_data = json_data as { [key: string]: Array<string | number> };
        this.data = [];
        Object.entries(json_data).forEach(([key, values]) => {
          this.columns.push(key);
          values.forEach((value, row) => {
            if (this.data.length <= row) {
              this.data.push([]);
            }
            this.data[row].push(value);
          });
        });
        this.rawData = [this.columns, ...this.data];
      } else {
        throw DMVisError('Could not parse JSON data', 'DataUtils');
      }

      // Infer column types
      this.columnInfo = this.#inferColumnTypes();

      // Set the visualisation data
      this.visualisationData.set(this.data);

      // Return the parsed data
      return this.rawData;
    } catch (error) {
      throw DMVisError('JSON data that was supplied is not in the correct format.', 'DataUtils');
    }
  }

  /**
   * @param {string} jsonData - The JSON data to order.
   * @returns {Array<Array<string | number>>} The sorted data.
   */
  sortData(column: string, ascending: boolean): Array<Array<string | number>> {
    const index = this.columns.indexOf(column);
    if (index === -1) {
      throw new Error(`Column ${column} not found.`);
    }

    // Sort the data based on the given column
    const sortedData = this.data.sort((a, b) => {
      if (ascending) {
        // Sort in ascending order
        return a[index] > b[index] ? 1 : a[index] < b[index] ? -1 : 0;
      } else {
        // Sort in descending order
        return a[index] < b[index] ? 1 : a[index] > b[index] ? -1 : 0;
      }
    });

    // Set the visualisation data
    this.visualisationData.set(sortedData);

    return sortedData;
  }

  /**
   * @param {Array<d3.ScaleLinear<number,number>>} scales - The scales used to weigh the data, containing one scale per attribute.
   * @returns {Array<Array<string | number>>} The sorted data.
   */
  sortByWeights(
    scales: Array<d3.ScaleLinear<number, number>>,
    ascending: boolean
  ): Array<Array<string | number>> {
    if (this.columns.length !== scales.length + 1) {
      throw DMVisError(
        `Incorrect amount of scales supplied. There needs to be one scale per numerical column in the dataset`,
        'DataUtil'
      );
    }

    // Function that takes a row, and uses the global scales to compute the total of the entire row
    function computeScaledTotal(row: Array<string | number>) {
      // Compute running total
      return (row.slice(1) as number[]).reduce((old, current, i) => {
        return old + scales[i](current);
      }, 0);
    }

    const sortedData = this.data.sort((a, b) => {
      if (ascending) {
        // Sort in ascending order
        return computeScaledTotal(b) - computeScaledTotal(a);
      } else {
        // Sort in descending order
        return computeScaledTotal(a) - computeScaledTotal(b);
      }
    });

    // Set the visualisation data
    this.visualisationData.set(sortedData);

    return sortedData;
  }

  /**
   * Reorders the rows of the data based on the given column and the old and new indices.
   * @param column The column to reorder the rows based on.
   * @param oldIndex The old index of the row.
   * @param newIndex The new index of the row.
   * @returns
   */
  reorderRows(
    oldIndex: number,
    newIndex: number,
    visData: Array<Array<string | number>>
  ): Array<Array<string | number>> {
    // Reorder data
    const reorderedData = visData;
    const [removed] = reorderedData.splice(oldIndex, 1);
    reorderedData.splice(newIndex, 0, removed);

    // Set the visualisation data
    this.visualisationData.set(reorderedData);

    return reorderedData;
  }

  // Filters data based on the given ranges for every attribute,
  // Will return data in the format [Points inside[], Points outside[]]
  filterData(rangePerAttribute: (number[] | null)[]): string[][] {
    // Find out what indices actually hold a selection and therefore need checking
    const indicesToCheck: number[] = [];
    rangePerAttribute.forEach((range, i) => {
      if (range !== null) {
        indicesToCheck.push(i);
      }
    });

    // If there are no attributes with a selection, it means no points will be excluded
    // So return an empty array
    if (indicesToCheck.length == 0) {
      return [
        this.data.map((row) => {
          return row[0] as string;
        }),
        []
      ];
    }

    const inside: string[] = [];
    const outside: string[] = [];
    this.data.forEach((row) => {
      (this.#filterRow(row, indicesToCheck, rangePerAttribute) ? inside : outside).push(
        row[0] as string
      );
    });

    return [inside, outside];
  }

  applyFilters(filters: { [key: string]: string | { min: number; max: number } }): void {
    // Convert column names to indices for easier filtering
    const columnIndexMap = this.columns.reduce(
      (acc, column, index) => {
        acc[column] = index;
        return acc;
      },
      {} as { [key: string]: number }
    );

    // Filter rawData based on filters
    const filteredData = this.data.filter((row) => {
      return Object.entries(filters).every(([column, filterValue]) => {
        // Get the index of the column
        const index = columnIndexMap[column];
        if (filterValue === '' || filterValue == null) {
          // No filter applied for this column
          return true;
        } else if (typeof filterValue === 'string') {
          // Apply string filter
          return row[index].toString().toLowerCase().includes(filterValue.toLowerCase());
        } else {
          // Apply numeric range filter
          const numericValue = +row[index]; // Ensure the value is treated as a number
          const min = filterValue.min !== null ? filterValue.min : -Infinity;
          const max = filterValue.max !== null ? filterValue.max : Infinity;
          return numericValue >= min && numericValue <= max;
        }
      });
    });

    // If no data is filtered, set the visualisation data to the original data
    if (filteredData.length === 0) {
      this.resetVisualisationData();
      return;
    }

    // Update the data
    this.visualisationData.set(filteredData);
  }

  // Resets the visualisation data to the original data
  resetVisualisationData() {
    this.visualisationData.set(this.data);
  }

  setVisualisationData(data: Array<Array<string | number>>) {
    this.visualisationData.set(data);
  }

  // Filters the data based on the specified ranges
  #filterRow(
    row: (string | number)[],
    indicesToCheck: number[],
    rangePerAttribute: (number[] | null)[]
  ): boolean {
    let isValidPoint = true;

    // Loop over all indices
    indicesToCheck.forEach((i) => {
      // If this point is already not valid, simply return
      if (!isValidPoint) return;

      // Get the selection
      const [min, max] = rangePerAttribute[i] as number[];

      // Get the value for the specific attribute from this point
      // Note that we need to add 1 to the index, since the data also has a label column which we do not need
      const value = row[i + 1] as number;

      // If the value is within this range, do nothing
      if (value >= min && value <= max) {
        return;
      } else {
        // If the value lies outside the range, this point is excluded for the given selections
        // Meaning it is not valid
        isValidPoint = false;
      }
    });

    // Return whether the point is valid
    return isValidPoint;
  }

  /*
   * Regex for Matching URLs
   * -----------------------
   * - Optional 'blob:' Prefix: (blob:)? captures the optional 'blob:' prefix.
   * - Protocol: https?:// matches both http and https protocols.
   * - Domain and Port: [a-zA-Z0-9.-]+:\d+ matches a domain name which may include letters,
   *   digits, hyphens, and dots, followed by a colon and the port number.
   * - Path:
   *   1. For UUID paths: /[\w-]+-[\w-]+-[\w-]+-[\w-]+-[\w-]+ matches the UUID generated by 'blob:' URLs.
   *   2. For datasets with a typical file structure and extension: /datasets/\w+[-\w]*\.\w+
   *      matches specific paths under 'datasets'.
   */
  isValidUrl(url: string) {
    const regex =
      /^(blob:)?https?:\/\/[a-zA-Z0-9.-]+:\d+\/(datasets\/\w+[-\w]*\.\w+|[\w-]+-[\w-]+-[\w-]+-[\w-]+-[\w-]+)$/;
    return regex.test(url);
  }

  /**
   * @returns {{ [key: string]: string }} An object where the keys are the column names and the values are the inferred types of the columns.
   */
  #inferColumnTypes(): { [key: string]: string } {
    const columnTypes: { [key: string]: string } = {};
    for (const column in this.columns) {
      const values = this.data.map((row) => row[column]);
      const types = values.map((value) => typeof value);
      const uniqueTypes = [...new Set(types)];
      columnTypes[this.columns[column]] = uniqueTypes.length === 1 ? uniqueTypes[0] : 'string';
    }
    return columnTypes;
  }

  /**
   * @param {string} data - The data to check
   * @returns {string} The separator used in the data
   * @throws {Error} If the separator could not be determined
   */
  #getSeparator(data: string): string {
    const options = [',', ';', '\t', '|'];
    const splitData = data.split('\n');
    const checkData = splitData.slice(0, 5);

    // Check first 5 rows if they contain same length of columns
    for (const option in options) {
      const counts = checkData.map((row) => row.split(options[option]).length);
      if (counts.every((val, i, arr) => val === arr[i] && val != 1)) {
        return options[option];
      }
    }

    throw DMVisError('Could not determine separator', 'DataUtils');
  }
}
