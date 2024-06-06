// DMVis imports
import { DMVisError } from '$lib/utils/DMVisError.js';
import { OriginX, OriginY } from '$lib/Enums.js';

// See origin.md for more information about these functions

// The errors are for completeness, but they never happen in practice (because of type safety)

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
      throw DMVisError(
        `Cannot assign '${sourceOrigin}' to the sourceOrigin parameter in the ${getOrigin.name} function. Please use: OriginX.Left, OriginX.Middle, OriginX.Right, OriginY.Top, OriginY.Middle, or OriginY.Bottom.`,
        'OriginMapper'
      );
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
      throw DMVisError(
        `Cannot assign '${origin}' to the origin parameter in the ${getFlippedOrigin.name} function. Please use: OriginX.Left, OriginX.Middle, OriginX.Right, OriginY.Top, OriginY.Middle, or OriginY.Bottom.`,
        'OriginMapper'
      );
  }
}

// Private helper functions for shifting origins (i.e. mapping one to another)

function mapStartToDestination(dimension: number, destinationOrigin: OriginX | OriginY): number {
  switch (destinationOrigin) {
    case OriginX.Left || OriginY.Top:
      return 0;
    case OriginX.Middle || OriginY.Middle:
      return dimension / 2;
    case OriginX.Right || OriginY.Bottom:
      return dimension;
    default:
      throw DMVisError(
        `Cannot assign '${destinationOrigin}' to the destinationOrigin parameter in the ${mapStartToDestination.name} function. Please use: OriginX.Left, OriginX.Middle, OriginX.Right, OriginY.Top, OriginY.Middle, or OriginY.Bottom.`,
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
      throw DMVisError(
        `Cannot assign '${destinationOrigin}' to the destinationOrigin parameter in the ${mapMiddleToDestination.name} function. Please use: OriginX.Left, OriginX.Middle, OriginX.Right, OriginY.Top, OriginY.Middle, or OriginY.Bottom.`,
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
      throw DMVisError(
        `Cannot assign '${destinationOrigin}' to the destinationOrigin parameter in the ${mapMiddleToDestination.name} function. Please use: OriginX.Left, OriginX.Middle, OriginX.Right, OriginY.Top, OriginY.Middle, or OriginY.Bottom.`,
        'OriginMapper'
      );
  }
}
