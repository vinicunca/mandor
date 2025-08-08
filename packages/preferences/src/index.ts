import type { Preferences } from '@mandor-core/preferences';
import type { DeepPartial } from '@vinicunca/perkakas';

/**
 * If we want all apps to use the same default preferences,
 * we can define them here instead of modifying
 * the default preferences in @mandor-core/preferences
 */
export function defineOverridesPreferences(preferences: DeepPartial<Preferences>) {
  return preferences;
}

export * from '@mandor-core/preferences';
