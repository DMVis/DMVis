import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';

import Bar from '$lib/components/base/Bar.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('isVertical test', () => {
  it('checks if a vertically configured bar is vertical', () => {
    // Arrange
    const config = { x: 0, y: 0, width: 50, height: 250 };
    // Since the bar is designed to be vertical by default, the
    // width corresponds to width and the height corresponds to height
    const expectedWidth = config.width;
    const expectedHeight = config.height;

    // Act
    const bar = createBar(config);

    // Assert
    expect(bar.getAttribute('width')).toBe(`${expectedWidth}`);
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });

  it('checks if a horizontally configured bar is horizontal', () => {
    // Arrange
    const config = { x: 0, y: 0, width: 50, height: 250, isVertical: false };
    // Note that width and height are now swapped
    const expectedWidth = config.height;
    const expectedHeight = config.width;

    // Act
    const bar = createBar(config);

    // Assert
    expect(bar.getAttribute('width')).toBe(`${expectedWidth}`);
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });
});

// From now on, we avoid checking the width and height again and assume a vertical bar
// Note that originX and originY are avoided too, because these are tested in isolation

describe('Height configuration test', () => {
  it(`checks if a bar with a positive height, configured to
      not show a negative height, has 'height' for height`, () => {
    // Arrange
    const config = {
      x: 0,
      y: 0,
      width: 50,
      height: 250,
      isVertical: true,
      showsNegativeHeight: false
    };
    const expectedHeight = config.height;

    // Act
    const bar = createBar(config);

    // Assert
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });

  it(`checks if a bar with a positive height, configured to
      show a negative height, has 'height' for height`, () => {
    // Arrange
    const config = {
      x: 0,
      y: 0,
      width: 50,
      height: 250,
      isVertical: true,
      showsNegativeHeight: true
    };
    const expectedHeight = config.height;

    // Act
    const bar = createBar(config);

    // Assert
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });

  it(`checks if a bar with a negative height, configured to
      not show a negative height, has 'height' for height`, () => {
    // Arrange
    const config = {
      x: 0,
      y: 0,
      width: 50,
      height: -250,
      isVertical: true,
      showsNegativeHeight: false
    };
    // A negative height resuls in no visible rendering, so this is fine
    // (i.e. clamping is not needed as a result)
    const expectedHeight = config.height;

    // Act
    const bar = createBar(config);

    // Assert
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });

  it(`checks if a bar with a negative height, configured to
      show a negative height, has a positive height`, () => {
    // Arrange
    const config = {
      x: 0,
      y: 0,
      width: 50,
      height: -250,
      isVertical: true,
      showsNegativeHeight: true
    };
    // Since a negative height results in no visible rendering, the height has to be positive
    // if the bar is configured to show a negative height
    const expectedHeight = -config.height;

    // Act
    const bar = createBar(config);

    // Assert
    expect(bar.getAttribute('height')).toBe(`${expectedHeight}`);
  });
});

