import { HomeOutlined } from '@ant-design/icons'
import Lazy from '@/hoc/Lazy'

const HomePage = Lazy(() => import('@/pages/home/HomePage'))

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
      index: true,
      icon: <HomeOutlined />,
      element: <HomePage />,
    },
  ],
}
