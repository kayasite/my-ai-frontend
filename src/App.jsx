import React, { useState, useEffect } from 'react';

const Calendar = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
const Send = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>;
const Sparkles = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const Clock = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const CheckCircle = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const XCircle = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;
const User = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const Plus = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const BarChart3 = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="12" y1="3" x2="12" y2="15"/><line x1="19" y1="6" x2="19" y2="15"/><line x1="5" y1="9" x2="5" y2="15"/></svg>;
const Edit = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const Trash2 = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const Save = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const Copy = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>;
const Wand2 = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M12 3v7m0 0L4.22 2.22M12 10v7m0 0l7.78 7.78M3 21h18"/></svg>;
const LogOut = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const Lock = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const Loader = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>;
const Globe = ({ size = 24, className = "" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;

// API設定
const API_URL = 'https://my-ai-poster.onrender.com';

export default function ThreadsAutoPostSystem() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [accounts, setAccounts] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [posts, setPosts] = useState([]);

  const [accountUsername, setAccountUsername] = useState('');
  const [accountThreadsId, setAccountThreadsId] = useState('');
  const [accountAccessToken, setAccountAccessToken] = useState('');
  const [accountProxy, setAccountProxy] = useState('');
  const [promptName, setPromptName] = useState('');
  const [promptContent, setPromptContent] = useState('');
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [scheduleAccountId, setScheduleAccountId] = useState('');
  const [schedulePromptId, setSchedulePromptId] = useState('');

  const [editingPrompt, setEditingPrompt] = useState(null);
  const [editName, setEditName] = useState('');
  const [editContent, setEditContent] = useState('');
  
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [editScheduleTime, setEditScheduleTime] = useState('');
  const [editSchedulePromptId, setEditSchedulePromptId] = useState('');
  
  const [editingAccount, setEditingAccount] = useState(null);
  const [editAccountUsername, setEditAccountUsername] = useState('');
  const [editAccountThreadsId, setEditAccountThreadsId] = useState('');
  const [editAccountAccessToken, setEditAccountAccessToken] = useState('');
  const [editAccountProxy, setEditAccountProxy] = useState('');
  
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showSchedules, setShowSchedules] = useState({});
  const [showTemplates, setShowTemplates] = useState(false);

  const promptTemplates = [
    {
      name: '💡 日常の気づき投稿',
      prompt: '日常生活の中で見つけた小さな発見や気づきについて、共感を呼ぶストーリー形式で140文字以内で投稿してください。具体的なシーンを描写し、読者が「あるある」と思える内容にしてください。',
      category: 'ライフスタイル'
    },
    {
      name: '🚀 モチベーション投稿',
      prompt: '今日を前向きに過ごすためのモチベーションを上げる言葉を140文字以内で投稿してください。抽象的すぎず、具体的な行動につながるような前向きなメッセージを含めてください。',
      category: 'マインドセット'
    },
    {
      name: '📚 学び・成長投稿',
      prompt: '最近学んだことや成長につながる気づきを、初心者にもわかりやすく140文字以内で共有してください。専門用語は使わず、誰でも実践できるような内容にしてください。',
      category: '自己啓発'
    },
    {
      name: '💻 テクノロジートレンド',
      prompt: '最新のテクノロジーやデジタルツールのトレンドについて、一般の人にもわかりやすく140文字以内で解説してください。難しい技術を日常の言葉で説明し、どう役立つかを明確にしてください。',
      category: 'テック'
    },
  ];

  // API呼び出し関数
  const apiCall = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, error: error.message };
    }
  };

  // ログイン状態確認
  useEffect(() => {
    const checkLogin = async () => {
      const data = await apiCall('/api/check_login');
      if (data.logged_in) {
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        loadAllData();
      }
    };
    checkLogin();
  }, []);

  // データ読み込み
  const loadAllData = async () => {
    const [accountsData, promptsData, schedulesData, postsData] = await Promise.all([
      apiCall('/api/accounts/list'),
      apiCall('/api/prompts/list'),
      apiCall('/api/schedules/list'),
      apiCall('/api/posts/list')
    ]);

    if (accountsData.success) setAccounts(accountsData.accounts);
    if (promptsData.success) setPrompts(promptsData.prompts);
    if (schedulesData.success) setSchedules(schedulesData.schedules);
    if (postsData.success) setPosts(postsData.posts);
  };

  // ログイン
  const handleLogin = async () => {
    setLoading(true);
    setLoginError('');
    const data = await apiCall('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    });
    setLoading(false);

    if (data.success) {
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      loadAllData();
    } else {
      setLoginError(data.error || 'ログインに失敗しました');
    }
  };

  // ログアウト
  const handleLogout = async () => {
    await apiCall('/api/logout', { method: 'POST' });
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAccounts([]);
    setSchedules([]);
    setPrompts([]);
    setPosts([]);
  };

  // アカウント追加
  const addAccount = async () => {
    if (!accountUsername || !accountThreadsId || !accountAccessToken) {
      showMessage('すべての必須項目を入力してください', 'error');
      return;
    }

    setLoading(true);
    const data = await apiCall('/api/accounts/add', {
      method: 'POST',
      body: JSON.stringify({
        username: accountUsername,
        threads_id: accountThreadsId,
        access_token: accountAccessToken,
        proxy: accountProxy
      })
    });
    setLoading(false);

    if (data.success) {
      setAccounts([...accounts, data.account]);
      setAccountUsername('');
      setAccountThreadsId('');
      setAccountAccessToken('');
      setAccountProxy('');
      setShowAddAccount(false);
      showMessage('アカウントを追加しました', 'success');
    } else {
      showMessage(data.error || 'アカウントの追加に失敗しました', 'error');
    }
  };

  // アカウント編集保存
  const saveEditedAccount = async () => {
    if (!editAccountUsername || !editAccountThreadsId || !editAccountAccessToken) {
      showMessage('すべての必須項目を入力してください', 'error');
      return;
    }

    setLoading(true);
    const data = await apiCall('/api/accounts/update', {
      method: 'POST',
      body: JSON.stringify({
        accountId: editingAccount,
        username: editAccountUsername,
        threads_id: editAccountThreadsId,
        access_token: editAccountAccessToken,
        proxy: editAccountProxy
      })
    });
    setLoading(false);

    if (data.success) {
      setAccounts(accounts.map(acc =>
        acc.id === editingAccount
          ? { ...acc, username: editAccountUsername, threads_id: editAccountThreadsId, access_token: editAccountAccessToken, proxy: editAccountProxy }
          : acc
      ));
      setEditingAccount(null);
      showMessage('アカウントを更新しました', 'success');
    } else {
      showMessage(data.error || 'アカウントの更新に失敗しました', 'error');
    }
  };

  // アカウント削除
  const deleteAccount = async (accountId) => {
    if (!confirm('このアカウントを削除してもよろしいですか?')) return;

    setLoading(true);
    const data = await apiCall('/api/accounts/delete', {
      method: 'POST',
      body: JSON.stringify({ accountId })
    });
    setLoading(false);

    if (data.success) {
      setAccounts(accounts.filter(acc => acc.id !== accountId));
      setSchedules(schedules.filter(sched => sched.accountId !== accountId));
      showMessage('アカウントを削除しました', 'success');
    } else {
      showMessage(data.error || 'アカウントの削除に失敗しました', 'error');
    }
  };

  // プロンプト追加
  const addPrompt = async () => {
    if (!promptName || !promptContent) {
      showMessage('プロンプト名と内容を入力してください', 'error');
      return;
    }

    setLoading(true);
    const data = await apiCall('/api/prompts/add', {
      method: 'POST',
      body: JSON.stringify({ name: promptName, prompt: promptContent })
    });
    setLoading(false);

    if (data.success) {
      setPrompts([...prompts, data.prompt]);
      setPromptName('');
      setPromptContent('');
      showMessage('プロンプトを追加しました', 'success');
    } else {
      showMessage(data.error || 'プロンプトの追加に失敗しました', 'error');
    }
  };

  // プロンプト編集保存
  const saveEditedPrompt = async () => {
    if (!editName || !editContent) {
      showMessage('プロンプト名と内容を入力してください', 'error');
      return;
    }

    setLoading(true);
    const data = await apiCall('/api/prompts/update', {
      method: 'POST',
      body: JSON.stringify({
        promptId: editingPrompt,
        name: editName,
        prompt: editContent
      })
    });
    setLoading(false);

    if (data.success) {
      setPrompts(prompts.map(p =>
        p.id === editingPrompt ? { ...p, name: editName, prompt: editContent } : p
      ));
      setEditingPrompt(null);
      showMessage('プロンプトを更新しました', 'success');
    } else {
      showMessage(data.error || 'プロンプトの更新に失敗しました', 'error');
    }
  };

  // プロンプト削除
  const deletePrompt = async (promptId) => {
    if (!confirm('このプロンプトを削除してもよろしいですか?')) return;

    setLoading(true);
    const data = await apiCall('/api/prompts/delete', {
      method: 'POST',
      body: JSON.stringify({ promptId })
    });
    setLoading(false);

    if (data.success) {
      setPrompts(prompts.filter(p => p.id !== promptId));
      setSchedules(schedules.filter(sched => sched.promptId !== promptId));
      showMessage('プロンプトを削除しました', 'success');
    } else {
      showMessage(data.error || 'プロンプトの削除に失敗しました', 'error');
    }
  };

  // スケジュール追加
  const addSchedule = async () => {
    if (!scheduleAccountId || !schedulePromptId || !scheduleTime) {
      showMessage('すべての項目を選択してください', 'error');
      return;
    }

    setLoading(true);
    const data = await apiCall('/api/schedules/add', {
      method: 'POST',
      body: JSON.stringify({
        accountId: parseInt(scheduleAccountId),
        promptId: parseInt(schedulePromptId),
        time: scheduleTime
      })
    });
    setLoading(false);

    if (data.success) {
      setSchedules([...schedules, data.schedule]);
      setScheduleAccountId('');
      setSchedulePromptId('');
      setScheduleTime('09:00');
      showMessage('スケジュールを追加しました', 'success');
    } else {
      showMessage(data.error || 'スケジュールの追加に失敗しました', 'error');
    }
  };

  // スケジュール編集保存
  const saveEditedSchedule = async () => {
    if (!editSchedulePromptId || !editScheduleTime) {
      showMessage('すべての項目を入力してください', 'error');
      return;
    }

    setLoading(true);
    const data = await apiCall('/api/schedules/update', {
      method: 'POST',
      body: JSON.stringify({
        scheduleId: editingSchedule,
        promptId: parseInt(editSchedulePromptId),
        time: editScheduleTime
      })
    });
    setLoading(false);

    if (data.success) {
      setSchedules(schedules.map(sched =>
        sched.id === editingSchedule
          ? { ...sched, promptId: parseInt(editSchedulePromptId), time: editScheduleTime }
          : sched
      ));
      setEditingSchedule(null);
      showMessage('スケジュールを更新しました', 'success');
    } else {
      showMessage(data.error || 'スケジュールの更新に失敗しました', 'error');
    }
  };

  // スケジュール削除
  const deleteSchedule = async (scheduleId) => {
    if (!confirm('このスケジュールを削除してもよろしいですか?')) return;

    setLoading(true);
    const data = await apiCall('/api/schedules/delete', {
      method: 'POST',
      body: JSON.stringify({ scheduleId })
    });
    setLoading(false);

    if (data.success) {
      setSchedules(schedules.filter(sched => sched.id !== scheduleId));
      showMessage('スケジュールを削除しました', 'success');
    } else {
      showMessage(data.error || 'スケジュールの削除に失敗しました', 'error');
    }
  };

  // 投稿生成と実行
  const generatePost = async (promptId, accountId) => {
    setLoading(true);
    const data = await apiCall('/api/generate_post', {
      method: 'POST',
      body: JSON.stringify({ promptId, accountId })
    });
    setLoading(false);

    if (data.success) {
      setPosts([data.post, ...posts]);
      showMessage('投稿が完了しました!', 'success');
    } else {
      showMessage(data.error || '投稿に失敗しました', 'error');
    }
  };

  // テンプレート適用
  const applyTemplate = (template) => {
    setPromptName(template.name);
    setPromptContent(template.prompt);
    setShowTemplates(false);
    showMessage(`テンプレート「${template.name}」を適用しました`, 'success');
  };

  // メッセージ表示
  const showMessage = (message, type = 'success') => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // ヘルパー関数
  const getAccountUsername = (accountId) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.username : 'Unknown';
  };

  const getPromptName = (promptId) => {
    const prompt = prompts.find(p => p.id === promptId);
    return prompt ? prompt.name : 'Unknown';
  };

  const getAccountSchedules = (accountId) => {
    return schedules.filter(sched => sched.accountId === accountId);
  };

  const toggleSchedules = (accountId) => {
    setShowSchedules(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  // ログイン画面
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
                <Sparkles className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Threads Auto Post</h1>
              <p className="text-gray-600">AIで自動投稿を管理</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">パスワード</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{loginError}</p>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition shadow-lg disabled:opacity-50"
              >
                {loading ? 'ログイン中...' : 'ログイン'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // メイン画面
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Threads Auto Post</h1>
                <p className="text-sm text-gray-600">ようこそ、{currentUser?.email}さん</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut size={20} />
              ログアウト
            </button>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 size={20} />
              ダッシュボード
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition ${
                activeTab === 'accounts'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <User size={20} />
              アカウント
            </button>
            <button
              onClick={() => setActiveTab('prompts')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition ${
                activeTab === 'prompts'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Wand2 size={20} />
              プロンプト
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition ${
                activeTab === 'logs'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CheckCircle size={20} />
              ログ
            </button>
          </div>
        </div>

        {/* 成功メッセージ */}
        {successMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
            {successMessage}
          </div>
        )}

        {/* ダッシュボードタブ */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">登録アカウント</h3>
                <User size={24} />
              </div>
              <p className="text-4xl font-bold">{accounts.length}</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">スケジュール</h3>
                <Calendar size={24} />
              </div>
              <p className="text-4xl font-bold">{schedules.length}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">投稿済み</h3>
                <CheckCircle size={24} />
              </div>
              <p className="text-4xl font-bold">{posts.filter(p => p.status === 'posted').length}</p>
            </div>
          </div>
        )}

        {/* アカウント管理タブ */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Threadsアカウント管理</h3>
                <button
                  onClick={() => setShowAddAccount(!showAddAccount)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition shadow-lg"
                >
                  <Plus size={20} />
                  アカウント追加
                </button>
              </div>

              {showAddAccount && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6 border border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-4">新しいアカウントを追加</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="ユーザー名"
                      value={accountUsername}
                      onChange={(e) => setAccountUsername(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Threads ID"
                      value={accountThreadsId}
                      onChange={(e) => setAccountThreadsId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="password"
                      placeholder="Access Token"
                      value={accountAccessToken}
                      onChange={(e) => setAccountAccessToken(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="プロキシ (任意: http://user:pass@host:port)"
                      value={accountProxy}
                      onChange={(e) => setAccountProxy(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={addAccount}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        追加
                      </button>
                      <button
                        onClick={() => setShowAddAccount(false)}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                      >
                        キャンセル
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {accounts.length === 0 ? (
                  <div className="text-center py-12">
                    <User className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-500">アカウントが登録されていません</p>
                    <p className="text-xs text-gray-400 mt-2">「アカウント追加」ボタンから追加してください</p>
                  </div>
                ) : (
                  accounts.map(account => (
                    <div key={account.id} className="border border-blue-200 rounded-xl p-5 bg-gradient-to-r from-white to-blue-50">
                      {editingAccount === account.id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editAccountUsername}
                            onChange={(e) => setEditAccountUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="ユーザー名"
                          />
                          <input
                            type="text"
                            value={editAccountThreadsId}
                            onChange={(e) => setEditAccountThreadsId(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Threads ID"
                          />
                          <input
                            type="password"
                            value={editAccountAccessToken}
                            onChange={(e) => setEditAccountAccessToken(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Access Token"
                          />
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Globe size={16} className="text-gray-600" />
                              <label className="text-sm font-medium text-gray-700">プロキシ設定</label>
                            </div>
                            <input
                              type="text"
                              value={editAccountProxy}
                              onChange={(e) => setEditAccountProxy(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                              placeholder="http://user:pass@host:port (任意)"
                            />
                            <p className="text-xs text-gray-500">例: http://username:password@proxy.example.com:8080</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={saveEditedAccount}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm flex items-center gap-2"
                            >
                              <Save size={16} />
                              保存
                            </button>
                            <button
                              onClick={() => setEditingAccount(null)}
                              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-sm"
                            >
                              キャンセル
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                {account.username}
                                {account.proxy && (
                                  <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                                    <Globe size={12} />
                                    プロキシ設定済み
                                  </span>
                                )}
                              </h4>
                              <p className="text-sm text-gray-600">ID: {account.threads_id}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingAccount(account.id);
                                  setEditAccountUsername(account.username);
                                  setEditAccountThreadsId(account.threads_id);
                                  setEditAccountAccessToken(account.access_token);
                                  setEditAccountProxy(account.proxy || '');
                                }}
                                className="p-2 hover:bg-blue-50 rounded-lg transition"
                              >
                                <Edit className="text-blue-500" size={18} />
                              </button>
                              <button
                                onClick={() => deleteAccount(account.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 className="text-red-500" size={18} />
                              </button>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 pt-4 mt-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                                <Calendar size={18} />
                                スケジュール ({getAccountSchedules(account.id).length})
                              </h5>
                              <button
                                onClick={() => toggleSchedules(account.id)}
                                className="text-sm text-blue-600 hover:text-blue-700"
                              >
                                {showSchedules[account.id] ? '閉じる' : '表示'}
                              </button>
                            </div>

                            {showSchedules[account.id] && (
                              <div className="space-y-3">
                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                  <h6 className="font-semibold text-gray-700 mb-3">新しいスケジュールを追加</h6>
                                  <div className="space-y-3">
                                    <input
                                      type="time"
                                      value={scheduleTime}
                                      onChange={(e) => setScheduleTime(e.target.value)}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                    <select
                                      value={schedulePromptId}
                                      onChange={(e) => setSchedulePromptId(e.target.value)}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    >
                                      <option value="">プロンプトを選択...</option>
                                      {prompts.map(prompt => (
                                        <option key={prompt.id} value={prompt.id}>{prompt.name}</option>
                                      ))}
                                    </select>
                                    <button
                                      onClick={() => {
                                        setScheduleAccountId(account.id.toString());
                                        addSchedule();
                                      }}
                                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                                    >
                                      スケジュール追加
                                    </button>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  {getAccountSchedules(account.id).map(schedule => (
                                    <div key={schedule.id} className="bg-white rounded-lg p-3 border border-gray-200">
                                      {editingSchedule === schedule.id ? (
                                        <div className="space-y-3">
                                          <input
                                            type="time"
                                            value={editScheduleTime}
                                            onChange={(e) => setEditScheduleTime(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                          />
                                          <select
                                            value={editSchedulePromptId}
                                            onChange={(e) => setEditSchedulePromptId(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                          >
                                            <option value="">プロンプトを選択...</option>
                                            {prompts.map(prompt => (
                                              <option key={prompt.id} value={prompt.id}>{prompt.name}</option>
                                            ))}
                                          </select>
                                          <div className="flex gap-2">
                                            <button
                                              onClick={saveEditedSchedule}
                                              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-xs flex items-center gap-1"
                                            >
                                              <Save size={14} />
                                              保存
                                            </button>
                                            <button
                                              onClick={() => setEditingSchedule(null)}
                                              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-xs"
                                            >
                                              キャンセル
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <Clock className="text-blue-500" size={16} />
                                            <span className="font-semibold text-gray-800">{schedule.time}</span>
                                            <span className="text-sm text-gray-600">{getPromptName(schedule.promptId)}</span>
                                          </div>
                                          <div className="flex gap-1">
                                            <button
                                              onClick={() => {
                                                setEditingSchedule(schedule.id);
                                                setEditScheduleTime(schedule.time);
                                                setEditSchedulePromptId(schedule.promptId.toString());
                                              }}
                                              className="p-1.5 hover:bg-blue-50 rounded transition"
                                            >
                                              <Edit className="text-blue-500" size={14} />
                                            </button>
                                            <button
                                              onClick={() => deleteSchedule(schedule.id)}
                                              className="p-1.5 hover:bg-red-50 rounded transition"
                                            >
                                              <Trash2 className="text-red-500" size={14} />
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* プロンプト管理タブ */}
        {activeTab === 'prompts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">プロンプト管理</h3>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition shadow-lg"
                >
                  <Sparkles size={20} />
                  テンプレート
                </button>
              </div>

              {showTemplates && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border border-purple-200">
                  <h4 className="font-bold text-gray-800 mb-4">プロンプトテンプレート</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {promptTemplates.map((template, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-purple-200 hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-bold text-gray-800">{template.name}</h5>
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">{template.category}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.prompt}</p>
                        <button
                          onClick={() => applyTemplate(template)}
                          className="w-full px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm"
                        >
                          このテンプレートを使う
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6 border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-4">新しいプロンプトを作成</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="プロンプト名"
                    value={promptName}
                    onChange={(e) => setPromptName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <textarea
                    placeholder="プロンプト内容 (AIへの指示)"
                    value={promptContent}
                    onChange={(e) => setPromptContent(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
                  />
                  <button
                    onClick={addPrompt}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    プロンプトを追加
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {prompts.length === 0 ? (
                  <div className="text-center py-12">
                    <Wand2 className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-500">プロンプトが登録されていません</p>
                    <p className="text-xs text-gray-400 mt-2">上のフォームから追加するか、テンプレートを使用してください</p>
                  </div>
                ) : (
                  prompts.map(prompt => (
                    <div key={prompt.id} className="border border-purple-200 rounded-xl p-5 bg-gradient-to-r from-white to-purple-50">
                      {editingPrompt === prompt.id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="プロンプト名"
                          />
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
                            placeholder="プロンプト内容"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={saveEditedPrompt}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm flex items-center gap-2"
                            >
                              <Save size={16} />
                              保存
                            </button>
                            <button
                              onClick={() => setEditingPrompt(null)}
                              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-sm"
                            >
                              キャンセル
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-bold text-gray-800">{prompt.name}</h4>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">{prompt.prompt}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <div className="flex gap-2">
                              {accounts.length > 0 && (
                                <select
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      generatePost(prompt.id, parseInt(e.target.value));
                                      e.target.value = '';
                                    }
                                  }}
                                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                                >
                                  <option value="">AI生成して投稿...</option>
                                  {accounts.map(acc => (
                                    <option key={acc.id} value={acc.id}>{acc.username}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingPrompt(prompt.id);
                                  setEditName(prompt.name);
                                  setEditContent(prompt.prompt);
                                }}
                                className="p-2 hover:bg-blue-50 rounded-lg transition"
                              >
                                <Edit className="text-blue-500" size={18} />
                              </button>
                              <button
                                onClick={() => deletePrompt(prompt.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 className="text-red-500" size={18} />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">投稿ログ</h3>
              <div className="space-y-4">
                {posts.filter(post => post.status === 'posted').length > 0 ? (
                  posts.filter(post => post.status === 'posted').map(post => (
                    <div key={post.id} className="p-4 border border-blue-200 rounded-xl bg-gradient-to-r from-white to-cyan-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-blue-600">{getAccountUsername(post.accountId)}</span>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">{post.promptName}</span>
                          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            <CheckCircle size={14} />
                            投稿済み {post.postedAt}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-800 leading-relaxed">{post.content}</p>
                      <p className="text-xs text-gray-500 mt-2">文字数: {post.content.length}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-500">まだ投稿ログがありません</p>
                    <p className="text-xs text-gray-400 mt-2">スケジュールが実行されると、ここに投稿履歴が表示されます</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center gap-3">
              <Loader className="animate-spin text-blue-500" size={24} />
              <span className="text-gray-700">処理中...</span>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>💡 プロンプトのコツ:</strong> 具体的な指示(文字数、トーン、含める要素)を書くと、いい投稿が生成されます。
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>⏰ スケジュール機能:</strong> 各スケジュールに投稿時刻とプロンプトを設定できます。設定した時刻に自動的にAIが投稿を生成して投稿します。
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>🌐 プロキシ設定:</strong> 各アカウントに個別のプロキシを設定できます。プロキシを使用することで、IPアドレスを変更して投稿できます。
          </p>
          <p className="text-sm text-gray-700">
            <strong>🔗 接続先:</strong> {API_URL}
          </p>
        </div>
      </div>
    </div>
  );
}