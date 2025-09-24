// src/pages/DashboardUser.jsx
import { useAuth } from "../contexts/AuthContexts.jsx";
import { Link } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  IdentificationIcon,
  KeyIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export default function DashboardUser() {
  const { user, logout } = useAuth();

  if (!user) return null;

  // Simulasi data statistik (Anda bisa ambil dari API nanti)
  const stats = {
    arsip: 12,
    kelas: 5,
    modul: 8,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Halo, {user.name} 👋</h1>
            <p className="text-gray-500 mt-1">Selamat datang di dashboard Anda</p>
          </div>
          
        </div>

        {/* Biodata Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">Profil Anda</h2>
              <p className="text-gray-500">Informasi akun dan data pribadi</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama */}
            <div className="flex items-start">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <UserIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <p className="mt-1 text-lg font-medium text-gray-900">{user.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="p-2 bg-green-50 rounded-lg mr-3">
                <EnvelopeIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-lg font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            {/* Username */}
            <div className="flex items-start">
              <div className="p-2 bg-purple-50 rounded-lg mr-3">
                <IdentificationIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <p className="mt-1 text-lg font-medium text-gray-900">{user.username}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start">
              <div className="p-2 bg-yellow-50 rounded-lg mr-3">
                <KeyIcon className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-lg font-medium text-gray-900 capitalize">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {user.role}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistik Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Arsip Dokumen</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.arsip}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <DocumentTextIcon className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">Dokumen yang bisa Anda akses</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Kelas</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.kelas}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <AcademicCapIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">Kelas yang tersedia</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Modul Belajar</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.modul}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <BookOpenIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">Modul pembelajaran</p>
          </div>
        </div>

        {/* Navigasi Cepat */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Akses Dokumen</h2>
          <p className="text-gray-500 mb-6">Klik kartu di bawah untuk melihat dan mengunduh dokumen.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/arsip"
              className="group bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 p-6 rounded-xl border border-red-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-red-800 group-hover:text-red-900">📄 Arsip Dokumen</h3>
                  <p className="text-red-600 text-sm mt-1">Lihat dan download arsip</p>
                </div>
                <div className="p-2 bg-red-200 rounded-lg">
                  <DocumentTextIcon className="w-6 h-6 text-red-700" />
                </div>
              </div>
            </Link>

            <Link
              to="/kelas"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-6 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 group-hover:text-blue-900">👥 Kelas</h3>
                  <p className="text-blue-600 text-sm mt-1">Dokumen peserta kelas</p>
                </div>
                <div className="p-2 bg-blue-200 rounded-lg">
                  <AcademicCapIcon className="w-6 h-6 text-blue-700" />
                </div>
              </div>
            </Link>

            <Link
              to="/modul"
              className="group bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 p-6 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-800 group-hover:text-green-900">📚 Modul Belajar</h3>
                  <p className="text-green-600 text-sm mt-1">Materi pembelajaran</p>
                </div>
                <div className="p-2 bg-green-200 rounded-lg">
                  <BookOpenIcon className="w-6 h-6 text-green-700" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}