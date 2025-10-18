import { useState, useEffect } from "react";

export default function App() {
  const [topic, setTopic] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [message, setMessage] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  // === スケジュール一覧取得 ===
  const fetchSchedules = async () => {
    try {
      const res = await fetch("https://my-ai-poster.onrender.com/api/schedules");
      const data = await res.json();
      if (data.success) {
        setSchedules(data.schedules);
      }
    } catch (err) {
      console.error("スケジュール取得エラー:", err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // === スケジュール登録 ===
  const handleAddSchedule = async () => {
    if (!topic || hour === "" || minute === "") {
      alert("テーマ・時刻を入力してください⏰");
      return;
    }

    setLoading(true);
    setMessage("登録中...");

    try {
      const res = await fetch("https://my-ai-poster.onrender.com/api/schedule_daily", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          hour: Number(hour),
          minute: Number(minute),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage(data.message || "登録しました！");
        fetchSchedules();
      } else {
        setMessage("❌ 登録に失敗しました");
      }
    } catch (err) {
      console.error(err);
      setMessage("🚨 通信エラー");
    } finally {
      setLoading(false);
    }
  };

  // === スケジュール削除 ===
  const handleDelete = async (id) => {
    if (!window.confirm("このスケジュールを削除しますか？")) return;
    try {
      const res = await fetch(`https://my-ai-poster.onrender.com/api/schedule_daily/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessage("🗑️ 削除しました");
        fetchSchedules();
      } else {
        setMessage("削除に失敗しました");
      }
    } catch (err) {
      console.error(err);
      setMessage("🚨 通信エラー");
    }
  };

  // === 全削除 ===
  const handleClearAll = async () => {
    if (!window.confirm("⚠️ 全スケジュールを削除しますか？")) return;
    try {
      const res = await fetch("https://my-ai-poster.onrender.com/api/schedule_clear", {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessage("🧹 全スケジュールを削除しました");
        fetchSchedules();
      }
    } catch (err) {
      console.error(err);
      setMessage("🚨 通信エラー");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6">🕒 AI自動投稿スケジューラー</h1>

      {/* --- 登録フォーム --- */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-pink-200 w-full max-w-md">
        <h2 className="text-xl font-semibold text-pink-600 mb-3">📅 スケジュール登録</h2>
        <input
          type="text"
          placeholder="テーマ（例: 春の桜）"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-pink-300 rounded-lg px-4 py-2 w-full mb-3 focus:ring-2 focus:ring-pink-400"
        />
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            placeholder="時"
            min="0"
            max="23"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="border border-pink-300 rounded-lg px-3 py-2 w-1/2 focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="number"
            placeholder="分"
            min="0"
            max="59"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="border border-pink-300 rounded-lg px-3 py-2 w-1/2 focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <button
          onClick={handleAddSchedule}
          disabled={loading}
          className={`w-full px-6 py-2 rounded-lg text-white font-semibold shadow-md transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
          }`}
        >
          {loading ? "登録中..." : "🕒 登録する"}
        </button>
      </div>

      {/* --- メッセージ --- */}
      {message && <p className="mb-4 text-gray-700 text-lg">{message}</p>}

      {/* --- スケジュール一覧 --- */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-pink-200 w-full max-w-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-pink-600">📋 登録済みスケジュール</h2>
          <button
            onClick={handleClearAll}
            className="text-sm text-red-500 hover:text-red-700"
          >
            全削除
          </button>
        </div>

        {schedules.length === 0 ? (
          <p className="text-gray-500">まだスケジュールがありません。</p>
        ) : (
          <ul className="space-y-3">
            {schedules.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-pink-50 p-3 rounded-lg border border-pink-100"
              >
                <div>
                  <p className="text-gray-700 font-medium">🗒 {item.topic || "（無題）"}</p>
                  <p className="text-sm text-gray-500">
                    ⏰ {String(item.hour).padStart(2, "0")}:{String(item.minute).padStart(2, "0")}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
