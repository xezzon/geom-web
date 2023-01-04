import { ApiOutlined, HomeOutlined, MenuOutlined } from '@ant-design/icons'
import Lazy from '@/hoc/Lazy'

const HomePage = Lazy(() => import('@/pages/home/HomePage'))

const MenuPage = Lazy(() => import('@/pages/auth/MenuPage'))

const PublishPage = Lazy(() => import('@/pages/public-api/PublishPage'))

export const route = {
  path: '/',
  /**
   * @type {import('@ant-design/pro-components').MenuDataItem[]
   * | import('react-router-dom').RouteObject[]}
   */
  routes: [
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
          element: <MenuPage />,
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
          element: <PublishPage />,
        },
      ],
    },
  ],
}
