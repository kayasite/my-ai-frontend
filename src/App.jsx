import { useState, useEffect } from "react";

export default function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([
    { id: 1, name: "メインアカウント" },
    { id: 2, name: "ブランド用アカウント" }
  ]);
  const [selectedIds, setSelectedIds] = useState([1]);

  // === アカウント切り替え ===
  const toggleAccount = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

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
      const res = await fetch("https://my-ai-poster.onrender.com/api/generate_draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          account_ids: selectedIds,
        }),
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
      console.error("通信エラー:", err);
      setResult("🚨 通信エラー");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        🧠 Threads下書き生成テスター
      </h1>

      {/* --- アカウント切り替え --- */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-full max-w-md mb-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">👥 アカウント選択</h2>
        <div className="space-y-2">
          {accounts.map((acc) => (
            <label
              key={acc.id}
              className="flex items-center gap-2 text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(acc.id)}
                onChange={() => toggleAccount(acc.id)}
              />
              <span>{acc.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* --- テーマ入力＆実行 --- */}
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
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
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

