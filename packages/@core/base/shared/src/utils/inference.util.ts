/**
 * Check if the current environment is Mac OS.
 *
 * This function checks the navigator.userAgent string to determine the current environment.
 * If the userAgent string contains "macintosh" or "mac os x" (case insensitive), the current environment is considered to be Mac OS.
 *
 * @returns Returns true if the current environment is Mac OS, otherwise returns false.
 */
function isMacOs(): boolean {
  const macRegex = /macintosh|mac os x/i;
  return macRegex.test(navigator.userAgent);
}

/**
 * Check whether the current operating environment is Windows OS.
 *
 * This function determines the current operating environment by checking the navigator.userAgent string.
 * If the userAgent string contains "windows" or "win32" (case insensitive), the current environment is considered to be Windows OS.
 *
 * @returns If the current environment is Windows OS, returns true, otherwise returns false.
 */
function isWindowsOs(): boolean {
  const windowsRegex = /windows|win32/i;
  return windowsRegex.test(navigator.userAgent);
}

/**
 * Checks if the given string is a valid HTTP or HTTPS URL.
 *
 * @param url The string to check.
 * @return Returns true if the string is a valid HTTP or HTTPS URL, otherwise returns false.
 */
function isHttpUrl(url?: string): boolean {
  if (!url) {
    return false;
  }

  const httpRegex = /^https?:\/\/.*$/;
  return httpRegex.test(url);
}

export {
  isHttpUrl,
  isMacOs,
  isWindowsOs,
};
