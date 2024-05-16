# Scrollable

This component allows for making any visualisation smaller, by making it scrollable.

# Required Attributes

## width

- Type: `number`

Width of the visualisation that is shown at any moment.

## height

- Type: `number`

Height of the visualisation that is shown at any moment.

# Optional Attributes

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

# Example usage

Create a scrollable Parallel Coordinates visualisation. At any time, the user will see a 700px by 500px part of the Parallel Coordinates visualisation. The user can scroll up, down, left and right to view the entire visualisation.

```svelte
<Scrollable height={500} width={700}>
  <ParallelCoordinates marginLeft={100} marginTop={40} marginRight={50} {dataUtil} />
</Scrollable>
```
