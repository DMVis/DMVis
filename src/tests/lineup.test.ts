import { act, fireEvent, render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import LineUp from '$lib/components/visualisations/LineUp.svelte';
import StoreWrapper from './StoreWrapper.svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Basic LineUp rendering', async () => {
  it('renders a LineUp', async () => {
    // Arrange
    const config = {};

    // Act
    const container = await generateLineUp(config);

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(150 * (4 + 2)); // Default column width * (amount of columns + rank & select columns)
    expect(Number(container.getAttribute('height'))).toBe(120 + 3 * 20); // Column top height + (amount of rows * row height)
    expect(container.getElementsByClassName('column').length).toBe(4 + 2); // Columns from data + rank & select columns
  });

  it('renders a LineUp with zero rows', async () => {
    // Arrange
    const config = {};

    // Act
    const container = await generateLineUp(config, 'a,b,c');

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(150 * (3 + 2)); // Default column width * (amount of columns + rank & select columns)
    expect(Number(container.getAttribute('height'))).toBe(120); // Column top height
    expect(container.getElementsByClassName('column').length).toBe(3 + 2); // Columns from data + rank & select columns
  });

  it('renders a LineUp with no data', async () => {
    // Arrange
    const config = {};

    // Act
    const container = await generateLineUp(config, '');

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(150 * 2); // Default column width * rank & select columns
    expect(Number(container.getAttribute('height'))).toBe(120); // Column top height
    expect(container.getElementsByClassName('column').length).toBe(2); // Rank & select columns
  });

  it('renders a LineUp with custom column width', async () => {
    // Arrange
    const config = { columnWidth: 100 };

    // Act
    const container = await generateLineUp(config);

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(config.columnWidth * (4 + 2)); // Custom column width * (amount of columns + rank & select columns)
    expect(Number(container.getAttribute('height'))).toBe(120 + 3 * 20); // Column top height + (amount of rows * row height)
    expect(container.getElementsByClassName('column').length).toBe(4 + 2); // Columns from data + rank & select columns
  });
});

describe('Interactive LineUp columns & rows', async () => {
  it('selects a row when clicking a checkbox', async () => {
    // Arrange
    const config = {};
    const container = await generateLineUp(config);

    // Act
    await (container.querySelector('#select-0') as HTMLInputElement)?.click();

    // Assert
    const rows = container.getElementsByClassName('lineUp-highlights')[0].children;
    expect(rows[0]).toBeDefined();
    expect(rows[0].getAttribute('y')).toBe('120');
  });

  it('selects a row when clicking the background', async () => {
    // Arrange
    const config = {};
    const container = await generateLineUp(config);

    // Act
    const background = container.querySelectorAll('.column-bottom-background')[0] as HTMLElement;
    await background.dispatchEvent(
      new MouseEvent('click', {
        // Click at the center of the first column row
        clientX: 75,
        clientY: 20
      })
    );

    // Assert
    const rows = container.getElementsByClassName('lineUp-highlights')[0].children;
    expect(rows[0]).toBeDefined();
    expect(rows[0].getAttribute('y')).toBe('120'); // Selected first row, which starts at 120
  });

  it('selects 3 rows when holding shift', async () => {
    // Arrange
    const config = {};
    const container = await generateLineUp(config);

    // Act
    const background = container.querySelectorAll('.column-bottom-background')[0] as HTMLElement;
    await background.dispatchEvent(
      new MouseEvent('click', {
        // Click at the center of the first column row
        clientX: 75,
        clientY: 20
      })
    );

    // Hold the shift key
    await container.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Shift'
      })
    );

    // Act
    await background.dispatchEvent(
      new MouseEvent('click', {
        // Click at the center of the third column row
        clientX: 75,
        clientY: 60
      })
    );

    // Assert
    const rows = container.getElementsByClassName('lineUp-highlights')[0].children;
    expect(rows.length).toBe(3);
  });

  it('selects 2 rows when holding ctrl', async () => {
    // Arrange
    const config = {};
    const container = await generateLineUp(config);

    // Act
    const background = container.querySelectorAll('.column-bottom-background')[0] as HTMLElement;
    await background.dispatchEvent(
      new MouseEvent('click', {
        // Click at the center of the first column row
        clientX: 75,
        clientY: 20
      })
    );

    // Hold the shift key
    await container.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Control'
      })
    );

    // Act
    await background.dispatchEvent(
      new MouseEvent('click', {
        // Click at the center of the third column row
        clientX: 75,
        clientY: 60
      })
    );

    // Assert
    const rows = container.getElementsByClassName('lineUp-highlights')[0].children;
    expect(rows.length).toBe(2);
    expect(rows[0]).toBeDefined();
    expect(rows[0].getAttribute('y')).toBe('120'); // Selected first row, which starts at 120
    expect(rows[1]).toBeDefined();
    expect(rows[1].getAttribute('y')).toBe('160'); // Selected third row, which starts at 160
  });

  it('highlights and unhighlights a row when hovering over it', async () => {
    // Arrange
    const config = {};
    const container = await generateLineUp(config);

    // Act
    const background = container.querySelectorAll('.column-bottom')[0] as HTMLElement;
    await background.dispatchEvent(
      new MouseEvent('mousemove', {
        // Hover at the center of the first column row
        clientX: 75,
        clientY: 20
      })
    );

    // Assert
    const rows = container.getElementsByClassName('lineUp-highlights')[0].children;
    expect(rows[0]).toBeDefined();
    expect(rows[0].getAttribute('y')).toBe('120'); // Hovered first row, which starts at 120

    // Act
    await background.dispatchEvent(
      new MouseEvent('mousemove', {
        // Hover out of the first column row
        clientX: 75,
        clientY: 0
      })
    );

    // Assert
    expect(rows[0]).toBeUndefined();
  });

  it('drags the first column to the second position', async () => {
    // Arrange
    const config = {};
    const container = await generateLineUp(config);

    // Act
    const columns = container.getElementsByClassName('column-top');
    await columns[0].dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 75, clientY: 10 })
    );
    await columns[0].dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, screenX: 200, screenY: 10 })
    );
    await columns[0].dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true, clientX: 200, clientY: 10 })
    );

    // Assert
    const columnResult = Array.from(container.getElementsByClassName('column'));
    expect(columnResult[0].id).toBe('LineUpSelect-column');
    expect(columnResult[1].id).toBe('LineUpRank-column');
  });
});

