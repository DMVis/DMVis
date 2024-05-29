import { scaleBand, scalePoint } from 'd3-scale';

import { DMVisError } from '$lib/utils/DMVisError.js';

export function Spacer(
  dimension: number,
  marginLow: number,
  marginHigh: number,
  length: number
): number {
  if (length < 1) {
    throw DMVisError(
      `Cannot assign '${length}' to the length parameter in the ${Spacer.name} function. Please use a number larger than or equal to 1.`,
      'Spacer'
    );
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
  alignment: 'start' | 'end',
  paddingInner: number = 0,
  paddingOuter: number = 0
) {
  switch (alignment) {
    case 'end': {
      const sb = scaleBand()
        .domain(columns)
        .range([marginLow, dimension - marginHigh])
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter);
      const spacer = scaleBand()
        .domain(columns)
        .range([marginLow + sb.bandwidth(), dimension - marginHigh + sb.bandwidth()])
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter);
      return spacer;
    }
    case 'start': {
      return scaleBand()
        .domain(columns)
        .range([marginLow, dimension - marginHigh])
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter);
    }
    default:
      throw DMVisError(
        `Cannot assign '${alignment}' to the alignment parameter in the ${SpacerSide.name} function. Please use: 'start' or 'end'.`,
        'Spacer'
      );
  }
}

// Spacer that places columns spread equally throughout the range, left-most
//  column being at the far beginning of the range and right-most column being
//  at the end of the range
export function SpacerEqual(
  dimension: number,
  marginLow: number,
  marginHigh: number,
  columns: string[],
  paddingOuter: number = 0
) {
  return scalePoint()
    .domain(columns)
    .range([marginLow, dimension - marginHigh])
    .padding(paddingOuter);
}
