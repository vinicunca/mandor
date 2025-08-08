import { createHash } from 'node:crypto';

/**
 * Generate a content-based hash, with customizable length
 * @param content
 * @param hashLSize
 */
export function generatorContentHash(content: string, hashLSize?: number) {
  const hash = createHash('md5').update(content, 'utf8').digest('hex');

  if (hashLSize) {
    return hash.slice(0, hashLSize);
  }

  return hash;
}
