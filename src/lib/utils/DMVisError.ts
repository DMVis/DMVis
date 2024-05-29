export function DMVisError(
  message: string = 'Sorry, something went wrong.',
  component: string = 'DMVis'
) {
  // Throw error with set parameters
  // Note that an em dash (—) is used instead of a regular dash (-) to separate extra information
  throw new Error(`${component} — ${message}`);
}
