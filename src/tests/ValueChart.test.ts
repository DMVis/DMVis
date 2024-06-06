// eslint-disable-next-line @typescript-eslint/no-unused-vars
// Imports
import { tick } from 'svelte';
import userEvent from '@testing-library/user-event';
import { act, fireEvent, render } from '@testing-library/svelte';
import { describe, it, expect, vi, afterEach } from 'vitest';

// DMVis imports
import ValueChart from '$lib/components/visualisations/ValueChart.svelte';
import { DataUtils } from '$lib/utils/DataUtils.js';

// Mock imports
import prepareSvgGetter from '../vitest/svgMock.js';
import VisualisationStoreWrapper from './VisualisationStoreWrapper.svelte';

prepareSvgGetter();

describe('Basic ValueChart rendering', async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders a simple ValueChart', async () => {
    // Arrange
    const config = {
      width: 1500,
      height: 900
    };
    const expectedAmountOfColumns = 4 + 2; // 4 columns in top half + 2 in the bottom half
    const expectedTopHeight = '445'; // top half height
    const expectedBottomHeight = '445'; // bottom half height (padding is subtracted from top half)

    // Act
    const { container } = await generateValueChart(config);

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(config.width);
    expect(Number(container.getAttribute('height'))).toBe(config.height);
    expect(container.getElementsByClassName('column').length).toBe(expectedAmountOfColumns);

    const topElement = container.getElementsByClassName('scrollable-svg-valuechart-top');
    expect(topElement.length).toBe(1); // 1 scrollable component for the top half
    expect(topElement[0].getAttribute('height')).toBe(expectedTopHeight);

    const bottomElement = container.getElementsByClassName('scrollable-svg-valuechart-bottom');
    expect(bottomElement.length).toBe(1); // 1 scrollable component for the bottom half
    expect(bottomElement[0].getAttribute('height')).toBe(expectedBottomHeight);
  });

  it('renders a ValueChart visualisation with only one entry', async () => {
    // Arrange
    const config = {
      width: 500,
      height: 1000
    };

    const expectedAmountOfColumns = 3 + 2; // 3 columns in top half + 2 in the bottom half
    const expectedTopHeight = '495'; // top half height
    const expectedBottomHeight = '495'; // bottom half height (padding is subtracted from top half)

    // Act
    const { container } = await generateValueChart(config, 'l,a,b\nfirst,1,2');

    // Assert
    expect(container).not.toBeNull();
    expect(Number(container.getAttribute('width'))).toBe(config.width);
    expect(Number(container.getAttribute('height'))).toBe(config.height);
    expect(container.getElementsByClassName('column').length).toBe(expectedAmountOfColumns);

    const topElement = container.getElementsByClassName('scrollable-svg-valuechart-top');
    expect(topElement.length).toBe(1); // 1 scrollable component for the top half
    expect(topElement[0].getAttribute('height')).toBe(expectedTopHeight);

    const bottomElement = container.getElementsByClassName('scrollable-svg-valuechart-bottom');
    expect(bottomElement.length).toBe(1); // 1 scrollable component for the bottom half
    expect(bottomElement[0].getAttribute('height')).toBe(expectedBottomHeight);
  });
});

