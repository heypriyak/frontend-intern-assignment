import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fieldError = (key) => errors[key] && (
    <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2 animate-slideIn">{errors[key]}</div>
  );

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    setErrors({});
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setErrors({ email: 'Invalid email' });
    if (password.length < 6) return setErrors({ password: 'Password must be 6+ chars' });
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) { setLoading(false); return setMsg(data.message || (data.errors && data.errors[0] && data.errors[0].msg) || 'Login failed'); }
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) { setMsg('Network error'); setLoading(false); }
  }

  const errorShake = msg ? 'animate-shake' : '';

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-gradient"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div className="hidden md:block space-y-6 animate-fadeIn">
          {/* Code Animation Visual */}
          <div className="absolute -left-10 top-20 text-blue-500/10 text-9xl font-mono animate-float">&lt;/&gt;</div>
          <div className="absolute -left-5 bottom-40 text-indigo-500/10 text-7xl font-mono animate-float" style={{animationDelay: '1s'}}>{ }</div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold shadow-lg animate-pulse-slow">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            Developer Workspace
          </div>
          
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">Log in and get productive</h1>
          <p className="text-slate-600 text-lg">Your secure workspace for notes and tasks with enterprise-grade authentication.</p>
          
          {/* Tech Stack Badges */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Built with Modern Stack</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="group px-4 py-3 rounded-xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-default border border-blue-100">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg>
                  <span className="text-blue-600 font-semibold">React</span>
                </div>
              </div>
              <div className="group px-4 py-3 rounded-xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-default border border-green-100">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.274-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg>
                  <span className="text-green-600 font-semibold">Node.js</span>
                </div>
              </div>
              <div className="group px-4 py-3 rounded-xl bg-white/80 backdrop-blur shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-default border border-purple-100">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>
                  <span className="text-purple-600 font-semibold">MongoDB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Preview Card */}
          <div className="mt-4 rounded-2xl bg-slate-900 text-slate-100 p-5 shadow-2xl border border-slate-700/40">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
              </div>
              <span className="text-xs font-mono text-slate-400">app/auth.ts</span>
            </div>
            <pre className="text-xs leading-6 font-mono text-slate-300">
{`const token = jwt.sign({ id }, SECRET, { expiresIn: '7d' })\napp.post('/api/v1/auth/login', handler)\napp.get('/api/v1/notes', auth, list)`}
            </pre>
          </div>
        </div>

        <form onSubmit={submit} className="group bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 w-full hover:shadow-blue-200/50 transition-all duration-300 animate-fadeInUp">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold shadow">NF</span>
              <span className="text-sm font-bold text-slate-700">NoteFlow</span>
            </div>
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🔐</span>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-600 font-bold">Login</p>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Access your dashboard</h2>
            <p className="text-slate-600">Enter your credentials to continue your journey.</p>
          </div>
          {msg && <div className={`mb-4 text-sm bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg px-4 py-3 shadow-md ${errorShake}`}>
            <span className="font-semibold">⚠️ Error: </span>{msg}
          </div>}
          <div className="space-y-5">
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
            className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center justify-center gap-2">
              {loading ? (
                <><span className="animate-spin">⏳</span> Logging in...</>
              ) : (
                <><span>Login</span> <span className="group-hover:translate-x-1 transition-transform">→</span></>
              )}
            </span>
          </button>
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">No account? <a className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-bold hover:from-indigo-600 hover:to-purple-600 transition-all" href="/register">Register now →</a></p>
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
    </div>
  )
}
