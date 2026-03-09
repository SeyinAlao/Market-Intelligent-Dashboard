import {Routes, Route, Navigate} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DashboardHome from './pages/DashboardHome'
import StockDetail from './pages/StockDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/stock/:symbol" element={<StockDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
