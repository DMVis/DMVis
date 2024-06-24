# Icon

Some visualisations, like LineUp, require icons to be displayed. This component provides a way to display icons in the UI.

## Table of Contents

- [Supported IconTypes](#supported-icontypes)
- [Attributes](#attributes)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example Usage](#example-usage)

## Supported IconTypes

Out of the box, we support the following icons:

- `'filter'`
- `'group'`
- `'more'`
- `'search'`
- `'sort'`
- `'weight'`

They can be accessed by importing the enum `IconType` and using it as the type of the `type` attribute. An example is `IconType.Sort`.

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
      <td><a href="#components/Icon?id=x">x</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Icon?id=y'>y</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Icon?id=icon'>icon</a>*</td>
      <td><code>IconType | string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#components/Icon?id=color'>color</a></td>
      <td><code>string</code></td>
      <td><code>#000000</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### x

- Type: `number`
- <span style="color:coral">Required</span>

The x-coordinate of the icon.

### y

- Type: `number`
- <span style="color:coral">Required</span>

The y-coordinate of the icon.

### icon

- Type: `IconType` | `string`
- <span style="color:coral">Required</span>

The type of icon to display.
This can be either one of the supported icons (specified as `IconType`) or an SVG path with your own icon (specified as string).
The icon is 25px by 25px, so you may need to adjust the path to fit within these dimensions.

## Optional Attributes

### color

- Type: `string`
- Default: `#000000`

The colour of the icon.
Valid inputs include CSS colours specified as a string.

## Events

This component emits the following events:

- `mouseIconClick`
- `mouseIconEnter`
- `mouseIconLeave`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Creating a pre-defined sorting icon.</b>

```svelte
<script lang="ts">
  import { Icon } from '@dmvis/dmvis/components';
  import { IconType } from '@dmvis/dmvis/enums';
</script>

<Icon x={50} y={50} icon={IconType.Sort} />
```

<b>Creating a custom icon with a specified path.</b>

```svelte
<script lang="ts">
  import { Icon } from '@dmvis/dmvis/components';
</script>

<Icon x={50} y={50} icon="M0,0 L10,10 L0,10 Z" />
```
