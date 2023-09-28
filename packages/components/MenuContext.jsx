/**
 * @typedef {import('react-router-dom').RouteObject[]
* | import('@ant-design/pro-components').MenuDataItem[]} Routes
*/
import { nest } from '@geom/util/tree'
import { Icon } from '@iconify/react'
import { Skeleton } from 'antd'
import {
  createContext, createElement, useContext, useEffect, useMemo, useState,
} from 'react'
import { useAuth } from './AuthContext'

const MenuContext = createContext(null)

/**
 * @returns {{menus: Routes}}
 */
function useMenu() {
  return useContext(MenuContext)
}

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

function MenuProvider({ children, getMenuTree }) {
  const [menus, setMenus] = useState(/** @type {Routes} */([]))
  const [loading, setLoading] = useState(true)
  const { isLogin } = useAuth()

  const fetchMenuTree = () => {
    setLoading(true)
    getMenuTree()
      .then(({ data }) => loadMenus(data))
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
