# Draggable

Some visualisations require draggable elements. This wrapper makes it easier to drag components and execute some logic based on where the component is dragged.

## Table of Contents

- [Attributes](#attributes)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example Usage](#example-usage)

## Attributes

<table style="width: 50%">
  <thead>
    <tr>
      <th style="width: 33%;">Attribute</th>
      <th style="width: 33%;">Type</th>
      <th style="width: 33%;">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#components/Draggable?id=offsetx">offsetX</a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><a href='#components/Draggable?id=offsety'>offsetY</a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><a href='#components/Draggable?id=elementname'>elementName</a></td>
      <td><code>string</code></td>
      <td><code>''</code></td>
    </tr>
  </tbody>
</table>

## Optional Attributes

### offsetX

- Type: `number`
- Default: `0`

The horizontal offset that the component within the `Draggable` should have. The parent component should handle this. The exact offset (and when the offset should be reset) depends on the specific visualisation.

### offsetY

- Type: `number`
- Default: `0`

The vertical offset that the component within the `Draggable` should have. The parent component should handle this. The exact offset (and when the offset should be reset) depends on the specific visualisation.

### elementName

- Type: `string`
- Default: `''`

The name of the element within the `Draggable`. This is returned in the dispatched events, so the parent component can tell which component is being dragged.

## Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Create a draggable SVG circle element that resets to its original location when the user stops dragging it.</b>

```svelte
<script lang="ts">
  import { Draggable } from '@dmvis/dmvis/components';

  let offsetX = 0;
  let offsetY = 0;

  /* Everytime the axis is dragged, this function gets fired.
    Which will update the local delta in position for the circle */
  function onDragMove(e: CustomEvent) {
    offsetX += e.detail.movementX;
    offsetY += e.detail.movementY;
  }

  /* This function fires when the dragging of the circle is stopped
      At this point the circle is put back to its original spot. */
  function onDragStop(e: CustomEvent) {
    offsetX = 0;
    offsetY = 0;
  }
</script>

<svg width={500} height={500}>
  <!-- Draw a draggable circle with an offset depending on the offset variables -->
  <Draggable {offsetX} {offsetY} on:dragMove={onDragMove} on:dragStop={onDragStop}>
    <circle cx={100} cy={100} r={10} />
  </Draggable>
</svg>
```
