import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import Histogram from '$lib/components/visualisations/Histogram.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Bucket tests', () => {
  it('checks the number of categorical buckets', () => {
    //Arrange
    const config = {
      width: 100,
      height: 100,
      data: createCategoricalData()
    };

    const expectedBuckets = 4;

    //Act
    const histogram = createHistogram(config);
    const bars = histogram.getElementsByClassName('bar');

    //Assert
    expect(bars.length).toBe(expectedBuckets);
  });
});

function createHistogram(config: object): SVGElement {
  // Add svg block to the document
  const svg = document.createElement('svg');
  svg.setAttribute('id', 'svg');
  document.body.appendChild(svg);

  // Add BarChart to svg block
  const { container } = render(Histogram, config);
  const histogram = container.getElementsByClassName('histogram')[0] as SVGElement;

  return histogram;
}

function createCategoricalData() {
  return ['banaan', 'meloen', 'kiwi', 'citroen', 'banaan'];
}
