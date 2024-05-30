import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import Scatterplot from '$lib/components/visualisations/Scatterplot.svelte';
import StoreWrapper from './VisualisationStoreWrapper.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Render test', () => {
  it('renders a scatterplot', () => {
    // Arrange
    const config = {
      width: 438,
      height: 942,
      xAxis: 'Inhabitants',
      yAxis: 'gdp'
    };

    // Act
    // Render a scatterplot
    const scatterplot = createScatterplot(config);

    // Assert
    // Check if width, height, amount of points, and axis are all correct
    // Check width and height
    expect(scatterplot.getAttribute('width')).toBe('438');
    expect(scatterplot.getAttribute('height')).toBe('942');

    // Check number of points
    const numPoints = scatterplot.getElementsByClassName('point').length;
    expect(numPoints).toBe(5);

    // Check axis
    const numAxis = scatterplot.getElementsByClassName('axis').length;
    expect(numAxis).toBe(2);
  });

  it('checks if showAxis omits the axis', () => {
    // Arrange
    const config = {
      width: 438,
      height: 942,
      xAxis: 'Inhabitants',
      yAxis: 'gdp',
      showAxis: false
    };

    // Act
    const scatterplot = createScatterplot(config);
    const numAxis = scatterplot.getElementsByClassName('axis').length;

    // Assert
    // Check if there are no components with a class 'axis'
    expect(numAxis).toBe(0);
  });
});

describe('Error checking test', () => {
  it('checks if an error is thrown if xAxis is not specified correctly', () => {
    // Arrange
    const config = {
      width: 438,
      height: 942,
      xAxis: 'something',
      yAxis: 'gdp'
    };

    // Act
    const createScatterplotWithInvalidXAxis = () => createScatterplot(config);

    // Assert
    expect(createScatterplotWithInvalidXAxis).toThrow('xAxis attribute is not recognised');
  });

  it('checks if an error is thrown if yAxis is not specified correctly', () => {
    // Arrange
    const config = {
      width: 438,
      height: 942,
      xAxis: 'Inhabitants',
      yAxis: 'something'
    };

    // Act
    const createScatterplotWithInvalidYAxis = () => createScatterplot(config);

    // Assert
    expect(createScatterplotWithInvalidYAxis).toThrow('yAxis attribute is not recognised');
  });
});

describe('Scaling test', () => {
  // Points should scale properly

  it('checks the dimensions of the scatterplot', () => {
    // Arrange
    const config = {
      width: 200,
      height: 200,
      xAxis: 'Inhabitants',
      yAxis: 'gdp'
    };

    // Act
    const scalingScatter = createScatterplot(config);

    // Assert
    // Check dimensions
    expect(scalingScatter.getAttribute('width')).toBe('200');
    expect(scalingScatter.getAttribute('height')).toBe('200');
  });

  it('checks if a point at (0,0) is scaled to the proper spot', () => {
    // Arrange
    const config = {
      width: 200,
      height: 200,
      xAxis: 'Inhabitants',
      yAxis: 'gdp'
    };

    // Act
    const scalingScatter = createScatterplot(config);
    const points = scalingScatter.getElementsByClassName('point');

    // Assert
    // Point (0,0)
    const point = points[0] as SVGCircleElement;
    expect(point.getAttribute('cx')).toBe('0');
    expect(point.getAttribute('cy')).toBe('200');
  });

  it('checks if a point at (maxX,maxY) is scaled to the proper spot', () => {
    // Arrange
    const config = {
      width: 200,
      height: 200,
      xAxis: 'Inhabitants',
      yAxis: 'gdp'
    };

    // Act
    const scalingScatter = createScatterplot(config);
    const points = scalingScatter.getElementsByClassName('point');

    // Assert
    // Point (10,10)
    const point = points[4] as SVGCircleElement;
    expect(point.getAttribute('cx')).toBe('200');
    expect(point.getAttribute('cy')).toBe('0');
  });

  it('checks if a point is scaled to the proper spot', () => {
    // Arrange
    const config = {
      width: 200,
      height: 200,
      xAxis: 'Inhabitants',
      yAxis: 'gdp'
    };

    // Act
    const scalingScatter = createScatterplot(config);
    const points = scalingScatter.getElementsByClassName('point');

    // Assert
    // Point (3,8)
    let point = points[1] as SVGCircleElement;
    expect(Math.round(parseFloat(point.getAttribute('cx') ?? '0'))).toBe(60);
    expect(Math.round(parseFloat(point.getAttribute('cy') ?? '0'))).toBe(40);

    // Point (6,6)
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
  const { container } = render(StoreWrapper, { props: { Component: Scatterplot, config } });
  const scatterplot = container.getElementsByClassName('visualisation')[0] as SVGElement;
  return scatterplot;
}
