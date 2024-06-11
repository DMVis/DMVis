# Tooltip component

A tooltip is typically used to quickly display a small amount of information to the user.
It can, for example, be used to display the name of a point when hovering over it with a mouse.

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
Options are: light (black text on white background) and dark (white text on black background).
See below what the options look like.

![Theme options for Tooltip](../media/tooltip_themes.png ':size=250')

## originX

- Type: `OriginX`
- Default: `OriginX.Middle`

Horizontal origin of the tooltip.
Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
Which value is useful depends on your positioning logic. See [OriginMapper](../utils/OriginMapper.md) for more information.

## originY

- Type: `OriginY`
- Default: `OriginY.Middle`

Vertical origin of the tooltip.
Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
Which value is useful depends on your positioning logic. See [OriginMapper](../utils/OriginMapper.md) for more information.

# Example usage

```svelte
<Tooltip
  x={mouseX + offset}
  y={mouseY + offset}
  text={pointName}
  theme={'dark'}
  hasBackground={true}
  originX={OriginX.Right}
  originY={OriginY.Bottom} />
```
