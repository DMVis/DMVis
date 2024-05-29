import { describe, it, expect } from 'vitest';

import { DataUtils } from '$lib/utils/DataUtils.js';
import { scaleLinear } from 'd3';

describe('dataUtils functionality test', () => {
  it('should parse CSV data', async () => {
    // Arrange
    const csvData = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';
    const dataUtils = new DataUtils();

    // Act
    const parsedData = await dataUtils.parseCSV(csvData);

    // Assert
    testRegularAssertions(parsedData);
  });

  it('should set rawData, data and columns', async () => {
    // Arrange
    const csvData = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';
    const dataUtils = new DataUtils();

    // Act
    await dataUtils.parseCSV(csvData);

    // Assert
    testRegularAssertions(dataUtils.rawData);
    expect(dataUtils.data).toBeDefined();
    expect(dataUtils.data).toBeInstanceOf(Array);
    expect(dataUtils.data.length).toBe(3);
    expect(dataUtils.columns).toBeDefined();
    expect(dataUtils.columns).toBeInstanceOf(Array);
    expect(dataUtils.columns.length).toBe(3);
    expect(dataUtils.columns).toEqual(['a', 'b', 'c']);
  });

  it('should sort data', async () => {
    // Arrange
    const csvData = 'a,b,c\n3,2,1\n6,5,4\n9,8,7';
    const column = 'a';
    const ascending = true;
    const dataUtils = new DataUtils();

    // Act
    await dataUtils.parseCSV(csvData);
    const sortedData = dataUtils.sortData(column, ascending);

    // Assert
    expect(sortedData).toBeDefined();
    expect(sortedData).toBeInstanceOf(Array);
    expect(sortedData.length).toBe(3);
    expect(sortedData[0]).toEqual([3, 2, 1]);
    expect(sortedData[1]).toEqual([6, 5, 4]);
    expect(sortedData[2]).toEqual([9, 8, 7]);
  });

  it('should throw an error when sorting by a non-existent column', async () => {
    // Arrange
    const csvData = 'a,b,c\n3,2,1\n6,5,4\n9,8,7';
    const column = 'd';
    const ascending = true;
    const dataUtils = new DataUtils();
    const expectedErrorMessage = `Cannot assign '${column}' to the column parameter in the sortData function. Please ensure that the columns attribute of your DataUtils instance contains a column named '${column}'.`;

    // Act
    await dataUtils.parseCSV(csvData);

    // Assert
    expect(() => dataUtils.sortData(column, ascending)).toThrowError(expectedErrorMessage);
  });

  it('should throw an error when supplying an incorrect amount of scales to the sortByWeights function', async () => {
    // Arrange
    // Create data with 3 numerical columns
    const csvData = 'l,a,b,c\nfirst,3,2,1\nsecond,6,5,4\nthird,9,8,7';
    const ascending = true;
    const dataUtils = new DataUtils();
    const expectedErrorMessage = `Incorrect amount of scales provided to the scales parameter in the sortByWeights function. Please provide one scale per numerical column in the data assigned to the data attribute.`;

    // Test whether an error is thrown when giving too few scales
    // Create 2 scales
    let scales = Array(2).fill(scaleLinear().range([0, 100]).domain([0, 100]));
    // Act
    await dataUtils.parseCSV(csvData);

    // Assert
    expect(() => dataUtils.sortByWeights(scales, ascending)).toThrowError(expectedErrorMessage);

    // Test whether an error is thrown when giving too many scales
    // Create 4 scales
    scales = Array(4).fill(scaleLinear().range([0, 100]).domain([0, 100]));
    // Act
    await dataUtils.parseCSV(csvData);

    // Assert
    expect(() => dataUtils.sortByWeights(scales, ascending)).toThrowError(expectedErrorMessage);
  });

  it('should sort data in descending order', async () => {
    // Arrange
    const csvData = 'a,b,c\n3,2,1\n6,5,4\n9,8,7';
    const column = 'a';
    const ascending = false;
    const dataUtils = new DataUtils();

    // Act
    await dataUtils.parseCSV(csvData);
    const sortedData = dataUtils.sortData(column, ascending);

    // Assert
    expect(sortedData).toBeDefined();
    expect(sortedData).toBeInstanceOf(Array);
    expect(sortedData.length).toBe(3);
    expect(sortedData[0]).toEqual([9, 8, 7]);
    expect(sortedData[1]).toEqual([6, 5, 4]);
    expect(sortedData[2]).toEqual([3, 2, 1]);
  });

  it('should parse CSV data with all supported delimiters', async () => {
    // Arrange
    const csvDataTypes = [
      'a,b,c\n1,2,3\n4,5,6\n7,8,9',
      'a;b;c\n1;2;3\n4;5;6\n7;8;9',
      'a\tb\tc\n1\t2\t3\n4\t5\t6\n7\t8\t9',
      'a|b|c\n1|2|3\n4|5|6\n7|8|9'
    ];
    const dataUtils = new DataUtils();

    for (const csvData of csvDataTypes) {
      // Act
      const parsedData = await dataUtils.parseCSV(csvData);

      // Assert
      testRegularAssertions(parsedData);
    }
  });

  it('should parse JSON data in style 1', async () => {
    // Arrange
    const jsonData = '[{"a":1,"b":2,"c":3},{"a":4,"b":5,"c":6},{"a":7,"b":8,"c":9}]';

    // Act
    const dataUtils = new DataUtils();
    const parsedData = await dataUtils.parseJSON(jsonData);

    // Assert
    testRegularAssertions(parsedData);
  });

  it('should parse JSON data in style 2', async () => {
    // Arrange
    const jsonData = '{"a":[1,4,7],"b":[2,5,8],"c":[3,6,9]}';
    const dataUtils = new DataUtils();

    // Act
    const parsedData = await dataUtils.parseJSON(jsonData);

    // Assert
    testRegularAssertions(parsedData);
  });

  it('should parse JSON using the parseData function', async () => {
    // Arrange
    const jsonData = '[{"a":1,"b":2,"c":3},{"a":4,"b":5,"c":6},{"a":7,"b":8,"c":9}]';
    const dataUtils = new DataUtils();

    // Act
    const parsedData = await dataUtils.parseData(jsonData);

    // Assert
    testRegularAssertions(parsedData);
  });

  it('should parse CSV using the parseData function', async () => {
    // Arrange
    const csvData = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';
    const dataUtils = new DataUtils();

    // Act
    const parsedData = await dataUtils.parseData(csvData);

    // Assert
    testRegularAssertions(parsedData);
  });

  it('should parse CSV with different types in column', async () => {
    // Arrange
    const csvData = 'a,b,c\n1,2,3\n4,hello,6\n7,8,9';
    const dataUtil = new DataUtils();

    // Act
    await dataUtil.parseData(csvData);

    // Assert
    testColumnTypes(dataUtil.columnInfo);
  });

  it('should throw an error when parsing invalid data', async () => {
    // Arrange
    const invalidData = 'invalid data';
    const dataUtils = new DataUtils();
    const expectedErrorMessage = `Invalid data provided to the data parameter in the parseData function. Please use data that can be parsed to JSON or CSV.`;

    // Act
    const parseInvalidData = dataUtils.parseData(invalidData);

    // Assert
    await expect(parseInvalidData).rejects.toThrowError(expectedErrorMessage);
  });

  it('should throw an error when parsing invalid CSV data', async () => {
    // Arrange
    const invalidCsvData = 'invalid data';
    const dataUtils = new DataUtils();
    const expectedErrorMessage = `Invalid data provided to the csvData parameter in the parseCSV function. Please use data that can be parsed to CSV.`;

    // Act
    const parseInvalidCSVData = dataUtils.parseCSV(invalidCsvData);

    // Assertions
    await expect(parseInvalidCSVData).rejects.toThrowError(expectedErrorMessage);
  });

  it('should throw an error when parsing invalid JSON data', async () => {
    // Arrange
    const invalidJsonData = 'invalid data';
    const dataUtils = new DataUtils();
    const unexpectedErrorMessage = `Invalid data provided to the jsonData parameter in the parseJSON function. Please use data that can be parsed to JSON.`;
    const expectedErrorMessage2 = `Invalid data provided to the jsonData parameter in the parseJSON function. Please ensure that the data is correctly formatted.`;
    // Act
    const parseInvalidJSONData = dataUtils.parseJSON(invalidJsonData);

    // Assert
    // Means that the data could be parsed to JSON (so the other error can happen still)
    await expect(parseInvalidJSONData).not.rejects.toThrowError(unexpectedErrorMessage);
    // Means that the JSON data is incorrectly formatted
    await expect(parseInvalidJSONData).rejects.toThrowError(expectedErrorMessage2);
  });

  it('should reorder the rows of the data', async () => {
    // Arrange
    const csvData = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';
    const oldIndex = 0;
    const newIndex = 2;
    const dataUtils = new DataUtils();

    // Act
    await dataUtils.parseCSV(csvData);
    const result = dataUtils.reorderRows(oldIndex, newIndex, dataUtils.data);

    // Assert
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);
    expect(result[0]).toEqual([4, 5, 6]);
    expect(result[1]).toEqual([7, 8, 9]);
    expect(result[2]).toEqual([1, 2, 3]);
  });
});

function testRegularAssertions(data: Array<Array<string | number>>) {
  expect(data).toBeDefined();
  expect(data).toBeInstanceOf(Array);
  expect(data.length).toBe(4);
  expect(data[0]).toEqual(['a', 'b', 'c']);
  expect(data[1]).toEqual([1, 2, 3]);
  expect(data[2]).toEqual([4, 5, 6]);
  expect(data[3]).toEqual([7, 8, 9]);
}

function testColumnTypes(data: { [key: string]: string }) {
  expect(data).toBeDefined();
  expect(data).toEqual({ a: 'number', b: 'number', c: 'number' });
}
