# OriginMapper

Many SVG elements have a top-left origin by default. This works in many situations, but it can become cumbersome to calculate new positions to offset such elements (e.g. center). Besides that, it can make it harder to think about what such an element's center of rotation is.

To mitigate these issues, the OriginMapper provides functions to help calculate and reason about a component's new origin.
These are: `getOriginOffsetX`, `getOriginOffsetY`, `getFlippedOriginX`, and `getFlippedOriginY`. All of them use the `Origin` type, which enables you to map from and to nine possible origins: `'topLeft'`, `'topMiddle'`, `'topRight'`, `'middleLeft'`, `'middle'`, `'middleRight'`, `'bottomLeft'`, `'bottomMiddle'`, and `'bottomRight'`.

> DMVis components that have a customisable origin are: [Bar](components/Bar.md), [Label](components/Label.md), and [Tooltip](components/Tooltip.md).

## Table of Contents

- [Functions](#functions)
  - [getOriginOffsetX](#getOriginOffsetX)
  - [getOriginOffsetY](#getOriginOffsetY)
  - [getFlippedOriginX](#getFlippedOriginX)
  - [getFlippedOriginY](#getFlippedOriginY)
- [Example Usage](#example-usage)

## Functions

### getOriginOffsetX

A function to calculate how much an x-coordinate should be offset to map one origin to another.
It has the following parameters:

- `dimension`: The dimension of the element in pixels.
- `sourceOrigin`: The default origin of the element.
- `destinationOrigin`: The desired origin of the element to map to from the default origin.

It returns the horizontal offset in pixels needed to to get the desired origin mapping effect.

### getOriginOffsetY

A function to calculate how much a y-coordinate should be offset to map one origin to another.
It has the following parameters:

- `dimension`: The dimension of the element in pixels.
- `sourceOrigin`: The default origin of the element.
- `destinationOrigin`: The desired origin of the element to map to from the default origin.

It returns the vertical offset in pixels needed to to get the desired origin mapping effect.

### getFlippedOriginX

A function to map an origin to its horizontally flipped equivalent.
It has the following parameter:

- `origin`: An origin to be flipped.

It returns the horizontally opposite origin of the provided origin using the following mapping:

- `'topLeft'` -> `'topRight'`
- `'topMiddle'` -> `'topMiddle'`
- `'topRight'` -> `'topLeft'`
- `'middleLeft'` -> `'middleRight'`
- `'middle'` -> `'middle'`
- `'middleRight'` -> `'middleLeft'`
- `'bottomLeft'` -> `'bottomRight'`
- `'bottomMiddle'` -> `'bottomMiddle'`
- `'bottomRight'` -> `'bottomLeft'`

### getFlippedOriginY

A function to map an origin to its vertically flipped equivalent.
It has the following parameter:

- `origin`: An origin to be flipped.

It returns the vertically opposite origin of the provided origin using the following mapping:

- `'topLeft'` -> `'bottomLeft'`
- `'topMiddle'` -> `'bottomMiddle'`
- `'topRight'` -> `'bottomRight'`
- `'middleLeft'` -> `'middleLeft'`
- `'middle'` -> `'middle'`
- `'middleRight'` -> `'middleRight'`
- `'bottomLeft'` -> `'topLeft'`
- `'bottomMiddle'` -> `'topMiddle'`
- `'bottomRight'` -> `'topRight'`

## Example Usage

Example of how to use the `getOriginOffsetX` and `getOriginOffsetY` functions:

```svelte
<script lang="ts">
  // Imports
  import { select } from 'd3';
  import { onMount } from 'svelte';

  // DMVis imports
  import { Point } from '@dmvis/dmvis/components';
  import { getOriginOffsetX, getOriginOffsetY } from '@dmvis/dmvis/utils';

  // Constants
  const sourceOrigin = 'topLeft';
  const destinationOrigin = 'bottomRight';

  const rectWidth = 50;
  const rectHeight = 50;
  const rectX = 250;
  const rectY = 250;

  // Reference to the rectangle on the screen
  let rectElem: SVGRectElement;

  onMount(() => {
    // Move the rectangle to its correct position
    select(rectElem)
      .attr('x', rectX + getOriginOffsetX(rectWidth, sourceOrigin, destinationOrigin))
      .attr('y', rectY + getOriginOffsetY(rectHeight, sourceOrigin, destinationOrigin));
  });
</script>

<svg width={1000} height={1000}>
  <!-- Point for reference, drawn at the origin of the rectangle -->
  <Point x={rectX} y={rectY} />
  <!-- Rectangle to be moved by the originMapper -->
  <rect
    x={rectX}
    y={rectY}
    fill="lime"
    width={rectWidth}
    height={rectHeight}
    bind:this={rectElem} />
</svg>
```

In the example above, the `getOrigin` function is used to calculate the new origin of the text block. The `x` and `y` variables represent the position of the element. The `width` and `height` variables represent the dimension of the element. The `sourceOrigin` represents the default origin of the element and the `destinationOrigin` variable represents the desired origin of the element. The `getOriginOffsetX` and `getOriginOffsetY` functions are used to calculate the new origin of the text block.

It's important to set the new value for `x` or `y` to the result of the `getOrigin` function plus the original value of `x` or `y`. This is because the `getOriginOffsetX` and `getOriginOffsetY` functions returns the needed offset for the element to get the desired origin mapping effect.
