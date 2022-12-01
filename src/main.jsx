import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import request from '@/api/request'
import Lazy from '@/hoc/Lazy'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import './index.css'

const LoginPage = Lazy(() => import('@/pages/auth/LoginPage'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      {/* eslint-disable-next-line no-underscore-dangle */}
      <Router basename={window.__MICRO_APP_BASE_ROUTE__ ?? '/'}>
        <Routes>
          <Route path="*" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </>,
)

/* --------- 全局化变量 --------- */
window.request = request
