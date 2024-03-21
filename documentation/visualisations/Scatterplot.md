# Scatterplot

This is a visualisation to display a dataset of points

# Required Attributes

## width

- Type: `number`

Width of the visualisation

## height

- Type: `number`

Height of the visualisation

# Semi-Required Attributes

These attributes are required when making use of the AoA datatype for the data

## xAxis

- Type: `string`

The name of the attribute that should be plotted along the x-axis.

> Note: This should be the same name as the one that is provided in the input data

## yAxis

- Type: `string`

The name of the attribute that should be plotted along the y-axis.

> Note: This should be the same name as the one that is provided in the input data

# Optional Attributes

## showAxis

- Type: `bool`
- Default: `true`

Whether or not to display the Left- and Bottom-axis.

## numTicks

- Type: `number`
- Default: `5`

Amount of ticks to display on each of the axis.

## pointColor

- Type: `string`
- Default: `#CCCCFF`

Fill color of the points of the scatterplot.

## pointOpacity

- Type: `number`
- Default: `1`

Opacity of the points of the scatterplot.

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

An example of the AoA data input

```svelte
<script>
  const width: number = 500;
  const heigth: number = 500;
  const data: Array<Array<string | number>> = [
    ['Name', 'weight', 'size', 'age'],
    ['Piet', 0, 0, 0],
    ['Jaap', 98, 295, 52],
    ['Klara', 152, 350, 61],
    ['Sarah', 73, 213, 43],
    ['Henk', 43, 112, 16],
    ['Pieter', 359, 429, 75]
  ];
</script>

<Scatterplot {data} {height} {width} xAxis="age" yAxis="size" />
```
