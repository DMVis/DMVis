# Line component

The line component is used for visualisations that need lines. It produces a line between given points of certain color, size and style. It holds the possibility to highlight these lines by hovering over them.

> Note: This component can handle 2 or multiple points to draw a line through.

# Required Attributes

None

# Optional Attributes

## focusColor

- Type: `string`
- Default: `#F44`

Color of the line when this specific line is hovered.

## color

- Type: `string`
- Default: `#BBB`

Color of the line when no lines are hovered.

## lineWidth

- Type: `number`
- Default: `1`

Width of the line that is drawn.

## hoverable

- Type: `boolean`
- Default: `false`

Whether or not the line should be hoverable. When set to `true`, the line will become highlighted if the line is hovered, and numbers will be displayed on all the points.

## Sample usage

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
