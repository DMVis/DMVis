import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import Scatterplot from '$lib/components/visualisations/Scatterplot.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Html test', () => {
  it('renders a scatterplot using simple data input', () => {
    //Renders a scatterplot using simple data
    //Checks if width, height, amount of points and axis are all correct
    const config = {
      width: 600,
      height: 500,
      data: createSimpleData()
    };
    const scatterplot = createScatterplot(config);

    //Check width and heigth
    expect(scatterplot.getAttribute('width')).toBe('600');
    expect(scatterplot.getAttribute('height')).toBe('500');

    //Check number of points
    const numPoints = scatterplot.getElementsByClassName('point').length;
    expect(numPoints).toBe(8);

    //Check axis
    const numChildren = scatterplot.getElementsByClassName('axis').length;
    expect(numChildren).toBe(2);
  });

  it('renders a scatterplot using map data input', () => {
    //Renders a scatterplot using map data
    //Checks if width, height, amount of points and axis are all correct
    const config = {
      width: 438,
      height: 942,
      data: createMapData(),
      xAxis: 'weight',
      yAxis: 'age'
    };
    const scatterplot = createScatterplot(config);

    //Check width and heigth
    expect(scatterplot.getAttribute('width')).toBe('438');
    expect(scatterplot.getAttribute('height')).toBe('942');

    //Check number of points
    const numPoints = scatterplot.getElementsByClassName('point').length;
    expect(numPoints).toBe(6);

    //Check axis
    const numAxis = scatterplot.getElementsByClassName('axis').length;
    expect(numAxis).toBe(2);
  });

  it('checks if showAxis omits the axis', () => {
    //Checks if there are no components with a class 'axis'
    const config = {
      width: 438,
      height: 942,
      data: createMapData(),
      xAxis: 'weight',
      yAxis: 'age',
      showAxis: false
    };
    const scatterplot = createScatterplot(config);
    const numAxis = scatterplot.getElementsByClassName('axis').length;
    expect(numAxis).toBe(0);
  });
});

describe('Error checking', () => {
  //Map data, where an error should be thrown if either xAxis or yAxis is not recognised
  it('checks if an error is thrown if xAxis is not specified when using mapData', () => {
    const config = {
      width: 438,
      height: 942,
      data: createMapData(),
      xAxis: 'something',
      yAxis: 'age'
    };

    expect(() => {
      render(Scatterplot, config);
    }).toThrow('xAxis is not recognised, you may need to set the xAxis parameter');
  });
  it('checks if an error is thrown if yAxis is not specified when using mapData', () => {
    const config = {
      width: 438,
      height: 942,
      data: createMapData(),
      xAxis: 'age',
      yAxis: 'something'
    };

    expect(() => {
      render(Scatterplot, config);
    }).toThrow('yAxis is not recognised, you may need to set the yAxis parameter');
  });

  //Simple data, where xAxis and yAxis are not mandatory
  //Meaning there should be no error
  it('checks if no error is thrown if xAxis is not specified when using simple data', () => {
    const config = {
      width: 438,
      height: 942,
      data: createSimpleData(),
      xAxis: 'something',
      yAxis: 'age'
    };
    render(Scatterplot, config);
    //If we have made it to this point, it means no error is thrown meaning the test is a succes
  });
  it('checks if no error is thrown if yAxis is not specified when using simple data', () => {
    const config = {
      width: 438,
      height: 942,
      data: createSimpleData(),
      xAxis: 'age',
      yAxis: 'something'
    };
    render(Scatterplot, config);
    //If we have made it to this point, it means no error is thrown meaning the test is a succes
  });
});

describe('Scaling test', () => {
  //Points should scale properly
  const config = {
    marginLeft: 40,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 30,
    width: 160,
    height: 140,
    data: createScaleData(),
    maxY: 10,
    maxX: 10
  };

  it('checks the dimensions of the scatterplot', () => {
    //Check dimensions
    const scalingScatter = createScatterplot(config);
    expect(scalingScatter.getAttribute('width')).toBe('160');
    expect(scalingScatter.getAttribute('height')).toBe('140');
  });

  it('checks if a point at (0,0) is scaled to the proper spot', () => {
    const scalingScatter = createScatterplot(config);
    const points = scalingScatter.getElementsByClassName('point');

    //Point (0,0)
    const point = points[0] as SVGCircleElement;
    expect(point.getAttribute('cx')).toBe('40');
    expect(point.getAttribute('cy')).toBe('110');
  });

  it('checks if a point at (maxX,maxY) is scaled to the proper spot', () => {
    const scalingScatter = createScatterplot(config);
    const points = scalingScatter.getElementsByClassName('point');

    //Point (10,10)
    const point = points[4] as SVGCircleElement;
    expect(point.getAttribute('cx')).toBe('140');
    expect(point.getAttribute('cy')).toBe('10');
  });

  it('checks if a point is scaled to the proper spot', () => {
    const scalingScatter = createScatterplot(config);
    const points = scalingScatter.getElementsByClassName('point');

    //Point (3,8)
    let point = points[1] as SVGCircleElement;
    expect(Math.round(parseFloat(point.getAttribute('cx') ?? '0'))).toBe(70);
    expect(Math.round(parseFloat(point.getAttribute('cy') ?? '0'))).toBe(30);

    //Point (6,6)
    point = points[2] as SVGCircleElement;
    expect(Math.round(parseFloat(point.getAttribute('cx') ?? '0'))).toBe(100);
    expect(Math.round(parseFloat(point.getAttribute('cy') ?? '0'))).toBe(50);

    //Point (8,3)
    point = points[3] as SVGCircleElement;
    expect(Math.round(parseFloat(point.getAttribute('cx') ?? '0'))).toBe(120);
    expect(Math.round(parseFloat(point.getAttribute('cy') ?? '0'))).toBe(80);
  });
});

function createScatterplot(config: object): SVGElement {
  //Remove previously drawn scatterplot if present
  if (document.body.children.length > 0) {
    document.body.innerHTML = '';
  }
  const { container } = render(Scatterplot, config);
  const scatterplot = container.getElementsByClassName('visualisation')[0] as SVGElement;
  return scatterplot;
}

function createSimpleData(): { x: number; y: number }[] {
  // 8 points
  return [
    { x: 0, y: 0 },
    { x: 50, y: 50 },
    { x: 50, y: 100 },
    { x: 72, y: 72 },
    { x: 150, y: 150 },
    { x: 200, y: 200 },
    { x: 180, y: 180 },
    { x: 300, y: 300 }
  ];
}

function createMapData(): Map<string, number>[] {
  // 6 points
  return [
    new Map([
      ['weight', 0],
      ['size', 0],
      ['age', 0]
    ]),
    new Map([
      ['weight', 98],
      ['size', 295],
      ['age', 52]
    ]),
    new Map([
      ['weight', 152],
      ['size', 350],
      ['age', 61]
    ]),
    new Map([
      ['weight', 73],
      ['size', 213],
      ['age', 43]
    ]),
    new Map([
      ['weight', 43],
      ['size', 112],
      ['age', 16]
    ]),
    new Map([
      ['weight', 359],
      ['size', 429],
      ['age', 75]
    ])
  ];
}

function createScaleData(): { x: number; y: number }[] {
  //More simple data to be used when testing the scaled points
  return [
    { x: 0, y: 0 },
    { x: 3, y: 8 },
    { x: 6, y: 6 },
    { x: 8, y: 3 },
    { x: 10, y: 10 }
  ];
}
