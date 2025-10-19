import { useState, useEffect } from "react";

export default function App() {
  const [topic, setTopic] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  // === 履歴取得 ===
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

  // === 投稿生成処理 ===
  const handleGenerate = async () => {
    if (!topic) {
      alert("テーマを入力してください🌸");
      return;
    }

    setLoading(true);
    setMessage("⏳ 生成中...");
    setGeneratedText("");

    try {
      const bodyData = scheduleTime
        ? { topic, schedule_time: scheduleTime }
        : { topic };

      const response = await fetch(
        "https://my-ai-poster.onrender.com/api/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setGeneratedText(data.generated_text);
        setMessage(data.message || "✅ Threadsに投稿＆保存しました！");
        fetchHistory();
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
    <div className="min-h-screen bg-sakura-gradient flex flex-col items-center py-12 font-jp text-ink">
      <h1 className="text-3xl font-bold mb-6 text-center flex items-center gap-2">
        🌸 AI短文ジェネレーター ＆ Threads自動投稿
      </h1>

      {/* 入力フォーム */}
      <div className="bg-white/80 shadow-xl rounded-2xl p-6 w-full max-w-md">
        <input
          type="text"
          placeholder="例: 春の桜"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border border-pink-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <input
          type="datetime-local"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          className="w-full border border-pink-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <p className="text-sm text-gray-500 mb-4">
          ⏰ ここで投稿時刻（日本時間）を指定できます
        </p>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white shadow-md transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
          }`}
        >
          {loading ? "生成中..." : scheduleTime ? "📅 時間指定して投稿" : "🌸 今すぐ投稿"}
        </button>
      </div>

      {/* ステータスメッセージ */}
      {message && <p className="mt-5 text-lg">{message}</p>}

      {/* 生成結果 */}
      {generatedText && (
        <div className="mt-6 bg-white/90 shadow-md rounded-xl p-5 w-full max-w-md text-center border border-pink-100">
          <p className="text-gray-800 text-lg font-medium">{generatedText}</p>
        </div>
      )}

      {/* 履歴 */}
      <div className="mt-10 w-full max-w-md bg-white/90 rounded-xl shadow-lg p-5 border border-pink-100">
        <h2 className="text-xl font-bold mb-3 text-pink-600">🕊️ 投稿履歴</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">まだ履歴がありません。</p>
        ) : (
          <ul className="space-y-2">
            {history.map((item) => (
              <li key={item.id} className="border-b border-pink-100 pb-2">
                <p className="text-sm text-gray-600">🗒 {item.topic}</p>
                <p className="text-base text-gray-800">{item.text}</p>
                {item.created_at && (
                  <p className="text-xs text-gray-400">
                    🕒 {new Date(item.created_at).toLocaleString("ja-JP")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

