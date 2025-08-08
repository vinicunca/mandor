import { posix } from 'node:path';

/**
 * Convert the given file path to POSIX style.
 * @param pathname - Original file path.
 */
export function toPosixPath(pathname: string) {
  return pathname.split('\\').join(posix.sep);
}
