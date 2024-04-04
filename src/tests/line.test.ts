import { describe, it, expect } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';

import prepareSvgGetter from '../vitest/svgMock.js';
import Line from '$lib/components/base/Line.svelte';
import NewStoreWrapper from './NewStoreWrapper.svelte';

prepareSvgGetter();

describe('Html test', () => {
  it('renders lines in accordance to the test data', () => {
    const lineGroup = prepareLines({});

    const lines = lineGroup.getElementsByClassName('line');
    expect(lines.length).equals(5);

    expect(lines[0].getAttribute('d')).toBe(`M0,107.84313725490198L333,1000L666,1000`);
  });
  it('checks if default attributes are filled', () => {
    const lineGroup = prepareLines({});

    const line = lineGroup.getElementsByClassName('line')[0];

    //Check defaut values
    expect(line.getAttribute('stroke')).toBe('#BBB');
    expect(line.getAttribute('stroke-width')).toBe('1');
  });

  it('checks if custom attributes are filled', () => {
    const lineGroup = prepareLines({ hoverable: true, lineWidth: 2 });

    const line = lineGroup.getElementsByClassName('line')[0];

    expect(line.getAttribute('stroke-width')).toBe('2');
  });

  it('checks if the events on the lines work', async () => {
    const lineGroup = prepareLines({ hoverable: true });

    const lineOne = lineGroup.getElementsByClassName('line')[0];

    await waitFor(() => {
      return fireEvent.mouseEnter(lineOne);
    });

    //Check if line color changes on mouse enter event
    expect(lineOne.getAttribute('stroke')).toBe('#F44');

    await waitFor(() => {
      return fireEvent.mouseLeave(lineOne);
    });

    //Check if line color resets on mouse leave event
    expect(lineOne.getAttribute('stroke')).toBe('#BBB');
  });
});

function prepareLines(config: object): SVGGElement {
  //Render lines and return the respective element
  const { container } = render(NewStoreWrapper, { props: { Component: Line, config } });
  const hoverlines = container.getElementsByClassName('line-group')[0] as SVGGElement;

  return hoverlines;
}