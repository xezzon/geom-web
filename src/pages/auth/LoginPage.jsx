import { GithubOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components'
import { useLocalStorageState, useSessionStorageState, useTitle } from 'ahooks'
import {
  Button, Divider, Space, message,
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import {
  getCurrentUser as getCurrentUserApi,
  login as loginApi,
} from '@/api/auth'
import { Fallback } from '@/hoc/Lazy'

function LoginPage() {
  const location = useLocation()
  const { user, signin } = useAuth()
  const [token1, setToken1] = useSessionStorageState('tokenValue')
  const [token2, setToken2] = useLocalStorageState('tokenValue')
  const [loading, toggleLoading] = useState(true)
  const token = useMemo(() => token2 || token1, [token1, token2])

  useEffect(() => {
    if (!token) {
      toggleLoading(false)
      return
    }
    toggleLoading(true)
    getCurrentUserApi()
      .then(signin)
      .finally(() => toggleLoading(false))
  }, [token])

  useTitle('登录', { restoreOnUnmount: true })

  const login = (user) => {
    loginApi(user)
      .then(({ tokenName, tokenValue }) => {
        localStorage.setItem('tokenName', tokenName)
        if (user.autoLogin) {
          setToken2(tokenValue)
        } else {
          setToken1(tokenValue)
        }
      })
      .catch((reason) => {
        console.log(reason)
        reason.json?.()
          .then(({ message }) => message)
          .then(message.error)
      })
  }

  if (user) {
    return <Navigate to={location.state?.from?.pathname || -1} replace />
  }

  if (loading) {
    return <Fallback />
  }

  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <LoginFormPage
        backgroundImageUrl="/bg.png"
        logo="/logo.svg"
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
          name="cipher"
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

export default LoginPage