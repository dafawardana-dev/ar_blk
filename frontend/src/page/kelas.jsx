// src/pages/Kelas.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import Table from "../components/ui/Table.jsx";
import Card from "../components/ui/Card.jsx";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import api from "../services/api";

const fetcher = (url) => api.get(url).then((res) => res.data);

// Daftar kategori kelas
const KATEGORI_KELAS = [
  { id: "all", nama: "Semua Kelas" },
  { id: "Web Node JS", nama: "Web Node JS" },
  { id: "Digital Marketing", nama: "Digital Marketing" },
  { id: "Artificial Intelligence", nama: "Artificial Intelligence" },
  { id: "UI/UX Design", nama: "UI/UX Design" },
];

export default function Kelas() {
  const {
    data: kelasList = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/kelas", fetcher);

  // State untuk kategori yang dipilih
  const [selectedKelas, setSelectedKelas] = useState("all");

  // Fungsi hapus data
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      await api.delete(`/kelas/${id}`);
      mutate(); // Refresh data
    } catch (err) {
      alert("Gagal menghapus data");
      console.error(err);
    }
  };

  if (error)
    return <div className="p-6">Gagal memuat data: {error.message}</div>;
  if (isLoading) return <div className="p-6">Loading...</div>;

  // Filter data berdasarkan kategori yang dipilih
  const filteredData =
    selectedKelas === "all"
      ? kelasList
      : kelasList.filter((item) => item.namaKelas === selectedKelas);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Daftar Kelas</h1>

      {/* Daftar Kategori Kelas */}
      <div className="flex flex-wrap gap-3 mb-6">
        {KATEGORI_KELAS.map((kategori) => (
          <button
            key={kategori.id}
            onClick={() => setSelectedKelas(kategori.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedKelas === kategori.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {kategori.nama}
          </button>
        ))}
      </div>

      <Card>
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Daftar Siswa
          </h1>
          <Link to="/tambahkelas">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              + Tambah Peserta
            </button>
          </Link>
        </div>
        <Table className="overflow-x-auto" tableClassName="text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No. HP
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jenis Kelamin
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kelas
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tempat OJT
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sertifikat
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  Tidak ada data peserta untuk kelas ini.
                </td>
              </tr>
            ) : (
              filteredData.map((data, index) => (
                <tr
                  key={data.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {data.nama}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {data.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {data.noHp}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {data.jk === "LAKI" ? "Laki-laki" : "Perempuan"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {data.namaKelas || "-"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {data.tempatOjt || "-"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {data.sertifikat ? (
                      <a
                        href={data.sertifikat}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">Belum ada</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    <Link
                      to={`/edit/${data.id}`}
                      className="text-blue-500 hover:text-blue-700 p-2 rounded transition-colors"
                      title="Edit"
                    >
                      <PencilSquareIcon className="h-5 w-5 inline" />
                    </Link>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded transition-colors"
                      title="Hapus"
                    >
                      <TrashIcon className="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
