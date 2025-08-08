import type {
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
} from '@mandor-core/typings';
import type { SupportedLanguagesType } from '@mandor/locales';
import type { DeepPartial } from '@vinicunca/perkakas';

export interface AppPreferences {
  /** Access mode */
  accessMode: AccessModeType;
  /** Login and registration page layout */
  authPageLayout: AuthPageLayoutType;
  /** Check updates polling interval */
  checkUpdatesInterval: number;
  /** Enable gray mode */
  colorGrayMode: boolean;
  /** Enable color weak mode */
  colorWeakMode: boolean;
  /** Enable compact mode */
  compact: boolean;
  /** Enable content compact mode */
  contentCompact: ContentCompactType;
  /** Content compact width */
  contentCompactWidth: number;
  /** Content padding */
  contentPadding: number;
  /** Content bottom padding */
  contentPaddingBottom: number;
  /** Content left padding */
  contentPaddingLeft: number;
  /** Content right padding */
  contentPaddingRight: number;
  /** Content top padding */
  contentPaddingTop: number;
  /** Default avatar */
  defaultAvatar: string;
  /** Default homepage address */
  defaultHomePath: string;
  /** Enable dynamic title */
  dynamicTitle: boolean;
  /** Enable check updates */
  enableCheckUpdates: boolean;
  /** Show preferences */
  enablePreferences: boolean;
  /** Enable refresh token */
  enableRefreshToken: boolean;
  /** Is mobile */
  isMobile: boolean;
  /** Layout type */
  layout: LayoutType;
  /** Supported languages */
  locale: SupportedLanguagesType;
  /** Login expired mode */
  loginExpiredMode: LoginExpiredModeType;
  /** Application name */
  name: string;
  /** Preferences button position */
  preferencesButtonPosition: PreferencesButtonPositionType;
  /** Enable watermark */
  watermark: boolean;
  /** z-index */
  zIndex: number;
}

export interface BreadcrumbPreferences {
  /** Enable breadcrumb */
  enable: boolean;
  /** Hide breadcrumb when there is only one */
  hideOnlyOne: boolean;
  /** Show home icon in breadcrumb */
  showHome: boolean;
  /** Show icons in breadcrumb */
  showIcon: boolean;
  /** Breadcrumb style */
  styleType: BreadcrumbStyleType;
}

export interface CopyrightPreferences {
  /** Company name */
  companyName: string;
  /** Company site link */
  companySiteLink: string;
  /** Copyright date */
  date: string;
  /** Enable copyright */
  enable: boolean;
  /** ICP number */
  icp: string;
  /** ICP link */
  icpLink: string;
  /** Set whether the panel is displayed */
  settingShow?: boolean;
}

export interface FooterPreferences {
  /** Enable footer */
  enable: boolean;
  /** Fix footer */
  fixed: boolean;
  /** Footer height */
  height: number;
}

export interface HeaderPreferences {
  /** Enable header */
  enable: boolean;
  /** Header height */
  height: number;
  /** Hide header (CSS hidden) */
  hidden: boolean;
  /** Top bar menu position */
  menuAlign: LayoutHeaderMenuAlignType;
  /** Header display mode */
  mode: LayoutHeaderModeType;
}

export interface LogoPreferences {
  /** Enable logo */
  enable: boolean;
  /** Logo image fit mode */
  fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Logo source */
  source: string;
}

export interface NavigationPreferences {
  /** Accordion mode for navigation menu */
  accordion: boolean;
  /** Split navigation menu, only effective when layout=mixed-nav */
  split: boolean;
  /** Navigation menu style */
  styleType: NavigationStyleType;
}

export interface SidebarPreferences {
  /** Automatically activate the submenu when clicking on a directory */
  autoActivateChild: boolean;
  /** Collapse sidebar */
  collapsed: boolean;
  /** Is the sidebar collapse button visible */
  collapsedButton: boolean;
  /** Show title when sidebar is collapsed */
  collapsedShowTitle: boolean;
  /** Sidebar collapse width */
  collapseWidth: number;
  /** Enable sidebar */
  enable: boolean;
  /** Expand menu on hover */
  expandOnHover: boolean;
  /** Collapse extra area of sidebar */
  extraCollapse: boolean;
  /** Sidebar expansion area collapsed width */
  extraCollapsedWidth: number;
  /** Is the sidebar fixed button visible */
  fixedButton: boolean;
  /** Hide sidebar (CSS hidden) */
  hidden: boolean;
  /** Mixed sidebar widths */
  mixedWidth: number;
  /** Sidebar width */
  width: number;
}

