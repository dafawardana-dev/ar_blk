// src/pages/TambahKelas.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Card from "../components/ui/Card.jsx";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function TambahKelas() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noHp: "",
    jk: "LAKI",
    tempatOjt: "",
    namaKelas: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append('nama', formData.nama);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('noHp', formData.noHp);
    formDataToSend.append('jk', formData.jk);
    formDataToSend.append('tempatOjt', formData.tempatOjt);
    formDataToSend.append('namaKelas', formData.namaKelas);

    if (selectedFile) {
      formDataToSend.append('sertifikat', selectedFile);
    }

    try {
      await api.post("/kelas", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate("/kelas", { 
        state: { message: "Peserta berhasil ditambahkan!" } 
      });
    } catch (err) {
      console.error("Full error:", err); // Sangat penting untuk debugging!
      setError(err.response?.data?.error || "Gagal menambahkan peserta. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Kembali
        </button>
        
      </div>

      <Card>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No. HP <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="noHp"
                value={formData.noHp}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select
                name="jk"
                value={formData.jk}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="LAKI">Laki-laki</option>
                <option value="PEREMPUAN">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempat OJT
              </label>
              <input
                type="text"
                name="tempatOjt"
                value={formData.tempatOjt}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Kelas <span className="text-red-500">*</span>
              </label>
              <select
                name="namaKelas"
                value={formData.namaKelas}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Kelas</option>
                <option value="Web Node JS">Web Node JS</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
            </div>
          </div>

          {/* Upload File */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Sertifikat (PDF, DOC, DOCX, maks 10MB)
            </label>
            <input
              type="file"
              name="sertifikat"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {selectedFile && (
              <p className="mt-1 text-sm text-gray-500">
                File terpilih: <span className="font-medium">{selectedFile.name}</span>
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/kelas")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                "Simpan Peserta"
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}