import * as d3 from 'd3';
import { render } from '@testing-library/svelte';
import prepareSvgGetter from '../vitest/svgMock.js';
import { describe, it, expect } from 'vitest';

import Axis from '$lib/components/base/Axis.svelte';
import StoreWrapper from './StoreWrapper.svelte';

prepareSvgGetter();

describe('Rendering test', () => {
  it('renders a default axis', () => {
    // Arrange
    const scale = d3.scaleLinear().domain([0, 100]).range([0, 100]);
    const configAxis = d3.axisBottom(scale);
    const config = {
      placementX: 50,
      placementY: 50,
      axis: configAxis
    };

    // Act
    const axisGroup = createAxis(config);
    const axis = axisGroup[0] as SVGGElement;
    const label = axisGroup[1];

    // Get the transform attribute from the axis and format it
    const translate: string = axis.getAttribute('transform') ?? '';
    const [translateX, translateY] = formatTranslateAttr(translate);
    // Select all the ticks of the axis
    const ticks = axis.querySelectorAll('.tick');

    // Assert
    // Check if the axis is rendered
    expect(axis).not.toBeNull();
    expect(axis.getAttribute('class')).contains('axis');

    // Check if the axis has the default 10 ticks, this is the default value for d3
    expect(ticks.length).toBe(10 + 1);

    // Check if the axis has a path element for the domain
    const domain = axis.querySelector('.domain');
    expect(domain).not.toBeNull();

    // Check if the styling of text elements is correct
    expect(axis.style).not.toBeNull();
    expect(axis.style.color).toBe('black');
    expect(axis.style.fontSize).toBe('10px');

    // Check if the position of the axis is correct
    expect(translateX).toBe(config.placementX.toString());
    expect(translateY).toBe(config.placementY.toString());

    // Check if no label is drawn
    expect(label).toBe(null);
  });

  it('checks if a label is drawn if renderLabel is true', () => {
    // Arrange
    const scale = d3.scaleLinear().domain([0, 100]).range([0, 100]);
    const configAxis = d3.axisBottom(scale);
    const config = {
      placementX: 50,
      placementY: 50,
      axis: configAxis,
      renderLabel: true
    };
    // Act
    const axisGroup = createAxis(config);
    const axis = axisGroup[0] as SVGGElement;
    const label = axisGroup[1];

    // Assert
    // Check if the axis is rendered
    expect(axis).not.toBeNull();
    expect(axis.getAttribute('class')).contains('axis');

    // Check if the label is drawn
    expect(label).not.toBe(null);
    const labelText = label?.querySelector('text')?.textContent;
    expect(labelText).toBe('default');
  });

  it('renders a custom axis', () => {
    // Arrange
    const ticksNumber = 5;
    const scale: d3.ScaleLinear<number, number> = d3.scaleLinear().domain([0, 100]).range([0, 100]);
    const d3axis = d3.axisLeft(scale).ticks(ticksNumber);
    const config = {
      placementX: 0,
      placementY: 0,
      axis: d3axis,
      fontSize: 20,
      color: 'white',
      renderLabel: true,
      labelText: 'test'
    };

    // Act
    const axisGroup = createAxis(config);
    const axis = axisGroup[0] as SVGGElement;
    const label = axisGroup[1];

    // Assert
    // Check if the axis is rendered
    expect(axis).not.toBeNull();
    expect(axis.getAttribute('class')).contains('axis');

    // Check if the axis has the custom 5 ticks
    const ticks = axis.querySelectorAll('.tick');
    expect(ticks.length).toBe(ticksNumber + 1);

    // Check if the axis has a path element for the domain
    const domain = axis.querySelector('.domain');
    expect(domain).not.toBeNull();

    // Check if the styling of axis elements is correct
    expect(axis.style).not.toBeNull();
    expect(axis.style.color).toBe(config.color);
    expect(axis.style.fontSize).toBe(`${config.fontSize}px`);

    // Check if label styles are correct
    expect(label).not.toBe(null);
    const labelText = label?.querySelector('text');
    expect(labelText?.getAttribute('fill')).toBe(config.color);
    // Check if the correct text is displayed
    expect(labelText?.textContent).toBe(config.labelText);
  });

  it('renders an axis without ticks', () => {
    // Arrange
    const ticksNumber = 0;
    const scale: d3.ScaleLinear<number, number> = d3.scaleLinear().domain([0, 100]).range([0, 100]);
    const d3axis = d3.axisLeft(scale).ticks(ticksNumber);
    const config = {
      placementX: 0,
      placementY: 0,
      axis: d3axis
    };

    // Act
    const axisGroup = createAxis(config);
    const axis = axisGroup[0] as SVGGElement;

    // Assert
    // Check if the axis is rendered
    expect(axis).not.toBeNull();
    expect(axis.getAttribute('class')).contains('axis');

    // Check if the axis has no ticks
    const ticks = axis.querySelectorAll('.tick');
    expect(ticks.length).toBe(0);

    // Check if the axis has a path element for the domain
    const domain = axis.querySelector('.domain');
    expect(domain).not.toBeNull();
  });
});

