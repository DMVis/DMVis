# Label

The label allows you to add text with a background.
It can be used in combination with other components.

> Note: The label's origin is at its middle (see the `origin` attribute)
> and coordinates are relative to the parent SVG element.

## Table of Contents

- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example Usage](#example-usage)

## Required Attributes

### x

- Type: `number`

The x-coordinate of the label.

### y

- Type: `number`

The y-coordinate of the label.

### text

- Type: `string`

The text to display on the label.

?> Words are automatically placed on a new line if they take up too much space depending on `width`'s value.

## Optional Attributes

### showEllipsis

- Type: `boolean`
- Default: `false`

Whether to show an ellipsis at the end of the text if it overflows the label.

### backgroundColor

- Type: `string`
- Default: `'red'`

The colour of the rectangle behind the label.

### textOpacity

- Type: `number | string`
- Default: `1`

The opacity of the text of the label.
It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).

### origin

- Type: `Origin`
- Default: `'middle'`
- Options: `'topLeft'`, `'topMiddle'`, `'topRight'`, `'middleLeft'`, `'middle'`, `'middleRight'`, `'bottomLeft'`, `'bottomMiddle'`, `'bottomRight'`

The origin of the bar.
Which value is useful depends on your positioning logic.
See [OriginMapper](../utils/OriginMapper.md) for more information.

### rotationDegrees

- Type: `number`
- Default: `0`

The rotation of the label in degrees.

### borderRadius

- Type: `number`
- Default: `0`

The border radius of the background in pixels.

### padding

- Type: `number`
- Default: `20`

The padding around the text in the label in pixels.

### textColor

- Type: `string`
- Default: `'black'`

The colour of the text in the label.
Valid inputs include CSS colours specified as a string.

### fontSize

- Type: `string`
- Default: `'12px'`

The font size of the text in the label.

### fontWeight

- Type: `string`
- Default: `'normal'`

The font weight of the text in the label.

### fontFamily

- Type: `string`
- Default: `'Arial'`

The font family of the text in the label.

### hasBackground

- Type: `bool`
- Default: `true`

Whether the label has a background.

### backgroundOpacity

- Type: `Opacity`
- Defaults: `textOpacity`

The opacity of the background of the label.
It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).

### hasPointerEvents

- Type: `boolean`
- Default: `false`

Whether the label should respond to all pointer events (`true`) or none (`false`).

### name

- Type: `UndefineableString`
- Default: `'label'`

The class name of the label. It can be used as an identifier.
If set to `'name'`, for example, the class names will be `'label'` and `'label-name'`.

### width

- Type: `NumberAuto`
- Default: `'auto'`

The width of the rectangle of the label in pixels.

### height

- Type: `NumberAuto`
- Default: `'auto'`

The height of the rectangle of the label in pixels.

### borderColor

- Type: `string`
- Default: `'black'`

The colour of the border around the background of the label.
Valid inputs include CSS colours specified as a string.

> Note: Can be set to `'none'` for no border.

## Events

This component emits the following events when `hasPointerEvents` is set to true:

- `mouseLabelClick`
- `mouseLabelEnter`
- `mouseLabelLeave`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

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
