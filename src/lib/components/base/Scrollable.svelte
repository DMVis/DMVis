<script lang="ts">
  // Optional attributes
  export let x: number = 0;
  export let y: number = 0;
  export let width: number | string = '100%';
  export let height: number | string = '100%';
  export let className: string = '';
  export let allowHorizontalScrolling: boolean = true;
  export let allowVerticalScrolling: boolean = true;

  // Set the scroll values
  let horizontalScroll: string;
  $: horizontalScroll = allowHorizontalScrolling ? 'auto' : 'hidden';
  let verticalScroll: string;
  $: verticalScroll = allowVerticalScrolling ? 'auto' : 'hidden';
  let scrollableWidth: string;
  $: scrollableWidth = typeof width === 'number' ? width + 'px' : width;
  let scrollableHeight: string;
  $: scrollableHeight = typeof height === 'number' ? height + 'px' : height;
</script>

<!--
@component
### Scrollable
This component allows for making any visualisation smaller, by making it scrollable.

#### Required Attributes
* width: number                     - Width of the visualisation that is shown at any moment in pixels.
* height: number                    - Height of the visualisation that is shown at any moment in pixels.

#### Optional Attributes
  * x: number                         - The horizontal offset for the `div`.
                                        Defaults to `0`.
  * y: number                         - The vertical offset for the `div`.
                                        Defaults to `0`.
  * className: string                 - A string value that is added to the class of the `div` (which
                                        will be `'scrollable-div-{className}'`) and to the class of the `svg`
                                        (which will be `'scrollable-svg-{className}'`). This could be used if
                                        the user needs to be able to get a reference to the specific `Scrollable`
                                        instance.
                                        Defaults to `''`.
  * allowHorizontalScrolling: boolean - If this is set to `false`, no horizontal scrolling will be allowed,
                                        even if the contained component is bigger than the `div`.
                                        Defaults to `true`.
  * allowVerticalScrolling: boolean   - If this is set to `false`, no vertical scrolling will be allowed,
                                        even if the contained component is bigger than the `div`.
                                        Defaults to `true`.

#### Events
* Please check the documentation for detailed information about dispatches.
-->

<svg {x} {y} class="scrollable-svg-{className}" {width} {height}>
  <foreignObject {width} {height}>
    <div
      class="scrollable scrollable-div-{className}"
      style={`
          width:${scrollableWidth};
          height:${scrollableHeight};
          overflow-x:${horizontalScroll};
          overflow-y:${verticalScroll};
      `}
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
