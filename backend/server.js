// src/server.js
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import path from 'path'; // ✅ Diperbaiki: hapus tanda kurung
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import arsipRoute from './routes/arsipRoute.js';
import kelasRoute from './routes/kelasRoute.js';
import modulRoute from './routes/modulRoute.js';

const app = express();
const prisma = new PrismaClient();

// Dapatkan __dirname di ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve file statis (untuk file upload)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/arsip', arsipRoute);
app.use('/api/kelas', kelasRoute);
app.use('/api/modul', modulRoute);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: "Backend API untuk Dashboard Arsip BLK", 
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware (opsional tapi direkomendasikan)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); // Hentikan server jika gagal koneksi ke DB
  }
});

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('🔌 Server is shutting down...');
//   await prisma.$disconnect();
//   process.exit(0);
// });