# BaseVisualisation Component

The BaseVisualisation component is a wrapper component that handles a few default tasks for your visualisation. Certain styling standards are set and error handling is kept within the scope of the visualisation.

## Optional Attributes

## isScrollable

- Type: `boolean`
- Default: `false`

Whether the component that is wrapped by the `BaseVisualisation` component should be scrollable.

## scrollableWidth

- Type: `number`
- Default: `1000`

Width of the visualisation that is shown. For this to be used, `isScrollable` must be set to `true`.

## scrollableHeight

- Type: `number`
- Default: `1000`

Height of the visualisation that is shown. For this to be used, `isScrollable` must be set to `true`.

## enableFilter

- Type: `DataUtils`
- Default: `null`

Provide a DataUtils object when you want to show and use the `Filter` component within the visualisation. -

# Example usage

When creating your own visualisation, the first component that you should use is the `BaseVisualisation`:

```svelte
<script lang="ts">
  const width: number = 100;
  const height: number = 1000;
</script>

<BaseVisualisation>
  <svg>
    {#each columns as column, i}
      <Column
        x={i * column.width}
        {width}
        {height}
        type={column.type}
        name={column.name}
        padding={column.padding} />
    {/each}
    ...
  </svg>
</BaseVisualisation>
```

If you want this visualisation to be of size 2000px by 2000px, but to only take up 1000px by 1000px on your page, you can do the following:

```svelte
<script lang="ts">
  const actualWidth: number = 2000;
  const actualHeight: number = 2000;
  const scrollableWidth: number = 1000;
  const scrollableHeight: number = 1000;
</script>

<BaseVisualisation isScrollable={true} {scrollableWidth} {scrollableHeight}>
  <svg width={actualWidth} height={actualHeight}>
    {#each columns as column, i}
      <Column
        x={i * column.width}
        width={actualWidth / columns.length}
        {actualHeight}
        type={column.type}
        name={column.name}
        padding={column.padding} />
    {/each}
    ...
  </svg>
</BaseVisualisation>
```
