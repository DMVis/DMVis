import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import ParallelCoordinates from '$lib/components/visualisations/ParallelCoordinates.svelte';
import StoreWrapper from './StoreWrapper.svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';
import prepareSvgGetter from '../vitest/svgMock.js';
import { StyleUtils } from '$lib/utils/StyleUtils.js';

prepareSvgGetter();
const styleUtil = new StyleUtils();

describe('Basic Parallel Coordinates rendering', async () => {
  it('renders a simple Parallel Coordinates visualisation', async () => {
    // Arrange
    const config = {};
    const expectedWidth = 175 * 3; // Default column width * amount of columns
    const expectedHeight = 3 * 12 * 1.5; // Amount of rows * fontsize * 1.5
    const expectedAmountOfAxes = 3; // Amount of axes (one per column in data)
    const expectedAmountOfLines = 3; // Amount of lines (one per row in data)

    // Act
    const parallelCoordinates = await generateParallelCoordinates(config);

    // Assert
    expect(parallelCoordinates).not.toBeNull();
    expect(Number(parallelCoordinates.getAttribute('width'))).toBe(expectedWidth);
    expect(Number(parallelCoordinates.getAttribute('height'))).toBe(expectedHeight);
    expect(parallelCoordinates.getElementsByClassName('axis').length).toBe(expectedAmountOfAxes);
    expect(parallelCoordinates.getElementsByClassName('line').length).toBe(expectedAmountOfLines);
  });

  it('renders a Parallel Coordinates visualisation with only one entry', async () => {
    // Arrange
    const config = {};
    const expectedWidth = 175 * 2; // Default column width * amount of columns
    const expectedHeight = 1 * 12 * 1.5; // Amount of rows * fontsize * 1.5
    const expectedAmountOfAxes = 2; // Amount of axes (one per column in data)
    const expectedAmountOfLines = 1; // Amount of lines (one per row in data)

    // Act
    const parallelCoordinates = await generateParallelCoordinates(config, 'a,b\n1,2');

    // Assert
    expect(parallelCoordinates).not.toBeNull();
    expect(Number(parallelCoordinates.getAttribute('width'))).toBe(expectedWidth);
    expect(Number(parallelCoordinates.getAttribute('height'))).toBe(expectedHeight);
    expect(parallelCoordinates.getElementsByClassName('axis').length).toBe(expectedAmountOfAxes);
    expect(parallelCoordinates.getElementsByClassName('line').length).toBe(expectedAmountOfLines);
  });

  it('renders a Parallel Coordinates visualisation with custom height and width', async () => {
    // Arrange
    const config = {
      width: 500,
      height: 500
    };

    // Act
    const parallelCoordinates = await generateParallelCoordinates(config);

    // Assert
    expect(parallelCoordinates).not.toBeNull();
    expect(Number(parallelCoordinates.getAttribute('width'))).toBe(config.width);
    expect(Number(parallelCoordinates.getAttribute('height'))).toBe(config.height);
    expect(parallelCoordinates.getElementsByClassName('axis').length).toBe(3); // One axis per column in dataset
  });
});

