import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import BarChart from '$lib/components/visualisations/BarChart.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Html test', () => {
  it("checks if BarChart's width is correct", () => {
    // Arrange
    const config = {
      width: 100,
      height: 100,
      data: createData()
    };

    const expectedWidth = 100;

    // Act
    const barChart = createBarChart(config);

    // Assert
    expect(barChart.getAttribute('width')).toBe(`${expectedWidth}`);
  });
});

function createBarChart(config: object): SVGElement {
  // Add svg block to the document
  const svg = document.createElement('svg');
  svg.setAttribute('id', 'svg');
  document.body.appendChild(svg);

  // Add BarChart to svg block
  const { container } = render(BarChart, config);
  const barChart = container.getElementsByClassName('visualisation')[0] as SVGElement;

  return barChart;
}

function createData() {
  return [
    { label: 'a', value: 100 },
    { label: 'b', value: 80 },
    { label: 'c', value: 70 }
  ];
}
