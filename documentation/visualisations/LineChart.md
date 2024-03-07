# LineChart

This is a visualisation to show a line between points.

# Required Attributes

## width

- Type: `number`

Width of the visualisation

## height

- Type: `number`

Height of the visualisation

## data

- Type: `{ x: number; y: number }[]`

List of points

# Optional Attributes

## marginLeft

- Type: `number`
- Default: `20`

Margin left of the visualisation

## marginRight

- Type: `number`
- Default: `20`

Margin right of the visualisation

## marginTop

- Type: `number`
- Default: `20`

Margin above of the visualisation

## marginBottom

- Type: `number`
- Default: `20`

Margin under of the visualisation

## minX

- Type: `number`
- Default: `Depending on data range`

Minimal value of the horizontal axis

## maxX

- Type: `number`
- Default: `Depending on data range`

Maximal value of the horizontal axis

## minY

- Type: `number`
- Default: `Depending on data range`

Minimal value of the vertical axis

## maxY

- Type: `number`
- Default: `Depending on data range`

Maximal value of the vertical axis

## Sample usage

```svelte
<LineChart marginLeft={40} marginBottom={40} {width} {height} {data} />
```
