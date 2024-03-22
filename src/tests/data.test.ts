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
    expect(parsedData).toBeDefined();
    expect(parsedData).toBeInstanceOf(Array);
    expect(parsedData.length).toBe(4);
    expect(parsedData[0]).toEqual(['a', 'b', 'c']);
    expect(parsedData[1]).toEqual([1, 2, 3]);
    expect(parsedData[2]).toEqual([4, 5, 6]);
    expect(parsedData[3]).toEqual([7, 8, 9]);
  });

  it('should set rawData, data and columns', async () => {
    // Prepare data
    const csvData = 'a,b,c\n1,2,3\n4,5,6\n7,8,9';

    // Test
    const dataUtils = new DataUtils();
    await dataUtils.parseCSV(csvData);

    // Assertions
    expect(dataUtils.rawData).toBeDefined();
    expect(dataUtils.rawData).toBeInstanceOf(Array);
    expect(dataUtils.rawData.length).toBe(4);
    expect(dataUtils.rawData[0]).toEqual(['a', 'b', 'c']);
    expect(dataUtils.rawData[1]).toEqual([1, 2, 3]);
    expect(dataUtils.rawData[2]).toEqual([4, 5, 6]);
    expect(dataUtils.rawData[3]).toEqual([7, 8, 9]);
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
});
