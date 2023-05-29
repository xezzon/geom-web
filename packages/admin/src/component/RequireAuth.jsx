import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

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

export { RequireAuth }
