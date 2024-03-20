<script lang="ts">
  import BarChartHorizontal from '$lib/components/visualisations/BarChartHorizontal.svelte';
  import BarChartVertical from '$lib/components/visualisations/BarChartVertical.svelte';
  import LineChart from '$lib/components/visualisations/LineChart.svelte';
  import MultiLineChart from '$lib/components/visualisations/MultiLineChart.svelte';
  import MultipleAxes from '$lib/components/visualisations/MultipleAxes.svelte';
  import Scatterplot from '$lib/components/visualisations/Scatterplot.svelte';

  const height: number = 500;
  const width: number = 500;

  const mapData: Map<string, number>[] = [
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

  const data = [
    { x: 0, y: 0 },
    { x: 50, y: 50 },
    { x: 100, y: 100 },
    { x: 150, y: 150 },
    { x: 200, y: 150 },
    { x: 250, y: 150 }
  ];

  const barData: { label: string; value: number }[] = [
    { label: 'a', value: 0 },
    { label: 'b', value: 50 },
    { label: 'c', value: 100 },
    { label: 'd', value: 200 },
    { label: 'e', value: 400 },
    { label: 'f', value: 450 },
    { label: 'g', value: 500 }
  ];
  function generateLargeDataset(numLines: number, numPointsPerLine: number) {
    const dataset = [];
    for (let i = 0; i < numLines; i++) {
      const lineData = [];
      for (let j = 0; j < numPointsPerLine; j++) {
        const x = j * (1000 / numPointsPerLine);
        const y = Math.floor(Math.random() * 1000);
        lineData.push({ x: x, y: y });
      }
      dataset.push(lineData);
    }
    return dataset;
  }
  const largeData = generateLargeDataset(100, 10);
</script>

<Scatterplot data={mapData} {height} {width} xAxis="age" yAxis="size" />
<LineChart marginLeft={40} marginBottom={40} {width} {height} {data} />
<br />
<BarChartVertical {width} {height} data={barData} minY={0} maxY={500} />
<BarChartHorizontal {width} {height} data={barData} minX={0} maxX={500} />
<br />
<MultiLineChart marginLeft={50} marginBottom={40} {width} {height} data={largeData} />
<MultipleAxes
  data={[
    ['label', 'gewicht', 'hoogte'],
    ['Jesper', 67, 173],
    ['Jelte', 82, 184]
  ]}
  {width}
  {height} />
