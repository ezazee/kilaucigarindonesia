import "server-only";

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Only allows http(s) URLs through (or an empty string). Rejects
 * `javascript:`/`data:`/etc, which would otherwise execute if an
 * admin-entered value is later rendered as an `href`.
 */
export function sanitizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    return ALLOWED_PROTOCOLS.has(url.protocol) ? trimmed : "";
  } catch {
    return "";
  }
}
