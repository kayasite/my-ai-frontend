import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";

export default function App() {
  const API_BASE = "https://my-ai-poster.onrender.com";

  // 認証関連
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // 下書き生成関連
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // アカウント関連
  const [accounts, setAccounts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newAccount, setNewAccount] = useState({
    name: "",
    user_id: "",
    access_token: "",
  });

  // 履歴関連
  const [history, setHistory] = useState([]);

  // ===== 起動時：ログインチェック =====
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/check_login`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.logged_in) setUser(data.user || "user");
      } catch (e) {
        console.error(e);
      } finally {
        setAuthChecked(true);
      }
    })();
  }, []);

  // ===== ログイン後：アカウント一覧取得 =====
  useEffect(() => {
    if (!user) return;
    fetchAccounts();
    fetchHistory(); // ログイン後に履歴も読み込む
  }, [user]);

  // アカウント一覧
  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/accounts/list`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setAccounts(data.accounts);
      else if (res.status === 403) setUser(null);
    } catch (err) {
      console.error("アカウント取得エラー:", err);
    }
  };

  // 履歴取得
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/history`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setHistory(data.data);
    } catch (err) {
      console.error("履歴取得エラー:", err);
    }
  };

  // ===== アカウント追加 =====
  const handleAddAccount = async () => {
    const { name, user_id, access_token } = newAccount;
    if (!name || !user_id || !access_token) {
      alert("全ての項目を入力してください");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/accounts/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newAccount),
      });
      const data = await res.json();
      if (data.success) {
        setNewAccount({ name: "", user_id: "", access_token: "" });
        fetchAccounts();
      } else alert(data.error || "追加に失敗しました");
    } catch (err) {
      console.error(err);
      alert("通信エラー");
    }
  };

  // ===== アカウント削除 =====
  const handleDeleteAccount = async (id) => {
    if (!window.confirm("このアカウントを削除しますか？")) return;
    try {
      const res = await fetch(`${API_BASE}/api/accounts/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) fetchAccounts();
      else if (res.status === 403) setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ===== 下書き生成 =====
  const handleGenerate = async () => {
    if (!topic) return alert("テーマを入力してください！");
    if (selectedIds.length === 0)
      return alert("少なくとも1つのアカウントを選択してください！");

    setLoading(true);
    setResult("生成中...");
    try {
      const res = await fetch(`${API_BASE}/api/generate_draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ topic, account_ids: selectedIds }),
      });
      const data = await res.json();
      if (data.success) {
        setResult("✅ 下書き保存完了！");
        fetchHistory(); // 新規履歴を再取得
      } else {
        setResult("❌ 生成失敗: " + (data.error || "不明なエラー"));
        if (res.status === 403) setUser(null);
      }
    } catch (err) {
      console.error(err);
      setResult("🚨 通信エラー");
    } finally {
      setLoading(false);
    }
  };

  // ===== ログアウト =====
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      setAccounts([]);
      setHistory([]);
    }
  };

  // ===== 認証チェック完了前は非表示 =====
  if (!authChecked) return null;

  // ===== 未ログイン時 =====
  if (!user) return <LoginForm onSuccess={setUser} />;

  // ===== ログイン後UI =====
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 p-6">
      <header className="w-full max-w-3xl flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-pink-600">
          👥 Threadsアカウント管理＋下書き履歴
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-gray-700">ようこそ、{user} さん</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
          >
            ログアウト
          </button>
        </div>
      </header>

      {/* ===== アカウント追加 ===== */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-full max-w-3xl mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          ➕ アカウント追加
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="アカウント名"
            value={newAccount.name}
            onChange={(e) =>
              setNewAccount({ ...newAccount, name: e.target.value })
            }
            className="border border-pink-300 rounded-lg px-3 py-2 w-full"
          />
          <input
            type="text"
            placeholder="user_id"
            value={newAccount.user_id}
            onChange={(e) =>
              setNewAccount({ ...newAccount, user_id: e.target.value })
            }
            className="border border-pink-300 rounded-lg px-3 py-2 w-full"
          />
          <input
            type="text"
            placeholder="access_token"
            value={newAccount.access_token}
            onChange={(e) =>
              setNewAccount({ ...newAccount, access_token: e.target.value })
            }
            className="border border-pink-300 rounded-lg px-3 py-2 w-full"
          />
        </div>
        <button
          onClick={handleAddAccount}
          className="mt-3 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          追加する
        </button>
      </div>

      {/* ===== アカウント一覧 ===== */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-full max-w-3xl mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          👤 登録済みアカウント
        </h2>
        {accounts.length === 0 ? (
          <p className="text-gray-500">まだアカウントがありません。</p>
        ) : (
          <div className="space-y-1">
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className="flex justify-between items-center border-b py-2"
              >
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(acc.id)}
                    onChange={() =>
                      setSelectedIds((prev) =>
                        prev.includes(acc.id)
                          ? prev.filter((x) => x !== acc.id)
                          : [...prev, acc.id]
                      )
                    }
                  />
                  <span>{acc.name}</span>
                </label>
                <button
                  onClick={() => handleDeleteAccount(acc.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== 下書き生成 ===== */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-full max-w-3xl mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          📝 下書き生成
        </h2>
        <input
          type="text"
          placeholder="例: 秋の北海道旅行"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-pink-300 rounded-lg px-4 py-2 w-full mb-4"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full px-6 py-2 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
          }`}
        >
          {loading ? "生成中..." : "✨ 下書きを作成"}
        </button>
        {result && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border text-gray-800 whitespace-pre-line">
            {result}
          </div>
        )}
      </div>

      {/* ===== 履歴表示 ===== */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          📜 あなたの下書き履歴
        </h2>
        {history.length === 0 ? (
          <p className="text-gray-500">まだ履歴がありません。</p>
        ) : (
          <ul className="space-y-2">
            {history.map((h) => (
              <li
                key={h.id}
                className="border-b py-2 text-gray-700 whitespace-pre-line"
              >
                <strong>{h.topic}</strong> — {h.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
