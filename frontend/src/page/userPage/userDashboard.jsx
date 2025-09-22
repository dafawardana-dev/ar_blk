// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import api from "../../services/api";
import {
  ArchiveBoxIcon,
  AcademicCapIcon,
  BookOpenIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [stats, setStats] = useState({ arsip: 0, kelas: 0, modul: 0 });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi helper untuk format "X waktu yang lalu"
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) return `${diffDay} hari yang lalu`;
    if (diffHour > 0) return `${diffHour} jam yang lalu`;
    if (diffMin > 0) return `${diffMin} menit yang lalu`;
    return "Baru saja";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [arsipRes, kelasRes, modulRes] = await Promise.all([
          api.get("/arsip"),
          api.get("/kelas"),
          api.get("/modul"),
        ]);

        // Update statistik
        setStats({
          arsip: arsipRes.data.length,
          kelas: kelasRes.data.length,
          modul: modulRes.data.length,
        });

        // Gabungkan aktivitas
        const arsipActivities = arsipRes.data.map((item) => ({
          ...item,
          type: "arsip",
          timeAgo: getTimeAgo(item.createdAt),
        }));

        const kelasActivities = kelasRes.data.map((item) => ({
          ...item,
          type: "kelas",
          timeAgo: getTimeAgo(item.createdAt),
        }));

        const modulActivities = modulRes.data.map((item) => ({
          ...item,
          type: "modul",
          timeAgo: getTimeAgo(item.createdAt),
        }));

        // Gabungkan dan urutkan (terbaru dulu), ambil 5 teratas
        const allActivities = [...arsipActivities, ...kelasActivities, ...modulActivities]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setActivities(allActivities);
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        setError("Gagal memuat data. Silakan coba lagi.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-1/4"></div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white rounded-xl shadow p-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg mb-4"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="p-3 bg-blue-600 rounded-xl">
            <ArchiveBoxIcon className="h-8 w-8 text-white" />
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-500">
              Selamat datang di sistem arsip dokumen BLK
            </p>
          </div>
        </div>

        {/* Statistik Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Total Arsip */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Total Arsip
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.arsip}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${Math.min(stats.arsip * 2, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Card 2: Total Kelas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Total Kelas
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.kelas}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <AcademicCapIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${Math.min(stats.kelas * 5, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Card 3: Total Modul */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Total Modul
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.modul}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <BookOpenIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${Math.min(stats.modul * 4, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Aktivitas Terbaru
            </h2>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <ArrowPathIcon className="h-4 w-4 mr-1" />
              Refresh
            </button>
          </div>

          {activities.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Tidak ada aktivitas terbaru.</p>
          ) : (
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  {/* Ikon */}
                  <div
                    className={`p-2 rounded-lg mr-4 ${
                      activity.type === "arsip"
                        ? "bg-blue-100 text-blue-600"
                        : activity.type === "kelas"
                        ? "bg-green-100 text-green-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {activity.type === "arsip" && (
                      <DocumentTextIcon className="h-5 w-5" />
                    )}
                    {activity.type === "kelas" && (
                      <UserGroupIcon className="h-5 w-5" />
                    )}
                    {activity.type === "modul" && (
                      <BookOpenIcon className="h-5 w-5" />
                    )}
                  </div>

                  {/* Konten */}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {activity.type === "arsip" &&
                        `Surat Masuk: ${activity.judul}`}
                      {activity.type === "kelas" &&
                        `Peserta Baru: ${activity.nama}`}
                      {activity.type === "modul" &&
                        `Modul Baru: ${activity.judul}`}
                    </p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {activity.timeAgo}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Lihat semua aktivitas →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}