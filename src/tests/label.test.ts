import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import Label from '$lib/components/base/Label.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';

// Make sure that the get methods of SVGElement is mocked
prepareSvgGetter();

// Test cases
describe('Html test', () => {
  it('renders "Hello world!"', () => {
    render(Label, { text: 'Hello world!', x: 5, y: 5 });
    expect(document.body.textContent).toBe('Hello world!');
  });

  it('renders "Test"', () => {
    render(Label, { text: 'Test', x: 5, y: 5 });
    expect(document.body.textContent).toBe('Test');
  });

  it('checks if default attributes are filled', () => {
    // Prepare the label
    const config = { x: 0, y: 0, text: 'Test' };
    const [group, rect, text] = prepareLabel(config);

    // Check if the group has the correct rotation
    expect(group.getAttribute('transform')).toBe('rotate(0, 0, 0)');

    // Check if the rectangle is correctly filled
    expect(rect.getAttribute('rx')).toBe('0');
    expect(rect.getAttribute('ry')).toBe('0');
    expect(rect.getAttribute('fill')).toBe('red');
    expect(rect.getAttribute('fill-opacity')).toBe('100%');

    // Check if the label has the default attributes
    expect(text.textContent).toBe('Test');
    expect(text.getAttribute('fill')).toBe('black');
    expect(text.getAttribute('font-size')).toBe('12px');
    expect(text.getAttribute('font-family')).toBe('Arial');
    expect(text.getAttribute('font-weight')).toBe('normal');
    expect(text.getAttribute('opacity')).toBe('100%');
  });

  it('checks if custom attributes are filled', () => {
    // Prepare the label
    const config = {
      x: 0,
      y: 0,
      text: 'Test',
      color: 'orange',
      opacity: 0.5,
      rotationDegrees: 15,
      radiusX: 10,
      radiusY: 20,
      textColor: 'red',
      fontSize: '20px',
      fontFamily: 'Verdana',
      fontWeight: 'bold',
      hasBackground: true
    };
    const [group, rect, text] = prepareLabel(config);

    // Check if the group has the correct rotation
    expect(group.getAttribute('transform')).toBe(
      `rotate(${config.rotationDegrees}, ${config.x}, ${config.y})`
    );

    // Check if the rectangle is correctly filled
    expect(rect.getAttribute('rx')).toBe(`${config.radiusX}`);
    expect(rect.getAttribute('ry')).toBe(`${config.radiusY}`);
    expect(rect.getAttribute('fill')).toBe(`${config.color}`);
    expect(rect.getAttribute('fill-opacity')).toBe(`${config.opacity}`);

    // Check if the label has the custom attributes
    expect(text.textContent).toBe('Test');
    expect(text.getAttribute('fill')).toBe(`${config.textColor}`);
    expect(text.getAttribute('font-size')).toBe(`${config.fontSize}`);
    expect(text.getAttribute('font-family')).toBe(`${config.fontFamily}`);
    expect(text.getAttribute('font-weight')).toBe(`${config.fontWeight}`);
    expect(text.getAttribute('opacity')).toBe(`${config.opacity}`);
  });

  it('checks if the rect is omitted if hasBackground is false', () => {
    // Prepare the label
    const config = { x: 0, y: 0, text: 'Test', hasBackground: false };
    const [group, text, empty] = prepareLabel(config);

    // Check if the group has the correct rotation
    expect(group.getAttribute('transform')).toBe('rotate(0, 0, 0)');

    // Check if the rectangle is omitted
    expect(empty).toBeUndefined();

    // Check if the label has the default attributes
    expect(text.textContent).toBe('Test');
    expect(text.getAttribute('fill')).toBe('black');
    expect(text.getAttribute('font-size')).toBe('12px');
    expect(text.getAttribute('font-family')).toBe('Arial');
    expect(text.getAttribute('font-weight')).toBe('normal');
    expect(text.getAttribute('opacity')).toBe('100%');
  });
});

function prepareLabel(config: object): [SVGElement, SVGElement, SVGElement] {
  // Add svg block to the document
  const svg = document.createElement('svg');
  svg.setAttribute('id', 'svg');
  document.body.appendChild(svg);

  // Add label to svg block
  const { getByText } = render(Label, config);
  const group = getByText('Test').parentNode as SVGElement;
  svg.appendChild(group);

  // Return the group, rect and text
  return [
    group as SVGElement,
    group?.childNodes[0] as SVGElement,
    group?.childNodes[1] as SVGElement
  ];
}
