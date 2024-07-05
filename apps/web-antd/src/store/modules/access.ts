import type { MenuRecordRaw, UserInfo } from '@vben/types';
import type { LoginAndRegisterParams } from '@vben/universal-ui';
import type { RouteRecordRaw } from 'vue-router';

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { DEFAULT_HOME_PATH } from '@vben/constants';
import { useCoreAccessStore } from '@vben-core/stores';

import { defineStore } from 'pinia';

import { getUserInfo, userLogin } from '#/apis';

export const useAccessStore = defineStore('access', () => {
  const coreStoreAccess = useCoreAccessStore();
  const router = useRouter();
  const loading = ref(false);

  const accessToken = computed(() => coreStoreAccess.getAccessToken);
  const userRoles = computed(() => coreStoreAccess.getUserRoles);
  const userInfo = computed(() => coreStoreAccess.getUserInfo);
  const accessRoutes = computed(() => coreStoreAccess.getAccessRoutes);

  function setAccessMenus(menus: MenuRecordRaw[]) {
    coreStoreAccess.setAccessMenus(menus);
  }

  function setAccessRoutes(routes: RouteRecordRaw[]) {
    coreStoreAccess.setAccessRoutes(routes);
  }

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */
  async function authLogin(
    params: LoginAndRegisterParams,
    onSuccess?: () => Promise<void>,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    let userInfo: UserInfo | null = null;
    try {
      loading.value = true;
      const { accessToken, refreshToken } = await userLogin(params);

      // 如果成功获取到 accessToken
      // If accessToken is successfully obtained
      if (accessToken) {
        // 将 accessToken 存储到 accessStore 中
        // Store the accessToken in accessStore
        coreStoreAccess.setAccessToken(accessToken);
        coreStoreAccess.setRefreshToken(refreshToken);

        // 获取用户信息并存储到 accessStore 中
        // Get user information and store it in accessStore
        userInfo = await fetchUserInfo();

        coreStoreAccess.setUserInfo(userInfo);

        onSuccess
          ? await onSuccess?.()
          : await router.push(userInfo.homePath || DEFAULT_HOME_PATH);
      }
    } finally {
      loading.value = false;
    }

    return {
      accessToken,
      userInfo,
    };
  }

  async function fetchUserInfo() {
    let userInfo: UserInfo | null = null;
    userInfo = await getUserInfo();
    coreStoreAccess.setUserInfo(userInfo);
    return userInfo;
  }

  function reset() {
    coreStoreAccess.$reset();
  }

  return {
    accessRoutes,
    accessToken,
    authLogin,
    fetchUserInfo,
    loading,
    reset,
    setAccessMenus,
    setAccessRoutes,
    userInfo,
    userRoles,
  };
});
