export function DMVisError(
  message: string = 'Sorry, something went wrong.',
  component: string = 'DMVis'
) {
  // Throw error with set parameters.
  throw new Error(`${component} - ${message}`);
}
