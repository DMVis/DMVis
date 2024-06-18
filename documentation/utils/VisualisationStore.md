# VisualisationStore

The `VisualisationStore` class is a store that manages the visualisation's properties, such as the data, dimensions, and margins. It is used to store the visualisation's properties and update them when necessary.

## Table of Contents

- [Constructor](#constructor)
- [Class Properties](#attributes)
- [Functions](#functions)
  - [getScales](#getscales)

## Constructor

The constructor does not accept any parameters, but it does set the defaults for the class properties.

## Class Properties

The class contains the following properties. They are all instances of the [Writable](https://svelte.dev/docs/svelte-store#writable) store.

- `marginTop`: Writable<number> - The margin at the top of the visualisation. Defaults to `40`.
- `marginBottom`: Writable<number> - The margin at the bottom of the visualisation. Defaults to `40`.
- `marginLeft`: Writable<number> - The margin at the left of the visualisation. Defaults to `40`.
- `marginRight`: Writable<number> - The margin at the right of the visualisation. Defaults to `40`.
- `width`: Writable<number> - The width of the visualisation. Defaults to `640`.
- `height`: Writable<number> - The height of the visualisation. Defaults to `400`.
- `padding`: Writable<number> - The padding around the visualisation. Defaults to `0.1`.
- `data`: Writable<Array<Array<number | string>>> - The data to be visualised, which is a 2D array of numbers or strings, pulled from the [DataUtils](/utils/DataUtils.md) class. Defaults to `[]`.
- `columns`: Writable<Array<string>> - The column names of the data, which can be pulled from the [DataUtils](/utils/DataUtils.md) class. Defaults to `[]`.
- `styleUtil`: Writable<StyleUtils> - An instance of the [StyleUtils](/utils/StyleUtils.md) class that is used to manage the visualisation's style. Defaults to `new StyleUtils()`.

The class also contains the following `get` properties:

- `xScales`: Array<ScaleLinear<number, number, never> | ScaleBand<string>> - The x scales for the visualisation. Calls the [`getScales`](#getscales) function.
- `yScales`: Array<ScaleLinear<number, number, never> | ScaleBand<string>> - The y scales for the visualisation. Calls the [`getScales`](#getscales) function.

## Functions

The `VisualisationStore` class only contains the `getScales` function.

### getScales

The `getScales` function returns an array of scales based on the data and the visualisation's dimensions. It takes in the following parameters:

- `data`: Array<Array<number | string>> - The data to be visualised.
- `columns`: Array<string> - The column names of the data.
- `marginLow`: number - The margin at the low end of the visualisation.
- `marginHigh`: number - The margin at the high end of the visualisation.
- `dimension`: number - The dimension of the visualisation.
- `padding`: number - The padding around the visualisation.

The function returns an array of scales based on the data and the visualisation's dimensions. The scales are either linear or band scales, depending on the data type.

Below is an example of how to use the `getScales` function:

```html
<script lang="ts">
  import { DataUtils, VisualisationStore } from '@dmvis/dmvis/utils';

  const dataUtil = new DataUtils();
  const visualisationStore = new VisualisationStore();

  // OnMount
  onMount(() => {
    (async () => {
      await dataUtil.parseJSON('/datasets/holidays-20.json');
      visualisationStore.set({ data: dataUtil.data, columns: dataUtil.columns });
      console.log(visualisationStore.xScales, visualisationStore.yScales);
    })();
  });
</script>
```
