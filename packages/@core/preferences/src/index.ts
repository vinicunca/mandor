import type { Preferences } from './entity.preference';

import { preferencesManager } from './manager.preference';

export const preferences: Preferences = preferencesManager
  .getPreferences
  .apply(preferencesManager);

export const updatePreferences = preferencesManager
  .updatePreferences
  .bind(preferencesManager);

export const resetPreferences = preferencesManager
  .resetPreferences
  .bind(preferencesManager);

export const clearPreferencesCache = preferencesManager
  .clearCache
  .bind(preferencesManager);

export const initPreferences = preferencesManager
  .initPreferences
  .bind(preferencesManager);

export {
  preferencesManager,
};

export * from './constants.preference';
export type * from './entity.preference';
export * from './use-preferences';
