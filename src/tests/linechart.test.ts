import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import LineChart from '$lib/components/visualisations/LineChart.svelte';
import prepareSvgGetter from '../vitest/svgMock.js';

prepareSvgGetter();

describe('Html test', () => {
  it('renders a line chart using simple data input', () => {
    //Renders a linechart using simple data
    //Checks if width, height, path and axis are all correct
    const config = {
      width: 600,
      height: 500,
      data: createSimpleData()
    };
    const linechart = createLineChart(config);
    const lines = linechart.getElementsByClassName('line');

    //Check width and heigth
    expect(linechart.getAttribute('width')).toBe('600');
    expect(linechart.getAttribute('height')).toBe('500');

    //Check that there is only one line
    const numLines = lines.length;
    expect(numLines).toBe(1);

    //Check that the generated (scaled) path is correct
    const linePath = lines.item(0)!;
    expect(linePath.getAttribute('d')).toBe(
      `M40,460L126.66666666666666,390.00000000000006L213.33333333333331,208L300,292L386.66666666666663,75.00000000000001L473.33333333333337,40L560,109.99999999999997`
    );

    //Check axis count
    const numAxes = linechart.getElementsByClassName('axis').length;
    expect(numAxes).toBe(2);
  });
});

describe('Scaling test', () => {
  //Line should scale properly
  const config = {
    marginLeft: 40,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 60,
    width: 170,
    height: 180,
    data: createScaleData()
  };

  it('checks the dimensions of the line chart', () => {
    //Check dimensions
    const linechart = createLineChart(config);
    expect(linechart.getAttribute('width')).toBe('170');
    expect(linechart.getAttribute('height')).toBe('180');
  });

  it('checks if the path is scaled properly with different margins', () => {
    const linechart = createLineChart(config);
    const path = linechart.getElementsByClassName('line').item(0)!;

    expect(path.getAttribute('d')).toBe(`M40,120L50,101.25L70,95L100,76.25L140,26.25`);
  });
});

function createLineChart(config: object): SVGElement {
  //Remove previously drawn line chart if present
  if (document.body.children.length > 0) {
    document.body.innerHTML = '';
  }
  const { container } = render(LineChart, config);
  const linechart = container.getElementsByClassName('visualisation')[0] as SVGElement;
  return linechart;
}

function createSimpleData(): { x: number; y: number }[] {
  return [
    { x: 0, y: 0 },
    { x: 50, y: 50 },
    { x: 100, y: 180 },
    { x: 150, y: 120 },
    { x: 200, y: 275 },
    { x: 250, y: 300 },
    { x: 300, y: 250 }
  ];
}

function createScaleData(): { x: number; y: number }[] {
  return [
    { x: 0, y: 0 },
    { x: 1, y: 3 },
    { x: 3, y: 4 },
    { x: 6, y: 7 },
    { x: 10, y: 15 }
  ];
}
