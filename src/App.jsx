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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-pink-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-pink-200">
        <h1 className="text-2xl font-bold text-pink-600 mb-6">🔐 ログイン</h1>
        <input
          className="border border-pink-300 rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-pink-400"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border border-pink-300 rounded-lg px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-pink-400"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full px-6 py-2 rounded-lg text-white font-semibold shadow-md bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
        >
          ログイン
        </button>
        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
      </div>
    </div>
  );
}

// メインアプリ
export default function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");

  // 下書き生成関連
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // アカウント関連
  const [accounts, setAccounts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newAccount, setNewAccount] = useState({ name: "", user_id: "", access_token: "" });

  // 履歴関連
  const [history, setHistory] = useState([]);

  // スケジュール関連
  const [schedules, setSchedules] = useState([]);
  const [scheduleTopic, setScheduleTopic] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [scheduleMsg, setScheduleMsg] = useState("");

  // 起動時:ログイン状態チェック
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

  // ログイン後:データ取得
  useEffect(() => {
    if (!user) return;
    fetchAccounts();
    fetchHistory();
    fetchSchedules();
  }, [user]);

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

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/history`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setHistory(data.data);
    } catch (err) {
      console.error("履歴取得エラー:", err);
    }
  };

  const fetchSchedules = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/schedules`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setSchedules(data.schedules);
    } catch (err) {
      console.error("スケジュール取得エラー:", err);
    }
  };

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

  const handleGenerate = async () => {
    if (!topic) return alert("テーマを入力してください!");
    if (selectedIds.length === 0) return alert("少なくとも1つのアカウントを選択してください!");

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
        setResult("✅ 下書き保存完了!");
        fetchHistory();
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

  const handleAddSchedule = async () => {
    if (!scheduleTopic || hour === "" || minute === "") {
      alert("テーマ・時刻を入力してください⏰");
      return;
    }

    setScheduleMsg("登録中...");
    try {
      const res = await fetch(`${API_BASE}/api/schedule_daily`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          topic: scheduleTopic,
          hour: Number(hour),
          minute: Number(minute),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setScheduleMsg(data.message || "登録しました!");
        fetchSchedules();
        setScheduleTopic("");
        setHour("");
        setMinute("");
      } else {
        setScheduleMsg("❌ 登録に失敗しました");
      }
    } catch (err) {
      console.error(err);
      setScheduleMsg("🚨 通信エラー");
    }
  };

  const handleDeleteSchedule = async (id) => {
    if (!window.confirm("このスケジュールを削除しますか?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/schedule_daily/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setScheduleMsg("🗑️ 削除しました");
        fetchSchedules();
      } else {
        setScheduleMsg("削除に失敗しました");
      }
    } catch (err) {
      console.error(err);
      setScheduleMsg("🚨 通信エラー");
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-pink-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-pink-600">🌸 Threads投稿管理システム</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-700">ようこそ、{user} さん</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      {/* タブナビゲーション */}
      <div className="bg-white border-b border-pink-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: "generate", label: "📝 下書き生成", icon: "✨" },
              { id: "accounts", label: "👥 アカウント管理", icon: "⚙️" },
              { id: "schedule", label: "⏰ スケジュール", icon: "📅" },
              { id: "history", label: "📜 履歴", icon: "🕒" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-pink-600 border-b-2 border-pink-600"
                    : "text-gray-600 hover:text-pink-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 下書き生成タブ */}
        {activeTab === "generate" && (
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">✨ 下書き生成</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">投稿するアカウント</label>
                <div className="space-y-2">
                  {accounts.length === 0 ? (
                    <p className="text-gray-500 text-sm">アカウント管理タブからアカウントを追加してください</p>
                  ) : (
                    accounts.map((acc) => (
                      <label key={acc.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(acc.id)}
                          onChange={() =>
                            setSelectedIds((prev) =>
                              prev.includes(acc.id) ? prev.filter((x) => x !== acc.id) : [...prev, acc.id]
                            )
                          }
                        />
                        <span className="text-gray-700">{acc.name}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>

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
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                {loading ? "生成中..." : "✨ 下書きを作成"}
              </button>

              {result && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg border text-gray-800">
                  {result}
                </div>
              )}
            </div>
          </div>
        )}

        {/* アカウント管理タブ */}
        {activeTab === "accounts" && (
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">➕ アカウント追加</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="アカウント名"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  className="border border-pink-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="user_id"
                  value={newAccount.user_id}
                  onChange={(e) => setNewAccount({ ...newAccount, user_id: e.target.value })}
                  className="border border-pink-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="access_token"
                  value={newAccount.access_token}
                  onChange={(e) => setNewAccount({ ...newAccount, access_token: e.target.value })}
                  className="border border-pink-300 rounded-lg px-3 py-2"
                />
              </div>
              <button
                onClick={handleAddAccount}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                追加する
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">👤 登録済みアカウント</h2>
              {accounts.length === 0 ? (
                <p className="text-gray-500">まだアカウントがありません。</p>
              ) : (
                <div className="space-y-2">
                  {accounts.map((acc) => (
                    <div key={acc.id} className="flex justify-between items-center border-b py-3">
                      <span className="text-gray-700 font-medium">{acc.name}</span>
                      <button
                        onClick={() => handleDeleteAccount(acc.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* スケジュールタブ */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">📅 定期投稿スケジュール登録</h2>
              <input
                type="text"
                placeholder="テーマ（例: 春の桜）"
                value={scheduleTopic}
                onChange={(e) => setScheduleTopic(e.target.value)}
                className="border border-pink-300 rounded-lg px-4 py-2 w-full mb-3"
              />
              <div className="flex gap-2 mb-3">
                <input
                  type="number"
                  placeholder="時"
                  min="0"
                  max="23"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  className="border border-pink-300 rounded-lg px-3 py-2 w-1/2"
                />
                <input
                  type="number"
                  placeholder="分"
                  min="0"
                  max="59"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  className="border border-pink-300 rounded-lg px-3 py-2 w-1/2"
                />
              </div>
              <button
                onClick={handleAddSchedule}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                🕒 登録する
              </button>
              {scheduleMsg && <p className="mt-3 text-gray-700">{scheduleMsg}</p>}
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">📋 登録済みスケジュール</h2>
              {schedules.length === 0 ? (
                <p className="text-gray-500">まだスケジュールがありません。</p>
              ) : (
                <div className="space-y-3">
                  {schedules.map((item) => (
                    <div
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
                        onClick={() => handleDeleteSchedule(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 履歴タブ */}
        {activeTab === "history" && (
          <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">📜 あなたの下書き履歴</h2>
            {history.length === 0 ? (
              <p className="text-gray-500">まだ履歴がありません。</p>
            ) : (
              <div className="space-y-3">
                {history.map((h) => (
                  <div key={h.id} className="border-b py-3">
                    <p className="font-semibold text-gray-800">{h.topic}</p>
                    <p className="text-gray-600 mt-1">{h.text}</p>
                    {h.created_at && (
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(h.created_at).toLocaleString("ja-JP")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
