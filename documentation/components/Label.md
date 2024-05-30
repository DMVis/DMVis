# Label component

The label allows you to add text with a background.
It can be used in combination with other components.
Coordinates are relative to the parent SVG element.
The default origin is the middle of the label.

# Required Attributes

## x

- Type: `number`

X-coordinate of the label.

## y

- Type: `number`

Y-coordinate of the label.

## text

- Type: `string`

Text to display on the label.

?> Words in the text will be automatically placed on a new line if they take up too much horizontal space depending on `width`.

# Optional Attributes

## showEllipsis

- Type: `boolean`
- Default: `false`

Whether to show an ellipsis at the end of the text if it overflows the label.

## backgroundColor

- Type: `string`
- Default: `'red'`

Color of the rectangle behind the label.

## textOpacity

- Type: `number | string`
- Default: `1`

The opacity of the text of the label.

## originX

- Type: `OriginX`
- Default: `OriginX.Middle`

Horizontal origin of the label.
Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
Which value is useful depends on your positioning logic.

## originY

- Type: `OriginY`
- Default: `OriginY.Middle`

Vertical origin of the label.
Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
Which value is useful depends on your positioning logic.

## rotationDegrees

- Type: `number`
- Default: `0`

Rotation of the label in degrees.

## borderRadius

- Type: `number`
- Default: `0`

Border radius of the background in pixels. This defaults to `0`.

## padding

- Type: `number`
- Default: `20`

Padding around the text in the label.

## textColor

- Type: `string`
- Default: `'black'`

Color of the text in the label.

## fontSize

- Type: `string`
- Default: `'12px'`

The font size of the text in the label.

## fontWeight

- Type: `string`
- Default: `'normal'`

Font weight of the text in the label.

## fontFamily

- Type: `string`
- Default: `'Arial'`

Font family of the text in the label.

## hasBackground

- Type: `bool`
- Default: `true`

Whether the label has a background.

## backgroundOpacity

- Type: `number | string`
- Defaults: `textOpacity`

The opacity of the background behind the label.

## hasPointerEvents

- Type: `boolean`
- Default: `false`

Whether the label should respond to all pointer events (`true`) or none (`false`).

## name

- Type: `string`
- Default: `'label'`

Class name of the label. It can be used as an identifier.
If set to `'name'`, for example, the class names will be `'label'` and `'label-name'`.

## width

- Type: `number | 'auto'`
- Default: `'auto'`

Width of the rectangle of the label.

## height

- Type: `number | 'auto'`
- Default: `'auto'`

Height of the rectangle of the label.

## borderColor

- Type: `string`
- Default: `'black'`

Colour of the border around the background of the label.

> Note: Can be set to `'none'` for no border.

# Events

This component emits the following events, when `hasPointerEvents` is set to true:

- `mouseLabelClick`
- `mouseLabelEnter`
- `mouseLabelLeave`

To read more about these events, see the [Events](../utils/events.md) documentation.

# Example usage

Label with only required properties set.

```svelte
<svg style="border: 1px solid black" width="500" height="500">
  <Label x={250} y={250} text="Hello, world!" />
</svg>
```

Label with all properties set.

```svelte
<svg style="border: 1px solid black" width="500" height="500">
  <Label
    x={100}
    y={100}
    text="Hello, world!"
    backgroundColor="#fe7215"
    textOpacity={1}
    originX={OriginX.Middle}
    originY={OriginY.Middle}
    rotationDegrees={0}
    borderRadius={5}
    padding={20}
    textColor="black"
    fontSize="12px"
    fontWeight="normal"
    fontFamily="Arial"
    hasBackground={true}
    backgroundOpacity={0.5}
    hasPointerEvents={true}
    name="label"
    width={100}
    height={100}
    borderColor="none"
    on:mouseLabelEnter={onMouseLabelEnter}
    on:mouseLabelLeave={onMouseLabelLeave} />
</svg>
```