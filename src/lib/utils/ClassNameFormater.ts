export function formatClassName(label: string) {
  return label.replace(/[^a-zA-Z0-9]|\s/g, '');
}
