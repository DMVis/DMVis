# StaticLine

The static line component is meant to be used in charts like a line chart. It produces a line between the points that are provided with a certain colour, size and style.

> Note: The points passed to the StaticLine component are true coordinates, meaning that they will be plotted at these exact coordinates.

## Table of Contents

- [Attributes](#attributes)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Example Usage](#example-usage)

## Attributes

<table style="width: 75%">
  <thead>
    <tr>
      <th style="width: 33%;">Attribute</th>
      <th style="width: 33%;">Type</th>
      <th style="width: 33%;">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#components/StaticLine?id=points">points</a>*</td>
      <td><code>{ x: number; y: number }[]</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/StaticLine?id=color'>color</a></td>
      <td><code>string</code></td>
      <td><code>'#000'</code></td>
    </tr>
    <tr>
      <td><a href='#components/StaticLine?id=linewidth'>lineWidth</a></td>
      <td><code>number</code></td>
      <td><code>1</code></td>
    </tr>
    <tr>
      <td><a href='#components/StaticLine?id=dashlength'>dashLength</a></td>
      <td><code>string</code></td>
      <td><code>'0'</code></td>
    </tr>
    <tr>
      <td><a href='#components/StaticLine?id=opacity'>opacity</a></td>
      <td><code>number</code></td>
      <td><code>1</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### points

- Type: `{ x: number; y: number }[]`
- <span style="color:coral">Required</span>

A list of points containing an x and y value.

## Optional Attributes

### color

- Type: `string`
- Default: `'#000'`

The colour of the line.
Valid inputs include CSS colours specified as a string.

### lineWidth

- Type: `number`
- Default: `1`

The width of the line.

### dashLength

- Type: `string`
- Default: `'0'`

The length of the strokes of the line.
If set to a higher value, it will result in a dotted line.
Defaults to a normal line.

### opacity

- Type: `number`
- Default: `1`

The opacity of the line.
It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).

## Example Usage

<b>Creating a basic static line.</b>

```svelte
<script lang="ts">
  import { StaticLine } from '@dmvis/dmvis/components';

  const pointList = [
    { x: 0, y: 432 },
    { x: 125, y: 234 },
    { x: 250, y: 285 },
    { x: 375, y: 158 },
    { x: 500, y: 458 }
  ];
</script>

<svg width={500} height={500}>
  <StaticLine points={pointList} />
</svg>
```

<b>Creating a more customised dotted line.</b>

```svelte
<script lang="ts">
  import { StaticLine } from '@dmvis/dmvis/components';

  const pointList = [
    { x: 0, y: 432 },
    { x: 125, y: 234 },
    { x: 250, y: 285 },
    { x: 375, y: 158 },
    { x: 500, y: 458 }
  ];
</script>

<svg width={500} height={500}>
  <StaticLine points={pointList} color={'#ABCDEF'} lineWidth={5} dashLength="10" opacity={0.5} />
</svg>
```
