import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter username and password");
      return;
    }
    // Simple check for now - backend eka connect unama meeka real check ekakata wenas karamu
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🏛️</div>
          <h1 className="text-2xl font-bold text-slate-800">Prison of Welikada</h1>
          <p className="text-slate-500 text-sm mt-1">Staff Login</p>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-slate-300 p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;