// Imports
import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

// DMVis imports
import Icon from '$lib/components/base/Icon.svelte';
import { IconType } from '$lib/Enums.js';

describe('Icon test', () => {
  it('renders all icons', () => {
    // Arrange
    const icons = [IconType.Sort, IconType.Search, IconType.Filter, IconType.More];

    // Act
    const iconElements = icons.map((icon) => {
      return render(Icon, { x: 0, y: 0, icon: icon }).container.querySelector('svg');
    });

    // Assert
    iconElements.forEach((iconElement) => {
      const path = iconElement?.querySelector('path');
      expect(iconElement).toBeDefined();
      expect(iconElement).toBeInstanceOf(SVGElement);
      expect(iconElement?.getAttribute('x')).toBe('0');
      expect(iconElement?.getAttribute('y')).toBe('0');
      expect(path).toBeDefined();
      expect(path).toBeInstanceOf(SVGElement);
      expect(path?.getAttribute('d')).toBeDefined();
      expect(path?.getAttribute('d')).not.toBe('');
      expect(path?.getAttribute('stroke')).toBe('#000000');
    });
  });

  it('renders a custom icon', () => {
    // Arrange
    const icon = 'M0,0 L10,10 L0,10 Z';

    // Act
    const { container } = render(Icon, { x: 0, y: 0, icon: icon });
    const svgElement = container.querySelector('svg');
    const pathElement = container.querySelector('path');

    // Assert
    expect(svgElement).toBeDefined();
    expect(svgElement).toBeInstanceOf(SVGElement);
    expect(svgElement?.getAttribute('x')).toBe('0');
    expect(svgElement?.getAttribute('y')).toBe('0');
    expect(pathElement).toBeDefined();
    expect(pathElement).toBeInstanceOf(SVGElement);
    expect(pathElement?.getAttribute('d')).toBe(icon);
    expect(pathElement?.getAttribute('stroke')).toBe('#000000');
  });

  it('renders a custom icon with a custom stroke color', () => {
    // Arrange
    const icon = 'M0,0 L10,10 L0,10 Z';
    const stroke = '#ff0000';

    // Act
    const { container } = render(Icon, { x: 0, y: 0, icon: icon, color: stroke });
    const pathElement = container.querySelector('path');

    // Assert
    expect(pathElement).toBeDefined();
    expect(pathElement).toBeInstanceOf(SVGElement);
    expect(pathElement?.getAttribute('stroke')).toBe(stroke);
  });
});
