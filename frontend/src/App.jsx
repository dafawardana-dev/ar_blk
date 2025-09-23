// src/App.jsx
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContexts.jsx"; 
import Sidebar from "./components/layouts/sidebar.jsx";
import Navbar from "./components/layouts/navbar.jsx";
import DashboardAdmin from "./page/dashboard.jsx"; 
import DashboardUser from "./userPage/userDashboard.jsx"; 
import AuthPage from "./page/auth.jsx";
import KelasPage from "./page/kelas.jsx";
import AddKelasPage from "./page/tambahKelas.jsx";
import EditKelasPage from "./page/editKelas.jsx";
import EditModulPage from "./page/editModul.jsx";
import EditArsipPage from "./page/EditArsip.jsx";
import AddModulPage from "./page/tambahModuls.jsx";
import AddArsipPage from "./page/AddArsip.jsx";
import ModulPage from "./page/modul.jsx";
import ArsipPage from "./page/arsip.jsx";

function DashboardLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }


  const SidebarComponent = user.role === "admin" ? Sidebar : UserSidebar;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarComponent /> 
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <Outlet /> {/* Tempat route anak dirender */}
        </main>
      </div>
    </div>
  );
}

import UserSidebar from "./components/layouts/SidebarUser.jsx"; 

// Komponen Protected Route untuk Admin
function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/user-dashboard" />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Route Publik */}
      <Route path="/" element={<AuthPage />} />

      <Route element={<DashboardLayout />}>
        {/* Halaman yang bisa diakses user & admin */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <DashboardAdmin />
            </AdminRoute>
          }
        />
        <Route path="/user-dashboard" element={<DashboardUser />} />
        <Route path="kelas" element={<KelasPage />} />
        <Route path="modul" element={<ModulPage />} />
        <Route path="arsip" element={<ArsipPage />} />

        {/* Route CRUD — hanya untuk admin */}
        <Route
          path="tambahkelas"
          element={
            <AdminRoute>
              <AddKelasPage />
            </AdminRoute>
          }
        />
        <Route
          path="kelas/edit/:id"
          element={
            <AdminRoute>
              <EditKelasPage />
            </AdminRoute>
          }
        />
        <Route
          path="modul/edit/:id"
          element={
            <AdminRoute>
              <EditModulPage />
            </AdminRoute>
          }
        />
        <Route
          path="arsip/edit/:id"
          element={
            <AdminRoute>
              <EditArsipPage />
            </AdminRoute>
          }
        />
        <Route
          path="tambaharsip"
          element={
            <AdminRoute>
              <AddArsipPage />
            </AdminRoute>
          }
        />
        <Route
          path="tambahmodul"
          element={
            <AdminRoute>
              <AddModulPage />
            </AdminRoute>
          }
        />
      </Route>

      {/* Redirect default */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
