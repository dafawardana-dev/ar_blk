// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layouts/sidebar.jsx';
import Navbar from './components/layouts/navbar.jsx';
import Dashboard from './page/dashboard.jsx';
import AuthPage from './page/auth.jsx'
import KelasPage from './page/kelas.jsx';
import AddKelasPage from './page/tambahKelas.jsx';
import AddModulPage from './page/tambahModuls.jsx';
import AddArsipPage from './page/AddArsip.jsx';
import ModulPage from './page/modul.jsx';
import ArsipPage from './page/arsip.jsx';


function App() {
  return (
    <Router>
      <Routes>
        {/* Pindahkan semua Route ke dalam komponen Routes */}
        <Route path="/" element={<AuthPage />} />

        {/* Gunakan Route bersarang (nested routes) untuk layout yang sama */}
        <Route
          path="/dashboard"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                  <Dashboard />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/kelas"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                  <KelasPage />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/modul"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                  <ModulPage />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/arsip"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                  <ArsipPage />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/tambahkelas"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                  <AddKelasPage />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/tambaharsip"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                  <AddArsipPage />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/tambahmodul"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6">
                  <AddModulPage />
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;