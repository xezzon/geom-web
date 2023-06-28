import Layout from '@geom/components/Layout'
import { menus2routes } from '@geom/util/menu'
import { Outlet } from 'react-router-dom'
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

console.debug(mainRoutes)

/**
 * @type {Routes}
 */
export const routes = [
  {
    path: '/',
    element: <Layout routes={mainRoutes}><Outlet /></Layout>,
    children: mainRoutes,
  },
]
