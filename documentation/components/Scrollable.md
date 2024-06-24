# Scrollable

This component allows for making any visualisation smaller, by making it scrollable.

## Table of Contents

- [Attributes](#attributes)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example Usage](#example-usage)

## Attributes

<table style="width: 75%">
  <thead>
    <tr>
      <th style="width: 33%;">Attribute</th>
      <th style="width: 33%;">Type</th>
      <th style="width: 33%;">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#components/Scrollable?id=width">width</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Scrollable?id=height'>height</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Scrollable?id=x'>x</a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><a href='#components/Scrollable?id=y'>y</a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><a href='#components/Scrollable?id=classname'>className</a></td>
      <td><code>string</code></td>
      <td><code>''</code></td>
    </tr>
    <tr>
      <td><a href='#components/Scrollable?id=allowhorizontalscrolling'>allowHorizontalScrolling</a></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><a href='#components/Scrollable?id=allowverticalscrolling'>allowVerticalScrolling</a></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### width

- Type: `number`
- <span style="color:coral">Required</span>

Width of the visualisation that is shown at any moment in pixels.

### height

- Type: `number`
- <span style="color:coral">Required</span>

Height of the visualisation that is shown at any moment in pixels.

## Optional Attributes

### x

- Type: `number`
- Default: `0`

The horizontal offset for the `div`.

### y

- Type: `number`
- Default: `0`

The vertical offset for the `div`.

### className

- Type: `string`
- Default: `''`

A string value that is added to:

- The class of the `div` (which will be `'scrollable-div-{className}'`)
- The class of the `svg` (which will be `'scrollable-svg-{className}'`).

This could be used if the user needs to be able to get a reference to the specific `Scrollable` instance.

### allowHorizontalScrolling

- Type: `boolean`
- Default: `true`

If this is set to `false`, no horizontal scrolling will be allowed, even if the contained component is bigger than the `div`.

### allowVerticalScrolling

- Type: `boolean`
- Default: `true`

If this is set to `false`, no vertical scrolling will be allowed, even if the contained component is bigger than the `div`.

## Events

This component emits the following events:

- `scroll`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Creating a scrollable, large `Point`. </b>

```svelte
<script lang="ts">
  import { Point, Scrollable } from '@dmvis/dmvis/components';

  const visualisationSize = 1000;
  const containerSize = 500;
</script>

<Scrollable width={containerSize} height={containerSize}>
  <svg width={visualisationSize} height={visualisationSize}>
    <Point x={visualisationSize / 2} y={visualisationSize / 2} radius={visualisationSize / 2} />
  </svg>
</Scrollable>
```
