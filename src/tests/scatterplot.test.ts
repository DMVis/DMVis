import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Scatterplot from '$lib/components/visualisations/Scatterplot.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';
import NewStoreWrapper from './NewStoreWrapper.svelte';

prepareSvgGetter();

describe('Html test', () => {
  it('renders a scatterplot', () => {
    // Renders a scatterplot.
    // Checks if width, height, amount of points, and axis are all correct.
    const config = {
      width: 438,
      height: 942,
      xAxis: 'Inhabitants',
      yAxis: 'gdp'
    };
    const scatterplot = createScatterplot(config);

    // Check width and height.
    expect(scatterplot.getAttribute('width')).toBe('438');
    expect(scatterplot.getAttribute('height')).toBe('942');

    // Check number of points.
    const numPoints = scatterplot.getElementsByClassName('point').length;
    expect(numPoints).toBe(5);

    // Check axis.
    const numAxis = scatterplot.getElementsByClassName('axis').length;
    expect(numAxis).toBe(2);
  });

  it('checks if showAxis omits the axis', () => {
    // Checks if there are no components with a class 'axis'.
    const config = {
      width: 438,
      height: 942,
      xAxis: 'Inhabitants',
      yAxis: 'gdp',
      showAxis: false
    };
    const scatterplot = createScatterplot(config);
    const numAxis = scatterplot.getElementsByClassName('axis').length;
    expect(numAxis).toBe(0);
  });
});

describe('Error checking', () => {
  it('checks if an error is thrown if xAxis is not specified correctly', () => {
    const config = {
      width: 438,
      height: 942,
      xAxis: 'something',
      yAxis: 'gdp'
    };

    expect(() => {
      createScatterplot(config);
    }).toThrow('xAxis attribute is not recognised');
  });
  it('checks if an error is thrown if yAxis is not specified correctly', () => {
    const config = {
      width: 438,
      height: 942,
      xAxis: 'Inhabitants',
      yAxis: 'something'
    };

    expect(() => {
      createScatterplot(config);
    }).toThrow('yAxis attribute is not recognised');
  });
});

describe('Scaling test', () => {
  // Points should scale properly.
  const config = {
    width: 200,
    height: 200,
    xAxis: 'Inhabitants',
    yAxis: 'gdp'
  };

  it('checks the dimensions of the scatterplot', () => {
    // Check dimensions.
    const scalingScatter = createScatterplot(config);
    expect(scalingScatter.getAttribute('width')).toBe('200');
    expect(scalingScatter.getAttribute('height')).toBe('200');
  });

  it('checks if a point at (0,0) is scaled to the proper spot', () => {
    const scalingScatter = createScatterplot(config);
    const points = scalingScatter.getElementsByClassName('point');

    // Point (0,0).
    const point = points[0] as SVGCircleElement;
    expect(point.getAttribute('cx')).toBe('0');
    expect(point.getAttribute('cy')).toBe('200');
  });

  it('checks if a point at (maxX,maxY) is scaled to the proper spot', () => {
    const scalingScatter = createScatterplot(config);
    const points = scalingScatter.getElementsByClassName('point');

    // Point (10,10).
    const point = points[4] as SVGCircleElement;
    expect(point.getAttribute('cx')).toBe('200');
    expect(point.getAttribute('cy')).toBe('0');
  });

  it('checks if a point is scaled to the proper spot', () => {
    const scalingScatter = createScatterplot(config);
    const points = scalingScatter.getElementsByClassName('point');

    // Point (3,8).
    let point = points[1] as SVGCircleElement;
    expect(Math.round(parseFloat(point.getAttribute('cx') ?? '0'))).toBe(60);
    expect(Math.round(parseFloat(point.getAttribute('cy') ?? '0'))).toBe(40);

    // Point (6,6).
    point = points[2] as SVGCircleElement;
    expect(Math.round(parseFloat(point.getAttribute('cx') ?? '0'))).toBe(120);
    expect(Math.round(parseFloat(point.getAttribute('cy') ?? '0'))).toBe(80);

    // Point (8,3).
    point = points[3] as SVGCircleElement;
    expect(Math.round(parseFloat(point.getAttribute('cx') ?? '0'))).toBe(160);
    expect(Math.round(parseFloat(point.getAttribute('cy') ?? '0'))).toBe(140);
  });
});

function createScatterplot(config: object): SVGElement {
  // Clear document body if anything is in it.
  if (document.body.children.length > 0) {
    document.body.innerHTML = '';
  }

  const { container } = render(NewStoreWrapper, { props: { Component: Scatterplot, config } });
  const scatterplot = container.getElementsByClassName('visualisation')[0] as SVGElement;
  return scatterplot;
}
