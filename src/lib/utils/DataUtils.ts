import * as d3 from 'd3';

/**
 * A class that provides utility functions to work with data.
 */
export class DataUtils {
  public rawData: Array<Array<string | number>>;
  public data: Array<Array<string | number>>;
  public columns: Array<string>;

  constructor() {
    this.rawData = [];
    this.data = [];
    this.columns = [];
  }

  /**
   * @param {File | string} csvData - The CSV data to parse. Can be a File object or a string URL pointing to the CSV file. URl to static file (\datasets\example.csv) can be passed as string.
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

    // Parse from file, set rawData, data and columns
    const csv_data = d3.csvParseRows(text, d3.autoType) as Array<Array<string | number>>;
    this.rawData = csv_data;
    this.data = csv_data.slice(1);
    this.columns = csv_data[0].map((d: string | number) => String(d));

    // Return the parsed data
    return this.rawData;
  }

  /**
   * @param {string} column - The column number to sort by.
   * @param {boolean} ascending - Whether to sort in ascending order.
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

  //Finds all the points that lie OUTSIDE a given selection
  //A selection is a list of ranges for every attribute,
  //if there is no range, the value will be null
  calculateExcludedPoints(rangePerAttribute: (number[] | null)[]) {
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
      return [];
    }
    //Otherwise filter the data
    return this.data
      .filter((row) => {
        //Points start out as a point that is not excluded
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
        //We look for all the excluded points, so return the inverse of isValid
        return !isValidPoint;
      })
      .map((row) => {
        //Now only return the name of the points
        return row[0] as string;
      });
  }
}
