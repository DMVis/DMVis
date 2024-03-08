<script lang="ts">
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
</script>

<Scatterplot data={mapData} {height} {width} xAxis="age" yAxis="size" />
