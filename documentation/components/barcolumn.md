# Bar column component

The bar column is used to represent a column of labels or a column of bars. Respectively, those are categorical and numerical data visualisations. This component can be used by itself, but it makes more sense to use multiple together (e.g. tabular visualisation).

> Note: Since a header label is added on top of the bar column, it might be necessary to adjust `marginTop` depending on its positioning in an SVG element.

# Required Attributes

## x

- Type: `number`

X-coordinate of the bar column.

## y

- Type: `number`

Y-coordinate of the bar column.

## width

- Type: `number`

Width of the bar column.

## height

- Type: `number`

Height of the bar column.

## data

- Type: `{ header: string;
  rows: Array<{ label: string }>
      | Array<{ label: string; value: number }>;
};`

A header label with a list of labels or a list of pairs of labels and values.

# Optional Attributes

## columnSpacing

- Type: `number`
- Default: `20`

Value for the distance between each column. Adds `columnSpacing / 2` to the left and right of each column.

## showColumnLines

- Type: `boolean`
- Default: `false`

Whether to show lines at the start and end of each column.

## barPadding

- Type: `number`
- Default: `0.2`

Value for the distance between each bar in the range [0..1].

## barColor

- Type: `string`
- Default: `'red'`

Color of each bar.

## barOpacity

- Type: `number | string`
- Default: `0.6`

Opacity of each bar as a number in range [0..1] or
a percentage string formatted as '{number}%'.

## barRadiusX

- Type: `number | string`
- Default: `0`

Horizontal corner radius of each bar as a number
or a percentage string formatted as '{number}%'.

## barRadiusY

- Type: `number | string`
- Default: `0`

Vertical corner radius of each bar as a number
or a percentage string formatted as '{number}%'.

## textColor

- Type: `string`
- Default: `'black'`

Color of the text in each bar.

## fontSize

- Type: `string`
- Default: `'12px'`

Font size of the text in each bar.

## fontWeight

- Type: `string`
- Default: `'normal'`

Font weight of the text in each bar.

## fontFamily

- Type: `string`
- Default: `'Arial'`

Font family of the text in each bar.

## headerOffsetY

- Type: `number`
- Default: `-20`

Vertical offset of the header label.

## headerColor

- Type: `string`
- Default: `'rgb(200,200,200)'`

Color of the rectangle behind the header label.

## headerOpacity

- Type: `number`
- Default: `1`

Opacity of the header label.

## headerOriginX

- Type: `OriginX`
- Default: `OriginX.Middle`

Horizontal origin of the header label.
Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
Which value is useful depends on your positioning logic.

## headerOriginY

- Type: `OriginY`
- Default: `OriginY.Bottom`

Vertical origin of the header label.
Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
Which value is useful depends on your positioning logic.

## headerRotationDegrees

- Type: `number`
- Default: `0`

Rotation of the header label in degrees.

## headerRadiusX

- Type: `number | string`
- Default: `5`

Horizontal corner radius of the header label as a number
or a percentage string formatted as '{number}%'.

## headerRadiusY

- Type: `number | string`
- Default: `5`

Vertical corner radius of the header label as a number
or a percentage string formatted as '{number}%'.

## headerPadding

- Type: `number`
- Default: `5`

Padding around the text in the header label.

## headerTextColor

- Type: `string`
- Default: `'black'`

Color of the text in the header label.

## headerFontSize

- Type: `string`
- Default: `'14px'`

Font size of the text in the header label.

## headerFontWeight

- Type: `string`
- Default: `'normal'`

Font weight of the text in the header label.

## headerFontFamily

- Type: `string`
- Default: `'Arial'`

Font family of the text in the header label.

## hasHeaderBackground

- Type: `boolean`
- Default: `true`

Whether the header label has a background or not.

# Example usage

```svelte
<svg {width} {height}>
  <BarColumn x={0} y={0} width={500} height={1000} {data} columnSpacing={10} />
</svg>
```
