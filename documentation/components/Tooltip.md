# Tooltip

A tooltip to display a small amount of information to a user.
It can, for example, be used to display the name of a point when hovering over it with a mouse.

> Note: By default, a `Tooltip`'s origin is at its middle (see the `origin` attribute).

## Table of Contents

- [Referenced Components](#referenced-components)
- [Attributes](#attributes)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Example Usage](#example-usage)

## Referenced Components

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

## Attributes

<table style="width: 75%">
  <thead>
    <tr>
      <th style="width: 33%;">Attribute</th>
      <th style="width: 33%;">Type</th>
      <th style="width: 33%;">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#components/Tooltip?id=x">x</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Tooltip?id=y'>y</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Tooltip?id=text'>text</a>*</td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Tooltip?id=hasbackground'>hasBackground</a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><a href='#components/Tooltip?id=theme'>theme</a></td>
      <td><code>Theme</code></td>
      <td><code>'light'</code></td>
    </tr>
    <tr>
      <td><a href='#components/Tooltip?id=origin'>origin</a></td>
      <td><code>Origin</code></td>
      <td><code>'middle'</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### x

- Type: `number`
- <span style="color:coral">Required</span>

The y-coordinate of the tooltip.

### y

- Type: `number`
- <span style="color:coral">Required</span>

The y-coordinate of the tooltip.

### text

- Type: `string`
- <span style="color:coral">Required</span>

The text to display in the tooltip.

## Optional Attributes

### hasBackground

- Type: `boolean`
- Default: `false`

Whether or not to display a background behind the tooltip text.

### theme

- Type: `Theme`
- Default: `'light'`
- Options: `'light'`, `'dark'`

The theme of the tooltip. It controls both the `background-color` and the `text-color`.
Options are: `'light'` (black text on white background) and `'dark'` (white text on black background).
See below what the options look like.

![Theme options for Tooltip](../media/tooltip_themes.png ':size=250')

### origin

- Type: `Origin`
- Default: `'middle'`
- Options: `'topLeft'`, `'topMiddle'`, `'topRight'`, `'middleLeft'`, `'middle'`, `'middleRight'`, `'bottomLeft'`, `'bottomMiddle'`, `'bottomRight'`

The origin of the bar.
Which value is useful depends on your positioning logic.
See [OriginMapper](../utils/OriginMapper.md) for more information.

## Example Usage

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
