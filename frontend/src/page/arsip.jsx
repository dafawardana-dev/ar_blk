import { useState, useMemo } from "react";
import useSWR from "swr";
import { Link } from "react-router-dom";
import api from "../services/api.jsx";
import Table from "../components/ui/Table.jsx";
import Card from "../components/ui/card.jsx";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";


const fetcher = (url) => api.get(url).then((res) => res.data);

// Daftar kategori kelas
const KATEGORI_ARSIP = [
  { id: "all", nama: "Semua Jenis Arsip" },
  { id: "Surat Masuk", nama: "Surat Masuk" },
  { id: "Surat Keluar", nama: "Surat Keluar" },
  { id: "Arsip Dokumen OJT", nama: "Arsip Dokumen OJT" },

];
export default function Arsip() {
  const {
    data: arsipList = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/arsip", fetcher);

  const [selectedKelas, setSelectedKelas] = useState("all");
  const [previewFile, setPreviewFile] = useState(null); // State untuk modal

  // Fungsi hapus data
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    try {
      await api.delete(`/arsip/${id}`);
      mutate(); // Refresh data
    } catch (err) {
      alert("Gagal menghapus data");
      console.error(err);
    }
  };

  // Fungsi buka modal preview
  const handlePreview = (fileUrl) => {
    if (fileUrl) {
      setPreviewFile(fileUrl);
    }
  };

  // Memoisasi data yang sudah difilter
  const filteredData = useMemo(() => {
    if (selectedKelas === "all") {
      return arsipList;
    }
    return arsipList.filter((item) => item.deskripsi === selectedKelas);
  }, [arsipList, selectedKelas]);

  if (error)
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Gagal memuat data: {error.message}
        </div>
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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Daftar Arsip</h1>

      {/* Filter Kelas */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-3">Filter Berdasarkan Jenis Arsip:</h2>
        <div className="flex flex-wrap gap-3">
          {KATEGORI_ARSIP.map((kategori) => (
            <button
              key={kategori.id}
              onClick={() => setSelectedKelas(kategori.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedKelas === kategori.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {kategori.nama}
            </button>
          ))}
        </div>
      </div>

      <Card>
        {/* Header Tabel */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">
            Menampilkan {filteredData.length} arsip
          </span>
          <Link to="/tambaharsip">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-sm">
              + Tambah Arsip
            </button>
          </Link>
        </div>

        {/* Tabel Data */}
        <Table className="overflow-x-auto" tableClassName="text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Surat</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengirim</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penerima</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Surat</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dokumen</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-12 text-center">
                  <div className="text-gray-500">Tidak ada data arsip untuk jenis ini.</div>
                </td>
              </tr>
            ) : (
              filteredData.map((data, index) => (
                <tr key={data.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">{index + 1}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{data.nomor || "-"}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.judul || "-"}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.pengirim || "-"}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.penerima || "-"}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.tglSurat}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{data.deskripsi || "-"}</td>
                 
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {data.dokumen ? (
                      <button
                        onClick={() => handlePreview(data.dokumen)}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Lihat
                      </button>
                    ) : (
                      <span className="text-gray-400 italic">Belum ada</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    <Link
                      to={`/arsip/edit/${data.id}`}
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

      {/* Modal Preview Sertifikat */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col">
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Preview Sertifikat</h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
                aria-label="Tutup"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body Modal - Preview File */}
            <div className="flex-1 p-4">
              <iframe
                src={previewFile}
                className="w-full h-full min-h-[500px] border rounded-lg"
                title="Preview Sertifikat"
                onError={(e) => {
                  console.error("Gagal memuat file:", e);
                  alert("Gagal memuat file. Pastikan file ada dan format didukung.");
                }}
              />
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex justify-end space-x-3">
                <a
                  href={previewFile}
                  download
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
                <button
                  onClick={() => setPreviewFile(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400 transition"
                >
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