describe('Axis placement test', () => {
  it('checks the bottom placement of the axis', () => {
    // These magic numbers are the default margins from the visualisationStore
    const defaultMargin = 40;
    const defaultHeight = 400;

    const expectedX = 0;
    const expectedY = defaultHeight - defaultMargin;

    // Arrange
    const ticksNumber = 0;
    const scale: d3.ScaleLinear<number, number> = d3.scaleLinear().domain([0, 100]).range([0, 100]);
    const d3axis = d3.axisBottom(scale).ticks(ticksNumber);
    const config = {
      placementX: 0,
      placementY: defaultHeight - defaultMargin,
      axis: d3axis
    };

    // Act
    const axisGroup = createAxis(config);
    const axis = axisGroup[0] as SVGGElement;

    const translate = axis.getAttribute('transform') ?? '';
    const [translateX, translateY] = formatTranslateAttr(translate);

    // Assert
    expect(translateX).toBe(expectedX.toString());
    expect(translateY).toBe(expectedY.toString());
  });

  it('checks the top placement of the axis', () => {
    // These magic numbers are the default margins from the visualisationStore
    const defaultMargin = 40;

    const expectedX = 0;
    const expectedY = defaultMargin;

    // Arrange
    const ticksNumber = 0;
    const scale: d3.ScaleLinear<number, number> = d3.scaleLinear().domain([0, 100]).range([0, 100]);
    const d3axis = d3.axisTop(scale).ticks(ticksNumber);
    const config = {
      placementX: 0,
      placementY: defaultMargin,
      axis: d3axis
    };

    // Act
    const axisGroup = createAxis(config);
    const axis = axisGroup[0] as SVGGElement;

    const translate = axis.getAttribute('transform') ?? '';
    const [translateX, translateY] = formatTranslateAttr(translate);

    // Assert
    expect(translateX).toBe(expectedX.toString());
    expect(translateY).toBe(expectedY.toString());
  });

  it('checks the left placement of the axis', () => {
    // These magic numbers are the default margins from the visualisationStore
    const defaultMargin = 40;

    const expectedX = defaultMargin;
    const expectedY = 0;

    // Arrange
    const ticksNumber = 0;
    const scale: d3.ScaleLinear<number, number> = d3.scaleLinear().domain([0, 100]).range([0, 100]);
    const d3axis = d3.axisLeft(scale).ticks(ticksNumber);
    const config = {
      placementX: defaultMargin,
      placementY: 0,
      axis: d3axis
    };

    // Act
    const axisGroup = createAxis(config);
    const axis = axisGroup[0] as SVGGElement;

    const translate = axis.getAttribute('transform') ?? '';
    const [translateX, translateY] = formatTranslateAttr(translate);

    // Assert
    expect(translateX).toBe(expectedX.toString());
    expect(translateY).toBe(expectedY.toString());
  });

  it('checks the right placement of the axis', () => {
    // These magic numbers are the default margins from the visualisationStore
    const defaultMargin = 40;
    const defaultWidth = 640;

    const expectedX = defaultWidth - defaultMargin;
    const expectedY = 0;

    // Arrange
    const ticksNumber = 0;
    const scale: d3.ScaleLinear<number, number> = d3.scaleLinear().domain([0, 100]).range([0, 100]);
    const d3axis = d3.axisLeft(scale).ticks(ticksNumber);
    const config = {
      placementX: defaultWidth - defaultMargin,
      placementY: 0,
      axis: d3axis
    };

    // Act
    const axisGroup = createAxis(config);
    const axis = axisGroup[0] as SVGGElement;

    const translate = axis.getAttribute('transform') ?? '';
    const [translateX, translateY] = formatTranslateAttr(translate);

    // Assert
    expect(translateX).toBe(expectedX.toString());
    expect(translateY).toBe(expectedY.toString());
  });
});

function createAxis(config: object): (SVGElement | null)[] {
  // Add svg block to the document
  const svg = document.createElement('svg');
  svg.setAttribute('id', 'svg');
  document.body.appendChild(svg);

  // Add axis to svg block
  const { container } = render(StoreWrapper, { props: { Component: Axis, config } });
  const completeAxis = container.getElementsByClassName('axis')[0] as SVGElement;
  const axis = container.getElementsByClassName('axisElement')[0] as SVGElement;
  const label = container.getElementsByClassName('label')[0] ?? null;
  svg.appendChild(completeAxis);
  return [axis as SVGGElement, label as SVGGElement | null];
}

function formatTranslateAttr(attr: string): string[] {
  // Function that takes the translate attribute of a SVGGElement
  // and returns an array in the form [x,y]
  const translate = attr.split(',');
  const translateX = translate[0].split('(')[1].split(' ')[0];
  const translateY = translate[1].split(' ')[1].split(')')[0];
  return [translateX, translateY];
}
