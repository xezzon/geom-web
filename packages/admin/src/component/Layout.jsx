import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import {
  Avatar, Dropdown, Space, Typography,
} from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { adminClient } from '@/api';
import { useAuth } from '@/context/AuthContext';
import { RequireAuth } from '@/component/RequireAuth'
import { filterDeep } from '@/util/tree';

function Layout({ routes }) {
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()
  const filterRoutes = filterDeep(routes, (arr) => arr)

  const logout = () => {
    adminClient.logout()
    signOut()
    sessionStorage.removeItem('tokenValue')
    localStorage.removeItem('tokenValue')
  }

  return (
    <RequireAuth>
      <ProLayout
        layout="mix"
        fixSiderbar
        fixHeader
        title="系统管理"
        route={{ path: '/', routes: filterRoutes }}
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
                  label: (<Typography.Link onClick={logout}>退出登录</Typography.Link>),
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
        <Outlet />
      </ProLayout>
    </RequireAuth>
  )
}

export default Layout
