# BaseVisualisation Component

The BaseVisualisation component is a wrapper component that handles a few default tasks for your visualisation. Certain styling standards
are set and error handling is kept within the scope of the visualisation.

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
