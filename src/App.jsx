import { useState, useEffect } from "react";

export default function App() {
  // ✅ FlaskのRender URLを指定
  const API_BASE = "https://my-ai-poster.onrender.com";

  // -------------------------------
  // 🔹 React 状態管理
  // -------------------------------
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState(""); // ← 修正: email に統一
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  // -------------------------------
  // 🔹 ログイン状態チェック
  // -------------------------------
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/check_login`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.logged_in) {
          setUser(data.user);
          await fetchHistory();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setAuthChecked(true);
      }
    })();
  }, []);

  // -------------------------------
  // 🔹 履歴取得
  // -------------------------------
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/history`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setHistory(data.history);
    } catch (err) {
      console.error("履歴取得失敗:", err);
    }
  };

  // -------------------------------
  // 🔹 登録 or ログイン
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "register" : "login";
    const res = await fetch(`${API_BASE}/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }), // ← email を送信
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      setMessage("✅ " + (isRegister ? "登録完了！" : "ログイン成功！"));
      await fetchHistory();
    } else {
      setMessage("❌ " + (data.message || "失敗しました"));
    }
  };

  // -------------------------------
  // 🔹 ログアウト
  // -------------------------------
  const handleLogout = async () => {
    await fetch(`${API_BASE}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setHistory([]);
  };

  // -------------------------------
  // 🔹 データ保存テスト（ユーザーごと履歴）
  // -------------------------------
  const handleSaveTest = async () => {
    const res = await fetch(`${API_BASE}/api/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        topic: "テスト保存",
        text: `このデータは ${user} の履歴です`,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("💾 保存成功！");
      await fetchHistory();
    } else {
      setMessage("❌ 保存失敗");
    }
  };

  // -------------------------------
  // 🔹 UIレンダリング
  // -------------------------------
  if (!authChecked) return <p>読み込み中...</p>;

  // ===============================
  // ログイン前
  // ===============================
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
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

  // ===============================
  // ログイン後
  // ===============================
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">
        ようこそ {user} さん
      </h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleSaveTest}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
        >
          💾 保存テスト
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
        >
          🚪 ログアウト
        </button>
      </div>

      {message && <p className="mb-4 text-gray-700">{message}</p>}

      <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-96">
        <h2 className="text-xl font-semibold text-pink-700 mb-3">
          履歴一覧（{history.length}件）
        </h2>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {history.map((item) => (
            <li
              key={item.id}
              className="border border-pink-100 rounded-lg p-3 bg-pink-50"
            >
              <p className="text-sm text-gray-700 font-semibold">
                {item.topic}
              </p>
              <p className="text-sm text-gray-600">{item.text}</p>
            </li>
          ))}
          {history.length === 0 && (
            <li className="text-gray-500 text-sm">履歴はまだありません。</li>
          )}
        </ul>
      </div>
    </div>
  );
}
