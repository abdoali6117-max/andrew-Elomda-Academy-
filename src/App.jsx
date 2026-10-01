import React, { useState } from 'react';
import { Users, GraduationCap, Calendar, CheckSquare, DollarSign, Lock, LogOut } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const [students, setStudents] = useState([
    { id: 1, name: 'أحمد محمد', level: 1, paid: true, attendance: 24 },
    { id: 2, name: 'سارة محمود', level: 2, paid: false, attendance: 20 },
    { id: 3, name: 'عمر خالد', level: 3, paid: true, attendance: 28 },
  ]);

  const [newStudent, setNewStudent] = useState({ name: '', level: 1 });

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '123456') {
      setIsLoggedIn(true);
    } else {
      alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name) return;
    setStudents([
      ...students,
      {
        id: Date.now(),
        name: newStudent.name,
        level: Number(newStudent.level),
        paid: false,
        attendance: 0
      }
    ]);
    setNewStudent({ name: '', level: 1 });
  };

  const togglePayment = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, paid: !s.paid } : s));
  };

  const addAttendance = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, attendance: Math.min(s.attendance + 1, 30) } : s));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4" dir="rtl">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
          <div className="text-center mb-8">
            <GraduationCap className="w-16 h-16 text-blue-500 mx-auto mb-3" />
            <h1 className="text-2xl font-bold">أكاديمية العمدة لتعليم الكمبيوتر</h1>
            <p className="text-slate-400 text-sm mt-1">تسجيل الدخول للنظام</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-slate-300">اسم المستخدم</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                placeholder="123456"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalRevenue = students.filter(s => s.paid).length * 1500;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <span className="font-bold text-lg">أكاديمية العمدة</span>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Users className="w-5 h-5" /> نظرة عامة والطلاب
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'finance' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <DollarSign className="w-5 h-5" /> الحسابات والمالية
            </button>
          </nav>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg text-sm font-medium transition"
        >
          <LogOut className="w-5 h-5" /> تسجيل الخروج
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">نظام إدارة الأكاديمية</h1>
            <p className="text-slate-500 text-sm">مرحباً بك، مدير النظام</p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="md:hidden flex items-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm"
          >
            <LogOut className="w-4 h-4" /> خروج
          </button>
        </header>

        {activeTab === 'overview' ? (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm">إجمالي الطلاب</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">{students.length}</h3>
                  </div>
                  <Users className="w-10 h-10 text-blue-500 bg-blue-50 p-2 rounded-lg" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm">المستويات المتاحة</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">3 مستويات</h3>
                  </div>
                  <GraduationCap className="w-10 h-10 text-emerald-500 bg-emerald-50 p-2 rounded-lg" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm">الإيرادات الحالية</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalRevenue} ج.م</h3>
                  </div>
                  <DollarSign className="w-10 h-10 text-amber-500 bg-amber-50 p-2 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Add Student Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-4 text-slate-800">إضافة طالب جديد</h2>
              <form onSubmit={handleAddStudent} className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="اسم الطالب"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="flex-1 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
                <select
                  value={newStudent.level}
                  onChange={(e) => setNewStudent({ ...newStudent, level: e.target.value })}
                  className="border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value={1}>المستوى الأول</option>
                  <option value={2}>المستوى الثاني</option>
                  <option value={3}>المستوى الثالث</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
                >
                  إضافة الطالب
                </button>
              </form>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800">قائمة الطلاب المباشرة</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs border-b border-slate-100">
                      <th className="p-4">اسم الطالب</th>
                      <th className="p-4">المستوى</th>
                      <th className="p-4">حالة المصاريف (1500 ج.م)</th>
                      <th className="p-4">الحضور (من 30 حصة)</th>
                      <th className="p-4">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="p-4 font-medium text-slate-800">{student.name}</td>
                        <td className="p-4">المستوى {student.level}</td>
                        <td className="p-4">
                          <button
                            onClick={() => togglePayment(student.id)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${student.paid ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}
                          >
                            {student.paid ? 'مدفوع' : 'غير مدفوع'}
                          </button>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold">{student.attendance}</span> / 30
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => addAttendance(student.id)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded text-xs transition"
                          >
                            تسجيل حضور +1
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 text-slate-800">التقرير المالي والتكلفة</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg flex justify-between items-center">
                <span>سعر المستوى الطالب الواحد:</span>
                <span className="font-bold">1,500 ج.م</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg flex justify-between items-center">
                <span>عدد الطلاب المسددين:</span>
                <span className="font-bold text-emerald-600">{students.filter(s => s.paid).length} طالب</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg flex justify-between items-center border-t border-slate-200">
                <span className="font-bold">إجمالي المحصل:</span>
                <span className="font-bold text-xl text-blue-600">{totalRevenue} ج.م</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