describe('LineUp column actions', async () => {
  it('sorts a column when clicking the sort icon', async () => {
    // Arrange
    const config = {};
    const container = await generateLineUp(config);

    // Assert
    let column = container.querySelectorAll('.column-bottom > g')[2]; // Testing using the 'a' column
    let columnWidths = getBarWidths(column);
    expect(columnWidths[1] > columnWidths[2] && columnWidths[2] > columnWidths[0]); // Original order

    // Act
    let sortIcon = container
      .querySelectorAll('.column')[2]
      .querySelectorAll('.column-options > svg')[0] as HTMLElement;
    await sortIcon.dispatchEvent(new MouseEvent('mousedown'));

    // Assert
    column = container.querySelectorAll('.column-bottom > g')[3];
    columnWidths = getBarWidths(column);
    expect(columnWidths[0] > columnWidths[1] && columnWidths[1] > columnWidths[2]); // Ascending

    // Act
    sortIcon = container
      .querySelectorAll('.column')[2]
      .querySelectorAll('.column-options > svg')[0] as HTMLElement;
    await sortIcon.dispatchEvent(new MouseEvent('mousedown'));

    // Assert
    column = container.querySelectorAll('.column-bottom > g')[3];
    columnWidths = getBarWidths(column);
    expect(columnWidths[2] > columnWidths[1] && columnWidths[1] > columnWidths[0]); // Descending

    // Act
    sortIcon = container
      .querySelectorAll('.column')[2]
      .querySelectorAll('.column-options > svg')[0] as HTMLElement;
    await sortIcon.dispatchEvent(new MouseEvent('mousedown'));

    // Assert
    column = container.querySelectorAll('.column-bottom > g')[3];
    columnWidths = getBarWidths(column);
    expect(columnWidths[1] > columnWidths[2] && columnWidths[2] > columnWidths[0]); // Original order
  });

  it('filters a column when filling in the filter fields', async () => {
    // Arrange
    const config = {};
    const container = await generateLineUp(config);

    // Act - Show filter fields
    let filterIcon = container
      .querySelectorAll('.column')[3]
      .querySelectorAll('.column-options > svg')[1] as HTMLElement;
    await filterIcon.dispatchEvent(new MouseEvent('mousedown'));

    // Act - Get and fill min filter field
    const columnAFilterMin = container.getElementsByClassName(
      'filter-bar-min'
    )[0] as HTMLInputElement;
    await act(() => fireEvent.input(columnAFilterMin, { target: { value: '7' } }));
    await columnAFilterMin.dispatchEvent(new Event('change'));

    // Assert
    let column = container.querySelectorAll('.column-bottom > g')[2];
    let columnWidths = getBarWidths(column);
    expect(columnWidths.length).toBe(2);

    // Act - Show filter fields
    filterIcon = container
      .querySelectorAll('.column')[3]
      .querySelectorAll('.column-options > svg')[1] as HTMLElement;
    await filterIcon.dispatchEvent(new MouseEvent('mousedown'));

    // Act - Get and fill max filter field
    const columnAFilterMax = container.getElementsByClassName(
      'filter-bar-max'
    )[0] as HTMLInputElement;
    await act(() => fireEvent.input(columnAFilterMax, { target: { value: '13' } }));
    await columnAFilterMax.dispatchEvent(new Event('change'));

    // Assert
    column = container.querySelectorAll('.column-bottom > g')[2];
    columnWidths = getBarWidths(column);
    expect(columnWidths.length).toBe(1);
  });

  it('removes a column when clicking the remove column text', async () => {
    // Arrange
    const config = {};
    const container = await generateLineUp(config);

    // Act - Show filter fields
    const moreIcon = container
      .querySelectorAll('.column')[3]
      .querySelectorAll('.column-options > svg')[2] as HTMLElement;
    await moreIcon.dispatchEvent(new MouseEvent('mousedown'));

    // Act - Click remove column text
    const remove = container
      .querySelectorAll('.column')[3]
      .querySelector('.column-top-more > g') as HTMLElement;
    await remove.dispatchEvent(new MouseEvent('mousedown'));

    // Assert
    expect(container.getElementsByClassName('column').length).toBe(4 + 2 - 1); // Columns from data + rank & select columns - 1
  });

  it('highlights a row when searching it in a text column', async () => {
    // Arrange
    const config = {};
    const container = await generateLineUp(config);

    // Act - Show search fields
    const searchIcon = container
      .querySelectorAll('.column')[2]
      .querySelectorAll('.column-options > svg')[1] as HTMLElement;
    await searchIcon.dispatchEvent(new MouseEvent('mousedown'));

    // Act - Get and fill search field
    const searchField = container.querySelector(
      '.column-top-overlay > g > foreignObject > input'
    ) as HTMLInputElement;
    await act(() => fireEvent.input(searchField, { target: { value: 'y' } }));

    // Assert
    const rows = container.getElementsByClassName('lineUp-highlights')[0].children;
    expect(rows[0]).toBeDefined();
    expect(rows[0].getAttribute('y')).toBe('140');
  });

  it('filters rows when filtering it in a text column', async () => {
    // Arrange
    const config = {};
    const container = await generateLineUp(config);

    // Act - Show filter fields
    const filterIcon = container
      .querySelectorAll('.column')[2]
      .querySelectorAll('.column-options > svg')[2] as HTMLElement;
    await filterIcon.dispatchEvent(new MouseEvent('mousedown'));

    // Act - Get and fill filter field
    const filterField = container.querySelector(
      '.column-top-overlay > g > foreignObject > input'
    ) as HTMLInputElement;
    await act(() => fireEvent.keyDown(filterField, { target: { value: 'y' } }));
    await act(() => fireEvent.keyDown(filterField, { key: 'Enter' }));

    // Assert
    const column = container.querySelectorAll('.column-bottom > g')[2];
    const columnWidths = getBarWidths(column);
    expect(columnWidths.length).toBe(1);
  });
});

function getBarWidths(column: Element): Array<number> {
  return Array.from(column.children).map((bar) => Number(bar.getAttribute('width')));
}

async function generateLineUp(customConfig: object, customData: string | null = null) {
  // Prepare data
  const data = customData != null ? customData : 'label,a,b,c\nz,15,5,10\ny,5,10,10\nx,10,15,10\n';
  const dataUtil = new DataUtils(true);

  if (data === '') {
    await expect(
      (async () => {
        await dataUtil.parseCSV(data);
      })()
    ).rejects.toThrowError();
  } else {
    dataUtil.parseCSV(data);
  }

  // Setup LineUp component and render it
  const config = { dataUtil, ...customConfig };
  const { container } = render(StoreWrapper, { props: { Component: LineUp, config } });
  return container.querySelector('.lineUp') as HTMLElement;
}
