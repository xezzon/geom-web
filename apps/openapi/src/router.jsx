import { menus2routes } from '@geom/util/menu'
import { Outlet } from 'react-router-dom'
import Layout from '@/components/Layout'
import menus from '@/config/menu'
import NewGroupPage from './pages/group/NewGroupPage'
import { GroupProvider } from './components/GroupContext'

/**
 * @typedef {import('react-router-dom').RouteObject[]
 * | import('@ant-design/pro-components').MenuDataItem[]} Routes
 */

const modules = import.meta.glob('/src/pages/**/*.jsx')

/**
 * @type {Routes}
 * @deprecated
 */
export const mainRoutes = menus2routes(menus, modules)

/**
 * @type {Routes}
 * @deprecated
 */
export const routes = [
  {
    path: '/group/new',
    element: <NewGroupPage />,
  },
  {
    path: '/',
    element: (
      <GroupProvider>
        <Layout routes={mainRoutes}>
          <Outlet />
        </Layout>
      </GroupProvider>
    ),
    children: mainRoutes,
  },
]
