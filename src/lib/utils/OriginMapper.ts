// DMVis imports
import { OriginX, OriginY } from '$lib/Enums.js';
import { ThrowError } from '$lib/utils/ThrowError.js';

// See origin.md for more information about these functions

// The error are for completeness, but the errors never happen in practice (because of type safety)

/**
Calculates and returns a new origin (i.e. how much to shift a coordinate)
given a dimension, a source origin, and destination origin.
*/
export function getOrigin(
  dimension: number,
  sourceOrigin: OriginX | OriginY,
  destinationOrigin: OriginX | OriginY
): number {
  // Users are expected to add (+) the result, which
  // is why the result is made negative
  switch (sourceOrigin) {
    case OriginX.Left || OriginY.Top:
      return -mapStartToDestination(dimension, destinationOrigin);
    case OriginX.Middle || OriginY.Middle:
      return -mapMiddleToDestination(dimension, destinationOrigin);
    case OriginX.Right || OriginY.Bottom:
      return -mapEndToDestination(dimension, destinationOrigin);
    default:
      throw ThrowError('Error', `${sourceOrigin} is not a valid source origin`, 'OriginMapper');
  }
}

/**
Returns the opposite origin of a given origin.
*/
export function getFlippedOrigin(origin: OriginX | OriginY): OriginX | OriginY {
  switch (origin) {
    // Horizontals
    case OriginX.Left:
      return OriginX.Right;
    case OriginX.Middle:
      return OriginX.Middle;
    case OriginX.Right:
      return OriginX.Left;
    // Verticals
    case OriginY.Top:
      return OriginY.Bottom;
    case OriginY.Middle:
      return OriginY.Middle;
    case OriginY.Bottom:
      return OriginY.Top;
    default:
      throw ThrowError('Error', `${origin} is not a valid origin`, 'OriginMapper');
  }
}

// Helper functions for shifting origins (i.e. mapping one to another)

function mapStartToDestination(dimension: number, destinationOrigin: OriginX | OriginY): number {
  switch (destinationOrigin) {
    case OriginX.Left || OriginY.Top:
      return 0;
    case OriginX.Middle || OriginY.Middle:
      return dimension / 2;
    case OriginX.Right || OriginY.Bottom:
      return dimension;
    default:
      throw ThrowError(
        'Error',
        `${destinationOrigin} is not a valid destination origin`,
        'OriginMapper'
      );
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
      throw ThrowError(
        'Error',
        `${destinationOrigin} is not a valid destination origin`,
        'OriginMapper'
      );
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
      throw ThrowError(
        'Error',
        `${destinationOrigin} is not a valid destination origin`,
        'OriginMapper'
      );
  }
}
