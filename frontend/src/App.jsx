// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layouts/sidebar.jsx';
import Navbar from './components/layouts/navbar.jsx';
import Dashboard from './page/dashboard.jsx';
// import ArsipPage from './page/arsipDokumen.jsx';
import KelasPage from './page/kelas.jsx';
import AddKelasPage from './page/tambahKelas.jsx';
// import ModulPage from './page/moduls.jsx';


function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/kelas" element={<KelasPage />} />
              <Route path="/tambahkelas" element={<AddKelasPage />} />
              {/* <Route path="/arsip" element={<ArsipPage />} />
              <Route path="/modul" element={<ModulPage />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;