# BaseVisualisation Component

The BaseVisualisation component is a wrapper component that handles a few default tasks for your visualisation. Certain styling standards are set and error handling is kept within the scope of the visualisation.

# Table of contents

- [Referenced Components](#referenced-components)
- [Optional Attributes](#optional-attributes)
- [Example usage](#example-usage)

# Referenced Components

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
      <td><a href="#/components/Filter.md">Filter</a></td>
      <td>Adds a filter to the visualisation for sorting and filtering data. Recommended to use outside <code>BaseVisualisation</code> for multiple visualisations.</td>
    </tr>
    <tr>
      <td><a href="#/components/Scrollable.md">Scrollable</a></td>
      <td>Makes any visualisation scrollable, allowing for smaller display areas.</td>
    </tr>
  </tbody>
</table>

## Optional Attributes

## isScrollable

- Type: `boolean`
- Default: `false`

Whether the component that is wrapped by the `BaseVisualisation` component should be [scrollable](components/Scrollable.md).

## scrollableWidth

- Type: `number`
- Default: `1000`

Width of the visualisation that is shown. For this to be used, `isScrollable` must be set to `true`.

## scrollableHeight

- Type: `number`
- Default: `1000`

Height of the visualisation that is shown. For this to be used, `isScrollable` must be set to `true`.

## showFilter

- Type: `DataUtils`
- Default: `null`

Provide a DataUtils object when you want to show and use the [Filter](components/Filter.md) component within the visualisation.

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