describe('Mouse interactivity test', () => {
  it('checks if a bar has no label by default', () => {
    // Arrange
    const config = { x: 0, y: 0, width: 50, height: 250 };

    // Act
    const bar = createBar(config);
    const label = document.body.getElementsByClassName('label')[0];

    // Assert
    expect(bar).toBeDefined();
    expect(label).toBeUndefined();
  });

  it('checks if a label appears on mouse enter event with the bar', async () => {
    // Arrange
    const config = { x: 0, y: 0, width: 50, height: 250 };

    // Act
    const bar = createBar(config);

    // Simulate mouseEnter event
    await fireEvent.mouseEnter(bar);
    const label = document.body.getElementsByClassName('label-tooltip')[0];

    // Assert
    expect(bar).toBeDefined();
    expect(label).toBeDefined();
  });

  it('checks if a label appears on focus event with the bar', async () => {
    // Arrange
    const config = { x: 0, y: 0, width: 50, height: 250 };

    // Act
    const bar = createBar(config);

    // Simulate focus event
    await fireEvent.focus(bar);
    const label = document.body.getElementsByClassName('label-tooltip')[0];

    // Assert
    expect(bar).toBeDefined();
    expect(label).toBeDefined();
  });

  it('checks if a label disappears on mouse leave event with the bar', async () => {
    // Arrange
    const config = { x: 0, y: 0, width: 50, height: 250 };

    // Act
    const bar = createBar(config);

    // Simulate mouseLeave event
    await fireEvent.mouseLeave(bar);
    const label = document.body.getElementsByClassName('label-bar')[0];

    // Assert
    expect(bar).toBeDefined();
    expect(label).toBeUndefined();
  });

  it('checks if a label disappears on blur event with the bar', async () => {
    // Arrange
    const config = { x: 0, y: 0, width: 50, height: 250 };

    // Act
    const bar = createBar(config);

    // Simulate blur event
    await fireEvent.blur(bar);
    const label = document.body.getElementsByClassName('label')[0];

    // Assert
    expect(bar).toBeDefined();
    expect(label).toBeUndefined();
  });

  it('fires an event when the bar is clicked', async () => {
    // Arrange
    const config = { x: 0, y: 0, width: 50, height: 250 };
    let clicked = false;

    // Add svg block to the document
    const svg = document.createElement('svg');
    svg.setAttribute('id', 'svg');
    document.body.appendChild(svg);

    // Add bar to svg block
    const { container, component } = render(Bar, config);
    const bar = container.getElementsByClassName('bar')[0] as SVGRectElement;
    svg.appendChild(bar);

    // Act
    component.$on('mouseBarClick', () => {
      clicked = true;
    });
    await fireEvent.mouseDown(bar);

    // Assert
    expect(bar).toBeDefined();
    expect(clicked).toBe(true);
  });
});

describe('Attribute test', () => {
  it('checks if default attributes are filled', () => {
    // Arrange
    // Note that x and y are intentionally different to test the default name attribute
    const config = { x: 0, y: 1, width: 50, height: 250 };
    const expectedClasses = `bar`;

    // Act
    const bar = createBar(config);
    // Note that the last class is always auto-generated and can be ignored
    const classes = Array.from(bar.classList)
      .slice(0, bar.classList.length - 1)
      .join(' ');

    // Assert
    expect(classes).toBe(expectedClasses);
    expect(bar.getAttribute('transform')).toBe(`rotate(0, ${config.x}, ${config.y})`);
    expect(bar.getAttribute('rx')).toBe('0');
    expect(bar.getAttribute('ry')).toBe('0');
    expect(bar.getAttribute('fill')).toBe('red');
    expect(bar.getAttribute('fill-opacity')).toBe('1');
    expect(bar.getAttribute('role')).toBe('treeitem');
    expect(bar.getAttribute('tabindex')).toBe('0');
    expect(bar.getAttribute('aria-selected')).toBe('false');
  });

  it('checks if custom attributes are filled', () => {
    // Arrange
    const config = {
      x: 0,
      y: 0,
      width: 50,
      height: 250,
      isVertical: true,
      color: 'blue',
      opacity: 1,
      rotationDegrees: 45,
      radiusX: 5,
      radiusY: 5,
      showsNegativeHeight: false,
      name: 'test'
    };
    const expectedClasses = `bar bar-${config.name}`;

    // Act
    const bar = createBar(config);
    // Note that the last class is always auto-generated and can be ignored
    const classes = Array.from(bar.classList)
      .slice(0, bar.classList.length - 1)
      .join(' ');

    // Assert
    expect(classes).toBe(expectedClasses);
    expect(bar.getAttribute('transform')).toBe(
      `rotate(${config.rotationDegrees}, ${config.x}, ${config.y})`
    );
    expect(bar.getAttribute('rx')).toBe(`${config.radiusX}`);
    expect(bar.getAttribute('ry')).toBe(`${config.radiusY}`);
    expect(bar.getAttribute('fill')).toBe(`${config.color}`);
    expect(bar.getAttribute('fill-opacity')).toBe(`${config.opacity}`);
  });
});

function createBar(config: object): SVGRectElement {
  // Add svg block to the document
  const svg = document.createElement('svg');
  svg.setAttribute('id', 'svg');
  document.body.appendChild(svg);

  // Add bar to svg block
  const { container } = render(Bar, config);
  const bar = container.getElementsByClassName('bar')[0] as SVGRectElement;
  svg.appendChild(bar);

  // Return bar as rect (the label that shows on certain events is separate from it)
  return bar;
}
