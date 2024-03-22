# Line component

The hoverable line component is meant to be used in charts like a linechart. It produces a line between given points of certain color, size and style. It will change color when it (or any other line in the visualisation) is hovered.

> Note: This component can handle 2 or multiple points to draw a line through.

# Required Attributes

None

# Optional Attributes

## color

- Type: `string`
- Default: `#977`

Color of the line when no lines are hovered.

## focusColor

- Type: `string`
- Default: `#F44`

Color of the line when this specific line is hovered.

## notFocusColor

- Type: `string`
- Default: `#BBB`

Color of the line when any other line is hovered.

## lineWidth

- Type: `number`
- Default: `1`

Width of the line that is drawn.

## Sample usage

```svelte
<script lang="ts">
  const visualisationStore = new VisualisationStore();
  visualisationStore.width.set(width);
  visualisationStore.height.set(height);
  visualisationStore.data.set(data);
</script>

<svg {width} {height}>
  <HoverLine />
</svg>
```
