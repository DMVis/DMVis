import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import LineUp from '$lib/components/visualisations/LineUp.svelte';
import StoreWrapper from './StoreWrapper.svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Html test', () => {
  it('renders a LineUp', () => {
    // Arrange
    const config = {};

    // Act
    const container = generateLineUp(config);

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(150 * (3 + 2)); // Default column width * (amount of columns + rank & select columns)
    expect(Number(container.getAttribute('height'))).toBe(105 + 3 * 20); // Column top height + (amount of rows * row height)
    expect(container.getElementsByClassName('column').length).toBe(3 + 2); // Columns from data + rank & select columns
  });
});

function generateLineUp(customConfig: object, customData: string | null = null) {
  // Prepare data
  const data = customData
    ? customData
    : '[{"a":1,"b":2,"c":3},{"a":4,"b":5,"c":6},{"a":7,"b":8,"c":9}]';
  const dataUtil = new DataUtils();
  dataUtil.parseJSON(data);

  // Setup LineUp component and render it
  const config = { dataUtil, ...customConfig };
  const { container } = render(StoreWrapper, { props: { Component: LineUp, config } });
  return container.querySelector('.lineUp') as HTMLElement;
}
