// src/pages/TambahKelas.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Card from "../components/ui/card.jsx";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function TambahModul() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    namaKelas: "",
    dokumen: "",
    createdAt: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
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
    formDataToSend.append("judul", formData.judul);
    formDataToSend.append("deskripsi", formData.deskripsi);
    formDataToSend.append("namaKelas", formData.namaKelas);
    if (selectedFile) {
      formDataToSend.append("dokumen", selectedFile);
    }

    try {
      await api.post("/modul", formDataToSend, { // The endpoint is correct
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/modul", {
        state: { message: "Modul berhasil ditambahkan!" },
      });
    } catch (err) {
      console.error("Full error:", err); // Sangat penting untuk debugging!
      setError(
        err.response?.data?.error ||
          "Gagal menambahkan modul. Silakan coba lagi."
      );
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
                Judul <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                required
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
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Dibuat
              </label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-800">
                {formData.createdAt
                  ? new Date(formData.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Belum tersedia"}
              </div>
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Modul (PDF, DOC, DOCX, maks 10MB)
              </label>
              <input
                type="file"
                name="dokumen"
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
                  File terpilih:{" "}
                  <span className="font-medium">{selectedFile.name}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/modul")}
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
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                "Simpan Modul"
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
