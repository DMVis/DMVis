import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import Point from '$lib/components/base/Point.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Html test', () => {
  it('renders a point', () => {
    const point = preparePoint({ x: 5, y: 5 });
    expect(point.getAttribute('cx')).toBe('5');
    expect(point.getAttribute('cy')).toBe('5');
  });
  it('checks if default attributes are filled', () => {
    const point = preparePoint({ x: 100, y: 150 });

    //Check position
    expect(point.getAttribute('cx')).toBe('100');
    expect(point.getAttribute('cy')).toBe('150');

    //Check defaut values
    expect(point.getAttribute('r')).toBe('5');
    expect(point.getAttribute('stroke')).toBe('#000');
    expect(point.getAttribute('fill')).toBe('#CCCCFF');
    expect(point.getAttribute('stroke-width')).toBe('1');
    expect(point.getAttribute('opacity')).toBe('1');
  });

  it('checks if custom attributes are filled', () => {
    const config = {
      x: 112,
      y: 523,
      radius: 8,
      color: 'orange',
      borderColor: 'cyan',
      borderWidth: 2,
      opacity: 0.5
    };
    const point = preparePoint(config);
    //Check position
    expect(point.getAttribute('cx')).toBe('112');
    expect(point.getAttribute('cy')).toBe('523');

    //Check custom values
    expect(point.getAttribute('r')).toBe('8');
    expect(point.getAttribute('stroke')).toBe('cyan');
    expect(point.getAttribute('fill')).toBe('orange');
    expect(point.getAttribute('stroke-width')).toBe('2');
    expect(point.getAttribute('opacity')).toBe('0.5');
  });
});

function preparePoint(config: object): SVGCircleElement {
  // Clear document body if anything is in it.
  if (document.body.children.length > 0) {
    document.body.innerHTML = '';
  }

  // Render a point and return the circle element.
  const { container } = render(Point, config);
  const point = container.getElementsByClassName('point')[0] as SVGCircleElement;
  return point;
}
