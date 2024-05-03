<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let offsetX: number = 0;
  export let offsetY: number = 0;
  export let elementName: string = '';

  let isMoving = false;
  const dispatch = createEventDispatcher();

  // Set the status of this component to being dragged
  function onMouseDown() {
    isMoving = true;
    dispatch('dragStart', { elementName: elementName });
  }

  // Dispatch events that detail where the user is trying to move the component
  function onMouseMove(e: MouseEvent) {
    if (isMoving) {
      dispatch('dragMove', {
        elementName: elementName,
        movementX: e.movementX,
        movementY: e.movementY
      });
    }
  }

  // Dispatch an event that the user stopped dragging the component
  function onMouseUp() {
    if (isMoving) {
      isMoving = false;
      dispatch('dragStop', { elementName: elementName });
    }
  }
</script>

<!--
@component
### Draggable
Some visualisations require elements that are draggable.
This wrapper makes it easier to drag components and execute
  some logic based on where the component is being dragged.

#### Optional Attributes
  * offsetX: number                     - The horizontal offset that the component within the `Draggable` should have. This
                                          should be handled by the parent component, because the exact offset (and
                                          when the offset should be reset) is dependent on the specific visualisation.
                                          Defaults to `0`.
  * offsetY: number                     - The vertical offset that the component within the `Draggable` should have.
                                          Defaults to `0`.
  * elementName: string                 - The name of the element within the Draggable. This is returned in the dispatched
                                          events, so the parent component can tell which component is being dragged. Defaults
                                          to `'default'`.
-->

<g
  class="draggable"
  transform="translate({offsetX} {offsetY})"
  on:mousedown={onMouseDown}
  role="treeitem"
  tabindex="0"
  aria-selected="false">
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
