import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. إعداد الاتصال بـ Supabase
const supabaseUrl = 'https://kbyrdhepdedyiluvsmzw.supabase.co';
const supabaseAnonKey = 'sb_publishable_SMS_u_qbtiX6HJWtDdSvoQ_3rIOxYE0';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [classes, setClasses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState('classes');
  const [loading, setLoading] = useState(false);

  // تسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    } else {
      setUser(data);
      fetchData();
    }
    setLoading(false);
  };

  // جلب البيانات من Supabase
  const fetchData = async () => {
    const { data: classData } = await supabase.from('classes').select('*');
    const { data: paymentData } = await supabase.from('payments').select('*');
    if (classData) setClasses(classData);
    if (paymentData) setPayments(paymentData);
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  // شاشة تسجيل الدخول
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4" dir="rtl">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
          <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">نظام إدارة أكاديمية العمدة</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">اسم المستخدم</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="123456"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded transition duration-200"
            >
              {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // لوحة التحكم الرئيسية
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800" dir="rtl">
      {/* الشريط العلوي */}
      <header className="bg-blue-900 text-white p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-xl font-bold">أكاديمية العمدة | مرحباً {user.name}</h1>
        <button
          onClick={() => setUser(null)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-semibold transition"
        >
          تسجيل الخروج
        </button>
      </header>

      {/* القائمة الرئيسية */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab('classes')}
            className={`py-2 px-6 font-bold border-b-2 ${
              activeTab === 'classes' ? 'border-blue-600 text-blue-600' : 'text-gray-500'
            }`}
          >
            إدارة الفصول (30 فصل)
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-2 px-6 font-bold border-b-2 ${
              activeTab === 'payments' ? 'border-blue-600 text-blue-600' : 'text-gray-500'
            }`}
          >
            المدفوعات (1500 ج.م)
          </button>
        </div>

        {/* قسم الفصول */}
        {activeTab === 'classes' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">قائمة الفصول الدراسية</h3>
            {classes.length === 0 ? (
              <p className="text-gray-500">لا توجد فصول حالياً، تم الاتصال بـ Supabase بنجاح.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {classes.map((cls) => (
                  <div key={cls.id} className="p-4 border rounded shadow-sm bg-gray-50">
                    <h4 className="font-bold text-blue-800">{cls.name}</h4>
                    <p className="text-sm text-gray-600">الصف: {cls.grade}</p>
                    <p className="text-sm text-gray-600">المعلم: {cls.teacher_name || 'غير محدد'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* قسم المدفوعات */}
        {activeTab === 'payments' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">سجل مدفوعات الطلاب</h3>
            {payments.length === 0 ? (
              <p className="text-gray-500">لا توجد مدفوعات مسجلة حالياً.</p>
            ) : (
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-3">اسم الطالب</th>
                    <th className="p-3">الفصل</th>
                    <th className="p-3">المبلغ</th>
                    <th className="p-3">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-b">
                      <td className="p-3">{p.student_name}</td>
                      <td className="p-3">{p.class_name}</td>
                      <td className="p-3 font-bold">{p.amount} ج.م</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${p.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {p.status === 'paid' ? 'تم الدفع' : 'معلق'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
