import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { ProLayout } from '@ant-design/pro-components'
import {
  Avatar, Dropdown, Space, Typography,
} from 'antd'
import {
  Link, useLocation, useRoutes,
} from 'react-router-dom'
import { RequireAuth, useAuth } from '@/context/AuthContext'
import { route } from './route'
import { filterDeep } from '@/util/tree'

function App() {
  const { pathname } = useLocation()
  const { user, signout } = useAuth()
  const menu = filterDeep(route.routes, (arr) => arr)
  const main = useRoutes(route.routes)

  return (
    <RequireAuth>
      <ProLayout
        layout="mix"
        fixSiderbar
        fixHeader
        title="系统管理"
        route={{ ...route, routes: menu }}
        location={{ pathname }}
        menu={{ autoClose: false }}
        menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
        actionsRender={() => [
          <Dropdown
            key="avatar"
            menu={{
              items: [
                {
                  key: 'signout',
                  icon: <LogoutOutlined />,
                  label: (<Typography.Link onClick={signout}>退出登录</Typography.Link>),
                },
              ],
            }}
          >
            <Space>
              <Avatar size="small" icon={<UserOutlined />} />
              <Typography.Text>{user?.nickname}</Typography.Text>
            </Space>
          </Dropdown>,
        ]}
        className="min-vh-100"
      >
        {main}
      </ProLayout>
    </RequireAuth>
  )
}

export default App
