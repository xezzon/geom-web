import menus from '@/config/menu'
import Layout from '@/component/Layout'
import { nest } from '@/util/tree'

/**
 * @typedef {import('react-router-dom').RouteObject[] 
 * | import('@ant-design/pro-components').MenuDataItem[]} Routes
 */

/**
 * @type {Routes}
 */
const modules = import.meta.glob('/src/pages/**/*.jsx')

/**
 * @type {Routes}
 */
export const mainRoutes = nest(menus, (menus) => menus.map((menu) => {
  // 懒加载组件
  let module = undefined
  if (menu.key) {
    module = modules[`/src/pages${menu.key}.jsx`]
  } else {
    module = modules[`/src/pages${menu.path}/index.jsx`]
  }
  return {
    ...menu,
    lazy: module,
  }
}))

/**
 * @type {Routes}
 */
export const routes = [
  {
    path: '/',
    Component: Layout,
    children: mainRoutes,
  },
  {
    path: '/sign-up',
    name: '注册',
    lazy: () => import('@/pages/sign-up'),
  },
  {
    path: '/sign-in',
    name: '登录',
    lazy: () => import('@/pages/sign-in'),
  },
]