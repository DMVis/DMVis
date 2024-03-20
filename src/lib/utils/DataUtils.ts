import * as d3 from 'd3';

/**
 * @param {File | string} csvData - The CSV data to parse. Can be a File object or a string URL pointing to the CSV file. URl to static file (\datasets\example.csv) can be passed as string.
 * @returns {Promise<Array<Array<String | Number>>>} A promise that resolves with an array of arrays, each inner array representing a row of the CSV file.
 * Each row's values are automatically typed based on their content, thanks to d3.autoType.
 */
export async function parseCSV(csvData: File | string) {
  let text: string;
  if (csvData instanceof File) {
    text = await d3.text(URL.createObjectURL(csvData));
  } else {
    text = await d3.text(csvData);
  }

  // Parse from file
  return d3.csvParseRows(text, d3.autoType);
}
