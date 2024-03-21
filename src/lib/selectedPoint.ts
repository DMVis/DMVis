import { writable } from 'svelte/store';

export const anyPointClicked = writable(false);
export const selectedPoint = writable('');
