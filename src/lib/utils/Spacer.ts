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
