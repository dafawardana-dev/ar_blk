import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api/arsip';

export default function EditArsip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomor: '',
    judul: '',
    deskripsi: '',
    tglSurat: '',
    pengirim: '',
    penerima: '',
    dokumen: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch arsip data by id
  useEffect(() => {
    const fetchArsip = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch arsip data');
        const data = await response.json();
        setFormData({
          nomor: data.nomor,
          judul: data.judul,
          deskripsi: data.deskripsi,
          tglSurat: data.tglSurat ? data.tglSurat.split('T')[0] : '',
          pengirim: data.pengirim,
          penerima: data.penerima,
          dokumen: data.dokumen
        });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArsip();
  }, [id]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Failed to update arsip');
      setError(null);
      navigate('/arsip');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 ml-60 pt-20">
      <h1 className="text-2xl font-bold mb-4">Edit Arsip</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nomor</label>
            <input
              type="text"
              name="nomor"
              value={formData.nomor}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Judul</label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Surat</label>
            <input
              type="date"
              name="tglSurat"
              value={formData.tglSurat}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pengirim</label>
            <input
              type="text"
              name="pengirim"
              value={formData.pengirim}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Penerima</label>
            <input
              type="text"
              name="penerima"
              value={formData.penerima}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dokumen</label>
            <input
              type="text"
              name="dokumen"
              value={formData.dokumen}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue1 text-white px-4 py-2 rounded cursor-pointer"
          >
            {loading ? 'Menyimpan...' : 'Update'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/arsip')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
