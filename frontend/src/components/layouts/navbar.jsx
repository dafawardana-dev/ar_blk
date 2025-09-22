// src/components/layout/Navbar.jsx
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="bg-[#1C6EA4] text-white p-4 shadow-md">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Sistem Arsip Dokumen BLK</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Admin</span>
          <Link to="/"className="bg-[#FB4141] hover:bg-[#8C1007] px-3 py-1 rounded">
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}