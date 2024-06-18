# Bar

A bar that can be used for visualisations.
Only positive `width` values are visible.
Negative `length` values can be visible
depending on whether `showsNegativeLength` is toggled.

> Note: By default, `Bar` is vertical (i.e. `isVertical` is `true`),
> its origin is at its bottom middle (see the `origin` attribute), and
> its coordinates are relative to its parent the SVG element.

## Table of Contents

- [Referenced Components](#referenced-components)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example Usage](#example-usage)

## Referenced Components

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

## Required Attributes

### x

- Type: `number`

The x-coordinate of the bar.

### y

- Type: `number`

The y-coordinate of the bar.

### width

- Type: `number`

The width of the bar in pixels.

### length

- Type: `number`

The length of the bar to represent its value in pixels.

## Optional Attributes

### isVertical

- Type: `boolean`
- Default: `true`

Whether the bar is vertical bar or horizontal.

### color

- Type: `string`
- Default: `'red'`

The colour of the bar. Valid inputs include CSS colours specified as a string.

### opacity

- Type: `Opacity`
- Default: `1`

The opacity of the bar.
It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).

### origin

- Type: `Origin`
- Default: `'bottomMiddle'`
- Options: `'topLeft'`, `'topMiddle'`, `'topRight'`, `'middleLeft'`, `'middle'`, `'middleRight'`, `'bottomLeft'`, `'bottomMiddle'`, `'bottomRight'`

The origin of the bar.
Which value is useful depends on your positioning logic.
See [OriginMapper](../utils/OriginMapper.md) for more information.

### rotationDegrees

- Type: `number`
- Default: `0`

The rotation of the bar in degrees.

### borderRadius

- Type: `number`
- Default: `0`

The border radius of the bar in pixels.
Use this to have rounded corners.

### showsNegativeLength

- Type: `boolean`
- Default: `false`

Whether the bar flips its orientation when `length` is negative.

### hoverText

- Type: `string`
- Default: `height`

The text to display in the label when the mouse hovers over the bar.

> Note: In order for this text to be visible, you need to set the `labelType` attribute to either `'alwaysVisible'` or `'visibleOnHighlight'`.

### labelType

- Type: `Visibility`
- Default: `'none'`
- Options: `'none'`, `'alwaysVisible'`, `'visibleOnHighlight'`

Determines the behaviour of the label on the bar.<br>
Setting this to `'none'`, means no label will be drawn.<br>
Setting this to `'alwaysVisible'`, means that there will always be a label inside the bar.<br>
Setting this to `'visibleOnHighlight'`, means that when the 'bar-number' label receives the class `'highlighted'`, the numbers will become visible.

### name

- Type: `UndefineableString`
- Default: `'bar'`

The class name of the bar.
It can be used as an identifier.
If set, the class names will be `'bar'` and `'bar-name'`.
Defaults to `'bar'`.

## Events

This component emits the following events:

- `mouseBarClick`
- `mouseBarEnter`
- `mouseBarLeave`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Creating a basic bar.</b>

```svelte
<script lang="ts">
  import { Bar } from '@dmvis/dmvis/components';
</script>

<svg width={500} height={500}>
  <Bar x={250} y={450} width={100} length={200} />
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
    width={50}
    length={barValue}
    isVertical={false}
    origin={'middleLeft'}
    hoverText={barValue.toString()}
    labelType="visibleOnHighlight"
    color={'rgb(0,255,160)'}
    borderRadius={25}
    opacity={0.8} />
</svg>
```
