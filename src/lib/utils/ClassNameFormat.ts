// Class names can't accept brackets and other fancy symbols, so remove them
export function formatClassName(name: string): string {
  // Regex to only allow letters and numbers
  return name.replace(/[^a-zA-Z0-9]/g, '');
}
