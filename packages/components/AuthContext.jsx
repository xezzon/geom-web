import { useLocalStorageState, useSessionStorageState } from 'ahooks'
import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const AuthContext = createContext(null)

function useAuth() {
  return useContext(AuthContext)
}

/**
 * @param {{
 * getMe: (() => Promise)
 * }} param0
 */
function AuthProvider({ children, getMe }) {
  const [user, setUser] = useState(null)
  const [token1, setToken1] = useSessionStorageState('tokenValue')
  const [token2, setToken2] = useLocalStorageState('tokenValue')
  const token = useMemo(() => token2 || token1, [token1, token2])

  const signIn = ({ tokenName, tokenValue }, autoLogin) => {
    localStorage.setItem('tokenName', tokenName)
    if (autoLogin) {
      setToken2(tokenValue)
    } else {
      setToken1(tokenValue)
    }
  }

  const signOut = () => {
    setUser(null)
    sessionStorage.removeItem('tokenValue')
    sessionStorage.removeItem('tokenValue')
  }

  const value = useMemo(() => ({
    user, isLogin: !!token, signIn, signOut,
  }), [user])

  useEffect(() => {
    if (!token) {
      return;
    }
    getMe()
      .then((response) => response.data)
      .then(setUser)
  }, [token])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * 判断登录态 未登录则跳转至登录页
 */
function RequireAuth({ children, navigateTo = '/sign-in' }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to={navigateTo} state={{ from: location }} replace />
  }

  return children
}

export {
  AuthProvider, RequireAuth, useAuth,
}
