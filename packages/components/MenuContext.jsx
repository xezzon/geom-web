/**
 * @typedef {import('@xezzon/geom').Menu} Menu
 * @typedef {import('react-router-dom').RouteObject[]
 * | import('@ant-design/pro-components').MenuDataItem[]} Routes
 * @typedef {{
 * menus: Routes,
 * }} MenuContextProps
*/
import { nest } from '@geom/util/tree'
import { Icon } from '@iconify/react'
import { Skeleton } from 'antd'
import {
  createContext, createElement, useContext, useEffect, useMemo, useState,
} from 'react'
import { useAuth } from './AuthContext'

/**
 * @type {React.Context<MenuContextProps>}
 */
const MenuContext = createContext(null)

function useMenu() {
  return useContext(MenuContext)
}

/**
 * @param {Menu[]} menus
 * @returns {Routes}
 */
function loadMenus(menus) {
  return nest(menus, (menus) => menus.map((menu) => {
    // 图标
    let icon = createElement('span')
    if (menu.icon) {
      icon = createElement(Icon, { icon: menu.icon })
    }

    return {
      ...menu,
      icon,
    }
  }))
}

/**
 * @param {{
 * children: React.JSX.Element,
 * getMenuTree: () => Promise<Menu>,
 * }} param0
 * @returns {React.JSX.Element}
 */
function MenuProvider({ children, getMenuTree }) {
  const [menus, setMenus] = useState(/** @type {Routes} */([]))
  const [loading, setLoading] = useState(true)
  const { isLogin } = useAuth()

  const fetchMenuTree = () => {
    setLoading(true)
    getMenuTree()
      .then((data) => loadMenus(data))
      .then((menus) => {
        setMenus(menus)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const value = useMemo(() => ({
    menus, refreshRoute: fetchMenuTree,
  }), [menus])

  useEffect(() => {
    fetchMenuTree()
  }, [isLogin])

  return (
    <MenuContext.Provider value={value}>
      <Skeleton loading={loading}>
        {children}
      </Skeleton>
    </MenuContext.Provider>
  )
}

export {
  MenuProvider, useMenu,
}
