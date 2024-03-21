export function Spacer(dimension: number, marginHigh: number, length: number): number {
  if (length < 1) {
    throw new Error('Cannot space less than 1 element');
  } else if (length === 1) {
    return (dimension - marginHigh - 1) / 1;
  } else {
    return (dimension - marginHigh - 1) / (length - 1);
  }
}
