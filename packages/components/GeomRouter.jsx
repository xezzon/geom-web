/**
 * @typedef {import('react-router-dom').RouteObject[]
* | import('@ant-design/pro-components').MenuDataItem[]} Routes
*/
import {
  createContext, createElement, useContext, useEffect, useMemo, useState,
} from 'react'
import { Icon } from '@iconify/react'
import { nest } from '@geom/util/tree'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Skeleton } from 'antd'
import { adminClient } from '@/api'

const modules = import.meta.glob(`/src/pages/**/*.jsx`)
const MenuContext = createContext(null)

/**
   * @param {Routes} menus
   * @returns {Routes}
   */
function menus2routes(menus) {
  const pagePath = '/src/pages'

  return nest(menus, (menus) => menus.map((menu) => {
    // 懒加载组件
    let module
    if (menu.component) {
      module = modules[`${pagePath}${menu.component}.jsx`]
    } else {
      module = modules[`${pagePath}${menu.fullPath}/index.jsx`]
    }
    // 图标
    let icon = createElement('span')
    if (menu.icon) {
      icon = createElement(Icon, { icon: menu.icon })
    }
    return {
      ...menu,
      lazy: module,
      icon,
    }
  }))
}

/**
 * @returns {{menus: Routes}}
 */
function useMenu() {
  return useContext(MenuContext)
}

/**
 *
 * @param {{ staticRoutes: import('react-router-dom').RouteObject[] }} param0
 * @returns
 */
function GeomRouter({ children, staticRoutes }) {
  const [menus, setMenus] = useState(/** @type {Routes} */([]))
  const [loading, setLoading] = useState(true)

  const fetchMenuTree = () => {
    setLoading(true)
    adminClient.menuTree()
      .then(({ data }) => {
        setMenus(menus2routes(data))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const routes = useMemo(() => [
    ...staticRoutes,
    {
      path: '/',
      element: children,
      children: menus,
    },
  ], [menus])

  const value = useMemo(() => ({
    menus,
  }), [menus])

  const router = createBrowserRouter(routes, {
    // eslint-disable-next-line no-underscore-dangle
    basename: window.__MICRO_APP_BASE_ROUTE__ ?? import.meta.env.GEOM_CONTEXT_PATH,
  })

  useEffect(() => {
    fetchMenuTree()
  }, [])

  return (
    <MenuContext.Provider value={value}>
      <Skeleton loading={loading}>
        <RouterProvider router={router} />
      </Skeleton>
    </MenuContext.Provider>
  )
}

export {
  GeomRouter, useMenu,
}
