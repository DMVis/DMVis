// Types
import type { ScaleLinear as D3ScaleLinear, ScaleBand as D3ScaleBand } from 'd3';

// DMVis types
export type UndefineableString = string | undefined;
export type Opacity = number | string;
export type Position = 'left' | 'right' | 'top' | 'bottom';
export type NumberAuto = number | 'auto';
export type Theme = 'light' | 'dark';
export type Alignment = 'start' | 'end' | 'spaced';
export type Visibility = 'none' | 'alwaysVisible' | 'visibleOnHighlight';
export type Orientation = 'horizontal' | 'vertical';
export type ScaleLinear = D3ScaleLinear<number, number>;
export type ScaleBand = D3ScaleBand<string>;
export type Filter = { min: number; max: number };
