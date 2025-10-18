import { useState, useEffect } from "react";

export default function App() {
  const [topic, setTopic] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [apiError, setApiError] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await fetch("https://my-ai-poster.onrender.com/api/history");
      
      if (!res.ok) {
        console.warn(`Error: ${res.status}`);
        setApiError(true);
        return;
      }
      
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
      setApiError(false);
    } catch (err) {
      console.error("Error:", err);
      setApiError(true);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setMessage("テーマを入力してください");
      return;
    }

    setLoading(true);
    setMessage("生成中...");
    setGeneratedText("");

    try {
      const bodyData = scheduleTime
        ? { topic, schedule_time: scheduleTime }
        : { topic };

      const response = await fetch("https://my-ai-poster.onrender.com/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setGeneratedText(data.generated_text);
        setMessage(data.message || "Threadsに投稿＆保存しました!");
        setTopic("");
        setScheduleTime("");
        fetchHistory();
      } else {
        setMessage(`エラー: ${data.error || "エラーが発生しました"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("サーバーに接続できません。しばらくしてからお試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-white rounded-full p-4 shadow-lg mb-4">
            <span className="text-5xl">🌸</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI短文ジェネレーター
          </h1>
          <p className="text-gray-600">Threads自動投稿システム</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 backdrop-blur-sm bg-opacity-95">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📝 投稿テーマ
              </label>
              <input
                type="text"
                placeholder="例: 春の桜、朝のコーヒー、週末の過ごし方..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border-2 border-pink-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition-all outline-none text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ⏰ 投稿時刻(オプション)
              </label>
              <input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full border-2 border-pink-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition-all outline-none text-gray-800"
              />
              <p className="text-xs text-gray-500 mt-2">日本時間で投稿時刻を指定できます</p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all transform ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 active:scale-95"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  生成中...
                </span>
              ) : scheduleTime ? (
                "📅 時間指定して投稿"
              ) : (
                "🚀 今すぐ投稿"
              )}
            </button>

            {message && (
              <div className={`p-4 rounded-2xl text-center font-medium ${
                message.includes("✅") || message.includes("成功") || message.includes("保存") ? "bg-green-50 text-green-700 border-2 border-green-200" :
                message.includes("❌") || message.includes("エラー") ? "bg-red-50 text-red-700 border-2 border-red-200" :
                "bg-blue-50 text-blue-700 border-2 border-blue-200"
              }`}>
                {message}
              </div>
            )}

            {generatedText && (
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">✨</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 mb-2">生成された投稿</p>
                    <p className="text-gray-800 text-lg leading-relaxed">{generatedText}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">🕊️</span>
            <h2 className="text-2xl font-bold text-gray-800">投稿履歴</h2>
          </div>

          {apiError ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">⚠️</span>
              <p className="text-gray-500 text-lg mb-2">サーバーに接続できません</p>
              <button
                onClick={fetchHistory}
                className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
              >
                再試行
              </button>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📭</span>
              <p className="text-gray-400 text-lg">まだ履歴がありません</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-5 border-2 border-transparent hover:border-pink-300 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold text-pink-600">🗒</span>
                        <span className="text-sm font-medium text-gray-600">{item.topic}</span>
                      </div>
                      <p className="text-gray-800 mb-2 leading-relaxed">{item.text}</p>
                      {item.created_at && (
                        <p className="text-xs text-gray-400 flex items-center">
                          <span className="mr-1">🕒</span>
                          {new Date(item.created_at).toLocaleString("ja-JP")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
