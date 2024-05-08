import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import LineUp from '$lib/components/visualisations/LineUp.svelte';
import StoreWrapper from './StoreWrapper.svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Html test', async () => {
  it('renders a LineUp', async () => {
    // Arrange
    const config = {};

    // Act
    const container = await generateLineUp(config);

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(150 * (3 + 2)); // Default column width * (amount of columns + rank & select columns)
    expect(Number(container.getAttribute('height'))).toBe(105 + 3 * 20); // Column top height + (amount of rows * row height)
    expect(container.getElementsByClassName('column').length).toBe(3 + 2); // Columns from data + rank & select columns
  });

  it('renders a LineUp with zero rows', async () => {
    // Arrange
    const config = {};

    // Act
    const container = await generateLineUp(config, 'a,b,c');

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(150 * (3 + 2)); // Default column width * (amount of columns + rank & select columns)
    expect(Number(container.getAttribute('height'))).toBe(105); // Column top height
    expect(container.getElementsByClassName('column').length).toBe(3 + 2); // Columns from data + rank & select columns
  });

  it('renders a LineUp with no data', async () => {
    // Arrange
    const config = {};

    // Act
    const container = await generateLineUp(config, '');

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(150 * 2); // Default column width * rank & select columns
    expect(Number(container.getAttribute('height'))).toBe(105); // Column top height
    expect(container.getElementsByClassName('column').length).toBe(2); // Rank & select columns
  });

  it('renders a LineUp with custom column width', async () => {
    // Arrange
    const config = { columnWidth: 100 };

    // Act
    const container = await generateLineUp(config);

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(config.columnWidth * (3 + 2)); // Custom column width * (amount of columns + rank & select columns)
    expect(Number(container.getAttribute('height'))).toBe(105 + 3 * 20); // Column top height + (amount of rows * row height)
    expect(container.getElementsByClassName('column').length).toBe(3 + 2); // Columns from data + rank & select columns
  });
});

async function generateLineUp(customConfig: object, customData: string | null = null) {
  // Prepare data
  const data = customData != null ? customData : 'a,b,c\n1,2,3\n4,5,6\n7,8,9';
  const dataUtil = new DataUtils();

  if (data === '') {
    await expect(
      (async () => {
        await dataUtil.parseCSV(data);
      })()
    ).rejects.toThrowError();
  } else {
    dataUtil.parseCSV(data);
  }

  // Setup LineUp component and render it
  const config = { dataUtil, ...customConfig };
  const { container } = render(StoreWrapper, { props: { Component: LineUp, config } });
  return container.querySelector('.lineUp') as HTMLElement;
}
