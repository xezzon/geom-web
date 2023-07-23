import {
  DownOutlined, LogoutOutlined, PlusOutlined, UserOutlined,
} from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { GeomSvg } from '@geom/assets/img'
import { filterDeep } from '@geom/util/tree';
import {
  Avatar, Button, Divider, Dropdown, Space, Typography, theme,
} from 'antd';
import {
  Link, Outlet, useLocation, useNavigate,
} from 'react-router-dom';
import { useAuth } from '@geom/components/AuthContext';
import { cloneElement } from 'react';
import { useGroup } from '@/components/GroupContext';
import { adminClient } from '@/api';

const { useToken } = theme

function Layout({ routes }) {
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()
  const { groups, toggleGroup, currentGroup } = useGroup()
  const { token } = useToken();
  const navigate = useNavigate()
  const filterRoutes = filterDeep(routes, (arr) => arr)

  if (!currentGroup) {
    return <></>
  }

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
      route={{ path: '/', routes: filterRoutes }}
      location={{ pathname }}
      menu={{ autoClose: false }}
      menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
      actionsRender={() => [
        <Dropdown.Button
          menu={{
            items: groups.map((group) => ({
              key: group.id,
              label: group.name,
            })),
            selectable: true,
            defaultSelectedKeys: [currentGroup.id],
            onClick: ({ key }) => toggleGroup(key),
          }}
          trigger={['click']}
          type="text"
          placement="bottomRight"
          key="groups"
          icon={<DownOutlined />}
          dropdownRender={(menu) => (
            <div
              style={{
                backgroundColor: token.colorBgElevated,
                borderRadius: token.borderRadiusLG,
                boxShadow: token.boxShadowSecondary,
              }}
            >
              {cloneElement(menu, {
                style: { boxShadow: 'none' },
              })}
              <Divider
                style={{
                  margin: 0,
                }}
              />
              <Space
                style={{
                  padding: 8,
                }}
              >
                <Button type="text" onClick={() => navigate('/group/new')}>
                  <PlusOutlined />
                  新建用户组
                </Button>
              </Space>
            </div>
          )}
        >
          {currentGroup.name}
        </Dropdown.Button>,
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
