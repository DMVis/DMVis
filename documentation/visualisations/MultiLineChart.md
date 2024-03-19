# LineChart

This is a visualisation to show multiple lines between points.

# Required Attributes

## width

- Type: `number`

Width of the visualisation

## height

- Type: `number`

Height of the visualisation

## data

- Type: `{ x: number; y: number }[][]`

List of lists of points (each list of points represents one line)

# Optional Attributes

## marginLeft

- Type: `number`
- Default: `40`

Margin left of the visualisation

## marginRight

- Type: `number`
- Default: `40`

Margin right of the visualisation

## marginTop

- Type: `number`
- Default: `40`

Margin above of the visualisation

## marginBottom

- Type: `number`
- Default: `40`

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
<MultiLineChart marginLeft={40} marginBottom={40} {width} {height} {data} />
```
