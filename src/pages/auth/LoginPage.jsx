import { useLocalStorageState, useSessionStorageState } from 'ahooks'
import { Button } from 'antd'
import { useEffect, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { getCurrentUser as getCurrentUserApi, login as loginApi } from '@/api/auth'

function LoginPage() {
  const location = useLocation()
  const { user, signin } = useAuth()
  const [token1, setToken1] = useSessionStorageState('tokenValue')
  const [token2] = useLocalStorageState('tokenValue')
  const token = useMemo(() => token2 || token1, [token1, token2])

  useEffect(() => {
    if (!token) {
      return;
    }
    getCurrentUserApi()
      .then((user) => signin(user))
  }, [token])

  const login = () => {
    const user = { username: 'test', cipher: 'test001' }
    loginApi(user)
      .then(({ tokenName, tokenValue }) => {
        localStorage.setItem('tokenName', tokenName)
        setToken1(tokenValue)
      })
  }

  if (user) {
    return <Navigate to={location.state?.from?.pathname || -1} replace />
  }

  // TODO: 防闪烁

  return (
    <>
      <Button onClick={login}>登录</Button>
    </>
  )
}

export default LoginPage
