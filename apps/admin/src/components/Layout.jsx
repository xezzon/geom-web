import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { GeomSvg } from '@geom/assets/img'
import { useMenu } from '@geom/components/GeomRouter'
import {
  Avatar, Dropdown, Space, Typography,
} from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@geom/components/AuthContext';
import { adminClient } from '@/api';

function Layout() {
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()
  const { menus } = useMenu()

  const logout = () => {
    adminClient.logout()
    signOut()
    sessionStorage.removeItem('tokenValue')
    localStorage.removeItem('tokenValue')
  }

  return (
    <ProLayout
      layout="mix"
      fixSiderbar
      fixHeader
      title={import.meta.env.GEOM_TITLE}
      logo={GeomSvg}
      route={{ path: '/', routes: menus }}
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
  )
}

export default Layout
