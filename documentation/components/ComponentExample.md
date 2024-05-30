# Component Name

This component is a component, It's meant to be used as a component perhaps with another component using it

!> This is a component!

# Required Attributes

## x

- Type: `number`

The x coordinate of where the component is placed

# Optional Attributes

## color

- Type: `string`
- Default: `rgb(50, 50, 50)`

Color of the component

## amount

- Type: `number`
- Default: `0`

Amount of components to be placed

# Example usage

```svelte
<svg width="{width}," {height}>
  {#each barData as p}
    <Bar x={p.x} y={p.y} barWidth={p.width} value={p.height} />
  {/each}
</svg>
```