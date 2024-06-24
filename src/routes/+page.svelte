<script lang="ts">
  import { DataUtils } from '$lib/utils/DataUtils.js';

  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();
  const dataUtilWithId = new DataUtils(true);

  // Load promise
  $: load = (async () => {
    await dataUtil.parseData(dataUrl);
    await dataUtilWithId.parseData(dataUrl);
  })();
</script>

<div style="width: 100%; height: 100vh">
  <p>Test your visualisation.</p>
  {#await load then}
    <!-- Insert your visualisation here -->
  {/await}
</div>