export interface ShortcutKeyPreferences {
  /** Enable global shortcut keys */
  enable: boolean;
  /** Enable global lock screen shortcut key */
  globalLockScreen: boolean;
  /** Enable global logout shortcut key */
  globalLogout: boolean;
  /** Enable global preferences shortcut key */
  globalPreferences: boolean;
  /** Enable global search shortcut key */
  globalSearch: boolean;
}

export interface TabbarPreferences {
  /** Enable draggable multi-tabs */
  draggable: boolean;
  /** Enable multi-tabs */
  enable: boolean;
  /** Tab height */
  height: number;
  /** Enable tab caching */
  keepAlive: boolean;
  /** Limit the maximum number */
  maxCount: number;
  /** Whether to close the tab when clicking the middle button */
  middleClickToClose: boolean;
  /** Persist tabs */
  persist: boolean;
  /** Show tab icons */
  showIcon: boolean;
  /** Show maximize button */
  showMaximize: boolean;
  /** Show more button */
  showMore: boolean;
  /** Show refresh button */
  showRefresh: boolean;
  /** Tab style */
  styleType: TabsStyleType;
  /** Whether to enable mouse wheel response */
  wheelable: boolean;
}

export interface ThemePreferences {
  /** Built-in theme name */
  builtinType: BuiltinThemeType;
  /** Destructive color */
  colorDestructive: string;
  /** Primary color */
  colorPrimary: string;
  /** Success color */
  colorSuccess: string;
  /** Warning color */
  colorWarning: string;
  /** Current theme mode */
  mode: ThemeModeType;
  /** Border radius */
  radius: string;
  /** Enable semi-dark header (only effective when theme='light') */
  semiDarkHeader: boolean;
  /** Enable semi-dark sidebar (only effective when theme='light') */
  semiDarkSidebar: boolean;
}

export interface TransitionPreferences {
  /** Enable page transition animation */
  enable: boolean;
  // /** Enable page loading */
  loading: boolean;
  /** Page transition animation */
  name: PageTransitionType | string;
  /** Enable page loading progress animation */
  progress: boolean;
}

export interface WidgetPreferences {
  /** Enable fullscreen widget */
  fullscreen: boolean;
  /** Enable global search widget */
  globalSearch: boolean;
  /** Enable language toggle widget */
  languageToggle: boolean;
  /** Enable lock screen */
  lockScreen: boolean;
  /** Show notification widget */
  notification: boolean;
  /** Show Refresh Button */
  refresh: boolean;
  /** Show sidebar toggle widget */
  sidebarToggle: boolean;
  /** Show theme toggle widget */
  themeToggle: boolean;
}

export interface Preferences {
  /** Global configuration */
  app: AppPreferences;
  /** Breadcrumb configuration */
  breadcrumb: BreadcrumbPreferences;
  /** Copyright configuration */
  copyright: CopyrightPreferences;
  /** Footer configuration */
  footer: FooterPreferences;
  /** Header configuration */
  header: HeaderPreferences;
  /** Logo configuration */
  logo: LogoPreferences;
  /** Navigation configuration */
  navigation: NavigationPreferences;
  /** Shortcut keys configuration */
  shortcutKeys: ShortcutKeyPreferences;
  /** Sidebar configuration */
  sidebar: SidebarPreferences;
  /** Tabbar configuration */
  tabbar: TabbarPreferences;
  /** Theme configuration */
  theme: ThemePreferences;
  /** Transition configuration */
  transition: TransitionPreferences;
  /** Widget configuration */
  widget: WidgetPreferences;
}

export type PreferencesKeys = keyof Preferences;

export interface InitialOptions {
  namespace: string;
  overrides?: DeepPartial<Preferences>;
}
