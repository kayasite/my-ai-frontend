import { useState, useEffect } from "react";

export default function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newAccount, setNewAccount] = useState({ name: "", user_id: "", access_token: "" });
  const API_BASE = "https://my-ai-poster.onrender.com";

  // === アカウント一覧取得 ===
  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/accounts/list`);
      const data = await res.json();
      if (data.success) setAccounts(data.accounts);
    } catch (err) {
      console.error("アカウント取得エラー:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // === アカウント選択 ===
  const toggleAccount = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // === アカウント追加 ===
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
        body: JSON.stringify(newAccount),
      });
      const data = await res.json();
      if (data.success) {
        setNewAccount({ name: "", user_id: "", access_token: "" });
        fetchAccounts();
      } else {
        alert("追加に失敗しました");
      }
    } catch (err) {
      console.error(err);
      alert("通信エラー");
    }
  };

  // === アカウント削除 ===
  const handleDeleteAccount = async (id) => {
    if (!window.confirm("このアカウントを削除しますか？")) return;
    try {
      const res = await fetch(`${API_BASE}/api/accounts/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) fetchAccounts();
    } catch (err) {
      console.error(err);
    }
  };

  // === 下書き生成 ===
  const handleGenerate = async () => {
    if (!topic) {
      alert("テーマを入力してください！");
      return;
    }
    if (selectedIds.length === 0) {
      alert("少なくとも1つのアカウントを選択してください！");
      return;
    }

    setLoading(true);
    setResult("生成中...");

    try {
      const res = await fetch(`${API_BASE}/api/generate_draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, account_ids: selectedIds }),
      });
      const data = await res.json();
      if (data.success) {
        const results = data.results.map(
          (r) => `✅ ${r.account}: ${r.text}`
        );
        setResult(results.join("\n"));
      } else {
        setResult("❌ 生成失敗: " + (data.error || "不明なエラー"));
      }
    } catch (err) {
      console.error(err);
      setResult("🚨 通信エラー");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">👥 Threadsアカウント管理＋下書き生成</h1>

      {/* === アカウント追加フォーム === */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">➕ アカウント追加</h2>
        <input
          type="text"
          placeholder="アカウント名"
          value={newAccount.name}
          onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
          className="border border-pink-300 rounded-lg px-3 py-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="user_id"
          value={newAccount.user_id}
          onChange={(e) => setNewAccount({ ...newAccount, user_id: e.target.value })}
          className="border border-pink-300 rounded-lg px-3 py-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="access_token"
          value={newAccount.access_token}
          onChange={(e) => setNewAccount({ ...newAccount, access_token: e.target.value })}
          className="border border-pink-300 rounded-lg px-3 py-2 w-full mb-3"
        />
        <button
          onClick={handleAddAccount}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg w-full font-semibold"
        >
          追加する
        </button>
      </div>

      {/* === アカウント一覧 === */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">👤 登録済みアカウント</h2>
        {accounts.length === 0 ? (
          <p className="text-gray-500">まだアカウントがありません。</p>
        ) : (
          accounts.map((acc) => (
            <div key={acc.id} className="flex justify-between items-center border-b py-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(acc.id)}
                  onChange={() => toggleAccount(acc.id)}
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
          ))
        )}
      </div>

      {/* === 下書き生成 === */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-full max-w-md">
        <input
          type="text"
          placeholder="例: 秋の北海道旅行"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-pink-300 rounded-lg px-4 py-2 w-full mb-4 focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full px-6 py-2 rounded-lg text-white font-semibold shadow-md transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
          }`}
        >
          {loading ? "生成中..." : "✨ 下書きを作成"}
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md border border-pink-200 max-w-md text-gray-700 whitespace-pre-line">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}


