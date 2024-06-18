// Imports
import { setContext, getContext } from 'svelte';

// DMVis imports
import { StyleUtils } from '$lib/utils/StyleUtils.js';
import { VisualisationStore } from '$lib/utils/VisualisationStore.js';

interface ContextOptions {
  width?: number;
  height?: number;
  data?: Array<Array<number | string>>;
  columns?: Array<string>;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  styleUtil?: StyleUtils;
  padding?: number;
}

// Set the store values that are passed in the options
function updateVisualisationStore(store: VisualisationStore, options: ContextOptions) {
  if (options.width !== undefined) store.width.set(options.width);
  if (options.height !== undefined) store.height.set(options.height);
  if (options.data !== undefined) store.data.set(options.data);
  if (options.columns !== undefined) store.columns.set(options.columns);
  if (options.marginLeft !== undefined) store.marginLeft.set(options.marginLeft);
  if (options.marginRight !== undefined) store.marginRight.set(options.marginRight);
  if (options.marginTop !== undefined) store.marginTop.set(options.marginTop);
  if (options.marginBottom !== undefined) store.marginBottom.set(options.marginBottom);
  if (options.styleUtil !== undefined) store.styleUtil.set(options.styleUtil);
  if (options.padding !== undefined) store.padding.set(options.padding);
}

// Create a new store with the options passed in
export function setVisualisationContext(options: ContextOptions) {
  const store = new VisualisationStore();
  updateVisualisationStore(store, options);
  setContext('store', store);
}

// Update the store with the options passed in
export function updateVisualisationContext(options: ContextOptions) {
  const store = getContext<VisualisationStore>('store');
  updateVisualisationStore(store, options);
}

// Return the store values
export function getVisualisationContext() {
  // If no store is defined, return a default store
  if (getContext<VisualisationStore>('store') === undefined) {
    setVisualisationContext({});
  }
  const store = getContext<VisualisationStore>('store');
  const {
    xScales,
    yScales,
    width,
    height,
    data,
    columns,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    styleUtil,
    padding
  } = store;
  return {
    xScales,
    yScales,
    width,
    height,
    data,
    columns,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    styleUtil,
    padding
  };
}
