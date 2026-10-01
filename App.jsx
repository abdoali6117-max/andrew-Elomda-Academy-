import React, { useState, useEffect, useMemo } from 'react';
import { 8
  Users, 
  GraduationCap, 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  LogOut, 
  UserCheck, 
  DollarSign, 
  BookOpen, 
  TrendingUp, 
  AlertCircle, 
  FileText, 
  Printer, 
  Settings, 
  ChevronRight, 
  Edit, 
  Trash2, 
  Check, 
  UserPlus, 
  Lock, 
  User, 
  ShieldCheck, 
  Layers,
  Sparkles
} from 'lucide-react';

const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: '123456',
  name: 'مدير الأكاديمية'
};

const INITIAL_LEVELS = [
  { id: 1, name: 'المستوى الأول: أساسيات وبرمجة Scratch', totalSessions: 30, price: 1500, weeklySessions: 2 },
  { id: 2, name: 'المستوى الثاني: تطوير الويب HTML/CSS', totalSessions: 30, price: 1500, weeklySessions: 2 },
  { id: 3, name: 'المستوى الثالث: البرمجة بلغة Python', totalSessions: 30, price: 1500, weeklySessions: 2 },
];

const INITIAL_STUDENTS = [
  {
    id: 'STU-101',
    name: 'أحمد محمود العلي',
    age: 10,
    parentName: 'محمود العلي',
    parentPhone: '01012345678',
    levelId: 1,
    groupId: 'GRP-A',
    joinDate: '2026-08-15',
    completedSessions: 18,
    paidAmount: 1500,
    totalPrice: 1500,
    status: 'نشط', // نشط، متوقف، مكتمل
    attendance: Array.from({ length: 30 }, (_, i) => i < 18 ? 'present' : (i === 18 ? 'pending' : 'upcoming')),
    notes: 'طالب متميز وشغوف بالبرمجة'
  },
  {
    id: 'STU-102',
    name: 'سارة يوسف الشريف',
    age: 12,
    parentName: 'يوسف الشريف',
    parentPhone: '01198765432',
    levelId: 2,
    groupId: 'GRP-B',
    joinDate: '2026-07-01',
    completedSessions: 28,
    paidAmount: 1000,
    totalPrice: 1500,
    status: 'نشط',
    attendance: Array.from({ length: 30 }, (_, i) => i < 28 ? (i % 5 === 0 ? 'absent' : 'present') : 'upcoming'),
    notes: 'اقترب موعد تجديد المستوى'
  },
  {
    id: 'STU-103',
    name: 'عمر خالد خليل',
    age: 9,
    parentName: 'خالد خليل',
    parentPhone: '01234567890',
    levelId: 1,
    groupId: 'GRP-A',
    joinDate: '2026-09-01',
    completedSessions: 6,
    paidAmount: 750,
    totalPrice: 1500,
    status: 'نشط',
    attendance: Array.from({ length: 30 }, (_, i) => i < 6 ? 'present' : 'upcoming'),
    notes: 'متبقي 750 جنيه قسط ثانٍ'
  },
  {
    id: 'STU-104',
    name: 'مريم حسن عبد الله',
    age: 11,
    parentName: 'حسن عبد الله',
    parentPhone: '01555443322',
    levelId: 3,
    groupId: 'GRP-C',
    joinDate: '2026-06-10',
    completedSessions: 30,
    paidAmount: 1500,
    totalPrice: 1500,
    status: 'مكتمل',
    attendance: Array.from({ length: 30 }, () => 'present'),
    notes: 'أتمت المستوى الثالث بنجاح'
  }
];

const INITIAL_GROUPS = [
  { id: 'GRP-A', name: 'مجموعة الأحد والأربعاء - 4 مساءً', levelId: 1, days: 'الأحد / الأربعاء', time: '04:00 م - 06:00 م', instructor: 'م. أسامة سعيد' },
  { id: 'GRP-B', name: 'مجموعة الاثنين والخميس - 5 مساءً', levelId: 2, days: 'الاثنين / الخميس', time: '05:00 م - 07:00 م', instructor: 'م. رانيا الفقي' },
  { id: 'GRP-C', name: 'مجموعة الجمعة والسبت - 10 صباحاً', levelId: 3, days: 'الجمعة / السبت', time: '10:00 ص - 12:00 م', instructor: 'م. طارق حماد' },
];

