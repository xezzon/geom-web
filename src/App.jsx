import { ProLayout } from '@ant-design/pro-components'
import { Link, useLocation, useRoutes } from 'react-router-dom'
import { route } from './route'

function App() {
  const { pathname } = useLocation()
  const main = useRoutes(route.routes)

  return (
    <ProLayout
      layout="mix"
      fixSiderbar
      fixHeader
      title="系统管理"
      route={route}
      location={{ pathname }}
      menu={{ autoClose: false }}
      menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
      className="min-vh-100"
    >
      {main}
    </ProLayout>
  )
}

export default App
