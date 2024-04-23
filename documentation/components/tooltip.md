# Tooltip component

A tooltip is typically used to quickly display a small amount of information to the user.
It can, for example, be used to display the name of a point when hovering over it by mouse.

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

- Type: `string`
- Default: `'light'`
- Options: `'light'`, `'dark'`

Theme of the tooltip, which controls both the background-color and the text-color.
Options are: light (black text on white background) and dark (white text on black background).
See below what the options look like.

![Theme options for Tooltip](../media/tooltip_themes.png ':size=250')

## originX

- Type: `OriginX`
- Default: `OriginX.Middle`

Horizontal origin of the tooltip.
Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
Which value is useful depends on your positioning logic.

## originY

- Type: `OriginY`
- Default: `OriginY.Middle`

Vertical origin of the tooltip.
Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
Which value is useful depends on your positioning logic.

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
