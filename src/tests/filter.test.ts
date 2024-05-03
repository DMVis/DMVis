// Imports
import { tick } from 'svelte';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/svelte';
import prepareSvgGetter from '../vitest/svgMock.js';
import { describe, it, expect, vi, afterEach } from 'vitest';

// DMVis imports
import Filter from '$lib/components/base/Filter.svelte';
import StoreWrapper from './StoreWrapper.svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';

prepareSvgGetter();

describe('Filter component tests', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders filter columns for each data type', async () => {
    // Arrange
    const dataUtil = createDataUtil();
    const config = { dataUtil: dataUtil };

    // Act
    const { container } = render(StoreWrapper, { props: { Component: Filter, config } });
    const svgContainer = container.querySelector('svg.filter-container');

    const filterColumns = container.querySelectorAll('.column');

    // Assert
    // Check if the SVG container is rendered
    expect(svgContainer).toBeDefined();

    // Check for individual columns rendered
    expect(filterColumns.length).toBe(3); // Expecting three FilterColumn components
  });

  it('binds correct label text from data', () => {
    // Arrange
    const dataUtil = createDataUtil();
    const config = { dataUtil: dataUtil };

    // Act
    const { container } = render(StoreWrapper, { props: { Component: Filter, config } });

    const textElements = container.querySelectorAll('text');

    // Get the text content of all the labels
    const labelTexts = Array.from(textElements).map((text) => text.textContent);

    // Assert
    expect(labelTexts).toStrictEqual(['gdp', 'Inhabitants', 'Country']);
  });

  it('should sort the data when the sort button is clicked', async () => {
    // Arrange
    const dataUtil = createDataUtil();
    const config = { dataUtil: dataUtil };
    // @ts-expect-error - Cant find setup in userEvent
    const user = userEvent.setup();

    // Act
    // Render the component
    const { getAllByRole } = render(StoreWrapper, { props: { Component: Filter, config } });
    // Get all the sort buttons
    const sortButtons = getAllByRole('button', { name: /sort/i });
    // Clikc the first sort button (Country)
    await user.click(sortButtons[2]);

    // Assert
    expect(dataUtil.data).toStrictEqual([
      ['Belgium', 6, 6],
      ['France', 8, 3],
      ['Germany', 3, 8],
      ['Netherlands', 0, 0],
      ['UK', 10, 10]
    ]);
  });

  it('should filter the data when filter values are entered', async () => {
    // Arrange
    const dataUtil = createDataUtil();
    dataUtil.applyFilters = vi.fn(() => {
      dataUtil.visualisationData.set([
        ['France', 8, 3],
        ['UK', 10, 10]
      ]); // Simulating the setting of new data
    });
    const config = { dataUtil: dataUtil };
    // @ts-expect-error - Cant find setup in userEvent
    const user = userEvent.setup();

    const { getAllByLabelText } = render(StoreWrapper, { props: { Component: Filter, config } });

    // Subscribe to the writable store and capture data
    let capturedData: Array<Array<string | number>> = [];
    const unsubscribe = dataUtil.visualisationData.subscribe((value) => {
      capturedData = value;
    });

    // Act
    const minInput = getAllByLabelText('MinInput');
    const maxInput = getAllByLabelText('MaxInput');
    await user.type(minInput[1], '5'); // Simulate entering values for Min
    await user.type(maxInput[1], '10'); // Simulate entering values for Max

    // Force any pending state updates to complete
    await tick();

    // Assert
    expect(dataUtil.applyFilters).toHaveBeenCalled();
    expect(dataUtil.applyFilters).toHaveBeenCalledWith({
      Inhabitants: { min: 5, max: 10 }
    });

    // Check the visualisation of data after filtering
    expect(capturedData).toStrictEqual([
      ['France', 8, 3],
      ['UK', 10, 10]
    ]);

    // Cleanup: Unsubscribe to avoid memory leaks
    unsubscribe();
  });

  it('should keep the sort when filtering', async () => {
    // Arrange
    const dataUtil = createDataUtil();
    dataUtil.applyFilters = vi.fn(() => {
      dataUtil.visualisationData.set([
        ['France', 8, 3],
        ['UK', 10, 10]
      ]); // Simulating the setting of new data
    });
    const config = { dataUtil: dataUtil };
    // @ts-expect-error - Cant find setup in userEvent
    const user = userEvent.setup();

    const { getAllByLabelText, getAllByRole } = render(StoreWrapper, {
      props: { Component: Filter, config }
    });

    // Subscribe to the writable store and capture data
    let capturedData: Array<Array<string | number>> = [];
    const unsubscribe = dataUtil.visualisationData.subscribe((value) => {
      capturedData = value;
    });

    // Act
    const sortButtons = getAllByRole('button', { name: /sort/i });
    await user.click(sortButtons[1]); // Sort by Inhabitants
    const minInput = getAllByLabelText('MinInput');
    const maxInput = getAllByLabelText('MaxInput');
    await user.type(minInput[1], '5'); // Simulate entering values for Min
    await user.type(maxInput[1], '10'); // Simulate entering values for Max

    // Force any pending state updates to complete
    await tick();

    // Assert
    expect(dataUtil.applyFilters).toHaveBeenCalled();
    expect(dataUtil.applyFilters).toHaveBeenCalledWith({
      Inhabitants: { min: 5, max: 10 }
    });

    // Check the visualisation of data after filtering
    expect(capturedData).toStrictEqual([
      ['France', 8, 3],
      ['UK', 10, 10]
    ]);

    // Cleanup: Unsubscribe to avoid memory leaks
    unsubscribe();
  });
});

function createDataUtil(): DataUtils {
  const dataUtil = new DataUtils();

  dataUtil.rawData = [
    ['Country', 'Inhabitants', 'gdp'],
    ['Netherlands', 0, 0],
    ['Germany', 3, 8],
    ['Belgium', 6, 6],
    ['France', 8, 3],
    ['UK', 10, 10]
  ];

  dataUtil.data = dataUtil.rawData.slice(1);

  dataUtil.columns = dataUtil.rawData[0].map((item) => String(item));

  dataUtil.columnInfo = {
    Country: 'string',
    Inhabitants: 'number',
    gdp: 'number'
  };

  return dataUtil;
}