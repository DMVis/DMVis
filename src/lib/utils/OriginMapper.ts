import { OriginX, OriginY } from '$lib/Enums.js';

export function getOrigin(
  dimension: number,
  sourceOrigin: OriginX | OriginY,
  destinationOrigin: OriginX | OriginY
): number {
  // Users are expected to add (+) the result, which
  // is why the result is made negative.
  switch (sourceOrigin) {
    case OriginX.Left || OriginY.Top:
      return -mapStartToDestination(dimension, destinationOrigin);
    case OriginX.Middle || OriginY.Middle:
      return -mapMiddleToDestination(dimension, destinationOrigin);
    case OriginX.Right || OriginY.Bottom:
      return -mapEndToDestination(dimension, destinationOrigin);
    default:
      return 0;
  }
}

export function getFlippedOrigin(origin: OriginX | OriginY): OriginX | OriginY {
  switch (origin) {
    // Horizontals.
    case OriginX.Left:
      return OriginX.Right;
    case OriginX.Middle:
      return OriginX.Middle;
    case OriginX.Right:
      return OriginX.Left;
    // Verticals.
    case OriginY.Top:
      return OriginY.Bottom;
    case OriginY.Middle:
      return OriginY.Middle;
    case OriginY.Bottom:
      return OriginY.Top;
  }
}

function mapStartToDestination(dimension: number, destinationOrigin: OriginX | OriginY): number {
  switch (destinationOrigin) {
    case OriginX.Left || OriginY.Top:
      return 0;
    case OriginX.Middle || OriginY.Middle:
      return dimension / 2;
    case OriginX.Right || OriginY.Bottom:
      return dimension;
    default:
      return 0;
  }
}

function mapMiddleToDestination(dimension: number, destinationOrigin: OriginX | OriginY): number {
  switch (destinationOrigin) {
    case OriginX.Left || OriginY.Top:
      return -dimension / 2;
    case OriginX.Middle || OriginY.Middle:
      return 0;
    case OriginX.Right || OriginY.Bottom:
      return dimension / 2;
    default:
      return 0;
  }
}

function mapEndToDestination(dimension: number, destinationOrigin: OriginX | OriginY): number {
  switch (destinationOrigin) {
    case OriginX.Left || OriginY.Top:
      return -dimension;
    case OriginX.Middle || OriginY.Middle:
      return -dimension / 2;
    case OriginX.Right || OriginY.Bottom:
      return 0;
    default:
      return 0;
  }
}
