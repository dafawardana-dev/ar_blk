
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';


import arsipRoute from './routes/arsipRoute.js';
import kelasRoute from './routes/kelasRoute.js';
import modulRoute from './routes/modulRoute.js';


const app = express();
const prisma = new PrismaClient();


app.use(cors());
app.use(express.json()); 


app.use('/api/arsip', arsipRoute);
app.use('/api/kelas', kelasRoute);
app.use('/api/modul', modulRoute);


app.get('/', (req, res) => {
  res.json({ message: "Backend API untuk Dashboard Arsip BLK", status: "OK" });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});