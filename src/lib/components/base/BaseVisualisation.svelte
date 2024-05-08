<script lang="ts">
  let isError = false;
  let errorMessage = '';

  // Global Error Listener for Uncaught Exceptions
  window.onerror = function (message) {
    errorMessage = message.toString();
    isError = true;
  };
</script>

<!--
@component
### Base Visualisation
The Base Visualisation component is a wrapper component that handles a few default tasks for your visualisation. Certain styling standards
are set and error handling is kept within the scope of the visualisation.

#### Slots
* Visualisation         - Slot for the visualisation.

<!-- TODO: Set to scrollable component -->
{#if isError}
  <div class="error">
    <h1>Something went wrong.</h1>
    <h2>The following error occured:</h2>
    <p>{errorMessage}</p>
  </div>
{:else}
  <div class="visualisation">
    <slot>
      <em>Please provide a visualisation component.</em>
    </slot>
  </div>
{/if}

<style>
  .visualisation {
    overflow-y: auto;
    overflow-x: auto;
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
