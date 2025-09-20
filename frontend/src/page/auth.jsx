import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LgWhite from "../assets/lgWhite.png";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUsername && loginPassword) {
      navigate("/dashboard");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerUsername && registerEmail && registerPassword) {
      alert("Registered successfully!");
      setIsRegistering(false);
      setRegisterUsername("");
      setRegisterEmail("");
      setRegisterPassword("");
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* Bagian Login (Kiri) */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-blue1">
              Masuk ke Akun Anda
            </h2>
            <p className="mt-2 text-sm text-blue1">
              Silakan masukkan username dan password Anda
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="login-username" className="sr-only">
                  Username
                </label>
                <input
                  id="login-username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-blue1 placeholder-blue1 text-blue1 rounded-t-md focus:outline-none focus:ring-blue1 focus:border-blue1 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="login-password" className="sr-only">
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-blue1 placeholder-blue1 text-blue1 rounded-b-md focus:outline-none focus:ring-blue1 focus:border-blue1 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-blue1 hover:bg-blue1 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue1"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>

      {/* Panel Kuning yang Bergeser */}
      <div
        className={`absolute top-0 right-0 h-full w-full bg-blue1 transition-transform duration-700 ease-in-out ${
          isRegistering ? "translate-x-0" : "translate-x-1/2"
        } flex flex-col justify-center items-center`}
      >
        {/* Bagian Logo + Tombol */}
        <div className="absolute left-1/4 transform -translate-x-1/2 flex flex-col items-center space-y-4">
          {/* Logo di atas tombol */}
          <img src={LgWhite} alt="Logo" className="h-40 w-auto mb-4" />

          {/* Tombol Register atau Login */}
          {!isRegistering ? (
            <button
              onClick={() => setIsRegistering(true)}
              className="py-2 px-6 bg-white text-blue1 font-semibold rounded-md hover:bg-blue1 hover:text-white hover:outline-none hover:ring-2 hover:ring-white"
            >
              Register
            </button>
          ) : (
            <button
              onClick={() => setIsRegistering(false)}
              className="py-2 px-6 bg-white text-blue1 font-semibold rounded-md hover:bg-blue1 hover:text-white hover:outline-none hover:ring-2 hover:ring-white"
            >
              Login
            </button>
          )}
        </div>

      {/* Form Register di sisi kanan */}
          {isRegistering && (
          <div className="absolute right-0 w-1/2 h-full bg-white p-8 flex flex-col justify-center items-center shadow-lg">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-blue1">
                  Buat Akun Baru
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleRegister}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="register-username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="register-username"
                    type="text"
                    placeholder="Username"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-blue1 placeholder-blue1 text-blue1 rounded-t-md focus:outline-none focus:ring-blue1 focus:border-blue1 focus:z-10 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="register-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    placeholder="Email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-blue1 placeholder-blue1 text-blue1 focus:outline-none focus:ring-blue1 focus:border-blue1 focus:z-10 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="register-password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    placeholder="Password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-blue1 placeholder-blue1 text-blue1 rounded-b-md focus:outline-none focus:ring-blue1 focus:border-blue1 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue1 text-white rounded-md hover:bg-blue1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue1"
              >
                Register
              </button>
            </form>
            </div>
          </div>
          )}
      </div>
    </div>
  );
}
