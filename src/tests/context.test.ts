// Imports
import { get } from 'svelte/store';
import { setContext, getContext } from 'svelte';
import { describe, it, expect, beforeEach, vi, type MockedFunction } from 'vitest';

// DMVis imports
import { StyleUtils } from '$lib/utils/StyleUtils.js';
import { VisualisationStore } from '$lib/store.js';
import {
  setVisualisationContext,
  updateVisualisationContext,
  getVisualisationContext
} from '$lib/context.js';

vi.mock('svelte', () => ({
  setContext: vi.fn(),
  getContext: vi.fn()
}));

describe('VisualisationContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set visualisation context correctly', () => {
    // Arrange
    const options = {
      width: 100,
      height: 200,
      data: [
        [1, 2, 3],
        [4, 5, 6]
      ],
      columns: ['a', 'b', 'c'],
      marginLeft: 10,
      marginRight: 20,
      marginTop: 30,
      marginBottom: 40,
      styleUtil: new StyleUtils(),
      padding: 5
    };

    // Act
    setVisualisationContext(options);

    // Assert
    const setContextMock = setContext as MockedFunction<typeof setContext>;
    expect(setContextMock).toHaveBeenCalledWith('store', expect.any(VisualisationStore));

    const store = setContextMock.mock.calls[0][1] as VisualisationStore;
    const {
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
    expect(get(width)).toBe(100);
    expect(get(height)).toBe(200);
    expect(get(data)).toEqual([
      [1, 2, 3],
      [4, 5, 6]
    ]);
    expect(get(columns)).toEqual(['a', 'b', 'c']);
    expect(get(marginLeft)).toBe(10);
    expect(get(marginRight)).toBe(20);
    expect(get(marginTop)).toBe(30);
    expect(get(marginBottom)).toBe(40);
    expect(get(styleUtil)).toEqual(new StyleUtils());
    expect(get(padding)).toBe(5);
  });

  it('should update visualisation context correctly', () => {
    // Arrange
    const store = new VisualisationStore();
    const getContextMock = getContext as MockedFunction<typeof getContext>;
    getContextMock.mockReturnValue(store);

    const options = {
      width: 150,
      height: 250,
      data: [
        [1, 2, 3],
        [4, 5, 6]
      ],
      columns: ['x', 'y', 'z'],
      marginLeft: 15,
      marginRight: 25,
      marginTop: 35,
      marginBottom: 45,
      styleUtil: new StyleUtils(),
      padding: 10
    };

    // Act
    updateVisualisationContext(options);

    // Assert
    const {
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

    expect(getContextMock).toHaveBeenCalledWith('store');
    expect(get(width)).toBe(150);
    expect(get(height)).toBe(250);
    expect(get(data)).toEqual([
      [1, 2, 3],
      [4, 5, 6]
    ]);
    expect(get(columns)).toEqual(['x', 'y', 'z']);
    expect(get(marginLeft)).toBe(15);
    expect(get(marginRight)).toBe(25);
    expect(get(marginTop)).toBe(35);
    expect(get(marginBottom)).toBe(45);
    expect(get(styleUtil)).toEqual(new StyleUtils());
    expect(get(padding)).toBe(10);
  });

  it('should get visualisation context correctly', () => {
    // Arrange
    const store = new VisualisationStore();
    store.width.set(200);
    store.height.set(300);
    store.data.set([
      [1, 2, 3],
      [4, 5, 6]
    ]);
    store.columns.set(['a', 'b', 'c']);
    store.marginLeft.set(10);
    store.marginRight.set(20);
    store.marginTop.set(30);
    store.marginBottom.set(40);
    store.styleUtil.set(new StyleUtils());
    store.padding.set(5);

    const getContextMock = getContext as MockedFunction<typeof getContext>;
    getContextMock.mockReturnValue(store);

    // Act
    const context = getVisualisationContext();

    // Assert
    expect(get(context.width)).toBe(200);
    expect(get(context.height)).toBe(300);
    expect(get(context.data)).toEqual([
      [1, 2, 3],
      [4, 5, 6]
    ]);
    expect(get(context.columns)).toEqual(['a', 'b', 'c']);
    expect(get(context.marginLeft)).toBe(10);
    expect(get(context.marginRight)).toBe(20);
    expect(get(context.marginTop)).toBe(30);
    expect(get(context.marginBottom)).toBe(40);
    expect(get(context.styleUtil)).toEqual(new StyleUtils());
    expect(get(context.padding)).toBe(5);
  });
});
