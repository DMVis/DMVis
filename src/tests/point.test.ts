import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import Point from '$lib/components/base/Point.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';
import NewStoreWrapper from './NewStoreWrapper.svelte';

prepareSvgGetter();

describe('Html test', () => {
  it('renders a point', () => {
    // Arrange
    const config = { x: 5, y: 10 };

    // Act
    const point = createPoint(config);

    // Assert
    expect(point).toBeDefined();
    expect(point.getAttribute('cx')).toBe(`${config.x}`);
    expect(point.getAttribute('cy')).toBe(`${config.y}`);
  });

  it('checks if default attributes are filled', () => {
    // Arrange
    const config = { x: 100, y: 150 };
    const expectedClasses = `point`;

    // Act
    const point = createPoint(config);
    // Note that the last class is always auto-generated and can be ignored
    const classes = Array.from(point.classList)
      .slice(0, point.classList.length - 1)
      .join(' ');

    // Assert
    expect(classes).toBe(expectedClasses);

    // Check position
    expect(point.getAttribute('cx')).toBe(`${config.x}`);
    expect(point.getAttribute('cy')).toBe(`${config.y}`);

    // Check default attributes
    expect(point.getAttribute('r')).toBe('5');
    expect(point.getAttribute('stroke-width')).toBe('1');
    expect(point.getAttribute('opacity')).toBe('1');
  });

  it('checks if custom attributes are filled', () => {
    // Arrange
    const config = {
      x: 112,
      y: 523,
      radius: 8,
      borderWidth: 2,
      opacity: 0.5,
      name: 'test'
    };
    const expectedClasses = `point point-${config.name}`;

    // Act
    const point = createPoint(config);
    // Note that the last class is always auto-generated and can be ignored
    const classes = Array.from(point.classList)
      .slice(0, point.classList.length - 1)
      .join(' ');

    // Assert
    expect(classes).toBe(expectedClasses);

    // Check position
    expect(point.getAttribute('cx')).toBe(`${config.x}`);
    expect(point.getAttribute('cy')).toBe(`${config.y}`);

    // Check custom attributes
    expect(point.getAttribute('r')).toBe(`${config.radius}`);
    expect(point.getAttribute('stroke-width')).toBe(`${config.borderWidth}`);
    expect(point.getAttribute('opacity')).toBe(`${config.opacity}`);
  });
});

function createPoint(config: object): SVGCircleElement {
  // Render a point and return the circle element
  const { container } = render(NewStoreWrapper, { props: { Component: Point, config } });
  const point = container.getElementsByClassName('point')[0] as SVGCircleElement;
  return point;
}
