# Icon

Some visualisations, like LineUp, require icons to be displayed. This component provides a way to display icons in the UI.

# Table of Contents

- [Supported IconTypes](#supported-icontypes)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example usage](#example-usage)

# Supported IconTypes

Out of the box, we support the following icons:

- `'filter'`
- `'group'`
- `'more'`
- `'search'`
- `'sort'`
- `'weight'`

They can be accessed by importing the enum `IconType` and using it as the type of the `type` attribute. An example is `IconType.Sort`.

# Required Attributes

## x

- Type: `number`

X-coordinate of the icon.

## y

- Type: `number`

Y-coordinate of the icon.

## icon

- Type: `string`|`IconType`

Name of the icon to display. This can be either one of the supported icons (specified as IconType) or an SVG path with your own icon (specified as string). The icon is 25px by 25px, so you may need to adjust the path to fit within these dimensions.

# Optional Attributes

## color

- Type: `string`
- Default: `#000000`

Colour of the icon.

# Events

This component emits the following events:

- `mouseIconClick`
- `mouseIconEnter`
- `mouseIconLeave`

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

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
