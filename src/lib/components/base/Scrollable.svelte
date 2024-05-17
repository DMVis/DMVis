<script lang="ts">
  export let x: number = 0;
  export let y: number = 0;
  export let width: number = 0;
  export let height: number = 0;
  export let className: string = '';
  export let allowHorizontalScrolling: boolean = true;
  export let allowVerticalScrolling: boolean = true;

  let horizontalScroll: string;
  $: horizontalScroll = allowHorizontalScrolling ? 'auto' : 'hidden';
  let verticalScroll: string;
  $: verticalScroll = allowVerticalScrolling ? 'auto' : 'hidden';
</script>

<!--
@component
### Scrollable
This component allows for making any visualisation smaller, by making it scrollable.

#### Required Attributes
* width: number                     - Width of the visualisation that is shown at any moment.
* height: number                    - Height of the visualisation that is shown at any moment.

#### Optional Attributes
  * x: number                         - Optional horizontal offset for the `div`. Defaulted to `0`.
  * y: number                         - Optional vertical offset for the `div`. Defaulted to `0`.
  * className: string                 - Optional string that will be added to the class of the `div` (which
                                        will be `'scrollable-div-{className}'`) and to the class of the `svg`
                                        (which will be `'scrollable-svg-{className}'`). This could be used if
                                        the user needs to be able to get a reference to the specific `Scrollable`
                                        instance. Defaulted to `''` (empty string).
  * allowHorizontalScrolling: boolean - If this is set to `false`, no horizontal scrolling will be allowed,
                                        even if the contained component is bigger than the `div`. Defaulted
                                        to `true`.
  * allowVerticalScrolling: boolean   - If this is set to `false`, no vertical scrolling will be allowed,
                                        even if the contained component is bigger than the `div`. Defaulted
                                        to `true`.

#### Events
* For detailed information about dispatches, check the documentation.
-->

<svg {x} {y} class="scrollable-svg-{className} " {width} {height}>
  <foreignObject {width} {height}>
    <div
      class="scrollable"
      id="scrollable-div-{className}"
      style={`width:${width}px;
          height:${height}px;
          overflow-x:${horizontalScroll};
          overflow-y:${verticalScroll};`}
      on:scroll>
      <slot />
    </div>
  </foreignObject>
</svg>

<style>
  .scrollable {
    scrollbar-width: thin;
    scrollbar-color: rgba(87, 87, 87, 0.7) rgba(0, 0, 0, 0);
  }
</style>
