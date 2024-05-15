import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import Column from '$lib/components/base/Column.svelte';
import BarColumn from '$lib/components/columns/BarColumn.svelte';
import StoreWrapper from './StoreWrapper.svelte';
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
    expect(Number(columnTop?.getAttribute('width'))).toBe(config.width - 10);
    expect(Number(columnTop?.getAttribute('height'))).toBe(100);
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
      type: ColumnType.Bar,
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
});
