import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/mrzh',
  component: Layout,
  redirect: '/mrzh/index',
  name: 'mrzh',
  meta: {
    title: '明日之后',
    icon: 'heroicons-solid:fire',
  },
  children: [
    {
      path: 'market',
      name: 'mrzh_market',
      component: () => import('@/views/mrzh/market.vue'),
      meta: {
        title: '市场工具',
      },
    },
  ],
}

export default routes
