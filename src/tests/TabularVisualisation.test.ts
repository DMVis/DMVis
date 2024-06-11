// Imports
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

// DMVis imports
import { DataUtils } from '$lib/utils/DataUtils.js';
import TabularVisualisation from '$lib/components/visualisations/TabularVisualisation.svelte';

// Mock imports
import prepareSvgGetter from '../vitest/svgMock.js';
import VisualisationStoreWrapper from './VisualisationStoreWrapper.svelte';

prepareSvgGetter();

describe('General Tabular Visualisation rendering tests', () => {
  it('should render a Tabular Visualisation ', async () => {
    // Arrange
    const config = {};
    const expectedNumberOfColumns = 4;

    // Act
    const { tabularVisualisation } = await createTabularVisualisation(config);
    const columns = tabularVisualisation.querySelectorAll('.column');

    // Assert
    expect(tabularVisualisation).not.toBeNull();
    expect(columns.length).toBe(expectedNumberOfColumns);
  });

  it('should render a Tabular Visualisation with the correct number of bars', async () => {
    // Arrange
    const config = {};
    const expectedNumberOfRows = 9;

    // Act
    const { tabularVisualisation } = await createTabularVisualisation(config);
    const rows = tabularVisualisation.querySelectorAll('.bar');

    // Assert
    expect(rows.length).toBe(expectedNumberOfRows);
  });

  it('should apply optional configuration settings correctly', async () => {
    // Arrange
    const config = {
      showColumnLines: true,
      columnPadding: 20,
      barOpacity: 0.8
    };

    const expectedNumberOfLines = 5;

    // Act
    const { tabularVisualisation } = await createTabularVisualisation(config);

    // Assert
    const bars = tabularVisualisation.querySelectorAll('.bar');
    const lines = tabularVisualisation.querySelectorAll('.line');

    // Check column lines
    expect(lines.length).toBe(expectedNumberOfLines);

    // Check column padding
    const firstBarY = parseFloat(bars[0].getAttribute('y') || '0');
    const secondBarY = parseFloat(bars[1].getAttribute('y') || '0');
    expect(secondBarY - firstBarY).toBeGreaterThanOrEqual(config.columnPadding);

    // Check bar opacity
    bars.forEach((bar) => {
      expect(bar.getAttribute('fill-opacity')).toBe(`${config.barOpacity}`);
    });
  });
});

