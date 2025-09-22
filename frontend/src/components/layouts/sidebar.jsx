// src/components/layout/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/lgWhite.png";
import { 
  HomeIcon, 
  FolderIcon, 
  BookOpenIcon, 
  ArchiveBoxIcon 
} from '@heroicons/react/24/solid';
// src/components/layouts/sidebar.jsx
export default function Sidebar() {
  return (
    <div className="w-70 bg-[#154D71] text-gray-300 min-h-screen p-4">
      <div className="flex items-center mb-6">
        <img
          src={logo}
          alt="BLK Logo"
          className="h-20 w-60  mt-4 "/>
        {/* <h1 className="text-xl font-bold">Arsip </h1><br/>
        <h2 className="text-xl font-bold">Balai Latihan Kerja</h2> */}
      </div>
      <nav>
        <ul className="mt-6 space-y-1">
          <li >
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-600 transition-colors duration-200"
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
       
          <li>
            <Link
              to="/arsip"
              className="flex items-center space-x-3 py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-600 transition-colors duration-200"
            >
               <ArchiveBoxIcon className="h-5 w-5" />
              <span>Arsip Dokumen</span>
            </Link>
          </li>
          <li>
            <Link
              to="/kelas"
              className="flex items-center space-x-3 py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-600 transition-colors duration-200"
            >
               <FolderIcon className="h-5 w-5" />
              <span>Kelas</span>             
            </Link>
          </li>
          <li>
            <Link
              to="/modul"
              className="flex items-center space-x-3 py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-600 transition-colors duration-200"
            >
               <BookOpenIcon className="h-5 w-5" />
              <span>Modul Belajar</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
