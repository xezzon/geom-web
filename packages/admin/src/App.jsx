import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/sign-up'

function App() {
  return <>
    <Router basename={window.__MICRO_APP_BASE_ROUTE__ ?? '/'}>
      <Routes>
        <Route path="/sign-up" Component={SignUpPage} />
      </Routes>
    </Router>
  </>
}

export default App
