// DMVis imports
import { DMVisError } from '$lib/utils/DMVisError.js';
import type { Origin } from '$lib/Types.js';

// Errors throughout this module only happen if a user casts a string value to the Origin type

/**
 * A function to calculate how much an x-coordinate should be offset to map one origin to another.
 * @param dimension - The dimension of the element in pixels.
 * @param sourceOrigin - The default origin of the element.
 * @param destinationOrigin - The desired origin of the element to map to from the default origin.
 * @returns The horizontal offset in pixels needed to to get the desired origin mapping effect.
 */
export function getOriginOffsetX(
  dimension: number,
  sourceOrigin: Origin,
  destinationOrigin: Origin
): number {
  // Get enum from string
  const source = extractOriginX(sourceOrigin);
  const destination = extractOriginX(destinationOrigin);
  // The extract functions error on invalid source/destination origin arguments, so a valid OriginX is guaranteeed now
  return getOriginOffset(dimension, source, destination);
}

/**
 * A function to calculate how much a y-coordinate should be offset to map one origin to another.
 * @param dimension - The dimension of the element in pixels.
 * @param sourceOrigin - The default origin of the element.
 * @param destinationOrigin - The desired origin of the element to map to from the default origin.
 * @returns The vertical offset in pixels needed to to get the desired origin mapping effect.
 */
export function getOriginOffsetY(
  dimension: number,
  sourceOrigin: Origin,
  destinationOrigin: Origin
): number {
  // Get enum from string
  const source = extractOriginY(sourceOrigin);
  const destination = extractOriginY(destinationOrigin);
  // The extract functions error on invalid source/destination origin arguments, so a valid OriginY is guaranteeed now
  return getOriginOffset(dimension, source, destination);
}

/**
 * A function to map an origin to its horizontally flipped equivalent.
 * @param origin - An origin to be flipped.
 * @returns It returns the horizontally opposite origin of the provided origin using the following mapping:
 * 'topLeft' -> 'topRight' |
 * 'topMiddle' -> 'topMiddle' |
 * 'topRight' -> 'topLeft' |
 * 'middleLeft' -> 'middleRight' |
 * 'middle' -> 'middle' |
 * 'middleRight' -> 'middleLeft' |
 * 'bottomLeft' -> 'bottomRight' |
 * 'bottomMiddle' -> 'bottomMiddle' |
 * 'bottomRight' -> 'bottomLeft'
 */
export function getFlippedOriginX(origin: Origin): Origin {
  switch (origin) {
    case 'topLeft':
      return 'topRight';
    case 'topMiddle':
      return 'topMiddle';
    case 'topRight':
      return 'topLeft';
    case 'middleLeft':
      return 'middleRight';
    case 'middle':
      return 'middle';
    case 'middleRight':
      return 'middleLeft';
    case 'bottomLeft':
      return 'bottomRight';
    case 'bottomMiddle':
      return 'bottomMiddle';
    case 'bottomRight':
      return 'bottomLeft';
    default:
      throw DMVisError(
        `Cannot assign '${origin}' to the origin parameter in the ${getFlippedOriginX.name} function. Please use: 'topLeft', 'topMiddle', 'topRight', 'middleLeft', 'middle', 'middleRight', 'bottomLeft', 'bottomMiddle', or 'bottomRight'.`,
        'OriginMapper'
      );
  }
}

/**
 * A function to map an origin to its vertically flipped equivalent.
 * @param origin - An origin to be flipped.
 * @returns It returns the horizontally opposite origin of the provided origin using the following mapping:
 * 'topLeft' -> 'bottomLeft' |
 * 'topMiddle' -> 'bottomMiddle' |
 * 'topRight' -> 'bottomRight' |
 * 'middleLeft' -> 'middleLeft' |
 * 'middle' -> 'middle' |
 * 'middleRight' -> 'middleRight' |
 * 'bottomLeft' -> 'topLeft' |
 * 'bottomMiddle' -> 'topMiddle' |
 * 'bottomRight' -> 'topRight'
 */
