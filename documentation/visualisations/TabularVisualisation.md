# TabularVisualisation

This is a visualisation that represents numerical data with rectangular bars or
categorical data with labels in a column.

> Note: Since a header label is added on top of each column, it might be necessary to adjust `marginTop`.

# Required Attributes

### dataUtil

- Type: `DataUtils`

The `DataUtils` class which, contains all the data to be displayed.

# Optional Attributes

## width

- Type: `number`
- Default: `numberOfColumns * 200`

Width of the visualisation.

## height

- Type: `number`
- Default: `numberOfRows * 20 + header`

Height of the visualisation.

## marginLeft

- Type: `number`
- Default: `30`

Margin to the left of the visualisation.

## marginRight

- Type: `number`
- Default: `30`

Margin to the right of the visualisation.

## marginTop

- Type: `number`
- Default: `50`

Margin to the top of the visualisation.

## marginBottom

- Type: `number`
- Default: `30`

Margin to the bottom of the visualisation.

## showColumnLines

- Type: `boolean`
- Default: `false`

Whether to show lines at the start and end of each column. This defaults to false.

## columnPadding

- Type: `number`
- Default: `10`

Value for the distance between each column.

## barOpacity

- Type: number
- Default: `0.6`

The opacity of each bar as a number in the range [0..1].

> Note: A value lower than 1 is recommended for visible bar highlighting.

## isScrollable

- Type: `boolean`
- Default: `false`

Determines whether the visualisation is scrollable in its parent container.

## showFilter

- Type: `boolean`
- Default: `false`

Determines whether the [Filter](components/Filter.md) component is displayed next to the visualisation.

# Example usage

```svelte
<TabularVisualisation width={1500} height={1250} {data} />
```
