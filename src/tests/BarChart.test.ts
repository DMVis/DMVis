// Imports
import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

// DMVis imports
import BarChart from '$lib/components/visualisations/BarChart.svelte';

// Mock imports
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Size test', () => {
  it('checks if the width is correct', () => {
    // Arrange
    const config = {
      width: 100,
      height: 150,
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

// Simple data prepared for tests
function createData() {
  return [
    { label: 'a', value: 100 },
    { label: 'b', value: 80 },
    { label: 'c', value: 70 }
  ];
}