export default function App() {
  // Login State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('academy_auth') === 'true';
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('academy_user');
    return saved ? JSON.parse(saved) : DEFAULT_CREDENTIALS;
  });

  // App Data State (Local Storage Persistence)
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('academy_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('academy_groups');
    return saved ? JSON.parse(saved) : INITIAL_GROUPS;
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, students, attendance, finance, groups, settings

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('academy_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('academy_groups', JSON.stringify(groups));
  }, [groups]);

  // Auth Handling
  const handleLogin = (username, password) => {
    if (username === user.username && password === user.password) {
      setIsAuthenticated(true);
      localStorage.setItem('academy_auth', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('academy_auth');
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} defaultUser={user} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row dir-rtl" dir="rtl">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} user={user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto min-h-screen">
        {/* Top Header */}
        <Header user={user} setActiveTab={setActiveTab} />

        {/* Dynamic Screen Content */}
        <main className="p-4 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView 
              students={students} 
              groups={groups} 
              setActiveTab={setActiveTab} 
            />
          )}

          {activeTab === 'students' && (
            <StudentsView 
              students={students} 
              setStudents={setStudents} 
              groups={groups} 
              levels={INITIAL_LEVELS} 
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceView 
              students={students} 
              setStudents={setStudents} 
              groups={groups} 
              levels={INITIAL_LEVELS} 
            />
          )}

          {activeTab === 'finance' && (
            <FinanceView 
              students={students} 
              setStudents={setStudents} 
              levels={INITIAL_LEVELS} 
            />
          )}

          {activeTab === 'groups' && (
            <GroupsView 
              groups={groups} 
              setGroups={setGroups} 
              students={students} 
              levels={INITIAL_LEVELS} 
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView 
              user={user} 
              setUser={setUser} 
            />
          )}
        </main>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, defaultUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemoHint, setShowDemoHint] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const success = onLogin(username, password);
    if (!success) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة!');
    }
  };

  const fillDemo = () => {
    setUsername(defaultUser.username);
    setPassword(defaultUser.password);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 dir-rtl" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-l from-indigo-600 via-indigo-700 to-purple-800 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="inline-flex p-4 bg-white/10 rounded-2xl mb-4 backdrop-blur-md">
            <GraduationCap className="w-12 h-12 text-indigo-200" />
          </div>
          <h1 className="text-2xl font-bold mb-1">أكاديمية رواد الكمبيوتر للأطفال</h1>
          <p className="text-indigo-200 text-sm">نظام إدارة الطلاب والماليات والتسجيل</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 border-r-4 border-rose-500 text-rose-700 rounded-xl text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">اسم المستخدم</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-slate-800"
                placeholder="أدخل اسم المستخدم"
              />
              <User className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">كلمة المرور</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-slate-800"
                placeholder="••••••••"
              />
              <Lock className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/30 transition duration-200 flex items-center justify-center gap-2"
          >
            <span>تسجيل الدخول للنظام</span>
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>

          {showDemoHint && (
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-2">
              <div className="flex items-center justify-between font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  بيانات تجربة الدخول التلقائية:
                </span>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="text-indigo-600 hover:underline font-bold"
                >
                  تعبئة تلقائية
                </button>
              </div>
              <p>اسم المستخدم: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">admin</code></p>
              <p>كلمة المرور: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">123456</code></p>
            </div>
          )}
        </form>

        <div className="p-4 bg-slate-50 text-center text-xs text-slate-400 border-t border-slate-100">
          جميع الحقوق محفوظة للأكاديمية © 2026
        </div>
      </div>
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab, onLogout, user }) {
  const navItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: Layers },
    { id: 'students', label: 'إدارة الطلاب', icon: Users },
    { id: 'attendance', label: 'رصد الحضور (30 حصة)', icon: CheckCircle2 },
    { id: 'finance', label: 'الماليات والاشتراكات', icon: CreditCard },
    { id: 'groups', label: 'المجموعات والمواعيد', icon: Calendar },
    { id: 'settings', label: 'إعدادات الحساب', icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 border-l border-slate-800">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 rounded-xl">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-base leading-tight">أكاديمية الكمبيوتر</h2>
            <p className="text-xs text-slate-400">نظام الإدارة الشامل</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center gap-3 px-3 py-2 bg-slate-800/60 rounded-xl">
          <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
            {user.name ? user.name[0] : 'م'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate text-slate-200">{user.name}</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              مسؤول متصل
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-sm font-semibold transition"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}

function Header({ user, setActiveTab }) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-full border border-indigo-100">
          المستوى الكلي: 3 مستويات (30 حصة / للمستوى)
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-left hidden sm:block">
          <p className="text-xs text-slate-400">مرحباً بك،</p>
          <p className="text-sm font-bold text-slate-800">{user.name}</p>
        </div>

        <button 
          onClick={() => setActiveTab('settings')}
          className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-xl transition"
          title="الإعدادات"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

function DashboardView({ students, groups, setActiveTab }) {
  // Stats Calculations
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'نشط').length;
  
  const totalRevenue = useMemo(() => {
    return students.reduce((sum, student) => sum + (student.paidAmount || 0), 0);
  }, [students]);

  const pendingPayments = useMemo(() => {
    return students.reduce((sum, student) => {
      const remaining = (student.totalPrice || 1500) - (student.paidAmount || 0);
      return sum + (remaining > 0 ? remaining : 0);
    }, 0);
  }, [students]);

  const renewalAlerts = useMemo(() => {
    // Alert for students who completed 27+ sessions out of 30
    return students.filter(s => s.completedSessions >= 27 && s.status === 'نشط');
  }, [students]);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">لوحة التحكم والتنفيذ السريع</h1>
        <p className="text-slate-500 text-sm mt-1">مخصصة لمتابعة أداء الأكاديمية والطلاب والماليات</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">إجمالي الطلاب المقيدين</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalStudents} طالب</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-0.5">{activeStudents} نشط حالياً</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">إجمالي تحصيلات الاشتراك</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalRevenue.toLocaleString()} ج.م</h3>
            <p className="text-xs text-slate-400 mt-0.5">سعر المستوى 1500 ج.م</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">متبقي اشتراكات آلت</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">{pendingPayments.toLocaleString()} ج.م</h3>
            <p className="text-xs text-amber-700 font-semibold mt-0.5">مبالغ مؤجلة على الطلاب</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">المجموعات الدراسية</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{groups.length} مجموعات</h3>
            <p className="text-xs text-slate-400 mt-0.5">حصتان أسبوعياً لكافة المستويات</p>
          </div>
        </div>
      </div>

      {/* Session Progress Alerts */}
      {renewalAlerts.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-amber-900">تنبيهات اقتراب إتمام المستوى (الانتقال للمستوى التالي)</h3>
          </div>
          <p className="text-xs text-amber-800 mb-4">
            الطلاب التالية أسماؤهم شارفوا على إنهاء الـ 30 حصة. يرجى التنسيق لتسديد اشتراك المستوى التالي.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renewalAlerts.map(s => (
              <div key={s.id} className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-slate-800">{s.name}</p>
                  <p className="text-xs text-slate-500">حضر {s.completedSessions} من أصل 30 حصة</p>
                </div>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition"
                >
                  عرض الحضور
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Action Grid & Recent Students */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Students Summary */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg text-slate-900">أحدث الطلاب المسجلين</h3>
              <p className="text-xs text-slate-400">نظرة سريعة على الموقف الحالي</p>
            </div>
            <button
              onClick={() => setActiveTab('students')}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>عرض الكل</span>
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-100">
                <tr>
                  <th className="p-3 font-semibold">الطالب</th>
                  <th className="p-3 font-semibold">المستوى</th>
                  <th className="p-3 font-semibold">الحصص المنجزة</th>
                  <th className="p-3 font-semibold">الدفع</th>
                  <th className="p-3 font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.slice(0, 5).map((student) => {
                  const remaining = (student.totalPrice || 1500) - (student.paidAmount || 0);
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-bold text-slate-800">{student.name}</td>
                      <td className="p-3 text-slate-600">المستوى {student.levelId}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
                          {student.completedSessions} / 30 حصة
                        </span>
                      </td>
                      <td className="p-3">
                        {remaining <= 0 ? (
                          <span className="text-xs text-emerald-600 font-bold">خالص (1500)</span>
                        ) : (
                          <span className="text-xs text-amber-600 font-bold">متبقي {remaining} ج.م</span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                          student.status === 'نشط' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shortcuts Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">إجراءات سريعة</h3>
            <p className="text-xs text-slate-400 mb-6">اختصارات للوظائف الأكثر استخداماً</p>

            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('students')}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 rounded-xl transition text-sm font-bold text-slate-700"
              >
                <div className="flex items-center gap-3">
                  <UserPlus className="w-5 h-5 text-indigo-600" />
                  <span>تسجيل طالب جديد</span>
                </div>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>

              <button
                onClick={() => setActiveTab('attendance')}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 rounded-xl transition text-sm font-bold text-slate-700"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>رصد حضور حصة اليوم</span>
                </div>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>

              <button
                onClick={() => setActiveTab('finance')}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 rounded-xl transition text-sm font-bold text-slate-700"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                  <span>تحصيل قسط / إصدار إيصال</span>
                </div>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>

          <div className="p-4 bg-indigo-900 text-white rounded-xl text-xs space-y-2">
            <p className="font-bold text-sm">💡 معلومة عن النظام</p>
            <p className="text-indigo-200 leading-relaxed">
              كل مستوى يتكون من 30 حصة. يتم جدولتها حصتين أسبوعياً لمدة 15 أسبوعاً لكل مستوى دراسي.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsView({ students, setStudents, groups, levels }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Form State for Add/Edit
  const [formData, setFormData] = useState({
    name: '',
    age: 10,
    parentName: '',
    parentPhone: '',
    levelId: 1,
    groupId: groups[0]?.id || '',
    paidAmount: 1500,
    notes: ''
  });

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.parentPhone.includes(searchTerm) ||
                            student.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === 'all' || student.levelId === Number(selectedLevel);
      return matchesSearch && matchesLevel;
    });
  }, [students, searchTerm, selectedLevel]);

  const handleOpenModal = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData({
        name: student.name,
        age: student.age,
        parentName: student.parentName,
        parentPhone: student.parentPhone,
        levelId: student.levelId,
        groupId: student.groupId,
        paidAmount: student.paidAmount,
        notes: student.notes || ''
      });
    } else {
      setEditingStudent(null);
      setFormData({
        name: '',
        age: 10,
        parentName: '',
        parentPhone: '',
        levelId: 1,
        groupId: groups[0]?.id || '',
        paidAmount: 1500,
        notes: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? {
        ...s,
        ...formData,
        levelId: Number(formData.levelId),
        paidAmount: Number(formData.paidAmount),
        age: Number(formData.age)
      } : s));
    } else {
      const newStudent = {
        id: `STU-${Math.floor(100 + Math.random() * 900)}`,
        ...formData,
        levelId: Number(formData.levelId),
        paidAmount: Number(formData.paidAmount),
        age: Number(formData.age),
        totalPrice: 1500,
        joinDate: new Date().toISOString().split('T')[0],
        completedSessions: 0,
        status: 'نشط',
        attendance: Array.from({ length: 30 }, () => 'upcoming')
      };
      setStudents(prev => [newStudent, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت تأكد من حذف بيانات هذا الطالب؟')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">شاشة إدارة الطلاب</h1>
          <p className="text-slate-500 text-sm mt-0.5">تسجيل بيانات الطلاب وتخصيص المستويات والمجموعات</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
        >
          <UserPlus className="w-5 h-5" />
          <span>إضافة طالب جديد</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث باسم الطالب، رقم ولي الأمر، أو الكود..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
          />
          <Search className="w-5 h-5 text-slate-400 absolute right-3 top-3" />
        </div>

        <div className="w-full md:w-64">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm text-slate-700 bg-white"
          >
            <option value="all">كافة المستويات</option>
            {levels.map(lvl => (
              <option key={lvl.id} value={lvl.id}>{lvl.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-100">
              <tr>
                <th className="p-4 font-semibold">كود الطالب</th>
                <th className="p-4 font-semibold">اسم الطالب</th>
                <th className="p-4 font-semibold">السن</th>
                <th className="p-4 font-semibold">ولي الأمر / الهاتف</th>
                <th className="p-4 font-semibold">المستوى</th>
                <th className="p-4 font-semibold">الحصص</th>
                <th className="p-4 font-semibold">الحالة المالية</th>
                <th className="p-4 font-semibold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-400">
                    لا يوجد طلاب مطابقون لخيارات البحث
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const levelName = levels.find(l => l.id === student.levelId)?.name || `المستوى ${student.levelId}`;
                  const remaining = (student.totalPrice || 1500) - (student.paidAmount || 0);
                  
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-mono text-xs font-bold text-slate-500">{student.id}</td>
                      <td className="p-4 font-bold text-slate-800">{student.name}</td>
                      <td className="p-4 text-slate-600">{student.age} سنة</td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-800 text-xs">{student.parentName}</p>
                        <p className="text-slate-500 text-xs dir-ltr text-right">{student.parentPhone}</p>
                      </td>
                      <td className="p-4">
                        <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-semibold border border-indigo-100 inline-block">
                          {levelName}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-indigo-600 h-full rounded-full" 
                              style={{ width: `${(student.completedSessions / 30) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-slate-700">{student.completedSessions}/30</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {remaining <= 0 ? (
                          <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-bold">
                            مسدد بالكامل
                          </span>
                        ) : (
                          <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-bold">
                            متبقي {remaining} ج.م
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenModal(student)}
                            className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                            title="تعديل"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {editingStudent ? 'تعديل بيانات الطالب' : 'إضافة طالب جديد للاكاديمية'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">اسم الطالب الرباعي</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none text-sm"
                  placeholder="مثال: عمر محمد إبراهيم"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">السن (بالسنوات)</label>
                  <input
                    type="number"
                    required
                    min="6"
                    max="16"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">رقم هاتف ولي الأمر</label>
                  <input
                    type="text"
                    required
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none text-sm"
                    placeholder="010XXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">اسم ولي الأمر</label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none text-sm"
                  placeholder="اسم الأب أو الأم"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">المستوى التعليمي</label>
                  <select
                    value={formData.levelId}
                    onChange={(e) => setFormData({ ...formData, levelId: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none text-sm bg-white"
                  >
                    {levels.map(l => (
                      <option key={l.id} value={l.id}>المستوى {l.id} (1500 ج.م)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">المجموعة المحددة</label>
                  <select
                    value={formData.groupId}
                    onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none text-sm bg-white"
                  >
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">المبلغ المدفوع مقدمًا (من 1500 ج.م)</label>
                <input
                  type="number"
                  required
                  max="1500"
                  value={formData.paidAmount}
                  onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl text-sm transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition"
                >
                  حفظ البيانات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AttendanceView({ students, setStudents, groups, levels }) {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [filterGroup, setFilterGroup] = useState('all');

  const selectedStudent = useMemo(() => {
    return students.find(s => s.id === selectedStudentId);
  }, [students, selectedStudentId]);

  const filteredStudents = useMemo(() => {
    return students.filter(s => filterGroup === 'all' || s.groupId === filterGroup);
  }, [students, filterGroup]);

  // Toggle single session status
  const handleToggleSession = (sessionIndex, currentStatus) => {
    if (!selectedStudent) return;

    let nextStatus = 'present';
    if (currentStatus === 'present') nextStatus = 'absent';
    else if (currentStatus === 'absent') nextStatus = 'upcoming';
    else nextStatus = 'present';

    const updatedAttendance = [...selectedStudent.attendance];
    updatedAttendance[sessionIndex] = nextStatus;

    // Recalculate completed sessions count
    const completedCount = updatedAttendance.filter(st => st === 'present').length;

    setStudents(prev => prev.map(s => {
      if (s.id === selectedStudent.id) {
        return {
          ...s,
          attendance: updatedAttendance,
          completedSessions: completedCount
        };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">سجل الحضور والغياب (الـ 30 حصة لكل مستوى)</h1>
        <p className="text-slate-500 text-sm mt-0.5">رصد تفاعلي بنقرة واحدة لكل حصة من حصص المستوى الثلاثين</p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Selector List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-sm">اختر الطالب لإنعاش كشفه</h3>
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="text-xs p-1.5 rounded-lg border border-slate-200 text-slate-700 bg-white"
            >
              <option value="all">كل المجموعات</option>
              {groups.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredStudents.map(student => {
              const isSelected = student.id === selectedStudentId;
              return (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`w-full p-3 rounded-xl border text-right transition flex items-center justify-between ${
                    isSelected 
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-sm' 
                      : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <p className="font-bold text-sm">{student.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">المستوى {student.levelId}</p>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold px-2 py-0.5 bg-slate-200 text-slate-800 rounded-md">
                      {student.completedSessions} / 30
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Attendance Grid Display */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {selectedStudent ? (
            <div className="space-y-6">
              {/* Selected Student Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedStudent.name}</h2>
                  <p className="text-xs text-slate-500">
                    {levels.find(l => l.id === selectedStudent.levelId)?.name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center px-3 py-1.5 bg-indigo-100 text-indigo-800 rounded-lg">
                    <p className="text-[10px] font-bold">الحصص المكتملة</p>
                    <p className="text-lg font-black">{selectedStudent.completedSessions} / 30</p>
                  </div>
                </div>
              </div>

              {/* Status Indicator Legend */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 bg-slate-100/60 p-2.5 rounded-xl justify-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  حضر
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  غائب
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                  لم تُحدد بعد
                </span>
              </div>

              {/* 30 Sessions Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5">
                {selectedStudent.attendance.map((status, index) => {
                  let bgColor = 'bg-slate-100 text-slate-500 hover:bg-slate-200 border-slate-200';
                  if (status === 'present') bgColor = 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 border-emerald-600';
                  if (status === 'absent') bgColor = 'bg-rose-500 text-white shadow-md shadow-rose-500/20 border-rose-600';

                  return (
                    <button
                      key={index}
                      onClick={() => handleToggleSession(index, status)}
                      className={`h-14 rounded-xl border font-bold text-sm flex flex-col items-center justify-center transition-all transform active:scale-95 ${bgColor}`}
                      title={`انقر لتغيير حالة الحصة رقم ${index + 1}`}
                    >
                      <span className="text-[10px] opacity-80">حصة</span>
                      <span className="text-base">{index + 1}</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-slate-400 text-center">
                ملاحظة: انقر فوق مربّع أي حصة للتبديل السريع بين (حضر - غائب - غير محدد)
              </p>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              يرجى اختيار طالب لرصد أو عرض حضور الحصص
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FinanceView({ students, setStudents, levels }) {
  const [selectedStudentForReceipt, setSelectedStudentForReceipt] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleAddPayment = (studentId) => {
    const amount = Number(paymentAmount);
    if (!amount || amount <= 0) return;

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const newPaid = (s.paidAmount || 0) + amount;
        return {
          ...s,
          paidAmount: newPaid > 1500 ? 1500 : newPaid
        };
      }
      return s;
    }));

    setPaymentAmount('');
    setSelectedStudentForReceipt(null);
    alert('تم تسجيل الدفعة بنجاح!');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">الماليات والاشتراكات</h1>
        <p className="text-slate-500 text-sm mt-0.5">تكلفة المستوى الواحد: 1500 جنيه - تتبع الأقساط والمتحصلات والإيصالات</p>
      </div>

      {/* Finance Summary Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-100">
              <tr>
                <th className="p-4 font-semibold">اسم الطالب</th>
                <th className="p-4 font-semibold">المستوى الحالي</th>
                <th className="p-4 font-semibold">قيمة المستوى</th>
                <th className="p-4 font-semibold">المسدد</th>
                <th className="p-4 font-semibold">المتبقي</th>
                <th className="p-4 font-semibold">حالة الدفع</th>
                <th className="p-4 font-semibold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => {
                const remaining = 1500 - (student.paidAmount || 0);
                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-slate-800">{student.name}</td>
                    <td className="p-4 text-slate-600">المستوى {student.levelId}</td>
                    <td className="p-4 font-semibold text-slate-800">1,500 ج.م</td>
                    <td className="p-4 font-bold text-emerald-600">{(student.paidAmount || 0).toLocaleString()} ج.م</td>
                    <td className="p-4 font-bold text-amber-600">{remaining.toLocaleString()} ج.م</td>
                    <td className="p-4">
                      {remaining <= 0 ? (
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md">
                          مكتمل الدفع
                        </span>
                      ) : (
                        <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-md">
                          عليها متبقي
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedStudentForReceipt(student)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-xs transition inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>تحصيل / إيصال</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment & Receipt Modal */}
      {selectedStudentForReceipt && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">سند قبض / إضافة دفعة</h2>
              <button 
                onClick={() => setSelectedStudentForReceipt(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-1 text-xs">
              <p className="text-slate-500">اسم الطالب: <span className="font-bold text-slate-800 text-sm">{selectedStudentForReceipt.name}</span></p>
              <p className="text-slate-500">المستوى: <span className="font-bold text-slate-800">المستوى {selectedStudentForReceipt.levelId}</span></p>
              <p className="text-slate-500">المبلغ المدفوع سابقًا: <span className="font-bold text-emerald-600">{selectedStudentForReceipt.paidAmount} ج.م</span></p>
              <p className="text-slate-500">المبلغ المتبقي: <span className="font-bold text-amber-600">{1500 - selectedStudentForReceipt.paidAmount} ج.م</span></p>
            </div>

            {1500 - selectedStudentForReceipt.paidAmount > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">إضافة دفعة جديدة (ج.م)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    max={1500 - selectedStudentForReceipt.paidAmount}
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="مثال: 500"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 outline-none text-sm"
                  />
                  <button
                    onClick={() => handleAddPayment(selectedStudentForReceipt.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition"
                  >
                    إضافة
                  </button>
                </div>
              </div>
            )}

            {/* Print Friendly Receipt */}
            <div className="pt-3 border-t border-slate-100 text-center">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة إيصال الدفع للمعاينة</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GroupsView({ groups, setGroups, students, levels }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    levelId: 1,
    days: 'الأحد / الأربعاء',
    time: '04:00 م - 06:00 م',
    instructor: 'م. أسامة سعيد'
  });

  const handleAddGroup = (e) => {
    e.preventDefault();
    const created = {
      id: `GRP-${Math.floor(100 + Math.random() * 900)}`,
      ...newGroup,
      levelId: Number(newGroup.levelId)
    };
    setGroups(prev => [...prev, created]);
    setIsModalOpen(false);
    setNewGroup({
      name: '',
      levelId: 1,
      days: 'الأحد / الأربعاء',
      time: '04:00 م - 06:00 م',
      instructor: 'م. أسامة سعيد'
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">المجموعات وجداول الحصص</h1>
          <p className="text-slate-500 text-sm mt-0.5">تنظيم المواعيد (حصتان أسبوعياً لكل مستوى)</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مجموعة جديدة</span>
        </button>
      </div>

      {/* Groups Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => {
          const studentCount = students.filter(s => s.groupId === group.id).length;
          const levelName = levels.find(l => l.id === group.levelId)?.name;

          return (
            <div key={group.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 hover:border-indigo-200 transition">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  كود: {group.id}
                </span>
                <span className="text-xs text-slate-400">
                  {studentCount} طلاب بالمجموعة
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900">{group.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{levelName}</p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span>الأيام: <strong className="text-slate-800">{group.days}</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>التوقيت: <strong className="text-slate-800">{group.time}</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" />
                  <span>المحاضر: <strong className="text-slate-800">{group.instructor}</strong></span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Group Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">إنشاء مجموعة جديدة</h2>

            <form onSubmit={handleAddGroup} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">اسم المجموعة</label>
                <input
                  type="text"
                  required
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="مثال: مجموعة السبت والثلاثاء - 5 مساءً"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">المستوى</label>
                <select
                  value={newGroup.levelId}
                  onChange={(e) => setNewGroup({ ...newGroup, levelId: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none bg-white"
                >
                  {levels.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">اليومين في الأسبوع</label>
                <input
                  type="text"
                  required
                  value={newGroup.days}
                  onChange={(e) => setNewGroup({ ...newGroup, days: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">اسم المحاضر</label>
                <input
                  type="text"
                  required
                  value={newGroup.instructor}
                  onChange={(e) => setNewGroup({ ...newGroup, instructor: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold rounded-xl text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition"
                >
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsView({ user, setUser }) {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [name, setName] = useState(user.name);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    const updated = { username, password, name };
    setUser(updated);
    localStorage.setItem('academy_user', JSON.stringify(updated));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">إعدادات الحساب وكلمة المرور</h1>
        <p className="text-slate-500 text-sm mt-0.5">تعديل بيانات دخول مسؤول الأكاديمية بالنظام</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {savedSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>تم حفظ بيانات الحساب وكلمة المرور الجديدة بنجاح!</span>
          </div>
        )}

        <form onSubmit={handleUpdateAccount} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">الاسم الظاهر للمسؤول</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">اسم المستخدم لدخول النظام (Username)</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">كلمة المرور (Password)</label>
            <input
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}