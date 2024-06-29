import type { RouteRecordRaw } from 'vue-router';

import { $t } from '@vben/locales/helper';

import { BasicLayout, IFrameView } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('page.demos.title'),
    },
    name: 'Demos',
    path: '/demos',
    redirect: '/demos/fallback/403',
    children: [
      {
        meta: {
          icon: 'mdi:lightbulb-error-outline',
          title: $t('page.demos.fallback.title'),
        },
        name: 'FallbackLayout',
        path: '/fallback',
        redirect: '/fallback/403',
        children: [
          {
            name: 'Fallback403',
            path: '403',
            component: () =>
              import('#/views/_essential/fallback/forbidden.vue'),
            meta: {
              icon: 'mdi:do-not-disturb-alt',
              title: '403',
            },
          },
          {
            name: 'Fallback404',
            path: '404',
            component: () =>
              import('#/views/_essential/fallback/not-found.vue'),
            meta: {
              icon: 'mdi:table-off',
              title: '404',
            },
          },
          {
            name: 'Fallback500',
            path: '500',
            component: () =>
              import('#/views/_essential/fallback/internal-error.vue'),
            meta: {
              icon: 'mdi:server-network-off',
              title: '500',
            },
          },
          {
            name: 'FallbackOffline',
            path: 'offline',
            component: () => import('#/views/_essential/fallback/offline.vue'),
            meta: {
              icon: 'mdi:offline',
              title: $t('fallback.offline'),
            },
          },
        ],
      },
      {
        meta: {
          icon: 'ic:round-settings-input-composite',
          title: $t('page.demos.outside.title'),
        },
        name: 'Outside',
        path: '/outside',
        redirect: '/outside/iframe',
        children: [
          {
            name: 'iframe',
            path: 'iframe',
            meta: {
              icon: 'mdi:newspaper-variant-outline',
              title: $t('page.demos.outside.embedded'),
            },
            redirect: '/outside/iframe/vue-document',
            children: [
              {
                name: 'VueDocument',
                path: 'vue-document',
                component: IFrameView,
                meta: {
                  icon: 'logos:vue',
                  iframeSrc: 'https://cn.vuejs.org/',
                  keepAlive: true,
                  title: 'Vue',
                },
              },
              {
                name: 'Tailwindcss',
                path: 'tailwindcss',
                component: IFrameView,
                meta: {
                  icon: 'devicon:tailwindcss',
                  iframeSrc: 'https://tailwindcss.com/',
                  // keepAlive: true,
                  title: 'Tailwindcss',
                },
              },
            ],
          },
          {
            name: 'ExternalLink',
            path: 'external-link',
            meta: {
              icon: 'mdi:newspaper-variant-multiple-outline',
              title: $t('page.demos.outside.external-link'),
            },
            redirect: '/outside/external-link/vite',
            children: [
              {
                name: 'Vite',
                path: 'vite',
                component: IFrameView,
                meta: {
                  icon: 'logos:vitejs',
                  link: 'https://vitejs.dev/',
                  title: 'Vite',
                },
              },
              {
                name: 'VueUse',
                path: 'vue-use',
                component: IFrameView,
                meta: {
                  icon: 'logos:vueuse',
                  link: 'https://vueuse.org',
                  title: 'VueUse',
                },
              },
            ],
          },
        ],
      },
      {
        meta: {
          icon: 'ic:round-menu',
          title: $t('page.demos.nested.title'),
        },
        name: 'Nested',
        path: 'nested',
        redirect: '/demos/nested/menu1',
        children: [
          {
            name: 'Menu1',
            path: 'menu1',
            component: () => import('#/views/demos/nested/menu-1.vue'),
            meta: {
              icon: 'ic:round-menu',
              keepAlive: true,
              title: $t('page.demos.nested.menu1'),
            },
          },
          {
            name: 'Menu2',
            path: 'menu2',
            meta: {
              icon: 'ic:round-menu',
              keepAlive: true,
              title: $t('page.demos.nested.menu2'),
            },
            redirect: '/nested/menu2/menu2-1',
            children: [
              {
                name: 'Menu21',
                path: 'menu2-1',
                component: () => import('#/views/demos/nested/menu-2-1.vue'),
                meta: {
                  icon: 'ic:round-menu',
                  keepAlive: true,
                  title: $t('page.demos.nested.menu21'),
                },
              },
            ],
          },
          {
            name: 'Menu3',
            path: 'menu3',
            meta: {
              icon: 'ic:round-menu',
              title: $t('page.demos.nested.menu3'),
            },
            redirect: '/nested/menu3/menu3-1',
            children: [
              {
                name: 'Menu31',
                path: 'menu3-1',
                component: () => import('#/views/demos/nested/menu-3-1.vue'),
                meta: {
                  icon: 'ic:round-menu',
                  keepAlive: true,
                  title: $t('page.demos.nested.menu31'),
                },
              },
              {
                name: 'Menu32',
                path: 'menu3-2',
                meta: {
                  icon: 'ic:round-menu',
                  title: $t('page.demos.nested.menu32'),
                },
                redirect: '/nested/menu3/menu3-2/menu3-2-1',
                children: [
                  {
                    name: 'Menu321',
                    path: 'menu3-2-1',
                    component: () =>
                      import('#/views/demos/nested/menu-3-2-1.vue'),
                    meta: {
                      icon: 'ic:round-menu',
                      keepAlive: true,
                      title: $t('page.demos.nested.menu321'),
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
