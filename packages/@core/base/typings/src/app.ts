export type LayoutType
  = | 'full-content'
    | 'header-mixed-nav'
    | 'header-nav'
    | 'header-sidebar-nav'
    | 'mixed-nav'
    | 'sidebar-mixed-nav'
    | 'sidebar-nav';

export type ThemeModeType = 'auto' | 'dark' | 'light';

/**
 * Preferences button position
 * fixed: Fixed on the right side
 * header: Top bar
 * auto: Automatic
 */
export type PreferencesButtonPositionType = 'auto' | 'fixed' | 'header';

export type BuiltinThemeType
  = | 'custom'
    | 'deep-blue'
    | 'deep-green'
    | 'default'
    | 'gray'
    | 'green'
    | 'neutral'
    | 'orange'
    | 'pink'
    | 'red'
    | 'rose'
    | 'sky-blue'
    | 'slate'
    | 'stone'
    | 'violet'
    | 'yellow'
    | 'zinc'
    | (Record<never, never> & string);

export type ContentCompactType = 'compact' | 'wide';

export type LayoutHeaderModeType = 'auto' | 'auto-scroll' | 'fixed' | 'static';
export type LayoutHeaderMenuAlignType = 'center' | 'end' | 'start';

/**
 * Login expired mode
 * modal: Modal mode
 * page: Page mode
 */
export type LoginExpiredModeType = 'modal' | 'page';

/**
 * Breadcrumb style
 * background: Background
 * normal: Default
 */
export type BreadcrumbStyleType = 'background' | 'normal';

/**
 * Access mode
 * backend: Backend access mode
 * frontend: Frontend access mode
 */
export type AccessModeType = 'backend' | 'frontend' | 'mixed';

/**
 * Navigation style
 * plain: Plain
 * rounded: Rounded
 */
export type NavigationStyleType = 'plain' | 'rounded';

/**
 * Tabs style
 * brisk: Brisk
 * card: Card
 * chrome: Chrome
 * plain: Plain
 */
export type TabsStyleType = 'brisk' | 'card' | 'chrome' | 'plain';

/**
 * Page transition animation
 */
export type PageTransitionType = 'fade' | 'fade-down' | 'fade-slide' | 'fade-up';

/**
 * Authentication page layout
 * panel-center: Center layout
 * panel-left: Left-aligned layout
 * panel-right: Right-aligned layout
 */
export type AuthPageLayoutType = 'panel-center' | 'panel-left' | 'panel-right';
