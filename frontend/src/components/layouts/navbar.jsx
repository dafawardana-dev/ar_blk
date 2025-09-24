// src/components/layout/Navbar.jsx
import { useAuth } from "../../contexts/AuthContexts"; // Sesuaikan path jika perlu

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <header className="bg-[#1C6EA4] text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Heading Aplikasi */}
        <h2 className="text-xl font-semibold">Sistem Arsip Dokumen BLK</h2>

        {/* Tampilkan role/nama user yang sedang login */}
        <div className="text-sm font-medium">
          {loading ? (
            "Memuat..."
          ) : user ? (
            user.role === "admin" ? "Admin" : user.name || "User"
          ) : (
            "Tamu"
          )}
        </div>
      </div>
    </header>
  );
}