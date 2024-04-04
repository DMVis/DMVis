# TabularVisualisation

This is visualisation that represents numerical data with rectangular bars or
categorical data with labels in a column.

> Note: Since a header label is added on top of each column, it might be necessary to adjust `marginTop`

# Required Attributes

## width

- Type: `number`

Width of the visualisation.

## height

- Type: `number`

Height of the visualisation.

### dataUtil

- Type: `DataUtils`

The `DataUtils` class which, contains all the data to be displayed.

# Optional Attributes

## marginLeft

- Type: `number`
- Default: `50`

Margin to the left of the visualisation.

## marginRight

- Type: `number`
- Default: `50`

Margin to the right of the visualisation.

## marginTop

- Type: `number`
- Default: `50`

Margin to the top of the visualisation.

## marginBottom

- Type: `number`
- Default: `50`

Margin to the bottom of the visualisation.

## columnMarginLeft

- Type: `number`
- Default: `0`

Margin to the left of each column.

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

Value for the distance between each bar in each column in the range [0..1].

## barColor

- Type: `string`
- Default: `'red'`

Color of each bar in each column.

## barRadiusX

- Type: `number | string`
- Default: `0`

Horizontal corner radius of each bar in each column as a number
or a percentage string formatted as '{number}%'.

## barRadiusY

- Type: `number | string`
- Default: `0`

Vertical corner radius of each bar in each column as a number
or a percentage string formatted as '{number}%'.

## textColor

- Type: `string`
- Default: `'black'`

Color of the text in each bar in each column.

## fontSize

- Type: `string`
- Default: `'12px'`

Font size of the text in each bar in each column.

## fontWeight

- Type: `string`
- Default: `'normal'`

Font weight of the text in each bar in each column.

## fontFamily

- Type: `string`
- Default: `'Arial'`

Font family of the text in each bar in each column.

## headerColor

- Type: `string`
- Default: `'rgb(200,200,200)'`

Color of the rectangle behind the header label in each column.

## headerOpacity

- Type: `number`
- Default: `1`

Opacity of the header label in each column.

## headerRadiusX

- Type: `number | string`
- Default: `5`

Horizontal corner radius of the header label in each column as a number
or a percentage string formatted as '{number}%'.

## headerRadiusY

- Type: `number | string`
- Default: `5`

Vertical corner radius of the header label in each column as a number
or a percentage string formatted as '{number}%'.

## headerPadding

- Type: `number`
- Default: `5`

Padding around the text in the header label in each column.

## headerTextColor

- Type: `string`
- Default: `'black'`

Color of the text in the header label in each column.

## headerFontSize

- Type: `string`
- Default: `'14px'`

Font size of the text in the header label in each column.

## headerFontWeight

- Type: `string`
- Default: `'normal'`

Font weight of the text in the header label in each column.

## headerFontFamily

- Type: `string`
- Default: `'Arial'`

Font family of the text in the header label in each column.

## hasHeaderBackground

- Type: `boolean`
- Default: `true`

Whether the header label has a background or not in each column.

# Sample usage

```svelte
<TabularVisualisation width={1500} height={1250} {data} />
```
