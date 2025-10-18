import { useState } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("春の桜");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // === 短文生成 ===
  const handleGenerate = async () => {
    setLoading(true);
    setResult("生成中...");
    try {
      const res = await axios.post(
        "https://my-ai-poster.onrender.com/api/generate",
        { topic },
        { headers: { "Content-Type": "application/json" } }
      );
      setResult(res.data.generated_text);
    } catch (err) {
      setResult("エラーが発生しました。");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // === 履歴取得 ===
  const handleLoadHistory = async () => {
    try {
      const res = await axios.get("https://my-ai-poster.onrender.com/api/history");
      setHistory(res.data);
    } catch (err) {
      console.error("履歴取得エラー:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-pink-700">🌸 AI短文ジェネレーター</h1>

      {/* 入力フォーム */}
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border rounded-lg p-2 w-64 text-center shadow"
        placeholder="テーマを入力（例：春の桜）"
      />

      {/* ボタン群 */}
      <div className="flex space-x-3 mt-4">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg disabled:opacity-50"
        >
          {loading ? "生成中..." : "生成する"}
        </button>

        <button
          onClick={handleLoadHistory}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          履歴を表示
        </button>
      </div>

      {/* 結果表示 */}
      {result && (
        <div className="mt-6 bg-white rounded-lg shadow p-4 w-80 text-center">
          <p className="text-lg">{result}</p>
        </div>
      )}

      {/* 履歴一覧 */}
      {history.length > 0 && (
        <div className="mt-10 w-80">
          <h2 className="font-bold text-lg mb-2">🕒 過去の生成履歴</h2>
          <ul className="space-y-2">
            {history.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition"
              >
                <p className="text-sm text-gray-500">{item.topic}</p>
                <p className="text-gray-800 font-medium">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;


