# Scrollable

This component allows for making any visualisation smaller, by making it scrollable.

# Table of contents

- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example usage](#example-usage)

# Required Attributes

## width

- Type: `number`

Width of the visualisation that is shown at any moment.

## height

- Type: `number`

Height of the visualisation that is shown at any moment.

# Optional Attributes

## x

- Type: `number`
- Default: `0`

Optional horizontal offset for the `div`.

## y

- Type: `number`
- Default: `0`

Optional vertical offset for the `div`.

## className

- Type: `string`
- Default: `''` (empty string)

Optional string that will be added to

- the class of the `div` (which will be `'scrollable-div-{className}'`)
- the class of the `svg` (which will be `'scrollable-svg-{className}'`).

This could be used if the user needs to be able to get a reference to the specific `Scrollable` instance. Defaulted to `''` (empty string).

## allowHorizontalScrolling

- Type: `boolean`
- Default: `true`

If this is set to `false`, no horizontal scrolling will be allowed, even if the contained component is bigger than the `div`.

## allowVerticalScrolling

- Type: `boolean`
- Default: `true`

If this is set to `false`, no vertical scrolling will be allowed, even if the contained component is bigger than the `div`.

# Events

This component emits the following events:

- `scroll`

To read more about these events, see the [Events](../utils/Events.md) documentation.

# Example usage

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
