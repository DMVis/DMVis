import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import ValueChart from '$lib/components/visualisations/ValueChart.svelte';
import StoreWrapper from './StoreWrapper.svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Html test', () => {
  it('renders a ValueChart', () => {
    // Arrange
    const config = { width: 1500, height: 900 };

    // Act
    const container = generateValueChart(config);

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(config.width); // Default column width * (amount of columns + rank & select columns)
    expect(Number(container.getAttribute('height'))).toBe(config.height); // Column top height + (amount of rows * row height)
    expect(container.getElementsByClassName('column').length).toBe(3 + 2); // 3 Columns for the top part, 2 columns for the bottom part
  });
});

function generateValueChart(customConfig: object, customData: string | null = null) {
  // Prepare data
  const data = customData
    ? customData
    : '[{"a":1,"b":2,"c":3},{"a":4,"b":5,"c":6},{"a":7,"b":8,"c":9}]';
  const dataUtil = new DataUtils();
  dataUtil.parseJSON(data);

  // Setup ValueChart component and render it
  const config = { dataUtil, ...customConfig };
  const { container } = render(StoreWrapper, { props: { Component: ValueChart, config } });
  return container.querySelector('.valuechart') as HTMLElement;
}
