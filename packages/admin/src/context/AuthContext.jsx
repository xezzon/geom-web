import {
  createContext, useContext, useMemo, useState,
} from 'react'
import { adminClient } from '@/api'

const AuthContext = createContext(null)

function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const signIn = (user) => {
    setUser(user)
  }

  const signOut = () => {
    adminClient.logout()
    setUser(null)
    sessionStorage.removeItem('tokenValue')
    localStorage.removeItem('tokenValue')
  }

  const value = useMemo(() => ({
    user, signIn, signOut,
  }), [user])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider, useAuth,
}
