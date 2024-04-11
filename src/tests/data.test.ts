import { describe, it, expect } from 'vitest';
import { DataUtils } from '$lib/utils/DataUtils.js';

describe('dataUtils tests', () => {
  it('should parse CSV data', async () => {
    // Prepare data
    const csvData = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';

    // Test
    const dataUtils = new DataUtils();
    const parsedData = await dataUtils.parseCSV(csvData);

    // Assertions
    testRegularAssertions(parsedData);
  });

  it('should set rawData, data and columns', async () => {
    // Prepare data
    const csvData = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';

    // Test
    const dataUtils = new DataUtils();
    await dataUtils.parseCSV(csvData);

    // Assertions
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
    // Prepare data
    const csvData = 'a,b,c\n3,2,1\n6,5,4\n9,8,7';
    const column = 'a';
    const ascending = true;

    // Test
    const dataUtils = new DataUtils();
    await dataUtils.parseCSV(csvData);
    const sortedData = dataUtils.sortData(column, ascending);

    // Assertions
    expect(sortedData).toBeDefined();
    expect(sortedData).toBeInstanceOf(Array);
    expect(sortedData.length).toBe(3);
    expect(sortedData[0]).toEqual([3, 2, 1]);
    expect(sortedData[1]).toEqual([6, 5, 4]);
    expect(sortedData[2]).toEqual([9, 8, 7]);
  });

  it('should throw an error when sorting by a non-existent column', async () => {
    // Prepare data
    const csvData = 'a,b,c\n3,2,1\n6,5,4\n9,8,7';
    const column = 'd';
    const ascending = true;

    // Test
    const dataUtils = new DataUtils();
    await dataUtils.parseCSV(csvData);

    // Assertions
    expect(() => dataUtils.sortData(column, ascending)).toThrowError('Column d not found.');
  });

  it('should sort data in descending order', async () => {
    // Prepare data
    const csvData = 'a,b,c\n3,2,1\n6,5,4\n9,8,7';
    const column = 'a';
    const ascending = false;

    // Test
    const dataUtils = new DataUtils();
    await dataUtils.parseCSV(csvData);
    const sortedData = dataUtils.sortData(column, ascending);

    // Assertions
    expect(sortedData).toBeDefined();
    expect(sortedData).toBeInstanceOf(Array);
    expect(sortedData.length).toBe(3);
    expect(sortedData[0]).toEqual([9, 8, 7]);
    expect(sortedData[1]).toEqual([6, 5, 4]);
    expect(sortedData[2]).toEqual([3, 2, 1]);
  });

  it('should parse CSV data with all supported delimiters', async () => {
    const csvDataTypes = [
      'a,b,c\n1,2,3\n4,5,6\n7,8,9',
      'a;b;c\n1;2;3\n4;5;6\n7;8;9',
      'a\tb\tc\n1\t2\t3\n4\t5\t6\n7\t8\t9',
      'a|b|c\n1|2|3\n4|5|6\n7|8|9'
    ];

    for (const csvData of csvDataTypes) {
      const dataUtils = new DataUtils();
      const parsedData = await dataUtils.parseCSV(csvData);

      testRegularAssertions(parsedData);
    }
  });

  it('should parse JSON data in style 1', async () => {
    // Prepare data
    const jsonData = '[{"a":1,"b":2,"c":3},{"a":4,"b":5,"c":6},{"a":7,"b":8,"c":9}]';

    // Test
    const dataUtils = new DataUtils();
    const parsedData = await dataUtils.parseJSON(jsonData);

    // Assertions
    testRegularAssertions(parsedData);
  });

  it('should parse JSON data in style 2', async () => {
    // Prepare data
    const jsonData = '{"a":[1,4,7],"b":[2,5,8],"c":[3,6,9]}';

    // Test
    const dataUtils = new DataUtils();
    const parsedData = await dataUtils.parseJSON(jsonData);

    // Assertions
    testRegularAssertions(parsedData);
  });

  it('should parse JSON using the parseData function', async () => {
    // Prepare data
    const jsonData = '[{"a":1,"b":2,"c":3},{"a":4,"b":5,"c":6},{"a":7,"b":8,"c":9}]';

    // Test
    const dataUtils = new DataUtils();
    const parsedData = await dataUtils.parseData(jsonData);

    // Assertions
    testRegularAssertions(parsedData);
  });

  it('should parse CSV using the parseData function', async () => {
    // Prepare data
    const csvData = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';

    // Test
    const dataUtils = new DataUtils();
    const parsedData = await dataUtils.parseData(csvData);

    // Assertions
    testRegularAssertions(parsedData);
  });

  it('should throw an error when parsing invalid data', async () => {
    // Prepare data
    const invalidData = 'invalid data';

    // Test
    const dataUtils = new DataUtils();

    // Assertions
    await expect(dataUtils.parseData(invalidData)).rejects.toThrowError(
      'Data could not be parsed as JSON or CSV. Please provide a valid type.'
    );
  });

  it('should throw an error when parsing invalid CSV data', async () => {
    // Prepare data
    const invalidData = 'invalid data';

    // Test
    const dataUtils = new DataUtils();

    // Assertions
    await expect(dataUtils.parseCSV(invalidData)).rejects.toThrowError(
      'CSV data that was supplied is not in the correct format.'
    );
  });

  it('should throw an error when parsing invalid JSON data', async () => {
    // Prepare data
    const invalidData = 'invalid data';

    // Test
    const dataUtils = new DataUtils();

    // Assertions
    await expect(dataUtils.parseJSON(invalidData)).rejects.toThrowError(
      'JSON data that was supplied is not in the correct format.'
    );
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
