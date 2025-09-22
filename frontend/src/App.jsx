// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/layouts/sidebar.jsx';
import Navbar from './components/layouts/navbar.jsx';
import Dashboard from './page/dashboard.jsx';
import AuthPage from './page/auth.jsx';
import KelasPage from './page/kelas.jsx';
import AddKelasPage from './page/tambahKelas.jsx';
import EditKelasPage from './page/editKelas.jsx';
import EditModulPage from './page/editModul.jsx';
import EditArsipPage from './page/EditArsip.jsx';
import AddModulPage from './page/tambahModuls.jsx';
import AddArsipPage from './page/AddArsip.jsx';
import ModulPage from './page/modul.jsx';
import ArsipPage from './page/arsip.jsx';

// Komponen Layout untuk halaman yang memerlukan Sidebar + Navbar
function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <Outlet /> {/* Ini akan menampilkan komponen anak (Dashboard, Kelas, dll) */}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Route Publik (Tanpa Layout) */}
        <Route path="/" element={<AuthPage />} />

        {/* Route yang memerlukan Layout Dashboard */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="kelas" element={<KelasPage />} />
          <Route path="modul" element={<ModulPage />} />
          <Route path="arsip" element={<ArsipPage />} />
          <Route path="tambahkelas" element={<AddKelasPage />} />
          <Route path="kelas/edit/:id" element={<EditKelasPage />} />
          <Route path="modul/edit/:id" element={<EditModulPage />} />
          <Route path="arsip/edit/:id" element={<EditArsipPage />} />
          <Route path="tambaharsip" element={<AddArsipPage />} />
          <Route path="tambahmodul" element={<AddModulPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;