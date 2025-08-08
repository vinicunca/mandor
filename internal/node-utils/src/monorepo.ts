import { dirname } from 'node:path';

import {
  getPackages as getPackagesFunc,
  getPackagesSync as getPackagesSyncFunc,
} from '@manypkg/get-packages';
import { findUpSync } from 'find-up';

/**
 * Find the root directory of the monorepo
 * @param cwd
 */
export function findMonorepoRoot(cwd: string = process.cwd()) {
  const lockFile = findUpSync('pnpm-lock.yaml', {
    cwd,
    type: 'file',
  });
  return dirname(lockFile || '');
}

/**
 * Get all packages in the monorepo (sync)
 */
export function getPackagesSync() {
  const root = findMonorepoRoot();
  return getPackagesSyncFunc(root);
}

/**
 * Get all packages in the monorepo (async)
 */
export async function getPackages() {
  const root = findMonorepoRoot();

  return await getPackagesFunc(root);
}

/**
 * Get a specific package in the monorepo
 */
export async function getPackage(pkgName: string) {
  const { packages } = await getPackages();
  return packages.find((pkg) => pkg.packageJson.name === pkgName);
}
