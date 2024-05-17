// Imports
import { render } from '@testing-library/svelte';
import prepareSvgGetter from '../vitest/svgMock.js';
import { describe, it, expect } from 'vitest';

// DMVis imports
import StoreWrapper from './StoreWrapper.svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';
import ScatterplotMatrix from '$lib/components/visualisations/ScatterplotMatrix.svelte';

prepareSvgGetter();

describe('Scatterplot matrix tests', () => {
  it('renders a Scatterplotmatrix', async () => {
    // Arrange
    const config = {};
    const expectedAmountOfScatterplots = 6;

    // Act
    const scatterplotMatrix = await generateScatterplotMatrix(config);
    const scatterplots = scatterplotMatrix.querySelectorAll('.scatterplot');

    // Assert
    expect(scatterplotMatrix).not.toBeNull();
    expect(scatterplots.length).toBe(expectedAmountOfScatterplots); // Expected number of scatterplots
  });

  it('renders a Scatterplotmatrix with custom width and height', async () => {
    // Arrange
    const config = { width: 750, height: 750 };
    const expectedAmountOfScatterplots = 6;

    // Act
    const scatterplotMatrix = await generateScatterplotMatrix(config);
    const scatterplots = scatterplotMatrix.querySelectorAll('.scatterplot');

    // Assert
    expect(scatterplotMatrix).not.toBeNull();
    expect(scatterplots.length).toBe(expectedAmountOfScatterplots); // Expected number of scatterplots
    expect(Number(scatterplotMatrix.getAttribute('width'))).toBe(config.width);
    expect(Number(scatterplotMatrix.getAttribute('height'))).toBe(config.height);
  });
});

