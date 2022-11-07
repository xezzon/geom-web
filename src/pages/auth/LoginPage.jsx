import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signin } = useAuth()

  const from = location.state?.from?.pathname || -1

  const login = () => {
    const user = { username: 'test' }
    signin(user, () => {
      navigate(from, { replace: true })
    })
  }

  return (
    <>
      <Button onClick={login}>登录</Button>
    </>
  )
}

export default LoginPage
