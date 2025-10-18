import { useState } from "react";

const API_BASE = "https://my-ai-poster.onrender.com";

export default function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    setMsg("ログイン中...");
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMsg("✅ ログイン成功");
        onSuccess(data.user ?? username);
      } else {
        setMsg("❌ ログイン失敗");
      }
    } catch (e) {
      console.error(e);
      setMsg("🚨 通信エラー");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-pink-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-pink-200">
        <h1 className="text-2xl font-bold text-pink-600 mb-6">🔐 ログイン</h1>
        <input
          className="border border-pink-300 rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-pink-400"
          placeholder="ユーザー名（例：admin）"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border border-pink-300 rounded-lg px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-pink-400"
          placeholder="パスワード（例：1234）"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full px-6 py-2 rounded-lg text-white font-semibold shadow-md bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
        >
          ログイン
        </button>
        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
      </div>
    </div>
  );
}
