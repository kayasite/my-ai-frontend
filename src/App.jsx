import { useState, useEffect } from "react";

export default function App() {
  const API_BASE = "https://your-backend.onrender.com"; // ← FlaskのRender URLに変更
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/check_login`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.logged_in) setUser(data.user);
      } catch (e) {
        console.error(e);
      } finally {
        setAuthChecked(true);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "register" : "login";
    const res = await fetch(`${API_BASE}/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      setMessage("✅ " + (isRegister ? "登録完了！" : "ログイン成功！"));
    } else {
      setMessage("❌ " + (data.message || "失敗しました"));
    }
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  const handleSaveTest = async () => {
    const res = await fetch(`${API_BASE}/api/testdata`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) setMessage("💾 データ保存確認: " + data.data);
  };

  if (!authChecked) return <p>読み込み中...</p>;

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">
          {isRegister ? "新規登録" : "ログイン"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-80"
        >
          <input
            type="text"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-pink-300 rounded-lg px-3 py-2 w-full mb-3"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-pink-300 rounded-lg px-3 py-2 w-full mb-3"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold"
          >
            {isRegister ? "登録" : "ログイン"}
          </button>
          <p
            onClick={() => setIsRegister(!isRegister)}
            className="mt-3 text-center text-sm text-pink-600 cursor-pointer"
          >
            {isRegister ? "ログイン画面へ" : "新規登録はこちら"}
          </p>
        </form>
        {message && <p className="mt-3 text-gray-700">{message}</p>}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">
        ようこそ {user} さん
      </h1>
      <button
        onClick={handleSaveTest}
        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg mb-4"
      >
        保存テストを実行
      </button>
      <button
        onClick={handleLogout}
        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
      >
        ログアウト
      </button>
      {message && <p className="mt-3 text-gray-700">{message}</p>}
    </div>
  );
}
