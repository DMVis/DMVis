import { render } from '@testing-library/svelte';
import prepareSvgGetter from '../vitest/svgMock.js';
import { describe, it, expect } from 'vitest';

import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
import StoreWrapper from './VisualisationStoreWrapper.svelte';
import { SpacerEqual, SpacerSide } from '$lib/utils/Spacer.js';

prepareSvgGetter();

describe('Rendering vertical axes with horizontal spacing test', () => {
  it('renders vertical axes with horizontal spacing and default alignment', () => {
    // Arrange
    const config = {
      position: 'left',
      spacingDirection: 'horizontal'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'start');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe(spacer(columns[index + 1])?.toString());
      expect(translateY).toBe('0');

      // Check if no labels are drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders vertical axes with horizontal spacing and start alignment', () => {
    // Arrange
    const config = {
      position: 'left',
      spacingDirection: 'horizontal',
      alignment: 'start'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'start');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe(spacer(columns[index + 1])?.toString());
      expect(translateY).toBe('0');

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders vertical axes with horizontal spacing and end alignment', () => {
    // Arrange
    const config = {
      position: 'left',
      spacingDirection: 'horizontal',
      alignment: 'end'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'end');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe(spacer(columns[index + 1])?.toString());
      expect(translateY).toBe('0');

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders vertical axes with horizontal spacing and spaced alignment', () => {
    // Arrange
    const config = {
      position: 'left',
      spacingDirection: 'horizontal',
      alignment: 'spaced'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerEqual(1000, 0, 0, columns);

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe(spacer(columns[index + 1])?.toString());
      expect(translateY).toBe('0');

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });
});

describe('Rendering horizontal axes with horizontal spacing test', () => {
  it('renders horizontal axes with horizontal spacing and default alignment', () => {
    // Arrange
    const config = {
      position: 'bottom',
      spacingDirection: 'horizontal'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'start');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe(spacer(columns[index + 1])?.toString());
      expect(translateY).toBe('1000');

      // Check if no labels are drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders horizontal axes with horizontal spacing and start alignment', () => {
    // Arrange
    const config = {
      position: 'bottom',
      spacingDirection: 'horizontal',
      alignment: 'start'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'start');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe(spacer(columns[index + 1])?.toString());
      expect(translateY).toBe('1000');

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders horizontal axes with horizontal spacing and end alignment', () => {
    // Arrange
    const config = {
      position: 'bottom',
      spacingDirection: 'horizontal',
      alignment: 'end'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'end');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe(spacer(columns[index + 1])?.toString());
      expect(translateY).toBe('1000');

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders horizontal axes with horizontal spacing and spaced alignment', () => {
    // Arrange
    const config = {
      position: 'bottom',
      spacingDirection: 'horizontal',
      alignment: 'spaced'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerEqual(1000, 0, 0, columns);

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe(spacer(columns[index + 1])?.toString());
      expect(translateY).toBe('1000');

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });
});

describe('Rendering vertical axes with vertical spacing test', () => {
  it('renders vertical axes with vertical spacing and default alignment', () => {
    // Arrange
    const config = {
      position: 'left',
      spacingDirection: 'vertical'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'start');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe('0');
      expect(translateY).toBe(spacer(columns[index + 1])?.toString());

      // Check if no labels are drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders vertical axes with vertical spacing and start alignment', () => {
    // Arrange
    const config = {
      position: 'left',
      spacingDirection: 'vertical',
      alignment: 'start'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'start');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe('0');
      expect(translateY).toBe(spacer(columns[index + 1])?.toString());

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders vertical axes with vertical spacing and end alignment', () => {
    // Arrange
    const config = {
      position: 'left',
      spacingDirection: 'vertical',
      alignment: 'end'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'end');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe('0');
      expect(translateY).toBe(spacer(columns[index + 1])?.toString());

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders vertical axes with vertical spacing and spaced alignment', () => {
    // Arrange
    const config = {
      position: 'left',
      spacingDirection: 'vertical',
      alignment: 'spaced'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerEqual(1000, 0, 0, columns);

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe('0');
      expect(translateY).toBe(spacer(columns[index + 1])?.toString());

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });
});

describe('Rendering horizontal axes with vertical spacing test', () => {
  it('renders horizontal axes with vertical spacing and default alignment', () => {
    // Arrange
    const config = {
      position: 'top',
      spacingDirection: 'vertical'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'start');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe('0');
      expect(translateY).toBe(spacer(columns[index + 1])?.toString());

      // Check if no labels are drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders horizontal axes with vertical spacing and start alignment', () => {
    // Arrange
    const config = {
      position: 'top',
      spacingDirection: 'vertical',
      alignment: 'start'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'start');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe('0');
      expect(translateY).toBe(spacer(columns[index + 1])?.toString());

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders horizontal axes with vertical spacing and end alignment', () => {
    // Arrange
    const config = {
      position: 'top',
      spacingDirection: 'vertical',
      alignment: 'end'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerSide(1000, 0, 0, columns, 'end');

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe('0');
      expect(translateY).toBe(spacer(columns[index + 1])?.toString());

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });

  it('renders horizontal axes with vertical spacing and spaced alignment', () => {
    // Arrange
    const config = {
      position: 'top',
      spacingDirection: 'vertical',
      alignment: 'spaced'
    };
    const columns = ['Country', 'Inhabitants', 'gdp'];
    const spacer = SpacerEqual(1000, 0, 0, columns);

    // Act
    const axisGroup = createAxis(config);
    const axes = axisGroup[0] as SVGElement[];
    const labels = axisGroup[1] as SVGElement[];

    // For each axis, check whether it is rendered correctly
    axes.slice(1).forEach((axis, index) => {
      // Get the transform attribute from the axis, and format it
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
      expect(axis.style.fontSize).toBe('12px');

      // Check if the position of the axis is correct
      expect(translateX).toBe('0');
      expect(translateY).toBe(spacer(columns[index + 1])?.toString());

      // Check if no labels is drawn
      expect(labels).toStrictEqual([]);
    });
  });
});

function createAxis(config: object): (SVGElement | null)[][] {
  // Add svg block to the document
  const svg = document.createElement('svg');
  svg.setAttribute('id', 'svg');
  document.body.appendChild(svg);

  // Add axis to svg block
  const { container } = render(StoreWrapper, { props: { Component: DynamicAxis, config } });
  const completeAxes = [...container.getElementsByClassName('axis')] as SVGElement[];
  const axes = [...container.getElementsByClassName('axisElement')] as SVGElement[];
  const labels = [...(container.getElementsByClassName('label') ?? null)] as SVGElement[];
  completeAxes.forEach((axis) => {
    svg.appendChild(axis);
  });
  return [axes, labels];
}

function formatTranslateAttr(attr: string): string[] {
  // Function that takes the translate attribute of a SVGGElement,
  // and returns an array in the form [x,y]
  const translate = attr.split(',');
  const translateX = translate[0].split('(')[1].split(' ')[0];
  const translateY = translate[1].split(' ')[1].split(')')[0];
  return [translateX, translateY];
}
