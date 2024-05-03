import { describe, it, expect } from 'vitest';

import { DataUtils } from '$lib/utils/DataUtils.js';

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

    // Act
    await dataUtils.parseCSV(csvData);

    // Assert
    expect(() => dataUtils.sortData(column, ascending)).toThrowError('Column d not found.');
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

  it('should throw an error when parsing invalid data', async () => {
    // Arrange
    const invalidData = 'invalid data';
    const dataUtils = new DataUtils();

    // Act
    const parseInvalidData = dataUtils.parseData(invalidData);

    // Assert
    await expect(parseInvalidData).rejects.toThrowError(
      'Data could not be parsed as JSON or CSV. Please provide a valid type.'
    );
  });

  it('should throw an error when parsing invalid CSV data', async () => {
    // Arrange
    const invalidData = 'invalid data';
    const dataUtils = new DataUtils();

    // Act
    const parseInvalidCSVData = dataUtils.parseCSV(invalidData);

    // Assertions
    await expect(parseInvalidCSVData).rejects.toThrowError(
      'CSV data that was supplied is not in the correct format.'
    );
  });

  it('should throw an error when parsing invalid JSON data', async () => {
    // Arrange
    const invalidData = 'invalid data';
    const dataUtils = new DataUtils();

    // Act
    const parseInvalidJSONData = dataUtils.parseJSON(invalidData);

    // Assert
    await expect(parseInvalidJSONData).rejects.toThrowError(
      'JSON data that was supplied is not in the correct format.'
    );
  });

  it('should reorder the rows of the data', async () => {
    // Arrange
    const csvData = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';
    const oldIndex = 0;
    const newIndex = 2;
    const dataUtils = new DataUtils();

    // Act
    await dataUtils.parseCSV(csvData);
    const result = dataUtils.reorderRows(oldIndex, newIndex);

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
