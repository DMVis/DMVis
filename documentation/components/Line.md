# Line component

The line component is used for visualisations that need lines. It produces a line between the points with a certain colour, size and style. It holds the possibility to highlight these lines by hovering over them.

> Note: This component can handle 2 or multiple points to draw a line through.

# Table of Contents

- [Referenced Components](#referenced-components)
- [Optional Attributes](#optional-attributes)
- [Example usage](#example-usage)

# Referenced Components

This component utilises the following components:

<table style="width: 50%">
  <thead>
    <tr>
      <th style="width: 20%;">Component</th>
      <th style="width: 80%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#/components/Tooltip.md">Tooltip</a></td>
      <td>Used to quickly display a small amount of information to the user.</td>
    </tr>
  </tbody>
</table>

# Optional Attributes

## alignment

- Type: `Alignment`
- Default: `'spaced'`
- Options: `'start'`, `'end'`, `'spaced'`

Alignment of the points on the lines. If using `DynamicAxis`, choose the same alignment option.

## lineWidth

- Type: `number`
- Default: `1`

Width of the line that is drawn.

## hoverable

- Type: `boolean`
- Default: `false`

Whether or not the line should be hoverable. When set to `true`, the line will become highlighted if the line is hovered, and numbers will be displayed on all the points.

## axisOrder

- Type: `string[]`
- Default: `[]`

Order of the attributes, which determines the placement of points on each line.

## draggedAxis:

- Type: `UndefineableString`
- Default: `undefined`

The name of the axis that is being dragged, is used in visualisations that use draggable axes.

## draggingOffset

- Type: `number`
- Default: `0`

The offset of the axis that is being dragged.

# Example usage

```svelte
<script lang="ts">
  const visualisationStore = new VisualisationStore();
  visualisationStore.width.set(width);
  visualisationStore.height.set(height);
  visualisationStore.data.set(data);
</script>

<svg {width} {height}>
  <Line hoverable={true} />
</svg>
```
