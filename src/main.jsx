import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* eslint-disable-next-line no-underscore-dangle */}
    <Router basename={window.__MICRO_APP_BASE_ROUTE__ || '/'}>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  </>,
)
