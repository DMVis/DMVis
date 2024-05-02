export function generateBuckets(
  data: Array<number> | Array<string>
): Array<Array<number>> | Array<Array<string>> {
  const length = data.length;
  return [[length]];
}
