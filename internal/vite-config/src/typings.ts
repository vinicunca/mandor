import type { PluginVisualizerOptions } from 'rollup-plugin-visualizer';
import type { ConfigEnv, PluginOption, UserConfig } from 'vite';
import type { PluginOptions } from 'vite-plugin-dts';

/**
 * Conditional plugin configuration
 * @description Used to dynamically load plugins based on conditions
 */
export interface ConditionPlugin {
/**
 * Condition
 * @description Loads a plugin when the condition is true
 */
  condition?: boolean;
  /**
   * Plugin object
   * @description Returns a plugin array or Promise
   */
  plugins: () => Array<PluginOption> | PromiseLike<Array<PluginOption>>;
}

/**
 * Common plugin configuration options
 * @description Basic configuration shared by all plugins
 */
export interface CommonPluginOptions {
/**
 * Whether to enable development tools
 * @default false
 */
  devtools?: boolean;
  /**
   * Environment variables
   * @description Custom environment variables
   */
  env?: Record<string, any>;
  /**
   * Whether to inject metadata
   * @default true
   */
  injectMetadata?: boolean;
  /**
   * Is it build mode?
   * @default false
   */
  isBuild?: boolean;
  /**
   * Build mode
   * @default 'development'
   */
  mode?: string;
  /**
   * Is dependency analysis enabled?
   * @default false
   * @description Use rollup-plugin-visualizer to analyze dependencies.
   */
  visualizer?: boolean | PluginVisualizerOptions;
}

/**
 * Application plugin configuration options
 * @description Used to configure plugin options for application builds.
 */
export interface ApplicationPluginOptions extends CommonPluginOptions {
  /**
   * Whether to extract the configuration file
   * @default false
   * @description Extract the configuration file at build time
   */
  extraAppConfig?: boolean;
  /**
   * Whether to enable the HTML plugin
   * @default true
   */
  html?: boolean;
  /**
   * Whether to enable internationalization
   * @default false
   */
  i18n?: boolean;
  /**
   * Inject the app loading animation
   * @default true
   */
  injectAppLoading?: boolean;
  /**
   * Inject copyright information
   * @default true
   */
  license?: boolean;
  /** Font options */
  fonts?: FontPluginOptions;
}

/**
 * Library plugin configuration options
 * @description Used to configure plugin options when building the library
 */
export interface LibraryPluginOptions extends CommonPluginOptions {
/**
 * Whether to enable DTS output
 * @default true
 * @description Generates TypeScript type declaration files
 */
  dts?: boolean | PluginOptions;
}

/**
 * Application configuration option type
 */
type ApplicationOptions = ApplicationPluginOptions;

/**
 * Library configuration option type
 */
type LibraryOptions = LibraryPluginOptions;

/**
 * Application configuration definition function type
 * @description Used to define application build configurations
 */
export type DefineApplicationOptions = (config?: ConfigEnv) => Promise<{
/** Application plugin configuration */
  application?: ApplicationOptions;
  /** Vite configuration */
  vite?: UserConfig;
}>;

/**
 * Library configuration definition function type
 * @description Used to define library build configuration
 */
export type DefineLibraryOptions = (config?: ConfigEnv) => Promise<{
/** Library plugin configuration */
  library?: LibraryOptions;
  /** Vite configuration */
  vite?: UserConfig;
}>;

/**
 * Configuration definition type
 * @description Application or library configuration definition
 */
export type DefineConfig = DefineApplicationOptions | DefineLibraryOptions;

export interface FontPluginOptions {
  provider: 'google';
  families: Array<{
    name: string;
    weights?: Array<number> | 'fullAxis';
    italic?: boolean | 'fullAxis';
  }>;
}
