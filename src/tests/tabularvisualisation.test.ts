// Imports
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/svelte';
import prepareSvgGetter from '../vitest/svgMock.js';
import { describe, it, expect } from 'vitest';

// DMVis imports
import StoreWrapper from './StoreWrapper.svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';
import TabularVisualisation from '$lib/components/visualisations/TabularVisualisation.svelte';

prepareSvgGetter();

describe('General Tabular Visualisation rendering tests', () => {
  it('should render a Tabular Visualisation ', async () => {
    // Arrange
    const config = {};
    const expectedNumberOfColumns = 4;

    // Act
    const { tabularVisualisation } = await generateTabularVisualisation(config);
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
    const { tabularVisualisation } = await generateTabularVisualisation(config);
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
    const { tabularVisualisation } = await generateTabularVisualisation(config);

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
    const { tabularVisualisation } = await generateTabularVisualisation(config);

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
    const { tabularVisualisation } = await generateTabularVisualisation(config);

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
    const { tabularVisualisation, getAllByRole } = await generateTabularVisualisation(config);

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
    expect(labelTexts).toStrictEqual(['z', 'y', 'x']);
  });
});

// Helper function to check highlighted state
const checkHighlightState = (elements: Element[], shouldBeHighlighted: boolean) => {
  const state = shouldBeHighlighted ? 'toBeTruthy' : 'toBeFalsy';
  elements.forEach((element) => {
    expect(element.classList.contains('highlighted'))[state]();
  });
};

async function generateTabularVisualisation(
  customConfig: object,
  customData: string | null = null
) {
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
  const { container, getAllByRole, rerender } = render(StoreWrapper, {
    props: { Component: TabularVisualisation, config }
  });
  return {
    tabularVisualisation: container.querySelector('.tabularVisualisation') as HTMLElement,
    getAllByRole,
    rerender: (newConfig: object) =>
      rerender({ Component: TabularVisualisation, config: { ...config, ...newConfig } })
  };
}
