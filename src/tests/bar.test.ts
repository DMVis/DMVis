import { describe, it, expect } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Bar from '$lib/components/base/Bar.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Html test', () => {
  it('checks if a vertically configured bar is vertical', () => {
    const config = { x: 0, y: 0, width: 50, height: 250, isHeightAlongYAxis: true };
    const bar = prepareBar(config);
    // Since the bar is designed to be vertical by default, the
    // width corresponds to width and the height corresponds to height.
    const expectedWidth = config.width;
    const expectedHeight = config.height;
    expect(bar.getAttribute('width')).toBe(`${expectedWidth}`);
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });

  it('checks if a horizontally configured bar is horizontal', () => {
    const config = { x: 0, y: 0, width: 50, height: 250, isHeightAlongYAxis: false };
    const bar = prepareBar(config);
    // Note that width and height are now swapped.
    const expectedWidth = config.height;
    const expectedHeight = config.width;
    expect(bar.getAttribute('width')).toBe(`${expectedWidth}`);
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });

  /*
  From now on, we avoid checking the width and height again and assume a vertical bar.
  Note that originX and originY are avoided too, because these are tested in isolation.
  */

  it(`checks if a bar with a positive height, configured to
      not show a negative height, has 'height' for height`, () => {
    const config = {
      x: 0,
      y: 0,
      width: 50,
      height: 250,
      isHeightAlongYAxis: true,
      showsNegativeHeight: false
    };
    const bar = prepareBar(config);
    const expectedHeight = config.height;
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });

  it(`checks if a bar with a positive height, configured to
      show a negative height, has 'height' for height`, () => {
    const config = {
      x: 0,
      y: 0,
      width: 50,
      height: 250,
      isHeightAlongYAxis: true,
      showsNegativeHeight: true
    };
    const bar = prepareBar(config);
    const expectedHeight = config.height;
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });

  it(`checks if a bar with a negative height, configured to
      not show a negative height, has 'height' for height`, () => {
    // A negative height resuls in no visible rendering, so this is fine.
    // Clamping is not needed as a result.
    const config = {
      x: 0,
      y: 0,
      width: 50,
      height: -250,
      isHeightAlongYAxis: true,
      showsNegativeHeight: false
    };
    const bar = prepareBar(config);
    const expectedHeight = config.height;
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });

  it(`checks if a bar with a negative height, configured to
      show a negative height, has a positive height`, () => {
    // Since a negative height results in no visible rendering, the height has to be positive
    // if the bar is configured to show a negative height.
    const config = {
      x: 0,
      y: 0,
      width: 50,
      height: -250,
      isHeightAlongYAxis: true,
      showsNegativeHeight: true
    };
    const bar = prepareBar(config);
    const expectedHeight = -config.height;
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });

  it('checks if a bar has no label by default', () => {
    const config = { x: 0, y: 0, width: 50, height: 250, isHeightAlongYAxis: true };
    const bar = prepareBar(config);
    const label = document.body.getElementsByClassName('label')[0];
    expect(bar).toBeDefined();
    expect(label).toBeUndefined();
  });

  it('checks if a label appears on mouse enter event with the bar', async () => {
    const config = { x: 0, y: 0, width: 50, height: 250, isHeightAlongYAxis: true };
    const bar = prepareBar(config);

    // Simulate mouse enter event.
    await waitFor(() => {
      return fireEvent.mouseEnter(bar);
    });

    const label = document.body.getElementsByClassName('label-bar')[0];
    expect(label).toBeDefined();
  });

  it('checks if a label appears on focus event with the bar', async () => {
    const config = { x: 0, y: 0, width: 50, height: 250, isHeightAlongYAxis: true };
    const bar = prepareBar(config);

    // Simulate focus event.
    await waitFor(() => {
      return fireEvent.focus(bar);
    });

    const label = document.body.getElementsByClassName('label-bar')[0];
    expect(label).toBeDefined();
  });

  it('checks if a label disappears on mouse leave event with the bar', async () => {
    const config = { x: 0, y: 0, width: 50, height: 250, isHeightAlongYAxis: true };
    const bar = prepareBar(config);

    // Simulate mouse leave event.
    await waitFor(() => {
      return fireEvent.mouseLeave(bar);
    });

    const label = document.body.getElementsByClassName('label-bar')[0];
    expect(label).toBeUndefined();
  });

  it('checks if a label disappears on blur event with the bar', async () => {
    const config = { x: 0, y: 0, width: 50, height: 250, isHeightAlongYAxis: true };
    const bar = prepareBar(config);

    // Simulate blur event.
    await waitFor(() => {
      return fireEvent.blur(bar);
    });

    const label = document.body.getElementsByClassName('label')[0];
    expect(label).toBeUndefined();
  });

  it('checks if default attributes are filled', () => {
    // Note that x and y are intentionally different to
    // test the default name attribute.
    const config = { x: 0, y: 1, width: 50, height: 250, isHeightAlongYAxis: true };
    const bar = prepareBar(config);

    expect(bar.getAttribute('transform')).toBe(`rotate(0, ${config.x}, ${config.y})`);

    expect(bar.getAttribute('rx')).toBe('0');
    expect(bar.getAttribute('ry')).toBe('0');
    expect(bar.getAttribute('fill')).toBe('red');
    expect(bar.getAttribute('fill-opacity')).toBe('1');

    expect(bar.getAttribute('role')).toBe('treeitem');
    expect(bar.getAttribute('tabindex')).toBe('0');
    expect(bar.getAttribute('aria-selected')).toBe('false');
    // .contain() instead of .toBe(), because d3 adds odd extra class(es).
    // For example: s-LxN4m1-JgGU0
    expect(bar.getAttribute('class')).contain(`bar (${config.x},${config.y})`);
  });

  it('checks if custom attributes are filled', () => {
    const config = {
      x: 0,
      y: 0,
      width: 50,
      height: 250,
      isHeightAlongYAxis: true,
      color: 'blue',
      opacity: 1,
      rotationDegrees: 45,
      radiusX: 5,
      radiusY: 5,
      showsNegativeHeight: false,
      name: 'test'
    };
    const bar = prepareBar(config);

    expect(bar.getAttribute('transform')).toBe(
      `rotate(${config.rotationDegrees}, ${config.x}, ${config.y})`
    );

    expect(bar.getAttribute('rx')).toBe(`${config.radiusX}`);
    expect(bar.getAttribute('ry')).toBe(`${config.radiusY}`);
    expect(bar.getAttribute('fill')).toBe(`${config.color}`);
    expect(bar.getAttribute('fill-opacity')).toBe(`${config.opacity}`);
    // .contain() instead of .toBe(), because d3 adds odd extra class(es).
    // For example: s-LxN4m1-JgGU0
    expect(bar.getAttribute('class')).contain(`bar test`);
  });
});

function prepareBar(config: object): SVGRectElement {
  // Clear document body if anything is in it.
  if (document.body.children.length > 0) {
    document.body.innerHTML = '';
  }

  // Add svg block to the document.
  const svg = document.createElement('svg');
  svg.setAttribute('id', 'svg');
  document.body.appendChild(svg);

  // Add bar to svg block.
  const { container } = render(Bar, config);
  const bar = container.getElementsByClassName('bar')[0] as SVGRectElement;
  svg.appendChild(bar);

  // Return bar as rect (the label that shows on certain events is separate from it).
  return bar;
}
