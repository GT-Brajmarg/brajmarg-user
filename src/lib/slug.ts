/**
 * Convert a string into a URL-safe slug.
 * "Shri Bankey Bihari Temple" -> "shri-bankey-bihari-temple"
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
