import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import Tooltip from '$lib/components/base/Tooltip.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';

/*
A Tooltip is simply a Label with a predefined style, so these
tests will look very familiar
Used settings in Tooltip that differ from Label defaults are tested here basically
*/

prepareSvgGetter();

describe('Html test', () => {
  it('renders "This is a tooltip!"', () => {
    // Arrange
    const config = { x: 5, y: 5, text: 'This is a tooltip!' };

    // Act
    render(Tooltip, config);

    // Assert
    expect(document.body.textContent).toBe(config.text);
  });

  it('renders "This is another tooltip!"', () => {
    // Arrange
    const config = { x: 5, y: 5, text: 'This is another tooltip!' };

    // Act
    render(Tooltip, config);

    // Assert
    expect(document.body.textContent).toBe(config.text);
  });
});

describe('Attribute test', () => {
  it('checks if default attributes are filled', () => {
    // Arrange
    const config = { x: 0, y: 0, text: 'Test' };
    // Name attribute of Label is predefined in Tooltip as 'tooltip'
    const expectedClasses = 'label label-tooltip';
    // Light mode is default
    const expectedTextColor = 'black';

    // Act
    const [group, text, rect] = createTooltip(config);
    // Note that the last class is always auto-generated and can be ignored
    const classes = Array.from(group.classList)
      .slice(0, group.classList.length - 1)
      .join(' ');

    // Assert
    // Check group attributes
    expect(group.getAttribute('transform')).toBe('rotate(0, 0, 0)');
    expect(classes).toBe(expectedClasses);
    // A tooltip should not have pointer events
    expect(group.getAttribute('style')).toBe('pointer-events: none;');

    // Check if the rectangle is omitted by default
    expect(rect).toBeUndefined();

    // Check if the label has the default attributes
    expect(text.textContent).toBe('Test');
    expect(text.getAttribute('fill')).toBe(expectedTextColor);
    expect(text.getAttribute('font-size')).toBe('14px');
    expect(text.getAttribute('font-family')).toBe('Arial');
    expect(text.getAttribute('font-weight')).toBe('bold');
    expect(text.getAttribute('opacity')).toBe('1');
  });

  it('checks if custom attributes are filled', () => {
    // Arrange
    const config = {
      x: 0,
      y: 0,
      text: 'Test',
      hasBackground: true,
      theme: 'dark'
    };
    // Name attribute of Label is predefined in Tooltip as 'tooltip'
    const expectedClasses = 'label label-tooltip';
    // Note that dark mode is enabled
    const expectedTextColor = 'white';
    const expectedBackgroundColor = 'black';

    // Tooltip wants a width and height that are 'auto' with 0 padding
    const padding = 0;
    // Tooltip wants a width and height that are 'auto'
    const expectedRectWidth = (text: SVGElement): number => {
      return text.getComputedTextLength() + padding;
    };
    const expectedRectHeight = (text: SVGElement): number => {
      return text.getBBox().height + padding;
    };

    // Act
    const [group, rect, text] = createTooltip(config);
    // Note that the last class is always auto-generated and can be ignored
    const classes = Array.from(group.classList)
      .slice(0, group.classList.length - 1)
      .join(' ');

    // Assert
    // Check group attributes
    expect(group.getAttribute('transform')).toBe('rotate(0, 0, 0)');
    expect(classes).toBe(expectedClasses);
    // A tooltip should not have pointer events
    expect(group.getAttribute('style')).toBe('pointer-events: none;');

    // Check if the rectangle is omitted by default
    expect(rect).toBeDefined();
    expect(rect.getAttribute('rx')).toBe('0');
    expect(rect.getAttribute('ry')).toBe('0');
    expect(rect.getAttribute('width')).toBe(`${expectedRectWidth(text)}`);
    expect(rect.getAttribute('height')).toBe(`${expectedRectHeight(text)}`);
    expect(rect.getAttribute('fill')).toBe(expectedBackgroundColor);
    expect(rect.getAttribute('fill-opacity')).toBe('0.7');
    expect(rect.getAttribute('stroke')).toBe('none');

    // Check if the label has the default attributes
    expect(text.textContent).toBe('Test');
    expect(text.getAttribute('fill')).toBe(expectedTextColor);
    expect(text.getAttribute('font-size')).toBe('14px');
    expect(text.getAttribute('font-family')).toBe('Arial');
    expect(text.getAttribute('font-weight')).toBe('bold');
    expect(text.getAttribute('opacity')).toBe('1');
  });
});

// This function practically just creates a Label, because a Tooltip is simply
// a Label with predefined syling
function createTooltip(config: object): [SVGElement, SVGElement, SVGElement] {
  // Add svg block to the document
  const svg = document.createElement('svg');
  svg.setAttribute('id', 'svg');
  document.body.appendChild(svg);

  // Add tooltip to svg block
  const { getByText } = render(Tooltip, config);
  const group = getByText('Test').parentNode as SVGElement;
  svg.appendChild(group);

  // Return the group, rect and text (which form the label together)
  // If there is no rect, then return group, text, and undefined
  return [
    group as SVGElement,
    group?.childNodes[0] as SVGElement,
    group?.childNodes[1] as SVGElement
  ];
}