describe('Interactive Parallel Coordinates', async () => {
  it('highlights and raises a line when hovering over it', async () => {
    // Arrange
    const config = {};
    const parallelCoordinates = (await generateParallelCoordinates(config)) as HTMLElement;
    const lines = parallelCoordinates.getElementsByClassName('line');
    const firstLineID = lines[0].getAttribute('id');

    // Act
    // Simulate mouseEnter event
    await waitFor(() => {
      return fireEvent.mouseEnter(lines[0]);
    });

    // Assert
    expect(lines.length).toBe(3); // One line per row in the data
    expect(lines[0].getAttribute('stroke')).toBe(styleUtil.color); // This line is not highlighted
    expect(lines[1].getAttribute('stroke')).toBe(styleUtil.color); // This line is not highlighted
    expect(lines[2].getAttribute('stroke')).toBe(styleUtil.focusColor); // This line is highlighted and raised (because it is now at index 2)
    expect(lines[2].getAttribute('id')).toBe(firstLineID); // Checks whether the line at index 2 is actually the line that was clicked

    // Act again
    // Simulate mouseLeave event
    await waitFor(() => {
      return fireEvent.mouseLeave(lines[2]);
    });

    // Assert again
    expect(lines.length).toBe(3); // One line per row in the data
    expect(lines[0].getAttribute('stroke')).toBe(styleUtil.color); // This line is not highlighted
    expect(lines[1].getAttribute('stroke')).toBe(styleUtil.color); // This line is not highlighted
    expect(lines[2].getAttribute('stroke')).toBe(styleUtil.color); // This line is not highlighted
  });

  it('highlights and raises a line when clicking', async () => {
    // Arrange
    const config = {};
    const parallelCoordinates = (await generateParallelCoordinates(config)) as HTMLElement;
    const lines = parallelCoordinates.getElementsByClassName('line');
    const firstLineID = lines[0].getAttribute('id');

    // Act
    // First we highlight one line by clicking it
    // Simulate mouseEnter and mouseDown events
    await waitFor(() => {
      return fireEvent.mouseEnter(lines[0]);
    });
    await waitFor(() => {
      return fireEvent.mouseDown(lines[0]);
    });

    // Assert
    expect(lines.length).toBe(3); // One line per row in the data
    expect(lines[0].getAttribute('stroke')).toBe(styleUtil.color); // This line is not highlighted
    expect(lines[1].getAttribute('stroke')).toBe(styleUtil.color); // This line is not highlighted
    expect(lines[2].getAttribute('stroke')).toBe(styleUtil.focusColor); // This line is hovered and raised (because it is now at index 2)
    expect(lines[2].getAttribute('id')).toBe(firstLineID); // Checks whether the line at index 2 is actually the line that was clicked

    // Act again
    // We stop hovering over the highlighted line and hover another, to make sure the
    //  clicked one stays highlighted and the other line does not get highlighted
    // Simulate mouseLeave event and mouseEnter event on a different line
    await waitFor(() => {
      return fireEvent.mouseLeave(lines[2]);
    });
    await waitFor(() => {
      return fireEvent.mouseEnter(lines[1]);
    });

    // Assert again
    expect(lines.length).toBe(3); // One line per row in the data
    expect(lines[0].getAttribute('stroke')).toBe(styleUtil.color); // This line is not highlighted
    expect(lines[1].getAttribute('stroke')).toBe(styleUtil.color); // This line is hovered but not highlighted
    expect(lines[2].getAttribute('stroke')).toBe(styleUtil.focusColor); // This line is still highlighted but not hovered

    // Act again
    // We go back to the clicked line and click again to stop highlighting it
    // Simulate mouseUp event
    await waitFor(() => {
      return fireEvent.mouseLeave(lines[1]);
    });
    await waitFor(() => {
      return fireEvent.mouseEnter(lines[2]);
    });
    await waitFor(() => {
      return fireEvent.mouseDown(lines[2]);
    });

    // Assert again
    expect(lines.length).toBe(3); // One line per row in the data
    expect(lines[0].getAttribute('stroke')).toBe(styleUtil.color); // This line is not highlighted
    expect(lines[1].getAttribute('stroke')).toBe(styleUtil.color); // This line is not highlighted
    expect(lines[2].getAttribute('stroke')).toBe(styleUtil.color); // This line is not highlighted
  });

  it('drags the first axis to the second position', async () => {
    // Arrange
    const config = {
      width: 500,
      height: 500,
      marginLeft: 0,
      marginRight: 0
    };
    const parallelCoordinates = (await generateParallelCoordinates(config)) as HTMLElement;

    // Store the column names of the first and the second axes
    const firstAxis = parallelCoordinates.getElementsByClassName('label')[0].children[0];

    // Act
    // TypeScript error about 'await' can be ignored because we actually do need to await these expressions
    await firstAxis.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 90, clientY: -20 })
    );
    await firstAxis.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, screenX: 300, screenY: 0 })
    );
    await firstAxis.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true, clientX: 300, clientY: 0 })
    );

    // Assert
    // Check whether the label that was originally on the second axis is now on the first axis
    //  and whether the x-position of the (now) first axis is correct
    expect(parallelCoordinates.getElementsByClassName('label')[0].children[0].textContent).toBe(
      'b'
    );
    expect(
      parallelCoordinates.getElementsByClassName('axisElement')[0].getAttribute('transform')
    ).toBe('translate(0, 0)');

    // Check whether the label that was originally on the first axis is now on the second axis
    //  and whether the x-position of the (now) second axis is correct
    expect(parallelCoordinates.getElementsByClassName('label')[1].children[0].textContent).toBe(
      'a'
    );
    expect(
      parallelCoordinates.getElementsByClassName('axisElement')[1].getAttribute('transform')
    ).toBe('translate(250, 0)');
  });

  it('checks line paths after dragging the first axis to the second position', async () => {
    // Arrange
    const config = {
      width: 100,
      height: 100,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0
    };
    const parallelCoordinates = (await generateParallelCoordinates(
      config,
      'a,b,c\n10,0,10\n0,10,0'
    )) as HTMLElement;

    // Store the column names of the first and the second axes
    const firstAxis = parallelCoordinates.getElementsByClassName('label')[0].children[0];

    // Assert
    // Check whether the paths of the original lines are correct
    const lines = parallelCoordinates.getElementsByClassName('line-group')[0].children;

    // Check whether the path of the first line has changed accordingly
    // Path Y-values at the start are [0,100,0]
    expect(lines[0].getAttribute('d')).toBe('M0,0L50,100L100,0');

    // Check whether the path of the second line has changed accordingly
    // Path Y-values at the start are [100,0,100]
    expect(lines[1].getAttribute('d')).toBe('M0,100L50,0L100,100');

    // Act
    // TypeScript error about 'await' can be ignored because we actually do need to await these expressions
    await firstAxis.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 90, clientY: -20 })
    );
    await firstAxis.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, screenX: 300, screenY: 0 })
    );
    await firstAxis.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true, clientX: 300, clientY: 0 })
    );

    // Assert
    const newLines = parallelCoordinates.getElementsByClassName('line-group')[0].children;

    // Check whether the path of the first line has changed accordingly
    // Path Y-values at the end are [100,0,0] since axis 0 and 1 are swapped
    expect(newLines[0].getAttribute('d')).toBe('M0,100L50,0L100,0');

    // Check whether the path of the second line has changed accordingly
    // Path Y-values at the end are [0,100,100] since axis 0 and 1 are swapped
    expect(newLines[1].getAttribute('d')).toBe('M0,0L50,100L100,100');
  });
});

async function generateParallelCoordinates(customConfig: object, customData: string | null = null) {
  // Prepare data
  const data = customData != null ? customData : 'a,b,c\n1,2,3\n4,5,6\n7,8,9';
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

  // Setup Parallel Coordinates component and render it
  const config = { dataUtil, ...customConfig };
  const { container } = render(StoreWrapper, { props: { Component: ParallelCoordinates, config } });
  return container.querySelector('.parallelCoordinates') as HTMLElement;
}
