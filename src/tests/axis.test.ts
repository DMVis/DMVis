import { describe, it, expect } from 'vitest';
// import { render } from '@testing-library/svelte';

describe('sum test', () => {
  it('adds 1 + 2 to equal 3', () => {
    // Arrange
    const one = 1;
    const two = 2;
    const expectedSum = 3;

    // Act
    const sum = one + two;

    // Assert
    expect(sum).toBe(expectedSum);
  });
});
// import Axis from '$lib/components/base/Axis.svelte';
// import StoreWrapper from './StoreWrapper.svelte';

// describe('Rendering tests', () => {
//   it('renders a default axis', () => {
//     // Arrange
//     const config = {};

//     // Act
//     const axis = createAxis(config);

//     // Assert
//     // Check if the axis is rendered
//     expect(axis).not.toBeNull();
//     expect(axis.getAttribute('class')).contains('axis');

//     // Check if the axis has the default 10 ticks
//     const ticks = axis.querySelectorAll('.tick');
//     expect(ticks.length).toBe(10 + 1);

//     // Check if the axis has a path element for the domain
//     const domain = axis.querySelector('.domain');
//     expect(domain).not.toBeNull();

//     // Check if the styling of text elements is correct
//     const text = axis.querySelector('text');
//     expect(text?.style).not.toBeNull();
//     expect(text?.style.color).toBe('black');
//     expect(text?.style.fontSize).toBe('17px');
//   });

//   it('renders a custom axis', () => {
//     // Arrange
//     const config = {
//       ticks: true,
//       fontSize: 20,
//       color: 'white',
//       ticksNumber: 5
//     };

//     // Act
//     const axis = createAxis(config);

//     // Assert
//     // Check if the axis is rendered
//     expect(axis).not.toBeNull();
//     expect(axis.getAttribute('class')).contains('axis');

//     // Check if the axis has the custom 5 ticks
//     const ticks = axis.querySelectorAll('.tick');
//     expect(ticks.length).toBe(config.ticksNumber + 1);

//     // Check if the axis has a path element for the domain
//     const domain = axis.querySelector('.domain');
//     expect(domain).not.toBeNull();

//     // Check if the styling of text elements is correct
//     const text = axis.querySelector('text');
//     expect(text?.style).not.toBeNull();
//     expect(text?.style.color).toBe(config.color);
//     expect(text?.style.fontSize).toBe(`${config.fontSize}px`);
//   });

//   it('renders an axis without ticks', () => {
//     // Arrange
//     const config = {
//       ticksNumber: 0
//     };

//     // Act
//     const axis = createAxis(config);

//     // Assert
//     // Check if the axis is rendered
//     expect(axis).not.toBeNull();
//     expect(axis.getAttribute('class')).contains('axis');

//     // Check if the axis has no ticks
//     const ticks = axis.querySelectorAll('.tick');
//     expect(ticks.length).toBe(0);

//     // Check if the axis has a path element for the domain
//     const domain = axis.querySelector('.domain');
//     expect(domain).not.toBeNull();
//   });
// });
// describe('Placement tests', () => {
//   it('checks the default placement of the axis', () => {
//     // Default placement is bottom placement

//     // Arrange
//     const config = {};

//     // These magic numbers are the default margins from the graphStore
//     const defaultHeight = 400;
//     const defaultMargin = 40;

//     const expectedX = 0;
//     const expectedY = defaultHeight - defaultMargin;

//     // Act
//     const axis = createAxis(config);
//     const translate = axis.getAttribute('transform') ?? '';
//     const [translateX, translateY] = formatTranslateAttr(translate);

//     // Assert
//     expect(translateX).toBe(expectedX.toString());
//     expect(translateY).toBe(expectedY.toString());
//   });
//   it('checks the bottom placement of the axis', () => {
//     // Arrange
//     const config = { position: 'bottom' };
//     // These magic numbers are the default margins from the graphStore
//     const defaultMargin = 40;
//     const defaultHeight = 400;

//     const expectedX = 0;
//     const expectedY = defaultHeight - defaultMargin;

//     // Act
//     const axis = createAxis(config);
//     const translate = axis.getAttribute('transform') ?? '';
//     const [translateX, translateY] = formatTranslateAttr(translate);

//     // Assert
//     expect(translateX).toBe(expectedX.toString());
//     expect(translateY).toBe(expectedY.toString());
//   });
//   it('checks the top placement of the axis', () => {
//     // Arrange
//     const config = { position: 'top' };
//     // These magic numbers are the default margins from the graphStore
//     const defaultMargin = 40;

//     const expectedX = 0;
//     const expectedY = defaultMargin;

//     // Act
//     const axis = createAxis(config);
//     const translate = axis.getAttribute('transform') ?? '';
//     const [translateX, translateY] = formatTranslateAttr(translate);

//     // Assert
//     expect(translateX).toBe(expectedX.toString());
//     expect(translateY).toBe(expectedY.toString());
//   });
//   it('checks the left placement of the axis', () => {
//     // Arrange
//     const config = { position: 'left' };
//     // These magic numbers are the default margins from the graphStore
//     const defaultMargin = 40;

//     const expectedX = defaultMargin;
//     const expectedY = 0;

//     // Act
//     const axis = createAxis(config);
//     const translate = axis.getAttribute('transform') ?? '';
//     const [translateX, translateY] = formatTranslateAttr(translate);

//     // Assert
//     expect(translateX).toBe(expectedX.toString());
//     expect(translateY).toBe(expectedY.toString());
//   });
//   it('checks the right placement of the axis', () => {
//     // Arrange
//     const config = { position: 'right' };
//     // These magic numbers are the default margins from the graphStore
//     const defaultMargin = 40;
//     const defaultWidth = 640;

//     const expectedX = defaultWidth - defaultMargin;
//     const expectedY = 0;

//     // Act
//     const axis = createAxis(config);
//     const translate = axis.getAttribute('transform') ?? '';
//     const [translateX, translateY] = formatTranslateAttr(translate);

//     // Assert
//     expect(translateX).toBe(expectedX.toString());
//     expect(translateY).toBe(expectedY.toString());
//   });
// });

// function createAxis(config: object): SVGElement {
//   // Add svg block to the document
//   const svg = document.createElement('svg');
//   svg.setAttribute('id', 'svg');
//   document.body.appendChild(svg);

//   // Add axis to svg block
//   const { container } = render(StoreWrapper, { props: { Component: Axis, config } });
//   const axis = container.getElementsByClassName('axis')[0] as SVGElement;
//   svg.appendChild(axis);

//   return axis as SVGElement;
// }

// function formatTranslateAttr(attr: string): string[] {
//   // Function that takes the translate attribute of a SVGGElement,
//   // and returns an array in the form [x,y]
//   const translate = attr.split(',');
//   const translateX = translate[0].split('(')[1].split(' ')[0];
//   const translateY = translate[1].split(' ')[1].split(')')[0];
//   return [translateX, translateY];
// }
