# Axis component

The Axis component renders a single axis based on a single, provided d3.axis element.
You can use this component to render an axis on any side of a visualisation, with the option
of adding a label on any side of the axis.

# Required attributes

## placementX

- Type: `number`

Horizontal start position of the axis.

## placementY

- Type: `number`

The vertical start position of the axis.

## axis

- Type: `d3.Axis<string>` | `d3.Axis<d3.NumberValue>`

D3 Axis component. See example usage on how to create the d3 axis.

> Note: See [d3 documentation](https://d3js.org/d3-axis) for the different kinds of axes you can create.

# Optional Attributes

## renderLabel

- Type: `boolean`
- Default: `false`

Renders a label next to the axis.

## labelText

- Type: `string`
- Default: `'default'`

Text for the label.

## labelPosition:

- Type: `string`
- Default: `'top'`
- Options: `'left'`, `'right'`, `'top'`, `'bottom'`

Position of the label relative to the axis.

## labelOffset

- Type: `number`
- Default: `20`

Distance from the label to the axis.

## fontSize

- Type: `number`
- Default: `12`

Font size of the tick labels.

## color

- Type: `string`
- Default: `'#000000'`

Color of the axis line and label.

## isDraggable

- Type: `boolean`
- Default: `false`

Sets whether the axis is draggable. For this to work, the `renderLabel` parameter should be set to `true`.

> Note: Logic for the displacement of the axis should be handled outside this component.

## squashOuterTicks

- Type: `boolean`
- Default: `false`

Whether or not to tuck in the first and last tick.

# Events

This component emits the following events:

- `dragMove`
- `dragStop`
- `renderAxis`

To read more about these events, see the [Events](../utils/events.md) documentation.

# Example usage

Creating a left axis with a label at the bottom.

```svelte
<script>
  let scale = scaleLinear().domain([0, 100]).range([40, 460]).nice();
  let newAxis = d3.axisLeft(scale as d3.ScaleLinear<number, number>);
</script>

<svg {width} {height}>
  <Axis
    placementX={axisX}
    placementY={axisY}
    axis={d3Axis}
    renderLabel={true}
    labelPosition={'bottom'}
    labelText={axisName} />
</svg>
```

Creating a draggable axis (excl. any reordering logic)

```svelte
<svg {width} {height}>
  <Axis
    placementX={axis.column === draggedAxis ? axis.x + draggingOffset : axis.x}
    placementY={axis.y}
    axis={axis.axis}
    renderLabel={true}
    labelText={axis.column}
    isDraggable={true}
    on:dragMove={onDragMove}
    on:dragStop={onDragStop} />
</svg>
```

> Note: `onDragMove` and `onDragStop` should be functions that handle the logic for dragging the axis (or axes). In this example, `draggedAxis` keeps track of the name of the axis that is being moved and `draggingOffset` keeps track of how much the axis has been dragged.