describe('Interactive ValueChart', async () => {
  it('changes a column weight', async () => {
    // Arrange
    const config = {
      width: 1000,
      height: 1000
    };
    const unchangedWidth = '90';
    const expectedBiggerWidth = '506';
    const expectedSmallerWidth = '162';
    // @ts-expect-error - Cant find setup in userEvent
    const user = userEvent.setup();
    const { container, getAllByRole, getAllByLabelText } = await generateValueChart(config);
    const weightButtons = getAllByRole('button', { name: /weight/i });

    // Act
    // Simulate mouseClick to open the weight input boxes,
    //  type 60 in the first input box and hit enter
    await user.click(weightButtons[0]);

    const inputBoxes = getAllByLabelText('WeightInput');
    await act(async () => {
      fireEvent.input(inputBoxes[0], { target: { value: '60' } });
      fireEvent.change(inputBoxes[0]);
    });

    // Assert
    /* Check whether
       - the column with the labels still has original size
       - the first BarColumn has the right width (60% of total width for the BarColumns)
       - the second and third BarColumns have the right width (each 20% of total width for the BarColumns)
    */
    const columnTops = container.getElementsByClassName('column-top');
    expect(columnTops[0].children[0].getAttribute('width')).toBe(unchangedWidth);
    expect(columnTops[1].children[0].getAttribute('width')).toBe(expectedBiggerWidth);
    expect(columnTops[2].children[0].getAttribute('width')).toBe(expectedSmallerWidth);
    expect(columnTops[3].children[0].getAttribute('width')).toBe(expectedSmallerWidth);

    // Act
    // Re-open the weight input boxes to check their values
    const newWeightButtons = getAllByRole('button', { name: /weight/i });
    await user.click(newWeightButtons[0]);
    await user.click(newWeightButtons[1]);
    await user.click(newWeightButtons[2]);
    const newInputBoxes = getAllByLabelText('WeightInput');

    // Assert
    // Check whether the weights are correct
    // @ts-expect-error all the input boxes do have a value property
    expect(newInputBoxes[0].value).toBe('60'); // First weight should be 60
    // @ts-expect-error all the input boxes do have a value property
    expect(newInputBoxes[1].value).toBe('20'); // Second weight should be 20
    // @ts-expect-error all the input boxes do have a value property
    expect(newInputBoxes[2].value).toBe('20'); // Third weight should be 20
  });

  it('changes a column weight with autoDistributeWeight set to false', async () => {
    // Arrange
    const config = {
      width: 1000,
      height: 1000,
      autoDistributeWeight: false
    };
    const unchangedWidth = '90';
    const expectedBiggerWidth = '397.3684210526315';
    const expectedSmallerWidth = '216.3157894736842';
    // @ts-expect-error - Cant find setup in userEvent
    const user = userEvent.setup();
    const { container, getAllByRole, getAllByLabelText } = await generateValueChart(config);
    const weightButtons = getAllByRole('button', { name: /weight/i });

    // Act
    // Simulate mouseClick to open the weight input boxes,
    //  type 60 in the first input box and hit enter
    await user.click(weightButtons[0]);

    const inputBoxes = getAllByLabelText('WeightInput');
    await act(async () => {
      fireEvent.input(inputBoxes[0], { target: { value: '60' } });
      fireEvent.change(inputBoxes[0]);
    });

    // Assert
    /* Check whether
       - the column with the labels still has original size
       - the first BarColumn has the right width ( 60/(60+33.333+33.333) of total width for the BarColumns)
       - the second and third BarColumns have the right width (each 33.333/(60+33.333+33.333) of total width for the BarColumns)
       Weight is now 60/(60+33.333+33.333) since weights are now not redistributed to add up to 100.
    */
    const columnTops = container.getElementsByClassName('column-top');
    expect(columnTops[0].children[0].getAttribute('width')).toBe(unchangedWidth);
    expect(columnTops[1].children[0].getAttribute('width')).toBe(expectedBiggerWidth);
    expect(columnTops[2].children[0].getAttribute('width')).toBe(expectedSmallerWidth);
    expect(columnTops[3].children[0].getAttribute('width')).toBe(expectedSmallerWidth);

    // Act
    // Re-open the weight input boxes to check their values
    const newWeightButtons = getAllByRole('button', { name: /weight/i });
    await user.click(newWeightButtons[0]);
    await user.click(newWeightButtons[1]);
    await user.click(newWeightButtons[2]);
    const newInputBoxes = getAllByLabelText('WeightInput');

    // Assert
    // Check whether the weights are correct
    // @ts-expect-error all the input boxes do have a value property
    expect(newInputBoxes[0].value).toBe('60'); // First weight should be 60
    // @ts-expect-error all the input boxes do have a value property
    expect(newInputBoxes[1].value).toBe('33.333333333333336'); // Second weight should be 20
    // @ts-expect-error all the input boxes do have a value property
    expect(newInputBoxes[2].value).toBe('33.333333333333336'); // Third weight should be 20
  }); //id="scrollable-div-valuechart-bottom"

  it('checks automatic sorting of SumColumn', async () => {
    // For illustration, this test uses the following data to allow for different orderings by applying different weights
    /*  label   a b c
        first   1 2 5
        second  3 4 7
        third   6 8 1
    */

    // Arrange
    const config = {
      width: 1000,
      height: 1000
    };
    // @ts-expect-error - Cant find setup in userEvent
    const user = userEvent.setup();
    const { container, getAllByRole, getAllByLabelText } = await generateValueChart(
      config,
      'label,a,b,c\nfirst,1,2,5\nsecond,3,4,7\nthird,6,8,1'
    );
    const weightButtons = getAllByRole('button', { name: /weight/i });

    // Act
    const columnBottoms = container.getElementsByClassName('column-bottom');
    let labels = columnBottoms[0].getElementsByClassName('label'); // The first column in ValueChart is the first of the two label columns

    // Assert
    // By default (with the given dataset), the order of the entries should be
    // third, second, first (from top to bottom)
    expect(labels[0].textContent).toBe('third');
    expect(labels[1].textContent).toBe('second');
    expect(labels[2].textContent).toBe('first');

    // Act
    // Simulate mouseClick to open the weight input boxes,
    //  type 80 in the third input box and hit enter
    await user.click(weightButtons[2]);
    const inputBoxes = getAllByLabelText('WeightInput');
    await act(async () => {
      fireEvent.input(inputBoxes[0], { target: { value: '80' } });
      fireEvent.change(inputBoxes[0]);
    });
    await tick();

    // Act
    // Re-open the weight input boxes to check their values
    const newWeightButtons = getAllByRole('button', { name: /weight/i });
    await user.click(newWeightButtons[0]);
    await user.click(newWeightButtons[1]);
    await user.click(newWeightButtons[2]);
    const newInputBoxes = getAllByLabelText('WeightInput');

    // Assert
    // Check whether the weights are correct
    // @ts-expect-error all the input boxes do have a value property
    expect(newInputBoxes[0].value).toBe('10'); // First weight should be 20
    // @ts-expect-error all the input boxes do have a value property
    expect(newInputBoxes[1].value).toBe('10'); // Second weight should be 20
    // @ts-expect-error all the input boxes do have a value property
    expect(newInputBoxes[2].value).toBe('80'); // Third weight should be 50

    // Find the label column again and check whether the order has changed to the correct order with the supplied weights
    labels = columnBottoms[0].getElementsByClassName('label'); // The first column in ValueChart is the first of the two label columns
    expect(labels[0].textContent).toBe('second');
    expect(labels[1].textContent).toBe('first');
    expect(labels[2].textContent).toBe('third');
  });
});

async function generateValueChart(customConfig: object, customData: string | null = null) {
  // Prepare data (structured as follows)
  const data =
    customData != null ? customData : 'label,a,b,c\nfirst,1,2,3\nsecond,4,5,6\nthird,7,8,9';
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

  // Setup ValueChart component and render it
  const config = { dataUtil, ...customConfig };
  const { container, getAllByRole, getAllByLabelText } = render(VisualisationStoreWrapper, {
    props: { Component: ValueChart, config }
  });
  return {
    container: container.querySelector('.valuechart') as HTMLElement,
    getAllByRole: getAllByRole,
    getAllByLabelText: getAllByLabelText
  };
}
