import { RequireAuth, useAuth } from "@/context/AuthContext";
import { mainRoutes } from '@/router';
import { filterDeep } from "@/util/tree";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Avatar, Dropdown, Space, Typography } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

function Layout() {
  const { pathname } = useLocation()
  const { user, signout } = useAuth()
  const filterRoutes = filterDeep(mainRoutes, (arr) => arr)

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
        <Outlet />
      </ProLayout>
    </RequireAuth>
  )
}

export default Layout
