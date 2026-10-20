/** Resolve a public asset or page beneath Vite's configured site base. */
export function sitePath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
