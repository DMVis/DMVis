<script lang="ts">
  // Imports
  import { createEventDispatcher } from 'svelte';

  // Required attributes
  export let x: number;
  export let y: number;
  export let icon: string;

  // Optional attributes
  export let color: string = '#000000';

  // Decide the icon we want to display
  // Stock icons paths are provided by the Flowbite Icons pack
  const icons: { [key: string]: string } = {
    sort: 'M8 20V10m0 10-3-3m3 3 3-3m5-13v10m0-10 3 3m-3-3-3 3',
    search: 'm21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
    filter:
      'M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z',
    more: 'M6 12h.01m6 0h.01m5.99 0h.01',
    group:
      'M5.005 11.19V12l6.998 4.042L19 12v-.81M5 16.15v.81L11.997 21l6.998-4.042v-.81M12.003 3 5.005 7.042l6.998 4.042L19 7.042 12.003 3Z',
    item: 'M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961',
    band: 'M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961',
    weights:
      'M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z'
  };

  const iconPath = icon in icons ? icons[icon] : icon;

  // Handle mouse events
  const dispatch = createEventDispatcher();
  function onMouseEnter() {
    dispatch('mouseIconEnter', { x: x, y: y });
  }
  function onMouseLeave() {
    dispatch('mouseIconLeave', { x: x, y: y });
  }
  function onClick() {
    dispatch('mouseIconClick', { x: x, y: y });
  }
</script>

<!--
@component
### Icon
This component is used to display an icon on the screen. The icon can be of different types.
Out of the box, it supports the following icons:
* sort
* search
* filter
* more

#### Required attributes
* x: number - x-coordinate of the icon
* y: number - y-coordinate of the icon
* icon: string - Type of icon to display. It can be either one of the supported icons or a custom SVG path

#### Optional attributes
* color: string - Color of the icon, defaults to #000000
-->

<svg
  {x}
  {y}
  width="25px"
  height="25px"
  role="button"
  tabindex="0"
  on:mouseenter={onMouseEnter}
  on:focus={onMouseEnter}
  on:mouseleave={onMouseLeave}
  on:blur={onMouseLeave}
  on:mousedown={onClick}>
  <rect x="0" y="0" width="25px" height="25px" fill="#fff" fill-opacity="0" stroke="none" />
  <path stroke={color} d={iconPath} />
</svg>

<style>
  svg {
    cursor: pointer;
  }

  path {
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  svg:hover path {
    stroke: black;
  }
</style>
