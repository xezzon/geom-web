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

function App() {
  const { pathname } = useLocation()
  const main = useRoutes(route.routes)
  const { user, signout } = useAuth()
  const permissions = user?.permissions

  return (
    <RequireAuth>
      <ProLayout
        layout="mix"
        fixSiderbar
        fixHeader
        title="系统管理"
        route={route}
        location={{ pathname }}
        menu={{ autoClose: false }}
        menuItemRender={({ path }, dom) => (!permissions || permissions.includes(path)
          ? <Link to={path}>{dom}</Link>
          : null
        )}
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
