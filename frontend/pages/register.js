import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fieldError = (key) => errors[key] && (
    <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2 animate-slideIn">{errors[key]}</div>
  );

  const errorShake = msg ? 'animate-shake' : '';

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    setErrors({});
    if (name.length < 2) return setErrors({ name: 'Name must be at least 2 characters' });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setErrors({ email: 'Invalid email' });
    if (password.length < 6) return setErrors({ password: 'Password must be 6+ chars' });
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) { setLoading(false); return setMsg(data.message || (data.errors && data.errors[0] && data.errors[0].msg) || 'Register failed'); }
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) { setMsg('Network error'); setLoading(false); }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 animate-gradient"></div>
      <div className="absolute top-10 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '3s'}}></div>
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '5s'}}></div>

        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div className="hidden md:block space-y-6 animate-fadeIn">
            {/* Developer Code Visual */}
            <div className="absolute -left-10 top-10 text-purple-500/10 text-8xl font-mono animate-float">npm</div>
            <div className="absolute -left-8 bottom-32 text-indigo-500/10 text-6xl font-mono animate-float" style={{animationDelay: '2s'}}>API</div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-semibold shadow-lg animate-pulse-slow">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
              Full-Stack Developer Project
            </div>
            
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent leading-tight">Create your account and keep tasks in sync</h1>
            <p className="text-slate-600 text-lg">Fast auth, clean UI, and a focused flow built for interns and builders alike.</p>
            
            {/* Security Features */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enterprise Security</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="group px-4 py-3 rounded-xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-default border border-purple-100">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                    <span className="text-purple-600 font-semibold">JWT Auth</span>
                  </div>
                </div>
                <div className="group px-4 py-3 rounded-xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-default border border-blue-100">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-blue-600 font-semibold">Bcrypt Hash</span>
                  </div>
                </div>
                <div className="group px-4 py-3 rounded-xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-default border border-indigo-100">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/></svg>
                    <span className="text-indigo-600 font-semibold">REST API</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="group bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 w-full hover:shadow-purple-200/50 transition-all duration-300 animate-fadeInUp">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">✨</span>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-purple-600 font-bold">Register</p>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Join the workspace</h2>
              <p className="text-slate-600">Create an account to access your dashboard and manage notes.</p>
            </div>
            {msg && <div className={`mb-4 text-sm bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg px-4 py-3 shadow-md ${errorShake}`}>
              <span className="font-semibold">⚠️ Error: </span>{msg}
            </div>}
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <span className="text-purple-500">👤</span> Name
                </label>
                <input 
                  className="w-full border-2 border-slate-200 rounded-xl p-4 bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-300" 
                  placeholder="Your name" 
                  value={name} 
                  onChange={e=>setName(e.target.value)}
                  disabled={loading}
                />
                {fieldError('name')}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <span className="text-blue-500">📧</span> Email
                </label>
                <input 
                  className="w-full border-2 border-slate-200 rounded-xl p-4 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={e=>setEmail(e.target.value)}
                  disabled={loading}
                />
                {fieldError('email')}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <span className="text-indigo-500">🔑</span> Password
                </label>
                <input 
                  className="w-full border-2 border-slate-200 rounded-xl p-4 bg-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300" 
                  placeholder="••••••••" 
                  type="password" 
                  value={password} 
                  onChange={e=>setPassword(e.target.value)}
                  disabled={loading}
                />
                {fieldError('password')}
              </div>
            </div>
            <button 
              disabled={loading}
              className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <><span className="animate-spin">⏳</span> Creating account...</>
                ) : (
                  <><span>Create account</span> <span className="group-hover:translate-x-1 transition-transform">→</span></>
                )}
              </span>
            </button>
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">Already have an account? <a className="text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text font-bold hover:from-indigo-600 hover:to-blue-600 transition-all" href="/">Login now →</a></p>
            </div>
          </form>
        </div>
        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            50% { transform: translateX(8px); }
            75% { transform: translateX(-8px); }
          }
          @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -30px) rotate(5deg); }
            66% { transform: translate(-20px, 20px) rotate(-5deg); }
          }
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.9; transform: scale(1.02); }
          }
          .animate-shake { animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
          .animate-float { animation: float 20s ease-in-out infinite; }
          .animate-gradient { animation: gradient 15s ease infinite; background-size: 200% 200%; }
          .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
          .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
          .animate-slideIn { animation: slideIn 0.3s ease-out; }
          .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        `}</style>
      </div>    );
}