import {
  createContext, useContext, useMemo, useState,
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

  const signOut = () => {
    setUser(null)
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
