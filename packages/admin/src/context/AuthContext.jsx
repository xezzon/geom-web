import {
  useMemo, createContext, useContext, useState,
} from 'react'

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

export {
  AuthProvider, useAuth,
}
