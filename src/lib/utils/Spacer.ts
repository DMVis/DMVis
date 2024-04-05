import { scaleBand, scalePoint } from 'd3-scale';

export function Spacer(
  dimension: number,
  marginLow: number,
  marginHigh: number,
  length: number
): number {
  if (length < 1) {
    throw new Error('Cannot space less than 1 element');
  } else if (length === 1) {
    return (dimension - marginLow - marginHigh - 1) / 1;
  } else {
    return (dimension - marginLow - marginHigh - 1) / length;
  }
}

// Spacer that creates a 'box' per column and returns the x-coordinate of the
//  start or end (left/top or right/bottom) of this box depending on the alignment
//  useful for, for example, Tabular Visualisation
export function SpacerSide(
  dimension: number,
  marginLow: number,
  marginHigh: number,
  columns: string[],
  alignment: 'start' | 'end'
) {
  switch (alignment) {
    case 'end': {
      const sb = scaleBand()
        .domain(columns)
        .range([marginLow, dimension - marginHigh]);
      const spacer = scaleBand()
        .domain(columns)
        .range([marginLow + sb.bandwidth(), dimension - marginHigh + sb.bandwidth()]);
      return spacer;
    }
    case 'start': {
      return scaleBand()
        .domain(columns)
        .range([marginLow, dimension - marginHigh]);
    }
    default:
      throw new Error('Invalid alignment');
  }
}

// Spacer that places columns spread equally throughout the range, left-most
//  column being at the far beginning of the range and right-most column being
//  at the end of the range
export function SpacerEqual(
  dimension: number,
  marginLow: number,
  marginHigh: number,
  columns: string[]
) {
  return scalePoint()
    .domain(columns)
    .range([marginLow, dimension - marginHigh]);
}
