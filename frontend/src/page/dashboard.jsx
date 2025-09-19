// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import api from "../services/api";
import StatCard from "../components/statcard.jsx";
import Card from "../components/ui/card.jsx";
import {
  ArchiveBoxIcon,
  AcademicCapIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [stats, setStats] = useState({ arsip: 0, kelas: 0, modul: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [arsipRes, kelasRes, modulRes] = await Promise.all([
          api.get("/arsip"),
          api.get("/kelas"),
          api.get("/modul"),
        ]);
        setStats({
          arsip: arsipRes.data.length,
          kelas: kelasRes.data.length,
          modul: modulRes.data.length,
        });
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center mb-6 space-x-3 text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 mb-4 text-[#154D71] h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z"
            clipRule="evenodd"
          />
        </svg>

        <span className="text-2xl font-bold mb-6 text-gray-600">
          {" "}
          Dashboard Overview
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Arsip" value={stats.arsip} />
        <StatCard title="Total Kelas" value={stats.kelas} icon={<AcademicCapIcon/> }   />
        <StatCard title="Total Modul" value={stats.modul} icon={<BookOpenIcon/>} color="" />
      </div>

      {/* Aktivitas Terbaru */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded">
     
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 p-2 bg-blue-100 text-blue-500 rounded mr-3 h-10 w-10"
            >
              <path
                fillRule="evenodd"
                d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                clipRule="evenodd"
              />
              <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
            </svg>

            <div>
              <p className="font-medium">Surat Masuk Baru: No. 2024/BLK/001</p>
              <p className="text-sm text-gray-500">
                Ditambahkan 2 jam yang lalu
              </p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded">
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 bg-blue-100 text-[#154D71] rounded mr-3 h-8 w-8"
            >
              <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
            </svg>
        
            <div>
              <p className="font-medium">
                Peserta Baru: Kelas Pemrograman Dasar
              </p>
              <p className="text-sm text-gray-500">
                Ditambahkan 1 hari yang lalu
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
