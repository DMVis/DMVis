# Scatterplot

This is a visualisation to display a dataset of points

# Required Attributes

## width

- Type: `number`

Width of the visualisation.

## height

- Type: `number`

Height of the visualisation.

## xAxis

- Type: `string`

The name of the attribute should be plotted along the x-axis.

> Note: This should be the same name as the one that is provided in the input data.

## yAxis

- Type: `string`

The name of the attribute that should be plotted along the y-axis.

> Note: This should be the same name as the one that is provided in the input data.

# Optional Attributes

## showAxis

- Type: `bool`
- Default: `true`

Whether or not to display the Left- and Bottom-axis.

## numTicks

- Type: `number`
- Default: `5`

Amount of ticks to display on each of the axes.

## pointOpacity

- Type: `number`
- Default: `1`

The opacity of the points of the scatterplot.

# Example usage

```svelte
<script lang="ts">
  const width: number = 500;
  const height: number = 500;
  const data: Array<Array<string | number>> = [
    ['Name', 'weight', 'size', 'age'],
    ['Piet', 0, 0, 0],
    ['Jaap', 98, 295, 52],
    ['Klara', 152, 350, 61],
    ['Sarah', 73, 213, 43],
    ['Henk', 43, 112, 16],
    ['Pieter', 359, 429, 75]
  ];

  const store = new VisualisationStore();

  store.marginLeft.set(0);
  store.marginRight.set(0);
  store.marginTop.set(0);
  store.marginBottom.set(0);

  store.data.set(data.slice(1));
  store.columns.set(data[0] as string[]);
  store.height.set(height);
  store.width.set(width);

  setContext('store', store);
</script>

<Scatterplot {height} {width} xAxis="age" yAxis="size" />
```
