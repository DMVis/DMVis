<script lang="ts">
  import Filter from '$lib/components/base/Filter.svelte';
  import Scrollable from './Scrollable.svelte';
  import type { DataUtils } from '$lib/utils/DataUtils.js';

  export let isScrollable: boolean = false;
  export let scrollableWidth: number | string = '100%';
  export let scrollableHeight: number | string = '100%';
  export let showFilter: DataUtils | null = null;

  let isError = false;
  let errorMessage = '';

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
</script>

<!--
@component
### Base Visualisation
The Base Visualisation component is a wrapper component that handles a few default tasks for your visualisation. Certain styling standards
are set and error handling is kept within the scope of the visualisation.

#### Optional Attributes
* isScrollable: boolean                   - Whether the component that is wrapped by the `BaseVisualisation`
                                            component should be scrollable. Defaulted to `false`.
* scrollableWidth: number                 - Width of the visualisation that is shown. For this to be used,
                                            `isScrollable` must be set to `true`. Defaulted to `1000`.
* scrollableHeight: number                - Height of the visualisation that is shown. For this to be used,
                                            `isScrollable` must be set to `true`. Defaulted to `1000`.
* showFilter: DataUtils                   - Provide a DataUtils object when you want to show and use the
                                            `Filter` component within the visualisation.

#### Slots
* Visualisation         - Slot for the visualisation.
 -->

<div class="visualisation-container">
  {#if isScrollable}
    <Scrollable width={scrollableWidth} height={scrollableHeight}>
      {#if isError}
        <div class="error">
          <h1>Something went wrong.</h1>
          <h2>The following error occured:</h2>
          <p>{errorMessage}</p>
        </div>
      {:else}
        <div class="visualisation-base">
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
    <div class="visualisation-base">
      <slot>
        <em>Please provide a visualisation component.</em>
      </slot>
    </div>
  {/if}
  {#if showFilter}
    <Filter dataUtil={showFilter} />
  {/if}
</div>

<style>
  .visualisation-container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .visualisation-base {
    overflow-y: auto;
    overflow-x: auto;
    display: flex;
    flex-wrap: nowrap;
    width: fit-content;
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
