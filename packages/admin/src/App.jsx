import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import SignInPage from '@/pages/sign-in'
import SignUpPage from '@/pages/sign-up'
import HomePage from '@/pages/home'
import Layout from './component/Layout'

function App() {
  return <>
    <AuthProvider>
      <Router basename={window.__MICRO_APP_BASE_ROUTE__ ?? '/'}>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route path='/home' Component={HomePage} />
          </Route>
          <Route path="/sign-up" Component={SignUpPage} />
          <Route path="/sign-in" Component={SignInPage} />
        </Routes>
      </Router>
    </AuthProvider>
  </>
}

export default App
