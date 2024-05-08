# Draggable

Some visualisations require elements that are draggable. This wrapper makes it easier to drag components and execute some logic based on where the component is being dragged.

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

To read more about these events, see the [Events](../utils/events.md) documentation.

# Example usage

Create a draggable SVG circle element that resets to its original location when the user stops dragging it.

```svelte
<script lang="ts">
  function onDragMove(e: CustomEvent) {
    offsetX += e.detail.movementX;
  }

  function onDragStop(e: CustomEvent) {
    offsetX = 0;
  }
</script>

<svg width={500} height={500}>
  <Draggable {offsetX} on:dragMove={onDragMove} on:dragStop={onDragStop}>
    <circle cx={100} cy={100} r={10} />
  </Draggable>
</svg>
```
