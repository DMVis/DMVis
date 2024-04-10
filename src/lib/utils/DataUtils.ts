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

  filterData(columnX: string, columnY: string, selection: Array<Array<number>>) {
    const indexX = this.columns.indexOf(columnX);
    const indexY = this.columns.indexOf(columnY);
    if (indexX === -1) {
      throw new Error(`Column ${columnX} not found.`);
    }
    if (indexY === -1) {
      throw new Error(`Column ${columnY} not found.`);
    }
    const [minX, minY] = selection[0];
    const [maxX, maxY] = selection[1];
    const filteredData = this.data.filter((p) => {
      return (
        (p[indexX] as number) > minX &&
        (p[indexX] as number) < maxX &&
        (p[indexY] as number) > minY &&
        (p[indexY] as number) < maxY
      );
    });
    return filteredData;
  }
  excludedData(columnX: string, columnY: string, selection: Array<Array<number>>) {
    const indexX = this.columns.indexOf(columnX);
    const indexY = this.columns.indexOf(columnY);
    if (indexX === -1) {
      throw new Error(`Column ${columnX} not found.`);
    }
    if (indexY === -1) {
      throw new Error(`Column ${columnY} not found.`);
    }
    const [[minX, minY], [maxX, maxY]] = selection;
    const pointsOutside: string[] = [];
    for (const row of this.data) {
      const x = row[indexX] as number;
      const y = row[indexY] as number;
      // const [x, y] = point;
      if (
        x <= Math.floor(minX) ||
        x >= Math.ceil(maxX) ||
        y <= Math.floor(minY) ||
        y >= Math.ceil(maxY)
      ) {
        pointsOutside.push(row[0] as string);
      }
    }
    return pointsOutside;
  }
  excludedDataForAll(minMaxPerAttribute: (number[] | null)[]) {
    const indicesToCheck: number[] = [];
    minMaxPerAttribute.forEach((range, i) => {
      if (range !== null) {
        indicesToCheck.push(i);
      }
    });
    if (indicesToCheck.length == 0) {
      return [];
    }
    return this.data
      .filter((row) => {
        let isValidPoint = true;
        indicesToCheck.forEach((i) => {
          if (!isValidPoint) return;
          const [min, max] = minMaxPerAttribute[i] as number[];
          const value = row[i + 1] as number;
          if (value >= min && value <= max) {
            // isValidPoint = false;
            return;
          } else {
            isValidPoint = false;
          }
        });
        return !isValidPoint;
      })
      .map((row) => {
        return row[0] as string;
      });
  }
}
