# Line component

The hoverable line component is meant to be used in charts like a linechart. It produces a line between given points of certain color, size and style. It will change color when it (or any other line in the visualisation) is hovered.

> Note: This component can handle 2 or multiple points to draw a line through.

# Required Attributes

## points

- Type: `{ x: number; y: number }[]`

List of points containing an x and y value.

# Optional Attributes

## color

- Type: `string`
- Default: `#944`

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

## anyLineHovered

- Type: `boolean`
- Default: `false`

Should be true if a line in the visualisation is being hovered.

## id

- Type: `number`
- Default: `0`

Unique ID for an instance of the line. This is used to redraw the line when it is hovered, so it is on top.

## Sample usage

```svelte
<svg {width} {height}>
  <HoverLine
    points={p}
    width={2}
    {anyLineHovered}
    id={i}
    on:mouseenter={() => {
      anyLineHovered = true;
    }}
    on:mouseleave={() => {
      anyLineHovered = false;
    }} />
</svg>
```
