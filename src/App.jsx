import { useState, useEffect } from "react";

const API_BASE = "https://my-ai-poster.onrender.com";

// ログインフォームコンポーネント
function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    setMsg("ログイン中...");
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMsg("✅ ログイン成功");
        onSuccess(data.user ?? username);
      } else {
        setMsg("❌ ログイン失敗");
      }
    } catch (e) {
      console.error(e);
      setMsg("🚨 通信エラー");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm border border-pink-200">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">🔐 ログイン</h1>
        <input
          className="border border-pink-300 rounded-lg px-4 py-3 w-full mb-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border border-pink-300 rounded-lg px-4 py-3 w-full mb-4 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full px-6 py-3 rounded-lg text-white font-semibold shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        >
          ログイン
        </button>
        {msg && <p className="mt-3 text-sm text-center text-gray-700">{msg}</p>}
      </div>
    </div>
  );
}

// メインアプリケーション
export default function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("post");

  // 投稿関連
  const [topic, setTopic] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // アカウント関連
  const [accounts, setAccounts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newAccount, setNewAccount] = useState({ name: "", user_id: "", access_token: "" });

  // 履歴
  const [history, setHistory] = useState([]);

  // スケジュール関連
  const [schedules, setSchedules] = useState([]);
  const [scheduleHour, setScheduleHour] = useState("");
  const [scheduleMinute, setScheduleMinute] = useState("");
  const [scheduleTopic, setScheduleTopic] = useState("");

  // 起動時: ログイン状態チェック
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/check_login`, { credentials: "include" });
        const data = await res.json();
        if (data.logged_in) setUser(data.user || "user");
      } catch (e) {
        console.error(e);
      } finally {
        setAuthChecked(true);
      }
    })();
  }, []);

  // ログイン後: データ取得
  useEffect(() => {
    if (!user) return;
    fetchAccounts();
    fetchHistory();
    fetchSchedules();
  }, [user]);

  // アカウント一覧取得
  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/accounts/list`, { credentials: "include" });
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
      const res = await fetch(`${API_BASE}/api/history`, { credentials: "include" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setHistory(data);
      } else if (data.success && data.data) {
        setHistory(data.data);
      }
    } catch (err) {
      console.error("履歴取得エラー:", err);
    }
  };

  // スケジュール一覧取得
  const fetchSchedules = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/schedules`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setSchedules(data.schedules);
    } catch (err) {
      console.error("スケジュール取得エラー:", err);
    }
  };

  // 投稿生成
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

      const response = await fetch(`${API_BASE}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedText(data.generated_text);
        setMessage(data.message || "✅ Threadsに投稿＆保存しました!");
        fetchHistory();
      } else {
        setMessage("❌ エラーが発生しました: " + (data.error || ""));
      }
    } catch (error) {
      setMessage("🚨 通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  // 下書き生成(複数アカウント)
  const handleGenerateDraft = async () => {
    if (!topic) return alert("テーマを入力してください!");
    if (selectedIds.length === 0) return alert("少なくとも1つのアカウントを選択してください!");

    setLoading(true);
    setMessage("生成中...");
    try {
      const res = await fetch(`${API_BASE}/api/generate_draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ topic, account_ids: selectedIds }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ 下書き保存完了!");
        fetchHistory();
      } else {
        setMessage("❌ 生成失敗: " + (data.error || ""));
        if (res.status === 403) setUser(null);
      }
    } catch (err) {
      console.error(err);
      setMessage("🚨 通信エラー");
    } finally {
      setLoading(false);
    }
  };

  // アカウント追加
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
        alert("✅ アカウントを追加しました");
      } else {
        alert(data.error || "追加に失敗しました");
      }
    } catch (err) {
      console.error(err);
      alert("通信エラー");
    }
  };

  // アカウント削除
  const handleDeleteAccount = async (id) => {
    if (!window.confirm("このアカウントを削除しますか?")) return;
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

  // スケジュール登録
  const handleAddSchedule = async () => {
    if (!scheduleTopic || scheduleHour === "" || scheduleMinute === "") {
      alert("テーマ・時刻を入力してください⏰");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/schedule_daily`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          topic: scheduleTopic,
          hour: Number(scheduleHour),
          minute: Number(scheduleMinute),
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message || "登録しました!");
        fetchSchedules();
        setScheduleTopic("");
        setScheduleHour("");
        setScheduleMinute("");
      } else {
        alert("❌ 登録に失敗しました");
      }
    } catch (err) {
      console.error(err);
      alert("🚨 通信エラー");
    }
  };

  // スケジュール削除
  const handleDeleteSchedule = async (id) => {
    if (!window.confirm("このスケジュールを削除しますか?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/schedule_daily/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        alert("🗑️ 削除しました");
        fetchSchedules();
      } else {
        alert("削除に失敗しました");
      }
    } catch (err) {
      console.error(err);
      alert("🚨 通信エラー");
    }
  };

  // ログアウト
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/logout`, { method: "POST", credentials: "include" });
    } finally {
      setUser(null);
      setAccounts([]);
      setHistory([]);
      setSchedules([]);
    }
  };

  if (!authChecked) return null;
  if (!user) return <LoginForm onSuccess={setUser} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-md border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            🌸 Threads自動投稿システム
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-700">ようこそ、<strong>{user}</strong> さん</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      {/* タブナビゲーション */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "post", label: "📝 投稿", icon: "📝" },
            { id: "accounts", label: "👥 アカウント", icon: "👥" },
            { id: "schedule", label: "⏰ スケジュール", icon: "⏰" },
            { id: "history", label: "📜 履歴", icon: "📜" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 投稿タブ */}
        {activeTab === "post" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
              <h2 className="text-xl font-bold text-pink-600 mb-4">🌸 投稿生成</h2>
              <input
                type="text"
                placeholder="テーマを入力 (例: 春の桜)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border border-pink-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full border border-pink-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <p className="text-sm text-gray-500 mb-4">⏰ 投稿時刻を指定 (空欄で即時投稿)</p>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white shadow-lg transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                }`}
              >
                {loading ? "生成中..." : scheduleTime ? "📅 時間指定して投稿" : "🌸 今すぐ投稿"}
              </button>
            </div>

            {message && (
              <div className="bg-white rounded-xl shadow-md p-4 border border-pink-100">
                <p className="text-lg text-center">{message}</p>
              </div>
            )}

            {generatedText && (
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl shadow-md p-6 border border-pink-200">
                <h3 className="font-bold text-pink-600 mb-2">生成されたテキスト:</h3>
                <p className="text-gray-800 text-lg">{generatedText}</p>
              </div>
            )}
          </div>
        )}

        {/* アカウント管理タブ */}
        {activeTab === "accounts" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
              <h2 className="text-xl font-bold text-pink-600 mb-4">➕ アカウント追加</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="アカウント名"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  className="border border-pink-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="text"
                  placeholder="user_id"
                  value={newAccount.user_id}
                  onChange={(e) => setNewAccount({ ...newAccount, user_id: e.target.value })}
                  className="border border-pink-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="text"
                  placeholder="access_token"
                  value={newAccount.access_token}
                  onChange={(e) => setNewAccount({ ...newAccount, access_token: e.target.value })}
                  className="border border-pink-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <button
                onClick={handleAddAccount}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg"
              >
                追加する
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
              <h2 className="text-xl font-bold text-pink-600 mb-4">👤 登録済みアカウント</h2>
              {accounts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">まだアカウントがありません</p>
              ) : (
                <div className="space-y-2">
                  {accounts.map((acc) => (
                    <div key={acc.id} className="flex justify-between items-center bg-pink-50 p-3 rounded-lg border border-pink-100">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(acc.id)}
                          onChange={() =>
                            setSelectedIds((prev) =>
                              prev.includes(acc.id) ? prev.filter((x) => x !== acc.id) : [...prev, acc.id]
                            )
                          }
                          className="w-4 h-4"
                        />
                        <span className="font-medium">{acc.name}</span>
                      </label>
                      <button
                        onClick={() => handleDeleteAccount(acc.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedIds.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
                <h2 className="text-xl font-bold text-pink-600 mb-4">📝 選択アカウントで下書き生成</h2>
                <input
                  type="text"
                  placeholder="テーマを入力"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full border border-pink-300 rounded-lg px-4 py-3 mb-3 focus:ring-2 focus:ring-pink-400"
                />
                <button
                  onClick={handleGenerateDraft}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white shadow-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  }`}
                >
                  {loading ? "生成中..." : "✨ 下書きを作成"}
                </button>
                {message && <p className="mt-3 text-center">{message}</p>}
              </div>
            )}
          </div>
        )}

        {/* スケジュールタブ */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
              <h2 className="text-xl font-bold text-pink-600 mb-4">📅 定期投稿スケジュール登録</h2>
              <input
                type="text"
                placeholder="テーマ (例: 今日の一言)"
                value={scheduleTopic}
                onChange={(e) => setScheduleTopic(e.target.value)}
                className="w-full border border-pink-300 rounded-lg px-4 py-3 mb-3 focus:ring-2 focus:ring-pink-400"
              />
              <div className="flex gap-3 mb-3">
                <input
                  type="number"
                  placeholder="時 (0-23)"
                  min="0"
                  max="23"
                  value={scheduleHour}
                  onChange={(e) => setScheduleHour(e.target.value)}
                  className="flex-1 border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="number"
                  placeholder="分 (0-59)"
                  min="0"
                  max="59"
                  value={scheduleMinute}
                  onChange={(e) => setScheduleMinute(e.target.value)}
                  className="flex-1 border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <button
                onClick={handleAddSchedule}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg"
              >
                🕒 登録する
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
              <h2 className="text-xl font-bold text-pink-600 mb-4">📋 登録済みスケジュール</h2>
              {schedules.length === 0 ? (
                <p className="text-gray-500 text-center py-4">まだスケジュールがありません</p>
              ) : (
                <ul className="space-y-3">
                  {schedules.map((item) => (
                    <li key={item.id} className="flex justify-between items-center bg-pink-50 p-4 rounded-lg border border-pink-100">
                      <div>
                        <p className="font-medium text-gray-800">🗒 {item.topic || "(無題)"}</p>
                        <p className="text-sm text-gray-600">
                          ⏰ 毎日 {String(item.hour).padStart(2, "0")}:{String(item.minute).padStart(2, "0")}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteSchedule(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold"
                      >
                        削除
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* 履歴タブ */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
            <h2 className="text-xl font-bold text-pink-600 mb-4">📜 投稿履歴</h2>
            {history.length === 0 ? (
              <p className="text-gray-500 text-center py-8">まだ履歴がありません</p>
            ) : (
              <ul className="space-y-3">
                {history.map((item) => (
                  <li key={item.id} className="border-b border-pink-100 pb-3">
                    <p className="text-sm text-gray-600 mb-1">🗒 {item.topic}</p>
                    <p className="text-base text-gray-800 mb-1">{item.text}</p>
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
        )}
      </div>
    </div>
  );
}