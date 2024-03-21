# Scatterplot

This is a visualisation to display a dataset of points

# Required Attributes

## width

- Type: `number`

Width of the visualisation

## height

- Type: `number`

Height of the visualisation

## data

- Type: `Map<string,number>[]` or `{ x: number; y: number }[]`

List of all the points. Can be in simple format to just be a list of x- and y-coordinates. Or it can be a Map, where each string represents the name of this attribute, and the number represents the number associated with this attribute. This can be used to create visualisations like a scatterplot matrix.

> Note: If you opt for the Map datatype, it is essential to also set the `xAxis` and `yAxis` attribute!

# Semi-Required Attributes

These attributes are required when making use of the Map datatype for the data

## xAxis

- Type: `string`

The name of the attribute that should be plotted along the x-axis.

> Note: This should be the same name as the one that is provided in the input data

## yAxis

- Type: `string`

The name of the attribute that should be plotted along the y-axis.

> Note: This should be the same name as the one that is provided in the input data

# Optional Attributes

## marginLeft

- Type: `number`
- Default: `40`

Margin left of the visualisation

## marginRight

- Type: `number`
- Default: `40`

Margin right of the visualisation

## marginTop

- Type: `number`
- Default: `40`

Margin above of the visualisation

## marginBottom

- Type: `number`
- Default: `40`

Margin under of the visualisation

## minX

- Type: `number`| `'auto'`
- Default: `0`

Minimal value of the horizontal axis. When set to `'auto'` it will find the lowest x-value in the input data, and round down to create rounded ticks

> Note: If you already know the minimal value `x` can take, it will save a significant amount of computing time if you fill this in yourself.

## maxX

- Type: `number` | `'auto'`
- Default: `'auto'`

Maximal value of the horizontal axis. When set to `'auto'` it will find the highest x-value in the input data, and round up to create rounded ticks

> Note: If you already know the maximal value `x` can take, it will save a significant amount of computing time if you fill this in yourself.

## minY

- Type: `number`| `'auto'`
- Default: `0`

Minimal value of the horizontal axis. When set to `'auto'` it will find the lowest y-value in the input data, and round down to create rounded ticks

> Note: If you already know the minimal value `y` can take, it will save a significant amount of computing time if you fill this in yourself.

## maxY

- Type: `number` | `'auto'`
- Default: `'auto'`

Maximal value of the horizontal axis. When set to `'auto'` it will find the highest y-value in the input data, and round up to create rounded ticks

> Note: If you already know the maximal value `y` can take, it will save a significant amount of computing time if you fill this in yourself.

## showAxis

- Type: `bool`
- Default: `true`

Whether or not to display the Left- and Bottom-axis.

## Sample usage

An example of the 'simple' data input

```svelte
<script lang="ts">
  const width: number = 500;
  const heigth: number = 500;
  const data: { x: number; y: number }[] = [
    { x: 130, y: 50 },
    { x: 49, y: 432 },
    { x: 150, y: 385 },
    { x: 483, y: 245 },
    { x: 287, y: 174 }
  ];
</script>

<Scatterplot {width} {height} {data} />
```

An example of the `Map` data input

```svelte
<script>
  const width: number = 500;
  const heigth: number = 500;
  const mapData: Map<string, number>[] = [
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
```
