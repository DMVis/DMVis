# Label component

The label allows you to add text with a background.
It can be used in combination with other components.
Coordinates are relative to the parent SVG element.

> Note: The label's origin is at its middle (see the `origin` attribute).

# Table of Contents

- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example usage](#example-usage)

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

## origin

- Type: `OriginX`
- Default: `OriginX.Middle`
- Options: `'topLeft'`, `'topMiddle'`, `'topRight'`, `'middleLeft'`, `'middle'`, `'middleRight'`, `'bottomLeft'`, `'bottomMiddle'`, `'bottomRight'`

Horizontal origin of the label.
Which value is useful depends on your positioning logic.
See [OriginMapper](../utils/OriginMapper.md) for more information.

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

- Type: `Opacity`
- Defaults: `textOpacity`

The opacity of the background behind the label.

## hasPointerEvents

- Type: `boolean`
- Default: `false`

Whether the label should respond to all pointer events (`true`) or none (`false`).

## name

- Type: `UndefineableString`
- Default: `'label'`

Class name of the label. It can be used as an identifier.
If set to `'name'`, for example, the class names will be `'label'` and `'label-name'`.

## width

- Type: `NumberAuto`
- Default: `'auto'`

Width of the rectangle of the label.

## height

- Type: `NumberAuto`
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

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

<b>Creating a basic label.</b>

```svelte
<script lang="ts">
  import { Label } from '@dmvis/dmvis/components';
</script>

<svg width={500} height={500}>
  <Label x={250} y={250} text="Hello, world!" />
</svg>
```

<b>Creating a label with all properties set.</b>

```svelte
<script lang="ts">
  import { Label } from '@dmvis/dmvis/components';

  function onMouseLabelClick(e: CustomEvent) {
    console.log('Mouse Click');
  }
</script>

<svg width={500} height={500}>
  <Label
    x={100}
    y={100}
    text="Hello, world!"
    backgroundColor="#fe7215"
    textOpacity={1}
    origin={'middle'}
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
    on:mouseLabelClick={onMouseLabelClick} />
</svg>
```
