import { createContext, useContext, useMemo, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const AuthContext = createContext(null)

function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const signIn = (user) => {
    setUser(user)
  }

  const value = useMemo(() => ({
    user, signIn,
  }), [user])

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
    console.debug('no user')
    return <Navigate to={navigateTo} state={{ from: location }} replace />
  }

  return children
}

export {
  AuthProvider, useAuth, RequireAuth,
}
