# BarColumn

BarColumn is a column that displays a bar chart. It is useful for visualising the relative size of values in a column.

# Required Attributes

## x

- Type: `number`

X-coordinate of the column.

## width

- Type: `number`

Width of the column.

## height

- Type: `number`

Height of the column.

## data

- Type: `number[]`

Data that is to be displayed as bars in the column.

# Optional Attributes

## name

- Type: `string`
- Default: `'Column'`

Name of the column to display at the top. Set this to the attribute name.

## padding

- Type: `number`
- Default: `10`

Padding around the column.

## icons

- Type: `IconType[]`
- Default: `[IconType.Sort,IconType.Filter,IconType.More]`

List of what icons to display in the top of the column.

## scale

- Type: `d3.ScaleLinear<number,number>`
- Default: `d3.scaleLinear().domain([0, d3.max(data) ?? 0]).range([0, width - padding])`

What scale to use for the entire column. This default scale is nothing more than a scale that has a range that is equal to the width of the column and a domain that goes from 0 to the maximum value of the column.

## barOpacity

- Type: `number`
- Default: `1`

The opacity of each bar as a number in the range [0..1].

## barLabelVisibility

- Type: `Visibility`
- Default: `'none'`
- Options: `'none'`, `'alwaysVisible'`, `'visibleOnHighlight'`

Determines the behaviour of the labels on the bars.<br>
Setting this to `'none'`, means no label will be drawn.<br>
Setting this to `'alwaysVisible'`, means that there will always be a label inside the bar.<br>
Setting this to `'visibleOnHighlight'`, means that when the 'bar-number' label receives the class `'highlighted'`, the numbers will become visible.

## names

- Type: `string[]`
- Default: `[]`

The name for each point. Will be used for accessing the bars with classnames. The first entry of this array is linked with the first item of the data array, etc..

> Note: Setting this to `[]` will cause the bars to have no additional name

## overviewItem

- Type: `string`
- Options: `'histogram' | 'axis' | 'none'`
- Default: `'none'`

Determines what item to display in the overview section of the column header. <br>
Setting the value to `histogram` will cause `BarColumn` to display a histogram of the data in the column. <br>
Setting this to `'axis'`, will cause `BarColumn` to automatically create a `d3.axisTop` from the specified scale.

# Events

This component emits the following events:

- `dragStart`
- `dragMove`
- `dragStop`
- `filter`
- `mouseBarEnter`
- `mouseBarLeave`
- `mouseHover`
- `mouseRowClick`
- `sort`

To read more about these events, see the [Events](../utils/events.md) documentation.

# Example usage

```svelte
<BarColumn x={0} width={100} height={200} data={[10, 20, 30, 40]} />
```
