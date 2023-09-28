import { Icon } from '@iconify/react'
import { createElement } from 'react'
import { nest } from './tree'

/**
 * @param {Routes} menus
 * @param {Array<Promise>} modules
 * @returns {Routes}
 * @deprecated
 */
export function menus2routes(menus, modules) {
  return nest(menus, (menus) => menus.map((menu) => {
    // 懒加载组件
    let module
    if (menu.key) {
      module = modules[`/src/pages${menu.key}.jsx`]
    } else {
      module = modules[`/src/pages${menu.path}/index.jsx`]
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
