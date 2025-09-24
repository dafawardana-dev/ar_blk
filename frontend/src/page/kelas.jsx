// src/pages/Kelas.jsx
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr"; // Pastikan useSWR diimpor
import Table from "../components/ui/Table.jsx";
import Card from "../components/ui/Card.jsx";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import api from "../services/api";
import FilePreview from "reactjs-file-preview";
import { useAuth } from "../contexts/AuthContexts.jsx";
import { saveAs } from "file-saver"; 
import axios from "axios";

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
   const { user } = useAuth();

  const { data: kelasList = [], error, isLoading, mutate } = useSWR("/kelas", fetcher);

  const [selectedKelas, setSelectedKelas] = useState("all");
  const [previewFile, setPreviewFile] = useState(null); // State untuk modal
  const [downloading, setDownloading] = useState(false); // State untuk download

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

  // Fungsi buka modal preview
  const handlePreview = (fileUrl) => {
    if (fileUrl) {
      const fullUrl = fileUrl.startsWith("http") ? fileUrl : `http://localhost:5000${fileUrl}`;
      setPreviewFile(fullUrl);
    }
  };

  // Fungsi download file
  // In your handleDownload function, fix the URL construction:
  const handleDownload = async (fileUrl, fileName) => {
    setDownloading(true);
    try {
      // Ensure proper URL construction
      const fullUrl = fileUrl.startsWith("http") ? fileUrl : `http://localhost:5000${fileUrl}`;

      console.log("Downloading from URL:", fullUrl); // Debug log

      const response = await axios.get(fullUrl, {
        responseType: "blob",
        timeout: 30000, // 30 second timeout
        headers: {
          Accept: "*/*",
        },
      });

      // Check if response is valid
      if (response.data) {
        saveAs(response.data, fileName);
      } else {
        throw new Error("No file data received");
      }
    } catch (err) {
      console.error("Download error details:", err);

      // More specific error messages
      if (err.response) {
        // Server responded with error status
        alert(`Server error: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        // Request was made but no response received
        alert("Network error: Unable to reach server. Please check your connection.");
      } else {
        // Something else happened
        alert(`Download failed: ${err.message}`);
      }
    } finally {
      setDownloading(false);
    }
  };

  // Memoisasi data yang sudah difilter
  const filteredData = useMemo(() => {
    if (selectedKelas === "all") {
      return kelasList;
    }
    return kelasList.filter((item) => item.namaKelas === selectedKelas);
  }, [kelasList, selectedKelas]);

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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Daftar Peserta Kelas</h1>

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
        {/* Ganti bagian search bar dengan form */}
<form
  onSubmit={(e) => {
    e.preventDefault(); 
    // Tidak perlu set state lagi — searchTerm sudah terupdate via onChange
  }}
  className="w-full md:w-96"
>
  <input
    type="text"
    placeholder="Cari nama, email, atau kelas..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)} 
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</form>
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">Menampilkan {filteredData.length} peserta</span>
          <Link to="/tambahkelas">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-sm">+ Tambah Peserta</button>
          </Link>
        </div>

        {/* Tabel Data */}
        <Table className="overflow-x-auto" tableClassName="text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. HP</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JK</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempat OJT</th>
              {user.role === "user" && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sertifikat</th>
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
                  <div className="text-gray-500">Tidak ada data peserta untuk kelas ini.</div>
                </td>
              </tr>
            ) : (
              filteredData.map((data, index) => (
                <tr key={data.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">{index + 1}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.nama}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.noHp}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.jk === "LAKI" ? "Laki-laki" : "Perempuan"}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.namaKelas || "-"}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.tempatOjt || "-"}</td>
          
                    {user.role === "user" && (
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                          {data.sertifikat ? (
                      <div className="flex items-center space-x-2">
                      
                        <button
                          onClick={() => handleDownload(
                            data.sertifikat,
                            `sertifikat-${data.nama.replace(/\s+/g, '-')}.pdf`
                          )}
                          disabled={downloading}
                          className="text-green-600 hover:text-green-800 font-medium flex items-center gap-1 transition disabled:opacity-50"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
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
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Preview Sertifikat</h3>
              <button onClick={() => setPreviewFile(null)} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition" aria-label="Tutup">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body Modal - Preview File */}
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

            {/* Footer Modal */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleDownload(previewFile, "sertifikat.pdf")}
                  disabled={downloading}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition disabled:opacity-50"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
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
