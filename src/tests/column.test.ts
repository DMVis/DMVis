import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import { ColumnType } from '$lib/Enums.js';
import prepareSvgGetter from '../vitest/svgMock.js';
import NewStoreWrapper from './NewStoreWrapper.svelte';
import Column from '$lib/components/base/Column.svelte';

prepareSvgGetter();

describe('Base column tests', () => {
  it('renders a default column', () => {
    // Arrange
    const config = {
      x: 0,
      width: 150,
      height: 1000,
      type: ColumnType.Bar
    };

    // Act
    const { container } = render(NewStoreWrapper, { props: { Component: Column, config } });
    const column = container.querySelector('.column');
    const options = container.querySelector('.column-options');
    const columnTop = container.querySelector('.column-top > rect');
    const columnBottom = container.querySelector('.column-bottom > rect');

    // Assert
    console.log(columnTop?.outerHTML);
    expect(column).toBeDefined();
    expect(options).toBeDefined();
    expect(columnTop).toBeDefined();
    expect(options?.childNodes.length).toBe(4 * 2); // Icon + Comment, 4 times
    expect(Number(columnTop?.getAttribute('width'))).toBe(config.width - 10);
    expect(Number(columnTop?.getAttribute('height'))).toBe(100);
    expect(Number(columnBottom?.getAttribute('width'))).toBe(config.width - 10);
    expect(Number(columnBottom?.getAttribute('height'))).toBe(config.height - 100);
  });

  it('Renders the correct amoount of options', () => {
    // Arrange
    const config = {
      x: 0,
      width: 150,
      height: 1000,
      options: 5
    };

    // Act
    let { container } = render(NewStoreWrapper, {
      props: { Component: Column, config: { ...config, type: ColumnType.Bar } }
    });
    const barOptions = container.querySelector('.column-options');
    container = render(NewStoreWrapper, {
      props: { Component: Column, config: { ...config, type: ColumnType.Rank } }
    }).container;
    const rankOptions = container.querySelectorAll('.column-options')[1];
    container = render(NewStoreWrapper, {
      props: { Component: Column, config: { ...config, type: ColumnType.Separator } }
    }).container;
    const separatorOptions = container.querySelectorAll('.column-options')[2];
    container = render(NewStoreWrapper, {
      props: { Component: Column, config: { ...config, type: ColumnType.Select } }
    }).container;
    const selectOptions = container.querySelectorAll('.column-options')[3];

    // Assert
    expect(barOptions?.childNodes.length).toBe(4 * 2);
    expect(rankOptions?.childNodes.length).toBe(1 * 2);
    expect(separatorOptions?.childNodes.length).toBe(2 * 2);
    expect(selectOptions?.childNodes.length).toBe(4 * 2);
  });
});
