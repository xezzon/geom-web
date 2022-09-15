import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return <>
    <Router basename={window.__MICRO_APP_BASE_ROUTE__ ?? '/'}>
      <Routes>
        <Route path="*" element={<></>} />
      </Routes>
    </Router>
  </>
}

export default App
