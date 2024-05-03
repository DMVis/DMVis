# Draggable

Some visualisations require elements that are draggable. This wrapper makes it easier to drag components and execute some logic based on where the component is being dragged.

# Events

> Note: To access variables from a CustomEvent, your function should take as a parameter some event (here 'event') of type `CustomEvent`. The variables that are passed can then be accessed through: `event.detail.someVariable` (with 'someVariable' being the name of the variable).

## on:dragStart

This event is called when the user starts dragging the component inside the `Draggable` wrapper. Specifically, this means: if the user has clicked on the component, this event will fire the first time the mouse is moved.

- Passes: `CustomEvent` with variables:
  - elementName: `string` - This is the parameter that is passed to the `Draggable` wrapper, used for identifying which component is being dragged.

## on:dragMove

This event is called while the user is dragging the component inside the `Draggable` wrapper. Specifically, this means: if the user has clicked on the component, the events will fire as long as the user keeps their mousebutton down. The event fires every time the mouse is moved.

- Passes: `CustomEvent` with variables:
  - elementName: `string` - This is the parameter that is passed to the `Draggable` wrapper, which is used for identifying which component is being dragged.
  - movementX: `number` - The amount of pixels that the mouse moved in the horizontal direction.
  - movementY `number` - The amount of pixels that the mouse moved in the vertical direction.

## on:dragStop

This event is called when the user stops dragging the component inside the `Draggable` wrapper. Specifically, this means: if the user has clicked on the component, this event will fire the next time the user lets the mousebutton go.

- Passes: `CustomEvent` with variables:
  - elementName: `string` - This is the parameter that is passed to the `Draggable` wrapper, used for identifying which component is being dragged.

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
