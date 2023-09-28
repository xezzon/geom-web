import { nest } from '@geom/util/tree';
import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useMenu } from "./MenuContext";

const modules = import.meta.glob(`/src/pages/**/*.jsx`)

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

    return {
      ...menu,
      lazy: module,
    }
  }))
}

function GeomRouter({ children, staticRoutes }) {
  const { menus } = useMenu()

  const routes = useMemo(() => [
    ...staticRoutes,
    {
      path: '/',
      element: children,
      children: menus2routes(menus),
    },
  ], [menus])

  const router = createBrowserRouter(routes, {
    // eslint-disable-next-line no-underscore-dangle
    basename: window.__MICRO_APP_BASE_ROUTE__ ?? import.meta.env.GEOM_CONTEXT_PATH,
  })

  return <RouterProvider router={router} />
}

export default GeomRouter
