import { computed } from 'vue';

import { diff } from '@vben-core/toolkit';

import { isDarkTheme, preferencesManager } from './preferences';

function usePreferences() {
  const preferences = preferencesManager.getPreferences();
  const initialPreferences = preferencesManager.getInitialPreferences();
  /**
   * @zh_CN 计算偏好设置的变化
   */
  const diffPreference = computed(() => {
    return diff(initialPreferences, preferences);
  });

  const appPreferences = computed(() => preferences.app);

  /**
   * @zh_CN 判断是否为暗黑模式
   * @param  preferences - 当前偏好设置对象，它的主题值将被用来判断是否为暗黑模式。
   * @returns 如果主题为暗黑模式，返回 true，否则返回 false。
   */
  const isDark = computed(() => {
    return isDarkTheme(appPreferences.value.themeMode);
  });

  const theme = computed(() => {
    return isDark.value ? 'dark' : 'light';
  });

  /**
   * @zh_CN 布局方式
   */
  const layout = computed(() =>
    appPreferences.value.isMobile ? 'side-nav' : appPreferences.value.layout,
  );

  /**
   * @zh_CN 是否全屏显示content，不需要侧边、底部、顶部、tab区域
   */
  const isFullContent = computed(
    () => appPreferences.value.layout === 'full-content',
  );

  /**
   * @zh_CN 是否侧边导航模式
   */
  const isSideNav = computed(() => appPreferences.value.layout === 'side-nav');

  /**
   * @zh_CN 是否侧边混合模式
   */
  const isSideMixedNav = computed(
    () => appPreferences.value.layout === 'side-mixed-nav',
  );

  /**
   * @zh_CN 是否为头部导航模式
   */
  const isHeaderNav = computed(
    () => appPreferences.value.layout === 'header-nav',
  );

  /**
   * @zh_CN 是否为混合导航模式
   */
  const isMixedNav = computed(
    () => appPreferences.value.layout === 'mixed-nav',
  );

  /**
   * @zh_CN 是否包含侧边导航模式
   */
  const isSideMode = computed(() => {
    return isMixedNav.value || isSideMixedNav.value || isSideNav.value;
  });

  /**
   * @zh_CN 是否开启keep-alive
   * 在tabs可见以及开启keep-alive的情况下才开启
   */
  const keepAlive = computed(
    () => preferences.tabbar.enable && preferences.tabbar.keepAlive,
  );

  /**
   * @zh_CN 登录注册页面布局是否为左侧
   */
  const authPanelLeft = computed(() => {
    return appPreferences.value.authPageLayout === 'panel-left';
  });

  /**
   * @zh_CN 登录注册页面布局是否为左侧
   */
  const authPanelRight = computed(() => {
    return appPreferences.value.authPageLayout === 'panel-right';
  });

  /**
   * @zh_CN 登录注册页面布局是否为中间
   */
  const authPanelCenter = computed(() => {
    return appPreferences.value.authPageLayout === 'panel-center';
  });

  return {
    authPanelCenter,
    authPanelLeft,
    authPanelRight,
    diffPreference,
    isDark,
    isFullContent,
    isHeaderNav,
    isMixedNav,
    isSideMixedNav,
    isSideMode,
    isSideNav,
    keepAlive,
    layout,
    theme,
  };
}

export { usePreferences };
