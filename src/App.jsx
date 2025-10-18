import { useState, useEffect } from "react";

export default function App() {
  const [topic, setTopic] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  // 履歴取得
  const fetchHistory = async () => {
    try {
      const res = await fetch("https://my-ai-poster.onrender.com/api/history");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("履歴取得エラー:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // 投稿処理
  const handleGenerate = async () => {
    if (!topic) {
      alert("テーマを入力してください🌸");
      return;
    }
    setLoading(true);
    setMessage("⏳ 生成中...");
    setGeneratedText("");

    try {
      const response = await fetch("https://my-ai-poster.onrender.com/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedText(data.generated_text);
        setMessage("✅ Threadsに投稿＆保存しました！");
        fetchHistory(); // ✅ 生成後に履歴を再取得
      } else {
        setMessage("❌ エラーが発生しました");
      }
    } catch (error) {
      setMessage("🚨 通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6">🌸 AI短文ジェネレーター & Threads投稿</h1>

      <input
        type="text"
        placeholder="例: 春の桜"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border border-pink-300 rounded-lg px-4 py-2 w-64 mb-4 focus:ring-2 focus:ring-pink-400"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`px-6 py-2 rounded-lg text-white font-semibold shadow-md transition-all ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
        }`}
      >
        {loading ? "生成中..." : "🌸 生成して投稿"}
      </button>

      {message && <p className="mt-4 text-lg">{message}</p>}

      {generatedText && (
        <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-80 text-center border border-pink-100">
          <p className="text-gray-700 text-lg font-medium">{generatedText}</p>
        </div>
      )}

      {/* 履歴一覧 */}
      <div className="mt-8 w-full max-w-md bg-white rounded-xl shadow-lg p-4 border border-pink-100">
        <h2 className="text-xl font-semibold mb-3 text-pink-600">🕊️ 投稿履歴</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">まだ履歴がありません。</p>
        ) : (
          <ul className="space-y-2">
            {history.map((item) => (
              <li key={item.id} className="border-b border-pink-100 pb-2">
                <p className="text-sm text-gray-600">🗒 {item.topic}</p>
                <p className="text-base text-gray-800">{item.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
