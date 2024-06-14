# Tooltip component

A tooltip to display a small amount of information to a user.
It can, for example, be used to display the name of a point when hovering over it with a mouse.

> Note: By default, a `Tooltip`'s origin is at its middle (see the `origin` attribute).

# Table of Contents

- [Referenced Components](#referenced-components)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Example usage](#example-usage)

# Referenced Components

This component utilises the following components:

<table style="width: 50%">
  <thead>
    <tr>
      <th style="width: 20%;">Component</th>
      <th style="width: 80%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#/components/Label.md">Label</a></td>
      <td>Provides labelling functionality for data points.</td>
    </tr>
  </tbody>
</table>

# Required Attributes

## x

- Type: `number`

X-coordinate of the tooltip.

## y

- Type: `number`

Y-coordinate of the tooltip.

## text

- Type: `string`

Text to display in the tooltip.

# Optional Attributes

## hasBackground

- Type: `boolean`
- Default: `false`

Whether or not to display a background behind the tooltip text.

## theme

- Type: `Theme`
- Default: `'light'`
- Options: `'light'`, `'dark'`

The theme of the tooltip. This controls both the `background-color` and the `text-color`.
Options are: `'light'` (black text on white background) and `'dark'` (white text on black background).
See below what the options look like.

![Theme options for Tooltip](../media/tooltip_themes.png ':size=250')

## origin

- Type: `OriginX`
- Default: `OriginX.Middle`
- Options: `'topLeft'`, `'topMiddle'`, `'topRight'`, `'middleLeft'`, `'middle'`, `'middleRight'`, `'bottomLeft'`, `'bottomMiddle'`, `'bottomRight'`

Horizontal origin of the tooltip.
Which value is useful depends on your positioning logic.
See [OriginMapper](../utils/OriginMapper.md) for more information.

# Example usage

<b>Creating a tooltip with the light theme. </b>

```svelte
<script lang="ts">
  import { Tooltip } from '@dmvis/dmvis/components';
</script>

<svg width={500} height={500}>
  <Tooltip x={250} y={250} text="Hello World" />
</svg>
```

<b>Creating a tooltip with the dark theme. </b>

```svelte
<script lang="ts">
  import { Tooltip } from '@dmvis/dmvis/components';
</script>

<svg width={500} height={500}>
  <Tooltip x={250} y={250} text="Hello World" theme="dark" hasBackground={true} />
</svg>
```
