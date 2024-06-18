<script lang="ts">
  // Imports
  import { onMount } from 'svelte';

  // DMVis imports
  import Filter from '$lib/components/base/Filter.svelte';
  import Scrollable from '$lib/components/base/Scrollable.svelte';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import { getVisualisationContext } from '$lib/utils/Context.js';

  // Optional attributes
  export let isScrollable: boolean = false;
  export let showFilter: DataUtils | null = null;

  // Handle errors
  let isError = false;
  let errorMessage = '';

  onMount(() => {
    // Global Error Listener for Uncaught Exceptions
    window.onerror = function (message) {
      errorMessage = message.toString();
      isError = true;
    };

    // Global Error Listener for Unhandled Promise Rejections
    window.onunhandledrejection = function (event) {
      errorMessage = event.reason.toString();
      isError = true;
    };
  });

  // Get and set the size of the visualisation
  let { width, height } = getVisualisationContext();
  let originalWidth = $width;
  let originalHeight = $height;

  // Update the size of the visualisation
  function updateSize() {
    $width = visualisationRef?.parentElement?.clientWidth || 1000;
    $height = visualisationRef?.parentElement?.clientHeight || 1000;
  }

  let visualisationRef: HTMLDivElement;
  onMount(() => {
    if (!isScrollable) {
      window.addEventListener('resize', () => updateSize());
      updateSize();
    } else {
      $width = originalWidth;
      $height = originalHeight;
    }
  });

  // Reactive updates for updating the size
  $: {
    if (isScrollable) {
      $width = originalWidth;
      $height = originalHeight;
    } else {
      updateSize();
    }
  }
</script>

<!--
@component
### BaseVisualisation
The Base Visualisation component is a wrapper component that handles a few default tasks for your visualisation.
Certain styling standards are set and error handling is kept within the scope of the visualisation.

#### Optional Attributes
* isScrollable: boolean     - Whether the component that is wrapped by the `BaseVisualisation`
                              component should be scrollable.
                              Defaults to `false`.
* scrollableWidth: number   - The width of the visualisation that is shown. For this to be used,
                             `isScrollable` must be set to `true`.
                              Defaults to `'100%'`.
* scrollableHeight: number  - The height of the visualisation that is shown. For this to be used,
                             `isScrollable` must be set to `true`.
                              Defaults to `'100%'`.
* showFilter: DataUtils     - Whether to show and use the `Filter` component within a visualisation
                              using an instance of DataUtils.
                              Defaults to `null`.

#### Slots
* Visualisation             - Slot for the visualisation.
 -->

{#key $height || $width}
  <div class="visualisation-container" bind:this={visualisationRef}>
    {#if isScrollable}
      <Scrollable width="100%" height="100%">
        {#if isError}
          <div class="error">
            <h1>Something went wrong.</h1>
            <h2>The following error occured:</h2>
            <p>{errorMessage}</p>
          </div>
        {:else}
          <div class="visualisation-base" style="width: fit-content">
            <slot>
              <em>Please provide a visualisation component.</em>
            </slot>
          </div>
        {/if}
      </Scrollable>
    {:else if isError}
      <div class="error">
        <h1>Something went wrong.</h1>
        <h2>The following error occured:</h2>
        <p>{errorMessage}</p>
      </div>
    {:else}
      <div class="visualisation-base" style="width: 100%">
        <slot>
          <em>Please provide a visualisation component.</em>
        </slot>
      </div>
    {/if}
    {#if showFilter}
      <Filter dataUtil={showFilter} />
    {/if}
  </div>
{/key}

<style>
  .visualisation-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
  }

  .visualisation-base {
    overflow-y: auto;
    overflow-x: auto;
    display: flex;
    flex-wrap: nowrap;
    position: relative;
  }

  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: Verdana, Geneva, sans-serif !important;
    padding: '8px';
  }

  .error * {
    margin: 4px 0px;
  }

  /* This gets rid of the outlines that are added because of ARIA across all exported components */
  :global(:focus) {
    outline: none;
  }
</style>