export function getFlippedOriginY(origin: Origin): Origin {
  switch (origin) {
    case 'topLeft':
      return 'bottomLeft';
    case 'topMiddle':
      return 'bottomMiddle';
    case 'topRight':
      return 'bottomRight';
    case 'middleLeft':
      return 'middleLeft';
    case 'middle':
      return 'middle';
    case 'middleRight':
      return 'middleRight';
    case 'bottomLeft':
      return 'topLeft';
    case 'bottomMiddle':
      return 'topMiddle';
    case 'bottomRight':
      return 'topRight';
    default:
      throw DMVisError(
        `Cannot assign '${origin}' to the origin parameter in the ${getFlippedOriginY.name} function. Please use: 'topLeft', 'topMiddle', 'topRight', 'middleLeft', 'middle', 'middleRight', 'bottomLeft', 'bottomMiddle', or 'bottomRight'.`,
        'OriginMapper'
      );
  }
}

// BELOW: Private helper functions etc. for shifting origins (i.e. mapping one to another)

// These enums are used internally to simplify the code and reduce duplication
enum OriginX {
  Left,
  Middle,
  Right
}

enum OriginY {
  Top,
  Middle,
  Bottom
}

/**
Calculates how much to shift a coordinate to get the desired origin mapping effect either
horizontally or vertically given a dimension, a source origin, and destination origin.
*/
function getOriginOffset(
  dimension: number,
  sourceOrigin: OriginX | OriginY,
  destinationOrigin: OriginX | OriginY
): number {
  // Users are expected to add (+) the result, which is why the result is made negative
  switch (sourceOrigin) {
    case OriginX.Left || OriginY.Top:
      return -mapStartToDestination(dimension, destinationOrigin);
    case OriginX.Middle || OriginY.Middle:
      return -mapMiddleToDestination(dimension, destinationOrigin);
    case OriginX.Right || OriginY.Bottom:
      return -mapEndToDestination(dimension, destinationOrigin);
    default:
      throw DMVisError(
        // Does not occur in practice
        `Cannot assign '${sourceOrigin}' to the sourceOrigin parameter in the ${getOriginOffset.name} function. Please use: OriginX.Left, OriginX.Middle, OriginX.Right, OriginY.Top, OriginY.Middle, or OriginY.Bottom.`,
        'OriginMapper'
      );
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
      throw DMVisError(
        // Does not occur in practice
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
        // Does not occur in practice
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
        // Does not occur in practice
        `Cannot assign '${destinationOrigin}' to the destinationOrigin parameter in the ${mapEndToDestination.name} function. Please use: OriginX.Left, OriginX.Middle, OriginX.Right, OriginY.Top, OriginY.Middle, or OriginY.Bottom.`,
        'OriginMapper'
      );
  }
}

// Only meant to be used by getOriginOffsetX for parsing string to enum
function extractOriginX(origin: Origin): OriginX {
  switch (origin) {
    case 'topLeft':
    case 'middleLeft':
    case 'bottomLeft':
      return OriginX.Left;
    case 'topMiddle':
    case 'middle':
    case 'bottomMiddle':
      return OriginX.Middle;
    case 'topRight':
    case 'middleRight':
    case 'bottomRight':
      return OriginX.Right;
    default:
      throw DMVisError(
        // The function name here is intentionally not extractOriginX as to not confuse users
        `Cannot assign '${origin}' to the origin parameter in the ${getOriginOffsetX.name} function. Please use: 'topLeft', 'topMiddle', 'topRight', 'middleLeft', 'middle', 'middleRight', 'bottomLeft', 'bottomMiddle', or 'bottomRight'.`,
        'OriginMapper'
      );
  }
}

// Only meant to be used by getOriginOffsetY for parsing string to enum
function extractOriginY(origin: Origin): OriginY {
  switch (origin) {
    case 'topLeft':
    case 'topMiddle':
    case 'topRight':
      return OriginY.Top;
    case 'middleLeft':
    case 'middle':
    case 'middleRight':
      return OriginY.Middle;
    case 'bottomLeft':
    case 'bottomMiddle':
    case 'bottomRight':
      return OriginY.Bottom;
    default:
      throw DMVisError(
        // The function name here is intentionally not extractOriginY as to not confuse users
        `Cannot assign '${origin}' to the origin parameter in the ${getOriginOffsetY.name} function. Please use: 'topLeft', 'topMiddle', 'topRight', 'middleLeft', 'middle', 'middleRight', 'bottomLeft', 'bottomMiddle', or 'bottomRight'.`,
        'OriginMapper'
      );
  }
}
