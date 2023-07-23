import { RequireAuth } from '@geom/components/RequireAuth'
import { menus2routes } from '@geom/util/menu'
import { Outlet } from 'react-router-dom'
import Layout from '@/components/Layout'
import menus from '@/config/menu'

/**
 * @typedef {import('react-router-dom').RouteObject[]
 * | import('@ant-design/pro-components').MenuDataItem[]} Routes
 */

const modules = import.meta.glob('/src/pages/**/*.jsx')

/**
 * @type {Routes}
 */
export const mainRoutes = menus2routes(menus, modules)

/**
 * @type {Routes}
 */
export const routes = [
  {
    path: '/',
    element: <RequireAuth><Layout routes={mainRoutes}><Outlet /></Layout></RequireAuth>,
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
