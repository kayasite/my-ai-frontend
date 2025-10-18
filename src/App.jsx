import { useState } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("春の桜");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
      <h1 className="text-3xl font-bold mb-4 text-pink-700">🌸 AI短文ジェネレーター</h1>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border rounded-lg p-2 w-64 text-center shadow"
        placeholder="テーマを入力"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg disabled:opacity-50"
      >
        {loading ? "生成中..." : "生成する"}
      </button>

      {result && (
        <div className="mt-6 bg-white rounded-lg shadow p-4 w-80 text-center">
          <p className="text-lg">{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;

