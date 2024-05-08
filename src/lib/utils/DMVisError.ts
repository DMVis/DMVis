export function DMVisError(
  message: string = 'Oops, something went wrong!',
  component: string = 'DMVis'
) {
  // Throw error with set parameters.
  throw new Error(`${component} - ${message}`);
}
