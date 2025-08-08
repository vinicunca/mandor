type LayoutType
  = | 'full-content'
    | 'header-mixed-nav'
    | 'header-nav'
    | 'header-sidebar-nav'
    | 'mixed-nav'
    | 'sidebar-mixed-nav'
    | 'sidebar-nav';

type ThemeModeType = 'auto' | 'dark' | 'light';

/**
 * Preferences button position
 * fixed: Fixed on the right side
 * header: Top bar
 * auto: Automatic
 */
type PreferencesButtonPositionType = 'auto' | 'fixed' | 'header';

type BuiltinThemeType
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

type ContentCompactType = 'compact' | 'wide';

type LayoutHeaderModeType = 'auto' | 'auto-scroll' | 'fixed' | 'static';
type LayoutHeaderMenuAlignType = 'center' | 'end' | 'start';

/**
 * Login expired mode
 * modal: Modal mode
 * page: Page mode
 */
type LoginExpiredModeType = 'modal' | 'page';

/**
 * Breadcrumb style
 * background: Background
 * normal: Default
 */
type BreadcrumbStyleType = 'background' | 'normal';

/**
 * Access mode
 * backend: Backend access mode
 * frontend: Frontend access mode
 */
type AccessModeType = 'backend' | 'frontend' | 'mixed';

/**
 * Navigation style
 * plain: Plain
 * rounded: Rounded
 */
type NavigationStyleType = 'plain' | 'rounded';

/**
 * Tabs style
 * brisk: Brisk
 * card: Card
 * chrome: Chrome
 * plain: Plain
 */
type TabsStyleType = 'brisk' | 'card' | 'chrome' | 'plain';

/**
 * Page transition animation
 */
type PageTransitionType = 'fade' | 'fade-down' | 'fade-slide' | 'fade-up';

/**
 * Authentication page layout
 * panel-center: Center layout
 * panel-left: Left-aligned layout
 * panel-right: Right-aligned layout
 */
type AuthPageLayoutType = 'panel-center' | 'panel-left' | 'panel-right';

export type {
  AccessModeType,
  AuthPageLayoutType,
  BreadcrumbStyleType,
  BuiltinThemeType,
  ContentCompactType,
  LayoutHeaderMenuAlignType,
  LayoutHeaderModeType,
  LayoutType,
  LoginExpiredModeType,
  NavigationStyleType,
  PageTransitionType,
  PreferencesButtonPositionType,
  TabsStyleType,
  ThemeModeType,
};
