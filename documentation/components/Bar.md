# Bar

A bar that can be used for visualisations.
Only positive `width` values are visible.
Negative `length` values can be visible
depending on whether `showsNegativeLength` is toggled.

> Note: By default, `Bar` is vertical (i.e. [`isVertical`](#isvertical) is `true`),
> its origin is at its bottom middle (see the [`origin`](#origin) attribute), and
> its coordinates are relative to its parent the SVG element.

## Table of Contents

- [Referenced Components](#referenced-components)
- [Attributes](#attributes)
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

## Attributes

<table style="width: 50%">
  <thead>
    <tr>
      <th style="width: 33%;">Attribute</th>
      <th style="width: 33%;">Type</th>
      <th style="width: 33%;">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href='#components/Bar?id=x'>x</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=y'>y</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=width'>width</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=length'>length</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=color'>color</a></td>
      <td><code>string</code></td>
      <td><code>'red'</code></td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=opacity'>opacity</a></td>
      <td><code>Opacity</code></td>
      <td><code>1</code></td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=origin'>origin</a></td>
      <td><code>Origin</code></td>
      <td><code>'bottomMiddle'</code></td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=rotationdegrees'>rotationDegrees</a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=borderradius'>borderRadius</a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=showsnegativelength'>showsNegativeLength</a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=hovertext'>hoverText</a></td>
      <td><code>string</code></td>
      <td><code>length.toString()</code></td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=labeltype'>labelType</a></td>
      <td><code>Visibility</code></td>
      <td><code>'none'</code></td>
    </tr>
    <tr>
      <td><a href='#components/Bar?id=name'>name</a></td>
      <td><code>UndefineableString</code></td>
      <td><code>'bar'</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### x

- Type: `number`
- <span style="color:coral">Required</span>

The x-coordinate of the bar.

### y

- Type: `number`
- <span style="color:coral">Required</span>

The y-coordinate of the bar.

### width

- Type: `number`
- <span style="color:coral">Required</span>

The width of the bar in pixels.

### length

- Type: `number`
- <span style="color:coral">Required</span>

The length of the bar in pixels. This represents a value from the data.

## Optional Attributes

### isVertical

- Type: `boolean`
- Default: `true`

Toggles whether the bar is a vertical- or horizontal bar.

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

The border-radius of the bar in pixels.
Use this to have rounded corners.

### showsNegativeLength

- Type: `boolean`
- Default: `false`

Whether or not the bar will show negative values rather than putting them to `0`.

### hoverText

- Type: `string`
- Default: `length.toString()`

The text to display in the label when the mouse hovers over the bar.

> Note: For this text to be visible, you need to set the `labelType` attribute to either `'alwaysVisible'` or `'visibleOnHighlight'`.

### labelType

- Type: `Visibility`
- Default: `'none'`
- Options: `'none'`, `'alwaysVisible'`, `'visibleOnHighlight'`

Determines the behaviour of the label on the bar.<br>

- Setting this to `'none'`, means no label will be drawn.<br>
- Setting this to `'alwaysVisible'`, means that there will always be a label inside the bar.<br>
- Setting this to `'visibleOnHighlight'`, means that the numbers will become visible when the 'bar-number' label receives the class `'highlighted'`.

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
