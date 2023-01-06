import {
  useMemo, createContext, useContext, useState,
} from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { logout } from '@/api/auth'

const AuthContext = createContext(null)

/**
 * @returns {{
 * user: object,
 * signin: (newUser: import('@/api/auth').User) => void,
 * signout: VoidFunction,
 * hasRole: (requiredRole: string) => boolean,
 * hasPermission: (obj: object, pathProp: string, childrenProp: string) => boolean,
 * }}
 */
function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  /**
   * @type {[user: import('@/api/auth').User, setUser: Function]} 当前用户信息
   */
  const [user, setUser] = useState(null)

  /**
   * @type {string[]} 当前用户的角色
   */
  const roles = useMemo(() => user?.roles ?? [], [user])
  /**
   * @type {string[]} 当前用户的权限
   */
  const permissions = useMemo(() => user?.permissions ?? [], [user])

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
    logout()
    setUser(null)
    sessionStorage.removeItem('tokenValue')
    localStorage.removeItem('tokenValue')
  }

  /**
   * 判断对象是否拥有指定角色
   * @param {string[] | (roles: string[]) => boolean} requiredRoles
   * @returns {boolean}
   */
  const hasRole = (requiredRoles) => {
    if (requiredRoles instanceof Function) {
      return requiredRoles(roles)
    }
    if (requiredRoles instanceof Array) {
      return requiredRoles.some(roles.includes)
    }
    return false
  }

  /**
   * 判断路由/按钮是否有权限
   * @param {string | object} obj 菜单/按钮对象
   * @param {string} pathProp 权限编码字段 该字段值存在于用户权限列表中即为有权限
   * @param {string} childrenProp 子菜单字段 对于菜单，有子路由的权限即有父路由权限
   * @returns {boolean}
   */
  const hasPermission = (obj, pathProp = 'path', childrenProp = 'children') => {
    if (typeof obj === 'string') {
      return permissions.includes(obj)
    }

    /**
     * @type {string}
     */
    const path = obj[pathProp]
    /**
     * @type {Array}
     */
    const children = obj[childrenProp]

    if (permissions.includes(path)) {
      return true
    }
    if (children) {
      return children.some((item) => hasPermission(item))
    }
    return false
  }

  const value = useMemo(() => ({
    user, signin, signout, hasRole, hasPermission,
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
function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

/**
 * 判断当前用户是否拥有所要求的角色
 * @param {object} param0
 * @param {string[] | (roles: string[]) => boolean} param0.requiredRoles
 * @param {React.ReactNode} param0.fallback
 */
function RequireRole({ requiredRoles, fallback, children }) {
  const { hasRole } = useAuth()

  return hasRole(requiredRoles) ? children : fallback
}

/**
 * 判定当前角色是否拥有所要求的权限
 * @param {object} param0
 * @param {string} param0.requiredPermission
 * @param {React.ReactNode} param0.fallback
 */
function RequirePermission({ requiredPermission, fallback, children }) {
  const { hasPermission } = useAuth()

  return hasPermission(requiredPermission) ? children : fallback
}

export {
  AuthProvider, RequireAuth, RequireRole, RequirePermission, useAuth,
}
