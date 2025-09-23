// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //   const navigate = useNavigate();

  // Simulasi database user (bisa diganti dengan API nanti)
  const mockUsers = [
    { id: 1, username: "admin", password: "admin123", role: "admin", name: "Admin BLK", email: "admin@blk.com" },
    { id: 2, username: "user", password: "user123", role: "user", name: "Budi Santoso", email: "budi@blk.com" },
  ];

  const login = async (username, password) => {
    const foundUser = mockUsers.find((u) => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return foundUser; // ✅ Return user object on success
    } else {
      alert("Username atau password salah!");
      return null; // ✅ Return null on failure
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Cek localStorage saat app pertama kali di-load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
