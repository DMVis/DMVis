# Axis

The Axis component is used to render a singular Axis, given a [d3.axis](https://d3js.org/d3-axis) element. This needs to be supplied by the parent through the [axis](#axis) parameter. The axis can be oriented in any direction, depending on the provided `d3.axis`. The axis can also have a label on any of the four sides, regardless of the axis orientation. Furthermore, the axis can be made draggable, although how this dragging behaviour should be handled is up to the user to implement.

> Note: This component is made specifically for visualisations that require <u>only one</u> axis (or multiple with different orientations). If you want to have multiple axes created automatically from your dataset, consider using the [DynamicAxis](../components/DynamicAxis.md) component.

## Table of Contents

- [Referenced Components](#referenced-components)
- [Required attributes](#required-attributes)
- [Optional attributes](#optional-attributes)
- [Events](#events)
- [Example Usage](#example-usage)

## Referenced Components

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
      <td><a href="#/components/Draggable.md">Draggable</a></td>
      <td>Enables drag-and-drop interactions for axis.</td>
    </tr>
    <tr>
      <td><a href="#/components/Label.md">Label</a></td>
      <td>The label allows you to add text with a background.</td>
    </tr>
  </tbody>
</table>

## Required Attributes

### placementX

- Type: `number`

The horizontal start position of the axis.

### placementY

- Type: `number`

The vertical start position of the axis.

### axis

- Type: `d3.Axis<string>` | `d3.Axis<d3.NumberValue>`

A D3 Axis component. See example usage on how to create the d3 axis.

> Note: See [d3 documentation](https://d3js.org/d3-axis) for the different kinds of axes you can create.

## Optional Attributes

### renderLabel

- Type: `boolean`
- Default: `false`

Renders a label next to the axis.

### labelText

- Type: `string`
- Default: `'default'`

The text for the label.

### labelPosition

- Type: `Position`
- Default: `'top'`
- Options: `'left'`, `'right'`, `'top'`, `'bottom'`

The position of the label relative to the axis.

### labelOffset

- Type: `number`
- Default: `20`

The distance from the label to the axis.

### fontSize

- Type: `number`
- Default: `12`

The font size of the tick labels.

### color

- Type: `string`
- Default: `'black'`

The colour of the axis line and label.
Valid inputs include CSS colours specified as a string.

### isDraggable

- Type: `boolean`
- Default: `false`

Sets whether the axis is [draggable](components/Draggable.md). For this to work, the `renderLabel` parameter should be set to `true`.

> Note: Logic for the displacement of the axis should be handled outside this component.

### squashOuterTicks

- Type: `boolean`
- Default: `false`

Whether or not to tuck in the first and last tick.

## Events

This component emits the following events:

- `dragMove`
- `dragStop`
- `renderAxis`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Creating a basic axis.</b>

```svelte
<script lang="ts">
  import { Axis } from '@dmvis/dmvis/components';
  import { axisBottom, scaleLinear } from 'd3';

  /* Create a scale that can take values between 0 and 1000
  and scales them to values between 0 and 400 */
  const scale = scaleLinear().range([0, 400]).domain([0, 1000]);
  const axisElement = axisBottom(scale);
</script>

<svg width={500} height={500}>
  <Axis placementX={50} placementY={450} axis={axisElement} />
</svg>
```

<b>Creating an axis with 3 ticks and a label. </b>

```svelte
<script lang="ts">
  import { Axis } from '@dmvis/dmvis/components';
  import { axisLeft, scaleLinear } from 'd3';

  /* Create a scale that can take values between 0 and 1000
  and scales them to values between 0 and 400 */
  let scale = scaleLinear().domain([0, 100]).range([40, 400]);
  let axisElement = axisLeft(scale).ticks(3);
</script>

<svg width={500} height={500}>
  <Axis
    placementX={100}
    placementY={50}
    axis={axisElement}
    renderLabel={true}
    labelPosition={'bottom'}
    labelText={'Name for an axis'} />
</svg>
```

<b>Creating a fully customised axis.</b>

```svelte
<script lang="ts">
  import { Axis } from '@dmvis/dmvis/components';
  import { axisRight, scaleLinear } from 'd3';

  /* Create a scale that can take values between 0 and 1000
  and scales them to values between 0 and 400 */
  let scale = scaleLinear().domain([0, 100]).range([40, 400]);
  let axisElement = axisRight(scale).ticks(3);
</script>

<svg width={500} height={500}>
  <Axis
    placementX={100}
    placementY={50}
    axis={axisElement}
    renderLabel={true}
    labelPosition={'right'}
    labelOffset={100}
    labelText={'Name for an axis'}
    color={'rgb(255,100,10)'}
    squashOuterTicks={true}
    fontSize={20} />
</svg>
```

<b>Creating a draggable axis.</b>

> Note: Dragging works by dragging the label.

```svelte
<script lang="ts">
  import { Axis } from '@dmvis/dmvis/components';
  import { axisTop, scaleLinear } from 'd3';

  let scale = scaleLinear().domain([0, 100]).range([40, 400]);
  let axisElement = axisTop(scale);

  let axisDeltaX = 0;
  let axisDeltaY = 0;

  /* Everytime the axis is dragged, this function gets fired.
    Which will update the local delta in position for the axis */
  function onDragMove(e: CustomEvent) {
    axisDeltaX += e.detail.movementX;
    axisDeltaY += e.detail.movementY;
  }

  /* This function fires when the dragging of the axis is stopped
      At this point the axis is put back to its original spot. */
  function onDragStop() {
    axisDeltaX = 0;
    axisDeltaY = 0;
  }
</script>

<svg width={1000} height={1000}>
  <!-- Draw an axis with the added positioning delta starting at (50,250) -->
  <Axis
    placementX={50 + axisDeltaX}
    placementY={250 + axisDeltaY}
    axis={axisElement}
    renderLabel={true}
    labelPosition={'top'}
    labelText={'Name for an axis'}
    isDraggable={true}
    on:dragMove={onDragMove}
    on:dragStop={onDragStop} />
</svg>
```
