import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});

  const fieldError = (key) => errors[key] && (
    <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded px-2 py-1">{errors[key]}</div>
  );

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    setErrors({});
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setErrors({ email: 'Invalid email' });
    if (password.length < 6) return setErrors({ password: 'Password must be 6+ chars' });
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) return setMsg(data.message || (data.errors && data.errors[0] && data.errors[0].msg) || 'Login failed');
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) { setMsg('Network error'); }
  }

  const errorShake = msg ? 'animate-shake' : '';

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #f9fafb, #eef2ff)' }}>
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block space-y-4 text-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">Welcome back</div>
          <h1 className="text-3xl font-bold leading-tight">Log in and get productive</h1>
          <p className="text-slate-600">Single place for your notes and tasks with a streamlined auth experience.</p>
          <div className="flex gap-3 text-sm text-slate-500">
            <div className="px-3 py-2 rounded-lg bg-white shadow">Fast login</div>
            <div className="px-3 py-2 rounded-lg bg-white shadow">Secure sessions</div>
            <div className="px-3 py-2 rounded-lg bg-white shadow">Responsive UI</div>
          </div>
        </div>

        <form onSubmit={submit} className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-2xl border border-blue-50 w-full">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-500 font-semibold">Login</p>
            <h2 className="text-2xl font-bold text-slate-900">Access your dashboard</h2>
            <p className="text-slate-500 text-sm">Enter your credentials to continue.</p>
          </div>
          {msg && <div className={`mb-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2 ${errorShake}`}>{msg}</div>}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input className="w-full border border-slate-200 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
              {fieldError('email')}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input className="w-full border border-slate-200 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="••••••••" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
              {fieldError('password')}
            </div>
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-[1px] transition">Login</button>
          <div className="mt-4 text-sm text-slate-600 text-center">No account? <a className="text-blue-600 font-semibold hover:underline" href="/register">Register</a></div>
        </form>
      </div>
      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }
        .animate-shake { animation: shake 0.32s ease-in-out; }
      `}</style>
    </div>
  )
}
