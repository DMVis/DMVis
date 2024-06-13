<script lang="ts">
  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import type { Theme, Origin } from '$lib/Types.js';

  // Required attributes
  export let x: number;
  export let y: number;
  export let text: string;

  // Optional attributes
  export let hasBackground: boolean = false;
  export let theme: Theme = 'light';
  export let origin: Origin = 'middle';

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
A tooltip to display a small amount of information to a user.
It can, for example, be used to display the name of a point when hovering over it with a mouse.
Note that by default, `Tooltip`'s origin is at its middle (see the `origin` attribute).

#### Required attributes
* x: number               - X-coordinate of the tooltip.
* y: number               - Y-coordinate of the tooltip.
* text: string            - Text to display in the tooltip.

#### Optional attributes
* hasBackground: boolean  - Whether or not to display a background behind the tooltip text, by default this is off.
* theme: Theme            - Theme of the tooltip, which controls both the background-color and the text-color.
                            Options are: `'light'` (black text on white background) and `'dark'` (white text on black background).
                            Defaults to `'light'`.
* origin: Origin          - The origin of the tooltip.
                            Which value is useful depends on your positioning logic.
                            Defaults to `'middle'`.
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
  {origin}
  {backgroundColor}
  fontWeight={'bold'}
  {textColor}
  fontSize={'14px'} />
