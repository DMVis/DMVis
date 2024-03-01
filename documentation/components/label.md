# Label component

The label component can be used to add a label to a chart, it is a simple text element with a rectangle behind it.

# Required Attributes

## x

- Type: `number`

Non-scaled x coordinate of the label

## y

- Type: `number`

Non-scaled y coordinate of the label

## text

- Type: `string`

Text to display in the label

# Optional Attributes

## color

- Type: `string`
- Default: `#fe7215`

Color of the rectangle behind the label

## opacity

- Type: `string`
- Default: `1`

Opacity of the label

## originX

- Type: `OriginX`
- Default: `OriginX.Middle`

Horizontal origin of the label
Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`

## originY

- Type: `OriginY`
- Default: `OriginY.Middle`

Vertical origin of the label
Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`

## rotationDegrees

- Type: `number`
- Default: `0`

Rotation of the label in degrees

## radiusX

- Type: `number`
- Default: `0`

Horizontal corner radius of the rectangle behind the label

## radiusY

- Type: `number`
- Default: `0`

Vertical corner radius of the rectangle behind the label

## padding

- Type: `number`
- Default: `20`

Padding around the text in the label

## textColor

- Type: `string`
- Default: `black`

Color of the text in the label

## fontSize

- Type: `string`
- Default: `12px`

Font size of the text in the label

## fontWeight

- Type: `string`
- Default: `normal`

Font weight of the text in the label

## fontFamily

- Type: `string`
- Default: `Arial`

Font family of the text in the label

## hasBackground

- Type: `bool`
- Default: `true`

Whether the label has a background or not

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
    opacity={'1'}
    radiusX={5}
    radiusY={5}
    padding={20}
    fontSize={'12px'}
    fontWeight={'normal'}
    fontFamily={'Arial'}
    hasBackground={true} />
</svg>
```

Label with only required properties set.

```svelte
<svg style="border: 1px solid black" width="500" height="500">
  <Label x={100} y={100} text="Hello, world!" />
</svg>
```
