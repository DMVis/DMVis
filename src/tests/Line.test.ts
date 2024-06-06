// Imports
import { describe, it, expect } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';

// DMVis imports
import Line from '$lib/components/base/Line.svelte';

// Mock imports
import prepareSvgGetter from '../vitest/svgMock.js';
import VisualisationStoreWrapper from './VisualisationStoreWrapper.svelte';

prepareSvgGetter();

describe('Render test', () => {
  it('renders lines in accordance to the test data', () => {
    // Arrange
    const config = {};

    // Act
    const lineGroup = createLines(config);
    const lines = lineGroup.getElementsByClassName('line');

    // Assert
    expect(lines.length).equals(5);
    expect(lines[0].getAttribute('d')).toBe(`M0,107.84313725490198L500,1000L1000,1000`);
  });
});

describe('Event test', () => {
  it('checks if the events on the lines work', async () => {
    // Note that this test simulates a sequence of events
    // Arrange
    const config = { hoverable: true };

    // Act
    const lineGroup = createLines(config);
    const lineOne = lineGroup.getElementsByClassName('line')[0];

    // Simulate mouseEnter event
    await waitFor(() => {
      return fireEvent.mouseEnter(lineOne);
    });

    // Assert
    // Check if line color changes on mouse enter event
    expect(lineOne.getAttribute('stroke')).toBe('#FF0000');

    // Act again
    // Simulate mouseLeave event
    await waitFor(() => {
      return fireEvent.mouseLeave(lineOne);
    });

    // Assert again
    // Check if line color resets on mouse leave event
    expect(lineOne.getAttribute('stroke')).toBe('#FF4444');
  });
});

describe('Attribute test', () => {
  it('checks if default attributes are filled', () => {
    // Arrange
    const config = {};

    // Act
    const lineGroup = createLines(config);
    const line = lineGroup.getElementsByClassName('line')[0];

    // Assert
    // Check defaut values
    expect(line.getAttribute('stroke')).toBe('#FF4444');
    expect(line.getAttribute('stroke-width')).toBe('1');
  });

  it('checks if custom attributes are filled', () => {
    // Arrange
    const config = { hoverable: true, lineWidth: 2 };

    // Act
    const lineGroup = createLines(config);
    const line = lineGroup.getElementsByClassName('line')[0];

    // Assert
    expect(line.getAttribute('stroke-width')).toBe('2');
  });
});

function createLines(config: object): SVGGElement {
  // Render lines and return the respective element
  const { container } = render(VisualisationStoreWrapper, { props: { Component: Line, config } });
  const hoverlines = container.getElementsByClassName('line-group')[0] as SVGGElement;
  return hoverlines;
}
