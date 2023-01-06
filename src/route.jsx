import { ApiOutlined, HomeOutlined, MenuOutlined } from '@ant-design/icons'
import { createElement } from 'react'
import Lazy from '@/hoc/Lazy'
import { nest } from '@/util/tree'

const modules = import.meta.glob('/src/pages/**/index.jsx')

const HomePage = Lazy(() => import('@/pages/home/HomePage'))

/**
 * @type {import('@ant-design/pro-components').MenuDataItem[]
 * | import('react-router-dom').RouteObject[]}
 */
const routes = [
  {
    path: '/',
    name: '首页',
    icon: <HomeOutlined />,
    element: <HomePage />,
    index: true,
  },
  {
    path: '/auth',
    name: '权限管理',
    icon: <MenuOutlined />,
    children: [
      {
        path: '/auth/menu',
        name: '菜单',
      },
    ],
  },
  {
    path: '/public-api',
    name: '开放接口',
    icon: <ApiOutlined />,
    children: [
      {
        path: '/public-api/publish',
        name: '我发布的',
      },
    ],
  },
]

export const route = {
  path: '/',
  routes: nest(routes, (routes) => routes.map((item) => {
    if (item.element) {
      // 自定义组件不走约定式路由
      return item
    }
    if (item.children) {
      // 目录不引入组件
      return item
    }
    const module = modules[`/src/pages${item.path}/index.jsx`]
    const element = module ? createElement(Lazy(module)) : <>404</>
    return { ...item, element }
  })),
}
