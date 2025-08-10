import type {
  ContentCompactType,
  LayoutHeaderModeType,
  LayoutType,
  ThemeModeType,
} from '@mandor-core/typings';

export interface MandorLayoutProps {
  /**
   * Fixed width for the content area
   * @default 'wide'
   */
  contentCompact?: ContentCompactType;
  /**
   * Width for fixed layout
   * @default 1200
   */
  contentCompactWidth?: number;
  /**
   * Padding
   * @default 16
   */
  contentPadding?: number;
  /**
   * Padding bottom
   * @default 16
   */
  contentPaddingBottom?: number;
  /**
   * Padding left
   * @default 16
   */
  contentPaddingLeft?: number;
  /**
   * Padding right
   * @default 16
   */
  contentPaddingRight?: number;
  /**
   * Padding top
   * @default 16
   */
  contentPaddingTop?: number;
  /**
   * Whether the footer is visible
   * @default false
   */
  footerEnable?: boolean;
  /**
   * Whether the footer is fixed
   * @default true
   */
  footerFixed?: boolean;
  /**
   * Footer height
   * @default 32
   */
  footerHeight?: number;
  /**
   * Header height
   * @default 48
   */
  headerHeight?: number;
  /**
   * Whether the top bar is hidden
   * @default false
   */
  headerHidden?: boolean;
  /**
   * Header display mode
   * @default 'fixed'
   */
  headerMode?: LayoutHeaderModeType;
  /**
   * Header theme
   */
  headerTheme?: ThemeModeType;
  /**
   * Whether to show the button to toggle the sidebar in the header
   * @default
   */
  headerToggleSidebarButton?: boolean;
  /**
   * Whether the header is visible
   * @default true
   */
  headerVisible?: boolean;
  /**
   * Whether to display on mobile
   * @default false
   */
  isMobile?: boolean;
  /**
   * Layout type
   * sidebar-nav: Sidebar menu layout
   * header-nav: Top menu layout
   * mixed-nav: Sidebar & top menu layout
   * sidebar-mixed-nav: Sidebar mixed menu layout
   * full-content: Full screen content layout
   * @default sidebar-nav
   */
  layout?: LayoutType;
  /**
   * Sidebar collapse state
   * @default false
   */
  sidebarCollapse?: boolean;
  /**
   * Whether to show the button to collapse the sidebar
   * @default true
   */
  sidebarCollapsedButton?: boolean;
  /**
   * Whether to show the title when the sidebar is collapsed
   * @default true
   */
  sidebarCollapseShowTitle?: boolean;
  /**
   * Whether the sidebar is enabled
   * @default true
   */
  sidebarEnable?: boolean;
  /**
   * Extra width when the sidebar is collapsed
   * @default 48
   */
  sidebarExtraCollapsedWidth?: number;
  /**
   * Wether the side menu collapse button is fixed
   * @default true
   */
  sidebarFixedButton?: boolean;
  /**
   * Whether the sidebar is hidden
   * @default false
   */
  sidebarHidden?: boolean;
  /**
   * Width of the mixed sidebar
   * @default 80
   */
  sidebarMixedWidth?: number;
  /**
   * Sidebar theme
   * @default dark
   */
  sidebarTheme?: ThemeModeType;
  /**
   * Sidebar width
   * @default 210
   */
  sidebarWidth?: number;
  /**
   * Sidebar collapse width
   * @default 48
   */
  sideCollapseWidth?: number;
  /**
   * Whether the tab bar is enabled
   * @default true
   */
  tabbarEnable?: boolean;
  /**
   * Tab bar height
   * @default 30
   */
  tabbarHeight?: number;
  /**
   * zIndex
   * @default 200
   */
  zIndex?: number;
}
