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

#### Optional Attributes

#### Events
-->
<div
  class="scrollable"
  id="scrollable-{className}"
  style={`width:${width}px;
            height:${height}px;
            overflow-x:${horizontalScroll};
            overflow-y:${verticalScroll};`}>
  <slot />
</div>
