import {
  ApiOutlined, BookOutlined, HomeOutlined, MenuOutlined, RadarChartOutlined,
} from '@ant-design/icons'
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
    path: '/dict',
    name: '字典',
    icon: <BookOutlined />,
  },
  {
    path: '/auth',
    name: '权限管理',
    icon: <MenuOutlined />,
    children: [
      {
        path: '/auth/user',
        name: '用户',
        element: <></>,
      },
      {
        path: '/auth/role',
        name: '角色',
      },
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
  {
    path: '/telemetry',
    name: '遥测',
    icon: <RadarChartOutlined />,
    children: [
      {
        path: '/telemetry/log',
        name: '日志',
        element: <></>,
      },
      {
        path: '/telemetry/trace',
        name: '调用链',
        element: <></>,
      },
      {
        path: '/telemetry/metric',
        name: '仪表盘',
        element: <></>,
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
