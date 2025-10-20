import React, { useState } from 'react';

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

export default function ThreadsAutoPostSystem() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [accounts, setAccounts] = useState([
    { id: 1, username: '@tech_daily', threadsId: '1234567890', accessToken: 'EAAxxxxxxxx...', status: 'active' },
    { id: 2, username: '@lifestyle_tips', threadsId: '0987654321', accessToken: 'EAAyyyyyyyy...', status: 'active' },
  ]);

  const [schedules, setSchedules] = useState([
    { id: 1, accountId: 1, time: '09:00', promptId: 1, enabled: true },
    { id: 2, accountId: 1, time: '15:00', promptId: 2, enabled: true },
    { id: 3, accountId: 1, time: '21:00', promptId: 1, enabled: true },
    { id: 4, accountId: 2, time: '12:00', promptId: 3, enabled: true },
    { id: 5, accountId: 2, time: '18:00', promptId: 3, enabled: true },
  ]);

  const [prompts, setPrompts] = useState([
    { 
      id: 1, 
      accountId: null, 
      name: 'テクノロジーニュース',
      prompt: '最新のAIやプログラミングに関する興味深いトピックについて、140文字以内であかりやすく投稿を作成してください。技術的な内容を一般の人にも理解できるように説明し、フレンドリーなトーンで書いてください。',
      enabled: true
    },
    { 
      id: 2, 
      accountId: null, 
      name: '開発者向けTips',
      prompt: 'プログラミングやコーディングに関する実用的なTipsを1つ紹介してください。具体例を含めて、初心者にもあかりやすく140文字以内で説明してください。',
      enabled: true
    },
    { 
      id: 3, 
      accountId: null, 
      name: 'ライフハック',
      prompt: '日常生活を豊かにする簡単なライフハックを1つ紹介してください。実践しやすく、すぐ効果が実感できる内容を、140文字以内でポジティブなトーンで書いてください。',
      enabled: true
    },
  ]);

  const [posts, setPosts] = useState([
    { id: 1, accountId: 1, content: 'AIの進化により、コーディングの効率が飛躍的に向上しています。GitHub Copilotなどのツールを活用することで、開発スピードが2倍以上に!', status: 'posted', scheduledTime: '09:00', postedAt: '2025-10-20 09:00', promptName: 'テクノロジーニュース' },
    { id: 2, accountId: 1, content: 'コードレビューのポイント: 可読性 > 賢さ。後から見たときに理解できるコードが良いコードです。', status: 'scheduled', scheduledTime: '15:00', promptName: '開発者向けTips' },
    { id: 3, accountId: 2, content: '朝の5分瞑想で1日のパフォーマンスが変わる。小さな習慣が大きな変化を生みます。', status: 'scheduled', scheduledTime: '12:00', promptName: 'ライフハック' },
  ]);

  const [accountUsername, setAccountUsername] = useState('');
  const [accountThreadsId, setAccountThreadsId] = useState('');
  const [accountAccessToken, setAccountAccessToken] = useState('');
  const [promptName, setPromptName] = useState('');
  const [promptContent, setPromptContent] = useState('');
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [scheduleAccountId, setScheduleAccountId] = useState(1);
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
  
  const [generating, setGenerating] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showSchedules, setShowSchedules] = useState({});

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
      prompt: '最近学んだことや成長につながる気づきを、初心者にもあかりやすく140文字以内で共有してください。専門用語は使わず、誰でも実践できるような内容にしてください。',
      category: '自己啓発'
    },
    {
      name: '💻 テクノロジートレンド',
      prompt: '最新のテクノロジーやデジタルツールのトレンドについて、一般の人にもあかりやすく140文字以内で解説してください。難しい技術を日常の言葉で説明し、どう役立つかを明確にしてください。',
      category: 'テック'
    },
    {
      name: '🎯 生産性ハック',
      prompt: '仕事や日常で使える具体的な生産性向上のテクニックを1つ、140文字以内で紹介してください。すぐに試せる方法で、効果が実感しやすい内容にしてください。',
      category: '生産性'
    },
    {
      name: '❓ 問いかけ・対話型',
      prompt: 'フォロワーの意見や経験を引き出す質問形式の投稿を140文字以内で作成してください。誰でも答えやすく、会話が生まれやすい質問にしてください。',
      category: 'エンゲージメント'
    },
    {
      name: '📊 データ・統計引用',
      prompt: '興味深い統計データや調査結果を引用し、その意味や実生活への影響を140文字以内であかりやすく解説してください。数字を使いながらも、親しみやすい表現を心がけてください。',
      category: '情報共有'
    },
    {
      name: '🌟 成功事例・ケーススタディ',
      prompt: '小さな成功体験や興味深いケーススタディを、学びとともに140文字以内で共有してください。読者が自分ごととして捉えられるような具体的なストーリーにしてください。',
      category: 'ストーリー'
    },
  ];

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const addAccount = () => {
    if (accountUsername && accountThreadsId && accountAccessToken) {
      setAccounts([...accounts, {
        id: accounts.length + 1,
        username: accountUsername.startsWith('@') ? accountUsername : '@' + accountUsername,
        threadsId: accountThreadsId,
        accessToken: accountAccessToken,
        status: 'active'
      }]);
      setAccountUsername('');
      setAccountThreadsId('');
      setAccountAccessToken('');
      setShowAddAccount(false);
      showSuccessMessage('アカウントを追加しました!');
    } else {
      alert('すべての項目を入力してください');
    }
  };

  const startEditAccount = (account) => {
    setEditingAccount(account.id);
    setEditAccountUsername(account.username);
    setEditAccountThreadsId(account.threadsId);
    setEditAccountAccessToken(account.accessToken);
  };

  const saveEditedAccount = () => {
    if (editingAccount) {
      setAccounts(accounts.map(a => 
        a.id === editingAccount ? {
          ...a,
          username: editAccountUsername.startsWith('@') ? editAccountUsername : '@' + editAccountUsername,
          threadsId: editAccountThreadsId,
          accessToken: editAccountAccessToken
        } : a
      ));
      setEditingAccount(null);
      setEditAccountUsername('');
      setEditAccountThreadsId('');
      setEditAccountAccessToken('');
      showSuccessMessage('アカウントを更新しました!');
    }
  };

  const cancelEditAccount = () => {
    setEditingAccount(null);
    setEditAccountUsername('');
    setEditAccountThreadsId('');
    setEditAccountAccessToken('');
  };

  const generateAIPost = (promptId) => {
    const prompt = prompts.find(p => p.id === promptId);
    if (!prompt) return;

    setGenerating(true);
    setSelectedPromptId(promptId);
    
    setTimeout(() => {
      const sampleResponses = [
        'AIと人間の協働が新しい時代を創る。技術は道具であり、それを使いこなす私たちの創造性こそが未来を形作ります。',
        'プログラミング学習のコツ: 完璧を目指さず、まず動くものを作る。そこから改善していくプロセスが最も学びになります。',
        'デバッグの極意: エラーメッセージを恐れずに読む。そこに答えが必ず隠されています。',
        '朝の30分で1日が変わる。スマホを見る前に、今日の目標を3つ書き出してみよう。',
        '生産性を上げる秘訣: マルチタスクをやめ、1つのことに集中する時間を作ることです。',
        'コードは詩のように美しくあるべき。シンプルで読みやすいコードが、後のあなたを助けます。',
      ];

      const newPost = {
        id: posts.length + 1,
        accountId: prompt.accountId || accounts[0].id,
        content: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
        status: 'draft',
        scheduledTime: '',
        promptName: prompt.name,
      };

      setPosts([newPost, ...posts]);
      setGenerating(false);
      setSelectedPromptId(null);
      showSuccessMessage('投稿を生成しました!');
    }, 2000);
  };

  const addPrompt = () => {
    if (promptName && promptContent) {
      setPrompts([...prompts, {
        id: prompts.length + 1,
        accountId: null,
        name: promptName,
        prompt: promptContent,
        enabled: true
      }]);
      setPromptName('');
      setPromptContent('');
      showSuccessMessage('プロンプトを追加しました!');
    } else {
      alert('プロンプト名とプロンプト内容を入力してください');
    }
  };

  const startEditPrompt = (prompt) => {
    setEditingPrompt(prompt.id);
    setEditName(prompt.name);
    setEditContent(prompt.prompt);
  };

  const saveEditedPrompt = () => {
    if (editingPrompt) {
      setPrompts(prompts.map(p => 
        p.id === editingPrompt ? { ...p, name: editName, prompt: editContent } : p
      ));
      setEditingPrompt(null);
      setEditName('');
      setEditContent('');
      showSuccessMessage('プロンプトを更新しました!');
    }
  };

  const deletePrompt = (id) => {
    setPrompts(prompts.filter(p => p.id !== id));
    showSuccessMessage('プロンプトを削除しました');
  };

  const useTemplate = (template) => {
    setPromptContent(template.prompt);
  };

  const addSchedule = () => {
    if (!schedulePromptId) {
      alert('プロンプトを選択してください');
      return;
    }
    
    setSchedules([...schedules, {
      id: schedules.length + 1,
      accountId: parseInt(scheduleAccountId),
      time: scheduleTime,
      promptId: parseInt(schedulePromptId),
      enabled: true
    }]);
    setSchedulePromptId('');
    showSuccessMessage('スケジュールを追加しました!');
  };

  const startEditSchedule = (schedule) => {
    setEditingSchedule(schedule.id);
    setEditScheduleTime(schedule.time);
    setEditSchedulePromptId(schedule.promptId);
  };

  const saveEditedSchedule = () => {
    if (editingSchedule) {
      setSchedules(schedules.map(s => 
        s.id === editingSchedule ? { ...s, time: editScheduleTime, promptId: parseInt(editSchedulePromptId) } : s
      ));
      setEditingSchedule(null);
      setEditScheduleTime('');
      setEditSchedulePromptId('');
      showSuccessMessage('スケジュールを更新しました!');
    }
  };

  const toggleSchedule = (id) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
    showSuccessMessage('スケジュールを削除しました');
  };

  const deletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id));
    showSuccessMessage('投稿を削除しました');
  };

  const getAccountUsername = (accountId) => {
    return accounts.find(a => a.id === accountId)?.username || '';
  };

  const getPromptName = (promptId) => {
    return prompts.find(p => p.id === promptId)?.name || '未設定';
  };

  const toggleScheduleVisibility = (accountId) => {
    setShowSchedules(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-8">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
      `}</style>
      <div className="max-w-6xl mx-auto">
        {successMessage && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <CheckCircle size={20} />
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
              <Sparkles className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Threads自動投稿システム</h1>
              <p className="text-gray-600 text-sm">プロンプトで自由にAI投稿を生成</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'ダッシュボード', icon: BarChart3 },
              { id: 'accounts', label: 'アカウント', icon: User },
              { id: 'ai', label: 'AI投稿', icon: Sparkles },
              { id: 'logs', label: 'ログ', icon: Clock },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">予約済み</span>
                  <Clock size={24} />
                </div>
                <div className="text-3xl font-bold">{posts.filter(p => p.status === 'scheduled').length}</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">アクティブスケジュール</span>
                  <Sparkles size={24} />
                </div>
                <div className="text-3xl font-bold">{schedules.filter(s => s.enabled).length}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Threadsアカウント</h3>
                <button 
                  onClick={() => setShowAddAccount(!showAddAccount)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  <Plus size={18} />
                  アカウント追加
                </button>
              </div>

              {showAddAccount && (
                <div className="mb-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-gray-800 mb-4">新しいアカウントを追加</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ユーザー名</label>
                      <input
                        type="text"
                        value={accountUsername}
                        onChange={(e) => setAccountUsername(e.target.value)}
                        placeholder="@username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Threads ID</label>
                      <input
                        type="text"
                        value={accountThreadsId}
                        onChange={(e) => setAccountThreadsId(e.target.value)}
                        placeholder="1234567890"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">アクセストークン</label>
                      <textarea
                        value={accountAccessToken}
                        onChange={(e) => setAccountAccessToken(e.target.value)}
                        placeholder="EAAxxxxxxxxxxxxxxxxx..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">Meta Developer Platformから取得したアクセストークンを入力してください</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={addAccount}
                        className="flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                      >
                        追加
                      </button>
                      <button
                        onClick={() => setShowAddAccount(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                      >
                        キャンセル
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {accounts.map(account => {
                  const accountSchedules = schedules.filter(s => s.accountId === account.id);
                  
                  return (
                    <div key={account.id} className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition">
                      {editingAccount === account.id ? (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-800 mb-4">アカウント編集</h4>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ユーザー名</label>
                            <input
                              type="text"
                              value={editAccountUsername}
                              onChange={(e) => setEditAccountUsername(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Threads ID</label>
                            <input
                              type="text"
                              value={editAccountThreadsId}
                              onChange={(e) => setEditAccountThreadsId(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">アクセストークン</label>
                            <textarea
                              value={editAccountAccessToken}
                              onChange={(e) => setEditAccountAccessToken(e.target.value)}
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={saveEditedAccount}
                              className="flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium flex items-center justify-center gap-2"
                            >
                              <Save size={18} />
                              保存
                            </button>
                            <button
                              onClick={cancelEditAccount}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                              キャンセル
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {account.username.slice(1, 3).toUpperCase()}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-800 text-lg">{account.username}</h4>
                                <div className="mt-2 space-y-1">
                                  <p className="text-xs text-gray-500">
                                    <span className="font-medium">Threads ID:</span> {account.threadsId}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    <span className="font-medium">トークン:</span> {account.accessToken.slice(0, 10)}...••••••••
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                account.status === 'active' ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-700'
                              }`}>
                                {account.status === 'active' ? 'アクティブ' : '無効'}
                              </span>
                              <button
                                onClick={() => startEditAccount(account)}
                                className="p-2 hover:bg-blue-50 rounded-lg transition"
                              >
                                <Edit className="text-blue-500" size={18} />
                              </button>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <button
                              onClick={() => toggleScheduleVisibility(account.id)}
                              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition"
                            >
                              <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                                <Clock size={18} className="text-blue-500" />
                                投稿スケジュール
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  {accountSchedules.length}件
                                </span>
                              </h5>
                              <span className="text-sm text-blue-600">
                                {showSchedules[account.id] ? '▼' : '▶'}
                              </span>
                            </button>

                            {showSchedules[account.id] && (
                              <div className="mt-3">
                                <div className="mb-3 p-4 bg-blue-50 rounded-lg">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1">投稿時刻</label>
                                      <input
                                        type="time"
                                        value={scheduleTime}
                                        onChange={(e) => setScheduleTime(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1">使用プロンプト</label>
                                      <select
                                        value={schedulePromptId}
                                        onChange={(e) => setSchedulePromptId(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      >
                                        <option value="">プロンプトを選択</option>
                                        {prompts.map(prompt => (
                                          <option key={prompt.id} value={prompt.id}>{prompt.name}</option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      setScheduleAccountId(account.id);
                                      addSchedule();
                                    }}
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium flex items-center justify-center gap-2"
                                  >
                                    <Plus size={16} />
                                    スケジュールを追加
                                  </button>
                                </div>

                                <div className="space-y-2">
                                  {accountSchedules.length > 0 ? (
                                    accountSchedules.map(schedule => (
                                      <div key={schedule.id} className="p-3 bg-white border border-gray-200 rounded-lg">
                                        {editingSchedule === schedule.id ? (
                                          <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                              <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">時刻</label>
                                                <input
                                                  type="time"
                                                  value={editScheduleTime}
                                                  onChange={(e) => setEditScheduleTime(e.target.value)}
                                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                />
                                              </div>
                                              <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">プロンプト</label>
                                                <select
                                                  value={editSchedulePromptId}
                                                  onChange={(e) => setEditSchedulePromptId(e.target.value)}
                                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                >
                                                  {prompts.map(prompt => (
                                                    <option key={prompt.id} value={prompt.id}>{prompt.name}</option>
                                                  ))}
                                                </select>
                                              </div>
                                            </div>
                                            <div className="flex gap-2">
                                              <button
                                                onClick={saveEditedSchedule}
                                                className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-xs flex items-center justify-center gap-1"
                                              >
                                                <Save size={14} />
                                                保存
                                              </button>
                                              <button
                                                onClick={() => setEditingSchedule(null)}
                                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs"
                                              >
                                                キャンセル
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                              <Clock className="text-blue-500" size={18} />
                                              <div>
                                                <div className="font-semibold text-gray-800">{schedule.time}</div>
                                                <div className="text-xs text-gray-500">{getPromptName(schedule.promptId)}</div>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <button
                                                onClick={() => toggleSchedule(schedule.id)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                                                  schedule.enabled 
                                                    ? 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200' 
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                              >
                                                {schedule.enabled ? '有効' : '無効'}
                                              </button>
                                              <button
                                                onClick={() => startEditSchedule(schedule)}
                                                className="p-1 hover:bg-blue-50 rounded transition"
                                              >
                                                <Edit className="text-blue-500" size={16} />
                                              </button>
                                              <button
                                                onClick={() => deleteSchedule(schedule.id)}
                                                className="p-1 hover:bg-red-50 rounded transition"
                                              >
                                                <Trash2 className="text-red-500" size={16} />
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-sm text-gray-500 text-center py-2">スケジュールが設定されていません</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition mb-4"
              >
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Wand2 size={24} className="text-blue-500" />
                  プロンプトテンプレート
                </h3>
                <span className="text-lg text-blue-600">
                  {showTemplates ? '▼' : '▶'}
                </span>
              </button>
              {showTemplates && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {promptTemplates.map((template, idx) => (
                    <div key={idx} className="p-5 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition bg-gradient-to-br from-white to-blue-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-base mb-1">{template.name}</h4>
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium mb-2">
                            {template.category}
                          </span>
                        </div>
                        <button
                          onClick={() => useTemplate(template)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition flex-shrink-0"
                          title="このテンプレートを使用"
                        >
                          <Copy size={18} className="text-blue-500" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{template.prompt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">新しいプロンプトを追加</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">プロンプト名</label>
                  <input
                    type="text"
                    value={promptName}
                    onChange={(e) => setPromptName(e.target.value)}
                    placeholder="例: テクノロジーニュース"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    プロンプト内容
                    <span className="text-gray-500 text-xs ml-2">AIに投稿内容を生成させる指示文を入力してください</span>
                  </label>
                  <textarea
                    value={promptContent}
                    onChange={(e) => setPromptContent(e.target.value)}
                    placeholder="例: 最新のAI技術について、一般の人にもわかりやすく140文字以内で説明してください。フレンドリーなトーンで、具体例を1つ含めてください。"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 ヒント: 文字数制限、トーン、含めて欲しい要素を明確に指定するといい結果が得られます
                  </p>
                </div>
                <button
                  onClick={addPrompt}
                  disabled={!promptName || !promptContent}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  プロンプトを追加
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">登録済みプロンプト</h3>
              <div className="space-y-4">
                {prompts.map(prompt => (
                  <div key={prompt.id} className={`p-4 border-2 rounded-xl transition ${
                    prompt.enabled ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    {editingPrompt === prompt.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
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
                        <div className="flex items-center justify-end pt-3 border-t border-gray-200">
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditPrompt(prompt)}
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
                ))}
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

        <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>💡 プロンプトのコツ:</strong> 具体的な指示(文字数、トーン、含める要素)を書くと、いい投稿が生成されます。
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>⏰ スケジュール機能:</strong> 各スケジュールに投稿時刻とプロンプトを設定できます。設定した時刻に自動的にAIが投稿を生成して投稿します。
          </p>
          <p className="text-sm text-gray-700">
            <strong>📌 Threads API設定:</strong> アカウント追加時には、Meta Developer Platformから取得した<strong>Threads ID</strong>と<strong>アクセストークン</strong>が必要です。
            詳細は <a href="https://developers.facebook.com/docs/threads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Threads APIドキュメント</a> をご覧ください。
            実際の運用には、バックエンド(Node.js + OpenAI API + Threads API)の実装が必要です。
          </p>
        </div>
      </div>
    </div>
  );
}