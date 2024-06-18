# Point

The point component is meant to be used in visualisations like scatterplots.
It produces a point at a given coordinate of certain color, size and style.

## Table of Contents

- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Events](#events)
- [Example Usage](#example-usage)

## Required Attributes

### x

- Type: `number`

The scaled x-coordinate of the point.

### y

-Type: `number`

The scaled y-coordinate of the point.

## Optional Attributes

### radius

- Type: `number`
- Default: `5`

The radius of the point in pixels.

### borderWidth

- Type: `number`
- Default: `1`

The width of the border in pixels.

> Note: It can be removed entirely by setting the value to `0`.

### borderColor

- Type: `string`
- Default: `black`

The colour of the border.

> Note: If `StyleUtil` is used, this value will be ignored.

### color

- Type: `string`
- Default: `red`

The colour of the point.
Valid inputs include CSS colours specified as a string.

> Note: If `StyleUtil` is used, this value will be ignored.

### opacity

- Type: `number`
- Default: `1`

The opacity of the point.
It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).

### name

- Type: `UndefineableString`
- Default: `'point'`

The class name of the point.
It can be used as an identifier.
If set, the class names will be `'point'` and `'point-name'`.
Defaults to `'point'`.

## Events

This component emits the following events:

- `mousePointEnter`
- `mousePointLeave`
- `mousePointClick`

See the [Events](../utils/Events.md) documentation to read more about these events.

## Example Usage

<b>Creating the most basic point.</b>

```svelte
<script lang="ts">
  import { Point } from '@dmvis/dmvis/components';
</script>

<svg width={500} height={500}>
  <Point x={200} y={200} />
</svg>
```

<b>Creating a more customised point.</b>

```svelte
<script lang="ts">
  import { Point } from '@dmvis/dmvis/components';
</script>

<svg width={500} height={500}>
  <Point
    x={200}
    y={200}
    radius={10}
    borderWidth={2}
    borderColor={'lime'}
    color={'#FF88AA'}
    opacity={0.5} />
</svg>
```

<b>Creating a point cloud following a dataset.</b>

```svelte
<script lang="ts">
  import { Point } from '@dmvis/dmvis/components';

  const data: { x: number; y: number }[] = [
    { x: 75, y: 250 },
    { x: 130, y: 475 },
    { x: 300, y: 125 },
    { x: 450, y: 350 },
    { x: 200, y: 50 }
  ];
</script>

<svg width={500} height={500}>
  {#each data as p}
    <Point x={p.x} y={p.y} />
  {/each}
</svg>
```
