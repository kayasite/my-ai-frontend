import { useState, useEffect } from "react";

export default function App() {
  // ✅ Flask の Render API ベースURL
  const API_BASE = "https://my-ai-poster.onrender.com";

  // -------------------------------
  // 状態管理
  // -------------------------------
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [subscription, setSubscription] = useState("free"); // 🆕 サブスク状態

  // -------------------------------
  // 初回ログインチェック
  // -------------------------------
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/check_login`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.logged_in) {
          setUser(data.user);
          await fetchHistory();
          await fetchSubscription();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setAuthChecked(true);
      }
    })();
  }, []);

  // -------------------------------
  // 履歴取得
  // -------------------------------
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/history`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setHistory(data.history);
    } catch (err) {
      console.error("履歴取得失敗:", err);
    }
  };

  // -------------------------------
  // サブスク状態取得 🆕
  // -------------------------------
  const fetchSubscription = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/subscription_status`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setSubscription(data.subscription_status);
      }
    } catch (err) {
      console.error("サブスク状態取得失敗:", err);
    }
  };

  // -------------------------------
  // 登録 or ログイン
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "register" : "login";
    const res = await fetch(`${API_BASE}/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      setMessage("✅ " + (isRegister ? "登録完了！" : "ログイン成功！"));
      await fetchHistory();
      await fetchSubscription();
    } else {
      setMessage("❌ " + (data.message || "失敗しました"));
    }
  };

  // -------------------------------
  // ログアウト
  // -------------------------------
  const handleLogout = async () => {
    await fetch(`${API_BASE}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setHistory([]);
    setSubscription("free");
  };

  // -------------------------------
  // 保存テスト
  // -------------------------------
  const handleSaveTest = async () => {
    const res = await fetch(`${API_BASE}/api/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        topic: "テスト保存",
        text: `このデータは ${user} の履歴です`,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("💾 保存成功！");
      await fetchHistory();
    } else {
      setMessage("❌ 保存失敗");
    }
  };

  // -------------------------------
  // 🆕 Stripe 決済開始
  // -------------------------------
  const handleCheckout = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/create_checkout_session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Stripe Checkout へ遷移
      } else {
        setMessage("❌ チェックアウトURLの取得に失敗しました");
      }
    } catch (err) {
      console.error("Stripe checkout error:", err);
      setMessage("❌ Stripeエラーが発生しました");
    }
  };

  // -------------------------------
  // 表示レンダリング
  // -------------------------------
  if (!authChecked) return <p>読み込み中...</p>;

  // ===============================
  // ログイン前
  // ===============================
  if (!user)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">
          {isRegister ? "新規登録" : "ログイン"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-80"
        >
          <input
            type="text"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-pink-300 rounded-lg px-3 py-2 w-full mb-3"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-pink-300 rounded-lg px-3 py-2 w-full mb-3"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold"
          >
            {isRegister ? "登録" : "ログイン"}
          </button>
          <p
            onClick={() => setIsRegister(!isRegister)}
            className="mt-3 text-center text-sm text-pink-600 cursor-pointer"
          >
            {isRegister ? "ログイン画面へ" : "新規登録はこちら"}
          </p>
        </form>
        {message && <p className="mt-3 text-gray-700">{message}</p>}
      </div>
    );

  // ===============================
  // ログイン後
  // ===============================
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
      <h1 className="text-2xl font-bold text-pink-600 mb-2">
        ようこそ {user} さん
      </h1>

      {/* 🪙 サブスクステータス */}
      {subscription === "active" ? (
        <div className="p-3 bg-green-100 text-green-700 rounded-xl mb-4">
          🌟 プレミアム会員（有効）
        </div>
      ) : (
        <div className="p-3 bg-gray-100 text-gray-700 rounded-xl mb-4">
          🔒 無料プラン中
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleSaveTest}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
        >
          💾 保存テスト
        </button>
        {subscription === "free" && (
          <button
            onClick={handleCheckout}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg"
          >
            💳 プレミアム登録
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
        >
          🚪 ログアウト
        </button>
      </div>

      {message && <p className="mb-4 text-gray-700">{message}</p>}

      <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-200 w-96">
        <h2 className="text-xl font-semibold text-pink-700 mb-3">
          履歴一覧（{history.length}件）
        </h2>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {history.map((item, idx) => (
            <li
              key={idx}
              className="border border-pink-100 rounded-lg p-3 bg-pink-50"
            >
              <p className="text-sm text-gray-700 font-semibold">
                {item.topic}
              </p>
              <p className="text-sm text-gray-600">{item.text}</p>
            </li>
          ))}
          {history.length === 0 && (
            <li className="text-gray-500 text-sm">履歴はまだありません。</li>
          )}
        </ul>
      </div>
    </div>
  );
}
