import {
  useMemo, createContext, useContext, useState,
} from 'react'
import { useLocation, Navigate } from 'react-router-dom'

const AuthContext = createContext(null)

/**
 *
 * @returns {{ user: object, signin: Function, signout: Function }}
 */
function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  /**
   * 登录
   * @param {object} newUser
   */
  const signin = (newUser) => {
    setUser(newUser)
  }

  /**
   * 退出登录
   */
  const signout = () => {
    setUser(null)
    sessionStorage.removeItem('tokenValue')
    localStorage.removeItem('tokenValue')
  }

  const value = useMemo(() => ({ user, signin, signout }), [user])

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  )
}

function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export { AuthProvider, RequireAuth, useAuth }
