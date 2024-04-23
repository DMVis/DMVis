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

Text to display in the label.

?> Words in the text will be automatically placed on a new line if they take up too much horizontal space depending on `width`.

# Optional Attributes

## backgroundColor

- Type: `string`
- Default: `'red'`

Color of the rectangle behind the label.

## textOpacity

- Type: `number | string`
- Default: `1`

Opacity of the text of the label.

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

## radiusX

- Type: `number | string`
- Default: `0`

Horizontal corner radius of the label as a number in range `[0..1]` or
a percentage string formatted as `'{number}%'`.

## radiusY

- Type: `number | string`
- Default: `0`

Vertical corner radius of the label as a number in range `[0..1]` or
a percentage string formatted as `'{number}%'`.

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

Font size of the text in the label.

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

Opacity of the background behind the label.

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

Color of the border around the background of the label.

> Note: Can be set to `'none'` for no border.

# Example usage

Label with all properties set.

```svelte
<svg style="border: 1px solid black" width="500" height="500">
  <Label
    x={100}
    y={100}
    text="Hello, world!"
    textColor="black"
    color="#fe7215"
    originX={OriginX.Middle}
    originY={OriginY.Middle}
    rotationDegrees={0}
    opacity={1}
    radiusX={5}
    radiusY={5}
    padding={20}
    fontSize={'12px'}
    fontWeight={'normal'}
    fontFamily={'Arial'}
    hasBackground={true}
    backgroundOpacity={0.5}
    hasPointerEvents={true}
    name={'label'}
    width={100}
    height={100} />
</svg>
```

Label with only required properties set.

```svelte
<svg style="border: 1px solid black" width="500" height="500">
  <Label x={100} y={100} text="Hello, world!" />
</svg>
```
