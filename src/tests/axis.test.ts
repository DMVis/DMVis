import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import Axis from '$lib/components/base/Axis.svelte';
import Wrapper from './Wrapper.svelte';

describe('Rendering tests', () => {
  it('renders a default axis', () => {
    const axis = prepareAxis({});

    // Check if the axis is rendered
    expect(axis).not.toBeNull();
    expect(axis.getAttribute('class')).contains('axis');

    // Check if the axis has the default 10 ticks
    const ticks = axis.querySelectorAll('.tick');
    expect(ticks.length).toBe(10 + 1);

    // Check if the axis has a path element for the domain
    const domain = axis.querySelector('.domain');
    expect(domain).not.toBeNull();

    // Check if the styling of text elements is correct
    const text = axis.querySelector('text');
    expect(text?.style).not.toBeNull();
    expect(text?.style.color).toBe('black');
    expect(text?.style.fontSize).toBe('17px');
  });

  it('renders a custom axis', () => {
    const config = {
      ticks: true,
      fontSize: 20,
      color: 'white',
      ticksNumber: 5
    };

    const axis = prepareAxis(config);

    // Check if the axis is rendered
    expect(axis).not.toBeNull();
    expect(axis.getAttribute('class')).contains('axis');

    // Check if the axis has the custom 5 ticks
    const ticks = axis.querySelectorAll('.tick');
    expect(ticks.length).toBe(config.ticksNumber + 1);

    // Check if the axis has a path element for the domain
    const domain = axis.querySelector('.domain');
    expect(domain).not.toBeNull();

    // Check if the styling of text elements is correct
    const text = axis.querySelector('text');
    expect(text?.style).not.toBeNull();
    expect(text?.style.color).toBe(config.color);
    expect(text?.style.fontSize).toBe(`${config.fontSize}px`);
  });

  it('renders an axis without ticks', () => {
    const config = {
      ticksNumber: 0
    };

    const axis = prepareAxis(config);
    console.log(axis.outerHTML);

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

  // TODO: Add tests for the placements of the axis
});

function prepareAxis(config: object): SVGElement {
  // Add svg block to the document
  const svg = document.createElement('svg');
  svg.setAttribute('id', 'svg');
  document.body.appendChild(svg);

  // Add axis to svg block
  const { container } = render(Wrapper, { props: { Component: Axis, config } });
  const axis = container.getElementsByClassName('axis')[0] as SVGElement;
  svg.appendChild(axis);

  // Return the axis
  return axis as SVGElement;
}
