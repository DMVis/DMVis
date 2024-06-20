<script lang="ts">
  // Imports
  import { createEventDispatcher } from 'svelte';

  // Optional attributes
  export let offsetX: number = 0;
  export let offsetY: number = 0;
  export let elementName: string = '';

  // Private attributes
  let isMoving = false;
  const dispatch = createEventDispatcher();

  // Set the status of this component to being dragged
  function onMouseDown() {
    isMoving = true;
    dispatch('dragStart', { elementName: elementName });
  }

  // Dispatch events that detail where the user is trying to move the component
  let previousX: number = 0;
  let previousY: number = 0;
  function onMouseMove(e: MouseEvent) {
    // Setting movement to the difference between the current and previous position
    const moveX: number = e.movementX ?? e.screenX - previousX;
    const moveY: number = e.movementY ?? e.screenY - previousY;
    previousX = e.screenX;
    previousY = e.screenY;

    if (isMoving) {
      dispatch('dragMove', {
        elementName: elementName,
        movementX: moveX,
        movementY: moveY
      });
    }
  }

  // Dispatch an event that the user stopped dragging the component
  function onMouseUp() {
    if (isMoving) {
      isMoving = false;
      dispatch('dragStop', {
        elementName: elementName
      });
    }
  }
</script>

<!--
@component
### Draggable
Some visualisations require draggable elements.
This wrapper makes it easier to drag components and execute
some logic based on where the component is dragged.

#### Optional Attributes
* offsetX: number     - The horizontal offset the component within the `Draggable` should have. This
                        should be handled by the parent component because the exact offset (and
                        when the offset should be reset) is dependent on the specific visualisation.
                        Defaults to `0`.
* offsetY: number     - The vertical offset the component within the `Draggable` should have.
                        Defaults to `0`.
* elementName: string - The name of the element within the Draggable. This is returned in the dispatched
                        events, so the parent component can tell which component is being dragged.
                        Defaults to `''`.

#### Events
* Please check the documentation for detailed information about dispatches.
-->

<g
  class="draggable"
  transform="translate({offsetX} {offsetY})"
  on:mousedown={onMouseDown}
  role="treeitem"
  tabindex="0"
  aria-selected="false"
  style="cursor: {isMoving ? 'grabbing' : 'grab'};">
  <slot />
</g>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
  .draggable {
    -webkit-touch-callout: none;
    -ms-touch-action: none;
    touch-action: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
