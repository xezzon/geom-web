import { GithubOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components'
import { GeomSvg, SignInPng } from '@geom/assets/img'
import { useAuth } from '@geom/components/AuthContext'
import { useTitle } from 'ahooks'
import {
  Button, Divider, Space,
} from 'antd'
import { Navigate, useLocation } from 'react-router-dom'
import { adminClient } from '@/api'

/**
 * 登录页
 * @returns {import('react').ReactNode}
 */
function SignInPage() {
  const location = useLocation()
  const { user, signIn } = useAuth()

  useTitle('登录', { restoreOnUnmount: true })

  const login = (user) => {
    adminClient.login(user)
      .then((response) => response.data)
      .then((data) => {
        signIn(data, user.autoLogin)
      })
  }

  if (user) {
    return <Navigate to={location.state?.from?.pathname ?? -1} replace />
  }

  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <LoginFormPage
        backgroundImageUrl={SignInPng}
        logo={GeomSvg}
        title="系统管理"
        subTitle=" "
        actions={(
          <div
            style={{
              display: 'none',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span
                style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}
              >
                其他登录方式
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <GithubOutlined style={{ color: '#1677FF' }} />
              </div>
            </Space>
          </div>
        )}
        onFinish={login}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className="prefixIcon" />,
          }}
          placeholder="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="plaintext"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className="prefixIcon" />,
          }}
          placeholder="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div
          style={{
            display: 'none',
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <Button
            type="link"
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </Button>
        </div>
      </LoginFormPage>
    </div>
  )
}

export {
  SignInPage as Component,
}
