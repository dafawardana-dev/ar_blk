// src/pages/Kelas.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import Table from "../components/ui/Table.jsx";
import Card from "../components/ui/Card.jsx";
import { PencilSquareIcon, TrashIcon, EyeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import api from "../services/api.jsx";
import FilePreview from "reactjs-file-preview";
import { saveAs } from "file-saver";
import axios from "axios";
import { useAuth } from "../contexts/AuthContexts.jsx";

const fetcher = (url) => api.get(url).then((res) => res.data);

// Daftar kategori kelas
const KATEGORI_KELAS = [
  { id: "all", nama: "Semua Kelas" },
  { id: "Web Node JS", nama: "Web Node JS" },
  { id: "Digital Marketing", nama: "Digital Marketing" },
  { id: "Artificial Intelligence", nama: "Artificial Intelligence" },
  { id: "UI/UX Design", nama: "UI/UX Design" },
];

export default function Modul() {
  const { user } = useAuth();
  const { data: modulList = [], error, isLoading, mutate } = useSWR("/modul", fetcher);

  const [selectedKelas, setSelectedKelas] = useState("all");
  const [previewFile, setPreviewFile] = useState(null); // State untuk modal
  const [downloading, setDownloading] = useState(false); // State untuk download

  // Fungsi hapus data
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      await api.delete(`/modul/${id}`);
      mutate(); // Refresh data
    } catch (err) {
      alert("Gagal menghapus data");
      console.error(err);
    }
  };

  // Fungsi buka modal preview
  const handlePreview = (fileUrl) => {
    if (fileUrl) {
      const fullUrl = fileUrl.startsWith("http")
        ? fileUrl
        : `http://localhost:5000${fileUrl}`;
      setPreviewFile(fullUrl);
    }
  };

  // Fungsi download file (konsisten dengan kelas.jsx)
  const handleDownload = async (fileUrl, fileName) => {
    setDownloading(true);
    try {
      const fullUrl = fileUrl.startsWith("http")
        ? fileUrl
        : `http://localhost:5000${fileUrl}`;

      const response = await axios.get(fullUrl, {
        responseType: "blob",
        timeout: 30000,
      });

      if (response.data) {
        saveAs(response.data, fileName);
      } else {
        throw new Error("No file data received");
      }
    } catch (err) {
      console.error("Download error details:", err);
      if (err.response) {
        alert(
          `Server error: ${err.response.status} - ${err.response.statusText}`
        );
      } else if (err.request) {
        alert(
          "Network error: Unable to reach server. Please check your connection."
        );
      } else {
        alert(`Download failed: ${err.message}`);
      }
    } finally {
      setDownloading(false);
    }
  };

  // Memoisasi data yang sudah difilter
  const filteredData = useMemo(() => {
    if (selectedKelas === "all") {
      return modulList;
    }
    return modulList.filter((item) => item.namaKelas === selectedKelas);
  }, [modulList, selectedKelas]);

  if (error)
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Gagal memuat data: {error.message}</div>
      </div>
    );
  if (isLoading)
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Daftar Modul Kelas</h1>

      {/* Filter Kelas */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-3">Filter Berdasarkan Kelas:</h2>
        <div className="flex flex-wrap gap-3">
          {KATEGORI_KELAS.map((kategori) => (
            <button
              key={kategori.id}
              onClick={() => setSelectedKelas(kategori.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${selectedKelas === kategori.id ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
            >
              {kategori.nama}
            </button>
          ))}
        </div>
      </div>

      <Card>
        {/* Header Tabel */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">Menampilkan {filteredData.length} modul</span>
          <Link to="/tambahmodul">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-sm">+ Tambah Modul</button>
          </Link>
        </div>

        {/* Tabel Data */}
        <Table className="overflow-x-auto" tableClassName="text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
               {user.role === "user" && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modul</th>
               )}
                {user.role === "admin" && (
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-12 text-center">
                  <div className="text-gray-500">Tidak ada data modul untuk kelas ini.</div>
                </td>
              </tr>
            ) : (
              filteredData.map((data, index) => (
                <tr key={data.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">{index + 1}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.judul}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.deskripsi}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.namaKelas}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.createdAt}</td>
                  {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.dokumen}</td> */}
                   {user.role === "user" && (
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {data.dokumen ? (
                      <div className="flex items-center space-x-2">
                        {/* <button onClick={() => handlePreview(data.dokumen)} className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition">
                          <EyeIcon className="w-4 h-4" />
                          Lihat
                        </button> */}
                        <button
                          onClick={() => handleDownload(
                            data.dokumen,
                            `modul-${data.judul.replace(/\s+/g, '-')}.pdf`
                          )}
                          disabled={downloading}
                          className="text-green-600 hover:text-green-800 font-medium flex items-center gap-1 transition disabled:opacity-50"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4" />
                          {downloading ? "Downloading..." : "Download"}
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Belum ada</span>
                    )}
                  </td>
                   )}
                   {user.role === "admin" && (
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    <Link to={`/modul/edit/${data.id}`} className="text-blue-500 hover:text-blue-700 p-2 rounded transition-colors" title="Edit">
                      <PencilSquareIcon className="h-5 w-5 inline" />
                    </Link>
                    <button onClick={() => handleDelete(data.id)} className="text-red-500 hover:text-red-700 p-2 rounded transition-colors" title="Hapus">
                      <TrashIcon className="h-5 w-5 inline" />
                    </button>
                  </td>
                   )}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* Modal Preview Sertifikat */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Preview Modul</h3>
              <button onClick={() => setPreviewFile(null)} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition" aria-label="Tutup">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 p-4">
              <div className="w-full h-full border rounded-lg overflow-hidden bg-gray-50">
                <FilePreview
                  preview={previewFile}
                  fileType="pdf"
                  clarity="1000"
                  placeHolderImage="https://via.placeholder.com/300x400?text=Loading+Preview..."
                  errorImage="https://via.placeholder.com/300x400?text=Error+Loading+File"
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleDownload(previewFile, "modul.pdf")}
                  disabled={downloading}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition disabled:opacity-50"
                >
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  {downloading ? "Downloading..." : "Download"}
                </button>
                <button onClick={() => setPreviewFile(null)} className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400 transition">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}