describe('Tabular Visualisation interactivity tests', () => {
  it('should highlight and unhighlight bars when entering and leaving', async () => {
    // Arrange
    // Set up the configuration for the visualisation
    const config = {};

    // Generate the tabular visualisation based on the config
    const { tabularVisualisation } = await createTabularVisualisation(config);

    // Select all elements with the class 'bar'
    const bars = tabularVisualisation.querySelectorAll('.bar');

    // Select all elements with the class 'label'
    const labels = tabularVisualisation.querySelectorAll('.label');

    // Get the text element child of the first label
    const firstLabelText = labels[0].querySelector('text') as Element;

    // Act
    // Simulate mouse entering the first bar
    await bars[0].dispatchEvent(
      new MouseEvent('mouseenter', { bubbles: true, clientX: 220, clientY: 127 })
    );

    // Assert
    // Check if the bars and the label text are highlighted
    checkHighlightState([firstLabelText, bars[0], bars[3], bars[6]], true);

    // Act
    // Simulate mouse leaving the first bar
    await bars[0].dispatchEvent(
      new MouseEvent('mouseleave', { bubbles: true, clientX: 220, clientY: 100 })
    );

    // Assert
    // Check if the bars and the label text are unhighlighted
    checkHighlightState([firstLabelText, bars[0], bars[3], bars[6]], false);
  });

  it('should highlight and unhighlight bars/labels when entering and leaving labels', async () => {
    // Arrange
    // Set up the configuration for the visualisation
    const config = {};

    // Generate the tabular visualisation based on the config
    const { tabularVisualisation } = await createTabularVisualisation(config);

    // Select all elements with the class 'bar'
    const bars = tabularVisualisation.querySelectorAll('.bar');

    // Select all elements with the class 'label'
    const labels = tabularVisualisation.querySelectorAll('.label');

    // Get the text element child of the second label
    const firstLabelText = labels[1].querySelector('text') as Element;

    // Act
    // Simulate mouse entering the text element of the second label
    await firstLabelText?.dispatchEvent(
      new MouseEvent('mouseenter', { bubbles: true, clientX: 220, clientY: 127 })
    );

    // Assert
    // Check if the second label text and the corresponding bars are highlighted
    checkHighlightState([firstLabelText, bars[1], bars[4], bars[7]], true);

    // Act
    // Simulate mouse leaving the text element of the second label
    await firstLabelText?.dispatchEvent(
      new MouseEvent('mouseleave', { bubbles: true, clientX: 220, clientY: 100 })
    );

    // Assert
    // Check if the second label text and the corresponding bars are unhighlighted
    checkHighlightState([firstLabelText, bars[1], bars[4], bars[7]], false);
  });

  it('should sort the data when the sort button is clicked', async () => {
    // Arrange
    // Set up the user event handling (using @ts-expect-error to bypass TypeScript error for demonstration purposes)
    // @ts-expect-error - Can't find setup in userEvent
    const user = userEvent.setup();

    // Set up the configuration for the visualisation
    const config = {};

    // Generate the tabular visualisation based on the config
    const { tabularVisualisation, getAllByRole } = await createTabularVisualisation(config);

    // Get all sort buttons (assuming buttons with names containing 'sort')
    const sortButtons = getAllByRole('button', { name: /sort/i });

    // Act
    // Click the first sort button (label)
    await user.click(sortButtons[0]);

    // Assert
    // Select the tabularVisualisation holding label names
    const labels = tabularVisualisation.querySelector('.labelNames');

    // Get all label elements under the labelNames tabularVisualisation
    const labelNames = labels?.querySelectorAll('.label');

    // Check if labelNames is defined and extract text content
    const labelTexts = labelNames ? Array.from(labelNames).map((label) => label.textContent) : [];

    // Check if the labels are sorted correctly
    expect(labelTexts).toStrictEqual(['x', 'y', 'z']);
  });

  it('drags the first column to the second position', async () => {
    // Arrange
    // Set up the configuration for the visualisation
    const config = {};

    // Generate the tabular visualisation based on the config
    const { tabularVisualisation } = await createTabularVisualisation(config);

    // Get the column names and their respective positions
    const colNames = Array.from(
      tabularVisualisation.querySelectorAll('.column-top > g > text')
    ).map((name) => name.textContent);
    const colPositions = Array.from(
      tabularVisualisation.querySelectorAll('.column-top > rect')
    ).map((rect) => rect.getAttribute('x'));

    // Act
    const columns = tabularVisualisation.getElementsByClassName('column-top');
    await columns[0].dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 100, clientY: 40 })
    );
    await columns[0].dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, screenX: 300, screenY: 40 })
    );
    await columns[0].dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true, clientX: 300, clientY: 40 })
    );

    // Assert
    const newColNames = Array.from(
      tabularVisualisation.querySelectorAll('.column-top > g > text')
    ).map((textElement) => textElement.textContent);
    const newColPositions = Array.from(
      tabularVisualisation.querySelectorAll('.column-top > rect')
    ).map((rect) => rect.getAttribute('x'));

    // First, we check the new indexes in for the columns; e.g. the column that used
    // to be at index 0 is now at index 1. This is to make sure that the new x-positions
    // that we check below actually apply to the right column.
    expect(newColNames[0]).toBe(colNames[1]);
    expect(newColNames[3]).toBe(colNames[0]);
    expect(newColNames[1]).toBe(colNames[2]);
    expect(newColNames[2]).toBe(colNames[3]);

    // Here we make sure that the x-positions of the columns updated correctly. We use the
    // same indices as above, except that we want the position for the column that was first
    // to be equal to the position of the column that is now first (the old second column), and
    // vice versa.
    expect(newColPositions[0]).toBe(colPositions[0]);
    expect(newColPositions[3]).toBe(colPositions[1]);
    expect(newColPositions[1]).toBe(colPositions[2]);
    expect(newColPositions[2]).toBe(colPositions[3]);
  });
});

// Helper function to check highlighted state
const checkHighlightState = (elements: Element[], shouldBeHighlighted: boolean) => {
  const state = shouldBeHighlighted ? 'toBeTruthy' : 'toBeFalsy';
  elements.forEach((element) => {
    expect(element.classList.contains('highlighted'))[state]();
  });
};

async function createTabularVisualisation(customConfig: object, customData: string | null = null) {
  // Prepare data
  const data = customData != null ? customData : 'label,a,b,c\nz,15,5,10\ny,5,10,10\nx,10,15,10\n';
  const dataUtil = new DataUtils();

  if (data === '') {
    await expect(
      (async () => {
        await dataUtil.parseCSV(data);
      })()
    ).rejects.toThrowError();
  } else {
    dataUtil.parseCSV(data);
  }

  // Setup Tabular Visualisation component and render it
  const config = { dataUtil, ...customConfig };
  const { container, getAllByRole, rerender } = render(VisualisationStoreWrapper, {
    props: { Component: TabularVisualisation, config }
  });
  return {
    tabularVisualisation: container.querySelector('.tabularVisualisation') as HTMLElement,
    getAllByRole,
    rerender: (newConfig: object) =>
      rerender({ Component: TabularVisualisation, config: { ...config, ...newConfig } })
  };
}
