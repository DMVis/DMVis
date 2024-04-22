<script lang="ts">
  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';

  // Required attributes
  export let x: number;
  export let y: number;
  export let text: string;

  // Optional attributes
  export let isVisible: boolean = true;
  export let originX: OriginX = OriginX.Middle;
  export let originY: OriginY = OriginY.Middle;
</script>

<!--
@component
### Tooltip
[TO-DO]

#### Required attributes
* x: number           - X-coordinate of the tooltip.
* y: number           - Y-coordinate of the tooltip.
* text: string        - Text to display in the tooltip.

#### Optional attributes
* isVisible: boolean  - Whether the tooltip is visible.
* originX: OriginX    - Horizontal origin of the label.
                        Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
                        Which value is useful depends on your positioning logic.
                        Defauls to `OriginX.Middle`.
* originY: OriginY    - Vertical origin of the label.
                        Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
                        Which value is useful depends on your positioning logic.
                        Defaults to `OriginX.Middle`.
-->

{#if isVisible}
  <Label
    {x}
    {y}
    {text}
    color={'#000000bb'}
    opacity={1}
    {originX}
    {originY}
    radiusX={0}
    radiusY={0}
    padding={20}
    textColor={'#ffffff'}
    hasBackground={true}
    backgroundOpacity={0.6}
    name={'tooltip'} />
{/if}
