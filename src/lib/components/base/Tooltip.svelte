<script lang="ts">
  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import { OriginX, OriginY } from '$lib/Enums.js';

  // Required attributes
  export let x: number;
  export let y: number;
  export let text: string;

  // Optional attributes
  export let hasBackground: boolean = false;
  export let theme: 'light' | 'dark' = 'light';
  export let originX: OriginX = OriginX.Middle;
  export let originY: OriginY = OriginY.Middle;

  // Private variables
  let backgroundColor: string;
  let textColor: string;

  // Set the background-color and text-color based on the theme
  if (theme === 'light') {
    backgroundColor = 'white';
    textColor = 'black';
  } else if (theme === 'dark') {
    backgroundColor = 'black';
    textColor = 'white';
  } else {
    // Error is for completeness, but never happens in practice (because of type safety)
    throw DMVisError(
      `Cannot assign '${theme}' to the theme attribute. Please use: 'light' or 'dark'.`,
      'Tooltip'
    );
  }
</script>

<!--
@component
### Tooltip
A tooltip is typically used to quickly display a small amount of information to the user.
It can, for example, be used to display the name of a point when hovering over it with a mouse.

#### Required attributes
* x: number               - X-coordinate of the tooltip.
* y: number               - Y-coordinate of the tooltip.
* text: string            - Text to display in the tooltip.

#### Optional attributes
* hasBackground: boolean  - Whether or not to display a background behind the tooltip text, by default this is off.
* theme: 'light' | 'dark' - Theme of the tooltip, which controls both the background-color and the text-color.
                            Options are: light (black text on white background) and dark (white text on black background).
                            Defaults to `'light'`.
* originX: OriginX        - Horizontal origin of the label.
                            Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
                            Which value is useful depends on your positioning logic.
                            This defauls to `OriginX.Middle`.
* originY: OriginY        - Vertical origin of the label.
                            Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
                            Which value is useful depends on your positioning logic.
                            This defaults to `OriginX.Middle`.
-->

<Label
  {x}
  {y}
  {text}
  padding={0}
  borderColor={'none'}
  {hasBackground}
  backgroundOpacity={0.7}
  name={'tooltip'}
  {originX}
  {originY}
  {backgroundColor}
  fontWeight={'bold'}
  {textColor}
  fontSize={'14px'} />
