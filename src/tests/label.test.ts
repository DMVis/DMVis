import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import Label from '$lib/components/base/Label.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';

// Make sure that the get methods of SVGElement is mocked
prepareSvgGetter();

describe('Html test', () => {
  it('renders "Hello world!"', () => {
    // Arrange
    const config = { text: 'Hello world!', x: 5, y: 5 };

    // Act
    render(Label, config);

    // Assert
    expect(document.body.textContent).toBe('Hello world!');
  });

  it('renders "Test"', () => {
    // Arrange
    const config = { text: 'Test', x: 5, y: 5 };

    // Act
    render(Label, config);

    // Assert
    expect(document.body.textContent).toBe('Test');
  });

  it('checks if default attributes are filled', () => {
    // Arrange
    const config = { x: 0, y: 0, text: 'Test' };
    // Padding is optional, but it is needed for asserting rect dimensions
    // since its width and height adjust to the text length
    // 20 is the default padding
    const padding = 20;
    // The width and height are 'auto' by default, meaning that they
    // adjust to the text content
    const expectedRectWidth = (text: SVGElement): number => {
      return text.getComputedTextLength() + padding;
    };
    const expectedRectHeight = (text: SVGElement): number => {
      return text.getBBox().height + padding;
    };
    const expectedClasses = 'label';

    // Act
    const [group, rect, text] = createLabel(config);
    // Note that the last class is always auto-generated and can be ignored
    const classes = Array.from(group.classList)
      .slice(0, group.classList.length - 1)
      .join(' ');

    // Assert
    expect(group.getAttribute('transform')).toBe('rotate(0, 0, 0)');
    expect(classes).toBe(expectedClasses);
    expect(group.getAttribute('style')).toBe('pointer-events: none;');

    // Check if the rectangle is correctly filled
    expect(rect.getAttribute('rx')).toBe('0');
    expect(rect.getAttribute('ry')).toBe('0');
    expect(rect.getAttribute('width')).toBe(`${expectedRectWidth(text)}`);
    expect(rect.getAttribute('height')).toBe(`${expectedRectHeight(text)}`);
    expect(rect.getAttribute('fill')).toBe('red');
    expect(rect.getAttribute('fill-opacity')).toBe('1');
    expect(rect.getAttribute('stroke')).toBe('black');

    // Check if the label has the default attributes
    expect(text.textContent).toBe('Test');
    expect(text.getAttribute('fill')).toBe('black');
    expect(text.getAttribute('font-size')).toBe('12px');
    expect(text.getAttribute('font-family')).toBe('Arial');
    expect(text.getAttribute('font-weight')).toBe('normal');
    expect(text.getAttribute('opacity')).toBe('1');
  });

  it('checks if custom attributes are filled', () => {
    // Arrange
    const config = {
      x: 0,
      y: 0,
      text: 'Test',
      color: 'orange',
      opacity: 0.5,
      rotationDegrees: 15,
      radiusX: 10,
      radiusY: 20,
      padding: 40,
      textColor: 'red',
      fontSize: '20px',
      fontWeight: 'bold',
      fontFamily: 'Verdana',
      hasBackground: true,
      backgroundOpacity: 0.6,
      hasPointerEvents: true,
      name: 'test',
      width: 200,
      height: 100,
      borderColor: 'red'
    };
    // Note that the width and height are explicitly set and not 'auto' here
    const expectedClasses = `label label-${config.name}`;

    // Act
    const [group, rect, text] = createLabel(config);
    // Note that the last class is always auto-generated and can be ignored
    const classes = Array.from(group.classList)
      .slice(0, group.classList.length - 1)
      .join(' ');

    // Assert
    expect(group.getAttribute('transform')).toBe(
      `rotate(${config.rotationDegrees}, ${config.x}, ${config.y})`
    );
    expect(classes).toBe(expectedClasses);
    expect(group.getAttribute('style')).toBe('pointer-events: all;');

    // Check if the rectangle is correctly filled
    expect(rect.getAttribute('rx')).toBe(`${config.radiusX}`);
    expect(rect.getAttribute('ry')).toBe(`${config.radiusY}`);
    expect(rect.getAttribute('width')).toBe(`${config.width}`);
    expect(rect.getAttribute('height')).toBe(`${config.height}`);
    expect(rect.getAttribute('fill')).toBe(`${config.color}`);
    expect(rect.getAttribute('fill-opacity')).toBe(`${config.backgroundOpacity}`);
    expect(rect.getAttribute('stroke')).toBe(`${config.borderColor}`);

    // Check if the label has the custom attributes
    expect(text.textContent).toBe('Test');
    expect(text.getAttribute('fill')).toBe(`${config.textColor}`);
    expect(text.getAttribute('font-size')).toBe(`${config.fontSize}`);
    expect(text.getAttribute('font-weight')).toBe(`${config.fontWeight}`);
    expect(text.getAttribute('font-family')).toBe(`${config.fontFamily}`);
    expect(text.getAttribute('opacity')).toBe(`${config.opacity}`);
  });

  it('checks if the rect is omitted if hasBackground is false', () => {
    // Arrange
    const config = { x: 0, y: 0, text: 'Test', hasBackground: false };

    // Act
    // Note that the order of rect and text is swapped now,
    // because rect is not a child node of group
    const [group, text, rect] = createLabel(config);

    // Assert
    // Check if the group has the correct rotation
    expect(group.getAttribute('transform')).toBe('rotate(0, 0, 0)');

    // Check if the rectangle is omitted
    expect(rect).toBeUndefined();

    // Check if the label has the default attributes
    expect(text.textContent).toBe('Test');
    expect(text.getAttribute('fill')).toBe('black');
    expect(text.getAttribute('font-size')).toBe('12px');
    expect(text.getAttribute('font-weight')).toBe('normal');
    expect(text.getAttribute('font-family')).toBe('Arial');
    expect(text.getAttribute('opacity')).toBe('1');
  });
});

function createLabel(config: object): [SVGElement, SVGElement, SVGElement] {
  // Add svg block to the document
  const svg = document.createElement('svg');
  svg.setAttribute('id', 'svg');
  document.body.appendChild(svg);

  // Add label to svg block
  const { getByText } = render(Label, config);
  const group = getByText('Test').parentNode as SVGElement;
  svg.appendChild(group);

  // Return the group, rect and text (which form the label together)
  return [
    group as SVGElement,
    group?.childNodes[0] as SVGElement,
    group?.childNodes[1] as SVGElement
  ];
}