describe('Scatterplot matrix interaction tests', () => {
  it('should swap two columns when dragging one column over the other', async () => {
    // Arrange
    const config = { width: 750, height: 750 };
    const scatterplotMatrix = await generateScatterplotMatrix(config);
    const draggables = scatterplotMatrix.querySelectorAll('.draggable');

    // Act
    const firstDraggable = draggables[0].parentElement?.classList[0];
    const secondDraggable = draggables[1].parentElement?.classList[0];

    // Start dragging at the initial position of the first draggable
    await draggables[0].dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 125, clientY: 125 })
    );
    // Move the draggable to the position of the third draggable
    await draggables[0].dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, screenX: 300, screenY: 300 })
    );
    // Drop the draggable at the position of the third draggable
    await draggables[0].dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true, clientX: 300, clientY: 300 })
    );

    // Assert
    const updatedDraggables = scatterplotMatrix.querySelectorAll('.draggable');

    expect(updatedDraggables[0].parentElement?.classList[0]).toBe(secondDraggable);
    expect(updatedDraggables[1].parentElement?.classList[0]).toBe(firstDraggable);
  });

  it('should highlight the labels when hovering over a scatterplot', async () => {
    // Arrange
    const config = { width: 750, height: 750 };
    const scatterplotMatrix = await generateScatterplotMatrix(config);
    const scatterplots = scatterplotMatrix.querySelectorAll('.scatterplot');
    const labels = scatterplotMatrix.querySelectorAll('.label');

    // Ensure TypeScript recognizes the onmouseover property
    const scatterplot = scatterplots[0] as HTMLElement;

    // Act
    await scatterplot.dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, clientX: 125, clientY: 300 })
    );

    // Assert
    expect(labels[0].children[0].classList).toContain('highlighted');
    expect(labels[0].children[1].classList).toContain('highlighted');
    expect(labels[1].children[0].classList).toContain('highlighted');
    expect(labels[1].children[1].classList).toContain('highlighted');
    expect(labels[2].children[0].classList).not.toContain('highlighted');
    expect(labels[2].children[1].classList).not.toContain('highlighted');
  });

  it('should remove the highlight from the labels when the mouse leaves the scatterplot', async () => {
    // Arrange
    const config = { width: 750, height: 750 };
    const scatterplotMatrix = await generateScatterplotMatrix(config);
    const scatterplots = scatterplotMatrix.querySelectorAll('.scatterplot');
    const labels = scatterplotMatrix.querySelectorAll('.label');

    // Ensure TypeScript recognizes the onmouseout property
    const scatterplot = scatterplots[0] as HTMLElement;

    // Act
    await scatterplot.dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, clientX: 125, clientY: 300 })
    );
    await scatterplot.dispatchEvent(
      new MouseEvent('mouseout', { bubbles: true, clientX: 125, clientY: 300 })
    );

    // Assert
    expect(labels[0].children[0].classList).not.toContain('highlighted');
    expect(labels[0].children[1].classList).not.toContain('highlighted');
    expect(labels[1].children[0].classList).not.toContain('highlighted');
    expect(labels[1].children[1].classList).not.toContain('highlighted');
    expect(labels[2].children[0].classList).not.toContain('highlighted');
    expect(labels[2].children[1].classList).not.toContain('highlighted');
  });

  it('should highlight and unhighlight a point in all scatterplots when clicking it', async () => {
    // Arrange
    const config = { width: 750, height: 750 };
    const scatterplotMatrix = await generateScatterplotMatrix(config);
    const scatterplots = scatterplotMatrix.querySelectorAll('.scatterplot');
    const points = scatterplotMatrix.querySelectorAll('.point-Belgium');

    // Get the transform of the scatterplot
    const transform = scatterplots[0].parentElement?.getAttribute('transform');
    let { x, y } = getTransformCoordinates(transform);

    // Get the coordinates of the point
    x = parseFloat(points[1].getAttribute('cx') || '0') + x;
    y = parseFloat(points[1].getAttribute('cy') || '0') + y;

    // Ensure TypeScript recognizes the onmouseover property
    const point = points[0] as HTMLElement;

    // Act
    // Move the mouse over the point
    await point.dispatchEvent(
      new MouseEvent('mouseenter', { bubbles: true, clientX: x, clientY: y })
    );

    // Click the point
    await point.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y })
    );

    // Move the mouse away from the point
    await point.dispatchEvent(
      new MouseEvent('mouseleave', { bubbles: true, clientX: x + 50, clientY: y - 50 })
    );

    // Assert
    points.forEach((point) => {
      expect(point.classList).toContain('highlighted');
    });

    // Act
    // Move to point again
    await point.dispatchEvent(
      new MouseEvent('mouseenter', { bubbles: true, clientX: x, clientY: y })
    );

    await point.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y })
    );

    await point.dispatchEvent(
      new MouseEvent('mouseleave', { bubbles: true, clientX: x + 50, clientY: y - 50 })
    );

    // Assert
    points.forEach((point) => {
      expect(point.classList).not.toContain('highlighted');
    });
  });

  it('should highlight and unhighlight a point in all scatterplots when entering and leaving it', async () => {
    // Arrange
    const config = { width: 750, height: 750 };
    const scatterplotMatrix = await generateScatterplotMatrix(config);
    const scatterplots = scatterplotMatrix.querySelectorAll('.scatterplot');
    const points = scatterplotMatrix.querySelectorAll('.point-Belgium');

    // Get the transform of the scatterplot
    const transform = scatterplots[0].parentElement?.getAttribute('transform');
    let { x, y } = getTransformCoordinates(transform);

    // Get the coordinates of the point
    x = parseFloat(points[1].getAttribute('cx') || '0') + x;
    y = parseFloat(points[1].getAttribute('cy') || '0') + y;

    // Ensure TypeScript recognizes the onmouseover property
    const point = points[0] as HTMLElement;

    // Act
    // Move the mouse over the point
    await point.dispatchEvent(
      new MouseEvent('mouseenter', { bubbles: true, clientX: x, clientY: y })
    );

    // Assert
    points.forEach((point) => {
      expect(point.classList).toContain('highlighted');
    });

    // Act
    // Move the mouse away from the point
    await point.dispatchEvent(
      new MouseEvent('mouseleave', { bubbles: true, clientX: x + 50, clientY: y - 50 })
    );

    // Assert
    points.forEach((point) => {
      expect(point.classList).not.toContain('highlighted');
    });
  });

  it('should show a tooltip with the correct label when hovering over a point', async () => {
    // Arrange
    const config = { width: 750, height: 750 };
    const scatterplotMatrix = await generateScatterplotMatrix(config);
    const scatterplots = scatterplotMatrix.querySelectorAll('.scatterplot');
    const points = scatterplotMatrix.querySelectorAll('.point-Belgium');

    // Get the transform of the scatterplot
    const transform = scatterplots[0].parentElement?.getAttribute('transform');
    let { x, y } = getTransformCoordinates(transform);

    // Get the coordinates of the point
    x = parseFloat(points[1].getAttribute('cx') || '0') + x;
    y = parseFloat(points[1].getAttribute('cy') || '0') + y;

    // Ensure TypeScript recognizes the onmouseover property
    const point = points[0] as HTMLElement;

    // Act
    // Move the mouse over the point
    await point.dispatchEvent(
      new MouseEvent('mouseenter', { bubbles: true, clientX: x, clientY: y })
    );

    // Assert
    const tooltip = scatterplotMatrix.querySelector('.label-tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip?.textContent).toBe('Belgium');
  });

  it('should draw a static line when inside a scatterplot', async () => {
    // Arrange
    const config = { width: 750, height: 750 };
    const scatterplotMatrix = await generateScatterplotMatrix(config);
    const scatterplots = scatterplotMatrix.querySelectorAll('.scatterplot');

    // Ensure TypeScript recognizes the onmouseover property
    const scatterplot = scatterplots[0] as HTMLElement;

    // Act
    await scatterplot.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, clientX: 100, clientY: 300 })
    );

    const lines = scatterplotMatrix.querySelectorAll('.line');

    // Assert
    expect(lines.length).toBe(2); // There are always only two static lines (top/bottom and left/right)
    expect(lines[0].getAttribute('d')).toBe('M100,300L40,300');
    expect(lines[1].getAttribute('d')).toBe('M100,300L100,710');
  });
});

