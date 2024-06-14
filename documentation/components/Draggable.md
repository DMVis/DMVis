# Draggable

Some visualisations require elements that are draggable. This wrapper makes it easier to drag components and execute some logic based on where the component is being dragged.

# Table of contents

- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example usage](#example-usage)

# Optional Attributes

## offsetX

- Type: `number`
- Default: `0`

The horizontal offset that the component within the `Draggable` should have. This should be handled by the parent component, because the exact offset (and when the offset should be reset) is dependent on the specific visualisation.

## offsetY

- Type: `number`
- Default: `0`

The vertical offset that the component within the `Draggable` should have. This should be handled by the parent component, because the exact offset (and when the offset should be reset) is dependent on the specific visualisation.

## elementName

- Type: `string`
- Default: `default`

The name of the element within the `Draggable`. This is returned in the dispatched events, so the parent component can tell which component is being dragged.

# Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

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
