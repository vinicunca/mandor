interface OpenWindowOptions {
  noopener?: boolean;
  noreferrer?: boolean;
  target?: '_blank' | '_parent' | '_self' | '_top' | string;
}

/**
 * Open a URL in a new window.
 *
 * @param url - The URL to open.
 * @param options - Options for opening the window.
 */
export function openWindow(
  { url, options = {} }: { url: string; options?: OpenWindowOptions },
): void {
  const {
    noopener = true,
    noreferrer = true,
    target = '_blank',
  } = options;

  const features = [noopener && 'noopener=yes', noreferrer && 'noreferrer=yes']
    .filter(Boolean)
    .join(',');

  window.open(url, target, features);
}

/**
 * Open a route in a new window.
 */
export function openRouteInNewWindow(path: string) {
  const { hash, origin } = location;
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${origin}${hash ? '/#' : ''}${fullPath}`;
  openWindow({ url, options: { target: '_blank' } });
}
