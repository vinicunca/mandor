import type { DeepPartial } from '@vinicunca/perkakas';

import type { InitialOptions, Preferences } from './entity.preference';
import { StorageManager } from '@mandor-core/shared/cache';

import { defu, isMacOs } from '@mandor-core/shared/utils';
import {
  breakpointsTailwind,
  useBreakpoints,
  useDebounceFn,
} from '@vueuse/core';
import { markRaw, reactive, readonly, watch } from 'vue';

import { updateCssVariables } from './css.preference';
import { defaultPreferences } from './default-config.preference';

const STORAGE_KEY = 'preferences';
const STORAGE_KEY_LOCALE = `${STORAGE_KEY}-locale`;
const STORAGE_KEY_THEME = `${STORAGE_KEY}-theme`;

export class PreferenceManager {
  private cache: null | StorageManager = null;
  private initialPreferences: Preferences = defaultPreferences;
  private isInitialized = false;
  private savePreferences: (preference: Preferences) => void;
  private state: Preferences = reactive<Preferences>({
    ...this.loadPreferences(),
  });

  constructor() {
    this.cache = new StorageManager();

    // Avoid frequent cache operations
    this.savePreferences = useDebounceFn(
      (preference: Preferences) => this._savePreferences(preference),
      150,
    );
  }

  clearCache() {
    [STORAGE_KEY, STORAGE_KEY_LOCALE, STORAGE_KEY_THEME].forEach((key) => {
      this.cache?.removeItem(key);
    });
  }

  public getInitialPreferences() {
    return this.initialPreferences;
  }

  public getPreferences() {
    return readonly(this.state);
  }

  /**
   * Override preferences
   * overrides  Preferences to be overridden
   * namespace  Namespace
   */
  public async initPreferences({ namespace, overrides }: InitialOptions) {
    // Whether it has been initialized
    if (this.isInitialized) {
      return;
    }
    // Initialize storage manager
    this.cache = new StorageManager({ prefix: namespace });
    // Merge initial preferences
    this.initialPreferences = defu({}, overrides, defaultPreferences);

    const cachedPreferences = this.loadCachedPreferences() || {};

    // Load and merge currently stored preferences
    const mergedPreference = defu(
      {},
      cachedPreferences,
      this.initialPreferences,
    );

    // Update preferences
    this.updatePreferences(mergedPreference);

    this.setupWatcher();

    this.initPlatform();
    // Mark as initialized
    this.isInitialized = true;
  }

  /**
   * Reset preferences
   * Preferences will be reset to initial values and removed from localStorage.
   *
   * @example
   * Suppose initialPreferences are { theme: 'light', language: 'en' }
   * Current state is { theme: 'dark', language: 'fr' }
   * this.resetPreferences();
   * After calling, state will be reset to { theme: 'light', language: 'en' }
   * and the corresponding items in localStorage will be removed
   */
  resetPreferences() {
    // Reset state to initial preferences
    Object.assign(this.state, this.initialPreferences);
    // Save the reset preferences
    this.savePreferences(this.state);
    // Remove preference items from storage
    [STORAGE_KEY, STORAGE_KEY_THEME, STORAGE_KEY_LOCALE].forEach((key) => {
      this.cache?.removeItem(key);
    });
    this.updatePreferences(this.state);
  }

  /**
   * Update preferences
   * @param updates - Preferences to be updated
   */
  public updatePreferences(updates: DeepPartial<Preferences>) {
    const mergedState = defu({}, updates, markRaw(this.state));

    Object.assign(this.state, mergedState);

    // Perform corresponding operations based on the updated keys
    this.handleUpdates(updates);
    this.savePreferences(this.state);
  }

  /**
   * Save preferences
   * @param preference - Preferences to be saved
   */
  private _savePreferences(preference: Preferences) {
    this.cache?.setItem(STORAGE_KEY, preference);
    this.cache?.setItem(STORAGE_KEY_LOCALE, preference.app.locale);
    this.cache?.setItem(STORAGE_KEY_THEME, preference.theme.mode);
  }

  /**
   * Handle updated keys
   * Perform corresponding operations based on the updated keys.
   * @param updates - Partially updated preferences
   */
  private handleUpdates(updates: DeepPartial<Preferences>) {
    const themeUpdates = updates.theme || {};
    const appUpdates = updates.app || {};

    if (themeUpdates && Object.keys(themeUpdates).length > 0) {
      updateCssVariables(this.state);
    }

    if (
      Reflect.has(appUpdates, 'colorGrayMode')
      || Reflect.has(appUpdates, 'colorWeakMode')
    ) {
      this.updateColorMode(this.state);
    }
  }

  private initPlatform() {
    const dom = document.documentElement;
    dom.dataset.platform = isMacOs() ? 'macOs' : 'window';
  }

  /**
   * Load preferences from cache.
   * If no corresponding preferences are found in the cache, return the default preferences.
   */
  private loadCachedPreferences() {
    return this.cache?.getItem<Preferences>(STORAGE_KEY);
  }

  /**
   * Load preferences
   * @returns Loaded preferences
   */
  private loadPreferences(): Preferences {
    return this.loadCachedPreferences() || { ...defaultPreferences };
  }

  /**
   * Watch for changes in state and system preferences.
   */
  private setupWatcher() {
    if (this.isInitialized) {
      return;
    }

    // Watch breakpoints to determine if it is a mobile device
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isMobile = breakpoints.smaller('md');

    watch(
      () => isMobile.value,
      (val) => {
        this.updatePreferences({
          app: { isMobile: val },
        });
      },
      { immediate: true },
    );

    // Watch for changes in system theme preferences
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => {
        this.updatePreferences({
          theme: { mode: isDark ? 'dark' : 'light' },
        });
      });
  }

  /**
   * Update page color mode (gray, color weak)
   * @param preference
   */
  private updateColorMode(preference: Preferences) {
    if (preference.app) {
      const { colorGrayMode, colorWeakMode } = preference.app;
      const dom = document.documentElement;
      const COLOR_WEAK = 'invert-mode';
      const COLOR_GRAY = 'grayscale-mode';

      if (colorWeakMode) {
        dom.classList.add(COLOR_WEAK);
      } else {
        dom.classList.remove(COLOR_WEAK);
      }

      if (colorGrayMode) {
        dom.classList.add(COLOR_GRAY);
      } else {
        dom.classList.remove(COLOR_GRAY);
      }
    }
  }
}

export const preferencesManager = new PreferenceManager();
