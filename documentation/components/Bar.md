# Bar component

A bar that can be used for bar visualisations.
Coordinates are relative to the parent SVG element.
Only positive `width` values are visible.
Negative `height` values can be visible
depending on `showsNegativeHeight`.

> Note: By default, `Bar` is vertical (i.e. `isVertical` is `true`)
> and its origin is at its bottom middle (see the `origin` attribute).

# Table of contents

- [Referenced Components](#referenced-components)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example usage](#example-usage)

# Referenced Components

This component utilises the following components:

<table style="width: 50%">
  <thead>
    <tr>
      <th style="width: 20%;">Component</th>
      <th style="width: 80%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#/components/Label.md">Label</a></td>
      <td>Provides labelling functionality.</td>
    </tr>
  </tbody>
</table>

# Required Attributes

## x

- Type: `number`

X-coordinate of the bar.

## y

- Type: `number`

Y-coordinate of the bar.

## barWidth

- Type: `number`

Width of the bar.

## value

- Type: `number`

The value of the bar, and therefore the length of the bar.

# Optional Attributes

## isVertical

- Type: `boolean`
- Default: `true`

Whether the bar is vertical bar or horizontal.

## color

- Type: `string`
- Default: `'red'`

Colour of the bar.

## opacity

- Type: `Opacity`
- Default: `1`

The opacity of the bar as a number in the range [0..1] or
a percentage string formatted as '{number}%'.

## origin

- Type: `OriginX`
- Default: `OriginX.Middle`
- Options: `'topLeft'`, `'topMiddle'`, `'topRight'`, `'middleLeft'`, `'middle'`, `'middleRight'`, `'bottomLeft'`, `'bottomMiddle'`, `'bottomRight'`

Horizontal origin of the bar.
Which value is useful depends on your positioning logic.
See [OriginMapper](../utils/OriginMapper.md) for more information.

## rotationDegrees

- Type: `number`
- Default: `0`

Rotation of the bar in degrees.

## borderRadius

- Type: `number`
- Default: `0`

Border radius of the bar in pixels.

## showsNegativeHeight

- Type: `boolean`
- Default: `false`

Whether the bar flips its orientation when `height` is negative.

## hoverText

- Type: `string`
- Default: `height`

Text to display in the label when the mouse hovers over the bar. This will default to the specified `height` attribute.

> Note: in order for this text to be visible, you need to set the `labelType` attribute to either `'alwaysVisible'` or `'visibleOnHighlight'`.

## labelType

- Type: `Visibility`
- Default: `'none'`
- Options: `'none'`, `'alwaysVisible'`, `'visibleOnHighlight'`

Determines the behaviour of the label on the bar.<br>
Setting this to `'none'`, means no label will be drawn.<br>
Setting this to `'alwaysVisible'`, means that there will always be a label inside the bar.<br>
Setting this to `'visibleOnHighlight'`, means that when the 'bar-number' label receives the class `'highlighted'`, the numbers will become visible.

## name

-
- Type: `UndefineableString`
- Default: `'bar'`

Class name of the bar. It can be used as an identifier.
Defaults to only `'bar'`.
If set, the class names will be `'bar'` and `'bar-name'`.

# Events

This component emits the following events:

- `mouseBarClick`
- `mouseBarEnter`
- `mouseBarLeave`

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

<b>Creating a basic bar.</b>

```svelte
<script lang="ts">
  import { Bar } from '@dmvis/dmvis/components';
</script>

<svg width={500} height={500}>
  <Bar x={250} y={450} barWidth={100} value={200} />
</svg>
```

<b>Creating a customised horizontal bar that displays its value on hover.</b>

```svelte
<script lang="ts">
  import { Bar } from '@dmvis/dmvis/components';

  const barValue = 200;
</script>

<svg width={500} height={500}>
  <Bar
    x={50}
    y={100}
    barWidth={50}
    value={barValue}
    isVertical={false}
    origin={'middleLeft'}
    hoverText={barValue.toString()}
    labelType="visibleOnHighlight"
    color={'rgb(0,255,160)'}
    borderRadius={25}
    opacity={0.8} />
</svg>
```
