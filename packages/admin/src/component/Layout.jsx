import { Outlet } from "react-router-dom"
import { RequireAuth } from "@/context/AuthContext";

function Layout() {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  )
}

export default Layout
