import * as d3 from 'd3';

/**
 * A class that provides utility functions to work with data.
 */
export class DataUtils {
  public rawData: Array<Array<string | number>>;
  public data: Array<Array<string | number>>;
  public columns: Array<string>;
  public columnInfo: { [key: string]: string };

  constructor() {
    this.rawData = [];
    this.data = [];
    this.columns = [];
    this.columnInfo = {};
  }

  /**
   * @param {string} csvData - The CSV data to parse. Can be a csv string or a string URL pointing to the CSV file. URl to static file (\datasets\example.csv) can be passed as string.
   * @returns {Promise<Array<Array<String | Number>>>} A promise that resolves with an array of arrays, each inner array representing a row of the CSV file.
   * Each row's values are automatically typed based on their content, thanks to d3.autoType.
   */
  async parseCSV(csvData: string): Promise<Array<Array<string | number>>> {
    let text: string;
    if (csvData.includes('\n')) {
      text = csvData;
    } else {
      text = await d3.text(csvData);
    }

    // Trim newline characters at the end of the file
    text = text.trim();

    // Get the separator used in the data and parse it
    const separator = this.getSeparator(text);
    const csv_data = d3.dsvFormat(separator).parseRows(text, d3.autoType) as Array<
      Array<string | number>
    >;

    // Store the parsed data
    this.rawData = csv_data;
    this.data = csv_data.slice(1);
    this.columns = csv_data[0].map((d: string | number) => String(d));
    this.columnInfo = this.inferColumnTypes();

    // Return the parsed data
    return this.rawData;
  }

  /**
   * @param {string} jsonData - The JSON data to parse. Can be a JSON string or a string URL pointing to the JSON file.
   * @returns {Promise<Array<Array<String | Number>>>} A promise that resolves with an array of arrays, each inner array representing a row of the JSON file.
   * Each row's values are automatically typed based on their content, thanks to d3.autoType.
   * @throws {Error} If the data could not be parsed as JSON.
   */
  async parseJson(jsonData: string): Promise<Array<Array<string | number>>> {
    let text: string;
    if (jsonData.includes('\n')) {
      text = jsonData;
    } else {
      text = await d3.text(jsonData);
    }

    // Parse the JSON data
    const json_data:
      | Array<{ [key: string]: string | number }>
      | { [key: string]: Array<string | number> } = JSON.parse(text);

    // Store the parsed data
    if (Array.isArray(json_data) && typeof json_data[0] === 'object') {
      // Data should look like | [{col: row1, col2: row1}, {col: row2, col2: row2}]
      this.columns = Object.keys(json_data[0]);
      this.data = json_data.map((row) => this.columns.map((col: string) => row[col]));
      this.rawData = [this.columns, ...this.data];
    } else if (typeof json_data === 'object' && Object.values(json_data)[0] instanceof Array) {
      // Data should look like | {col:[row1, row2], col2:[row1, row2]}
      this.columns = Object.keys(json_data);
      this.data = Object.values(json_data);
      this.rawData = [this.columns, ...this.data];
    } else {
      throw new Error('Could not parse JSON data');
    }

    // Infer column types
    this.columnInfo = this.inferColumnTypes();

    // Return the parsed data
    return this.rawData;
  }

  /**
   * @param {string} jsonData - The JSON data torder.
   * @returns {Array<Array<string | number>>} The sorted data.
   */
  sortData(column: string, ascending: boolean): Array<Array<string | number>> {
    const index = this.columns.indexOf(column);
    if (index === -1) {
      throw new Error(`Column ${column} not found.`);
    }

    const sortedData = this.data.sort((a, b) => {
      if (ascending) {
        return a[index] > b[index] ? 1 : -1;
      } else {
        return a[index] < b[index] ? 1 : -1;
      }
    });

    return sortedData;
  }

  //Filters data based on the given ranges for every attribute,
  //Will return data in the format [Points inside[], Points outside[]]
  filterData(rangePerAttribute: (number[] | null)[]): string[][] {
    //Find out what indices actually hold a selection and therefore need checking
    const indicesToCheck: number[] = [];
    rangePerAttribute.forEach((range, i) => {
      if (range !== null) {
        indicesToCheck.push(i);
      }
    });
    //If there are no attributes with a selection, it means no points will be excluded
    //So return an empty array
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
      (filterFunction(row) ? inside : outside).push(row[0] as string);
    });

    return [inside, outside];

    //Filters the data based on the specified ranges
    function filterFunction(row: (string | number)[]): boolean {
      let isValidPoint = true;

      //Loop over all indices
      indicesToCheck.forEach((i) => {
        //If this point is already not valid, simply return
        if (!isValidPoint) return;
        //Get the selection
        const [min, max] = rangePerAttribute[i] as number[];
        //Get the value for the specific attribute from this point
        //Note that we need to add 1 to the index, since the data also has a label column which we do not need
        const value = row[i + 1] as number;
        //If the value is within this range, do nothing
        if (value >= min && value <= max) {
          return;
        } else {
          //If the value lies outside the range, this point is excluded for the given selections
          //Meaning it is not valid
          isValidPoint = false;
        }
      });
      //Return whether the point is valid
      return isValidPoint;
    }
  }

  /**
   * @returns {{ [key: string]: string }} An object where the keys are the column names and the values are the inferred types of the columns.
   */
  inferColumnTypes(): { [key: string]: string } {
    const columnTypes: { [key: string]: string } = {};
    for (const column in this.columns) {
      const values = this.data.map((row) => row[column]);
      const types = values.map((value) => (typeof value));
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
  getSeparator(data: string): string {
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

    throw new Error('Could not determine separator');
  }
}
