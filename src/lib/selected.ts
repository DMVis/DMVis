import { writable } from 'svelte/store';

//Used for highlighting the current x and y label in the scatterplot matrix
export const hoveredXLabel = writable('');
export const hoveredYLabel = writable('');

//Used to highlight a point in every single scatterplot in the scartterplot matrix
export const anyPointClicked = writable(false);
export const selectedPoint = writable('');