/**
 * Extracts x and y coordinates from a 'translate(x,y)' transform string.
 *
 * Regex explanation:
 * - /translate\(([^,]+),([^)]+)\)/:
 *   - `translate\(`: Matches 'translate('.
 *   - `([^,]+)`: Captures x coordinate.
 *   - `,`: Matches comma.
 *   - `([^)]+)`: Captures y coordinate.
 *   - `\)`: Matches closing parenthesis.
 */
function getTransformCoordinates(transform: string | null | undefined) {
  const translateRegex = /translate\(([^,]+),([^)]+)\)/;
  const matches = transform?.match(translateRegex);
  return {
    x: matches ? parseFloat(matches[1]) : 0,
    y: matches ? parseFloat(matches[2]) : 0
  };
}

async function generateScatterplotMatrix(customConfig: object, customData: string | null = null) {
  // Prepare data
  const data = customData
    ? customData
    : '[{"Country": "Netherlands","Inhabitants": 0,"GDP": 0, "Happiness": 20},{"Country": "Germany","Inhabitants": 3,"GDP": 8, "Happiness": 8},{"Country": "Belgium","Inhabitants": 6,"GDP": 6, "Happiness": 7},{"Country": "France","Inhabitants": 8,"GDP": 3, "Happiness": 10},{"Country": "UK","Inhabitants": 10,"GDP": 10, "Happiness": 1}]';
  const dataUtil = new DataUtils();
  dataUtil.parseJSON(data);

  // Setup ScatterplotMatrix component and render it
  const config = { dataUtil, ...customConfig };
  const { container } = render(StoreWrapper, { props: { Component: ScatterplotMatrix, config } });
  return container.querySelector('.scatterplotMatrix') as HTMLElement;
}
