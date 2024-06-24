# Good practices

For this library, the DMVis team has adhered to certain practices during the development. For future contributors, the main practices are described below:

## Component Layout

Every component that was made is layed out in the following way

```svelte
<script lang="ts">
  // General imports
  import x from 'External library';

  // DMVis imports
  import x from '@dmvis/dmvis';

  // Required attributes
  export let example: string;

  // Optional attributes
  export let example: string = 'default value';
</script>

<!--
@component
By adding the '@component', this comment that is formatted in Markdown will be shown
in the IDE, when the component is hovered on. The default layout is as follows:
### Component description

#### Required Attributes

#### Optional Attributes

#### Events

-->

<div>
  <h1>Example HTML code</h1>
</div>

<style>
</style>
```

> Note: When there is no styling, the style element is removed.

## Component documentation

Besides the documentation provided inside the component itself, there also needs to be a dedicated page in the documentation. To keep in line with previous documentation it is advised to look into and copy over the structure of other files. Everything is written in [Markdown](https://www.markdownguide.org/).

### Keep in mind

Every new documentation file needs to be added to the `documentation/_sidebar.md` for it to be present in the hosted documentation webpage.

## Visualisation Layout

The layout of a visualisation is similar to the component, the difference being that all the logic like setting the [Context](utils/Context.md) should happen at this level, in order to set all the information properly for components that may be used.

We recommend the use of the [BaseVisualisation](components/BaseVisualisation.md) to start of with some helpful features.

```svelte
<script lang="ts">
  // General imports
  import x from 'External library';

  // DMVis imports
  import { BaseVisualisation } from '@dmvis/dmvis';

  // Required attributes
  export let example: string;

  // Optional attributes
  export let example: string = 'default value';
</script>

<!--
@component
By adding the '@component', this comment that is formatted in Markdown will be shown
in the IDE, when the component is hovered on. The default layout is as follows:
### Component description

#### Required Attributes

#### Optional Attributes

#### Events

-->

<BaseVisualisation>
  <!-- Other components to create a desirable visualisation -->
</BaseVisualisation>

<style>
</style>
```
