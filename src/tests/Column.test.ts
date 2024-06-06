import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import Column from '$lib/components/base/Column.svelte';
import BarColumn from '$lib/components/columns/BarColumn.svelte';
import StoreWrapper from './VisualisationStoreWrapper.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';
import { ColumnType, IconType } from '$lib/Enums.js';

prepareSvgGetter();

describe('Base column test', () => {
  it('renders a default column', () => {
    // Arrange
    const config = {
      x: 0,
      width: 150,
      height: 1000,
      type: ColumnType.Text
    };

    // Act
    const { container } = render(StoreWrapper, { props: { Component: Column, config } });
    const column = container.querySelector('.column');
    const options = container.querySelector('.column-options');
    const columnTop = container.querySelector('.column-top > rect');
    const columnBottom = container.querySelector('.column-bottom > rect');

    // Assert
    expect(column).toBeDefined();
    expect(options).toBeDefined();
    expect(columnTop).toBeDefined();
    expect(Number(columnTop?.getAttribute('width'))).toBe(config.width - 10); // Width minus padding
    expect(Number(columnTop?.getAttribute('height'))).toBe(100); // Height of the top column
    expect(Number(columnBottom?.getAttribute('width'))).toBe(config.width);
    expect(Number(columnBottom?.getAttribute('height'))).toBe(config.height);
  });

  it('checks if icons are drawn', () => {
    // Arrange
    const config = {
      x: 0,
      width: 150,
      height: 1000,
      type: ColumnType.Text,
      icons: [IconType.Sort, IconType.Search, IconType.Filter]
    };

    // Act
    const { container } = render(StoreWrapper, { props: { Component: Column, config } });
    const options = container.querySelector('.column-options');

    // Assert
    expect(options).toBeDefined();
    expect(options?.childNodes.length).toBe(config.icons.length * 2); // Times 2 because there is a comment and an icon
  });
});

describe('BarColumn tests', () => {
  it('renders a bar column', () => {
    // Arrange
    const config = {
      x: 0,
      width: 150,
      height: 1000,
      data: [1, 2, 3, 4, 5]
    };

    // Act
    const { container } = render(StoreWrapper, { props: { Component: BarColumn, config } });
    const column = container.querySelector('.column');

    // Assert
    expect(column).toBeDefined();
    expect(column?.getElementsByClassName('bar').length).toBe(config.data.length);
  });

  it('renders a bar column with a histogram', () => {
    // Arrange
    const config = {
      x: 0,
      width: 150,
      height: 1000,
      data: [1, 2, 3, 4, 5],
      overviewItem: 'histogram'
    };

    // Act
    const { container } = render(StoreWrapper, { props: { Component: BarColumn, config } });
    const column = container.querySelector('.column');

    // Assert
    expect(column).toBeDefined();
    expect(container.querySelectorAll('.histogram')).toBeDefined();
  });

  it('renders a bar column with an axis', () => {
    // Arrange
    const config = {
      x: 0,
      width: 150,
      height: 1000,
      data: [1, 2, 3, 4, 5],
      overviewItem: 'axis'
    };

    // Act
    const { container } = render(StoreWrapper, { props: { Component: BarColumn, config } });
    const column = container.querySelector('.column');

    // Assert
    expect(column).toBeDefined();
    expect(container.querySelectorAll('.axis')).toBeDefined();
  });
});

describe('Column interaction test', () => {
  it('highlights and unhighlights a column-top when moving over it', async () => {
    // Arrange
    const config = { x: 0, width: 150, height: 1000, type: ColumnType.Text };
    const { container } = render(StoreWrapper, { props: { Component: Column, config } });

    // Act
    let columnTop = container.querySelector('.column-top > rect') as HTMLElement;
    await columnTop.dispatchEvent(
      new MouseEvent('mouseenter', {
        // Hover at the center of the column row
        clientX: 75,
        clientY: 20
      })
    );

    // Assert
    columnTop = container.querySelector('.column-top > rect') as HTMLElement;
    expect(columnTop).toBeDefined();
    expect(columnTop.getAttribute('fill')).toBe('#FF0000');

    // Act
    await columnTop.dispatchEvent(
      new MouseEvent('mouseleave', {
        // Hover out of the column row
        clientX: 75,
        clientY: 0
      })
    );

    // Assert
    columnTop = container.querySelector('.column-top > rect') as HTMLElement;
    expect(columnTop).toBeDefined();
    expect(columnTop.getAttribute('fill')).toBe('#FFFFFF');
  });
});
describe('Error checking in BarColumn', () => {
  it('checks if an error is thrown if the names input is not valid', () => {
    // Arrange
    const config = {
      x: 0,
      width: 150,
      height: 1000,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      names: ['one', 'two', 'three']
    };
    const expectedErrorMessage = `The value assigned to the names attribute does not have the same length as the value assigned to the data attribute. Please ensure that they are of the same length.`;

    // Act
    const createInvalidBarColumn = () => render(StoreWrapper, { Component: BarColumn, config });

    // Assert
    expect(createInvalidBarColumn).toThrow(expectedErrorMessage);
  });

  it('checks if an error is thrown if the overviewItem attribute is not valid', () => {
    // Arrange
    const config = {
      x: 0,
      width: 150,
      height: 1000,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      overviewItem: 'WrongTestingName'
    };
    const expectedErrorMessage = `Cannot assign '${config.overviewItem}' to the overviewItem attribute. Please use: 'histogram', 'axis', or 'none'.`;

    // Act
    const createInvalidBarColumn = () => render(StoreWrapper, { Component: BarColumn, config });

    // Assert
    expect(createInvalidBarColumn).toThrow(expectedErrorMessage);
  });
});
