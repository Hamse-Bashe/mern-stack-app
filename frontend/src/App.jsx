import { Navigate, Route, Routes } from "react-router"
import { LoginPage } from "./pages/auth/LoginPage"
import { RegisterPage } from "./pages/auth/RegisterPage"
import { DashboardPage } from "./pages/dashboard/DashboardPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute"
import Admin from "./pages/dashboard/Admin"
import LandingPage from "./pages/landing/LandingPage"

function App() {

  return (
    <>

    <Routes>
      <Route path="/login" element={<LoginPage/>}  />
      <Route path="/register" element={<RegisterPage/>}  />
      {/* NOTE: protected route */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />
      <Route path="/admin" element={<AdminProtectedRoute><Admin/></AdminProtectedRoute>} />

      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* <Route path="/" element={<LandingPage/>} /> */}
    </Routes>

    </>
  )
}

export default App
