# Context

The Visualisation Context facilitates the management and update of visualisation contexts. It provides a set of functions to set, update, and retrieve context options through a shared VisualisationStore object.

## Table of Contents

- [Interface](#interface)
- [Functions](#functions)
  - [setVisualisationContext](#setVisualisationContext)
  - [updateVisualisationContext](#updateVisualisationContext)
  - [getVisualisationContext](#getVisualisationContext)

## Interface

```typescript
interface contextOptions {
  width?: number;
  height?: number;
  data?: (number | string)[][];;
  columns?: string[];
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  styleUtil?: StyleUtils;
  padding?: number;
}
```

# Functions

## setVisualisationContext

Initialises the visualisation context with the provided options. The function takes in the following parameters:

- `options`: An object that contains the visualisation contextOptions.

An example of how to use the `setVisualisationContext` function:

```javascript
setVisualisationContext({
  width,
  height,
  data: $visualisationData,
  columns: dataUtil.columns,
  styleUtil
});
```

## updateVisualisationContext

Updates the visualisation context with the provided options. The function takes in the following parameters:

- `options`: An object that contains the visualisation contextOptions.

An example of how to use the `updateVisualisationContext` function:

```javascript
updateVisualisationContext({
  width,
  height,
  data: $visualisationData,
  columns: dataUtil.columns,
  styleUtil
});
```

## getVisualisationContext

Returns the visualisation context. The function takes in no parameters.

An example of how to use the `getVisualisationContext` function:

```javascript
const { yScales, width, marginLeft, marginRight, data, columns, styleUtil } =
  getVisualisationContext();
```
