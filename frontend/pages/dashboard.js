import { useEffect, useState, useRef } from 'react';

function fetchWithToken(path, opts={}){
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return fetch('http://localhost:5000' + path, { headers, ...opts });
}

export default function Dashboard(){
  const [profile, setProfile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [darkMode, setDarkMode] = useState(false);
  const [confirmingNote, setConfirmingNote] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const toastTimer = useRef(null);

  const showToast = (message, type = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast({ message: '', type: 'success' }), 2400);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('darkMode');
    if (stored) setDarkMode(stored === 'true');
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', darkMode);
    }
    if (typeof window !== 'undefined') localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
    return () => { if (toastTimer.current) clearTimeout(toastTimer.current); };
  }, [darkMode]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const p = await fetchWithToken('/api/v1/profile');
      if (!p.ok) return window.location.href = '/';
      setProfile(await p.json());
      const qstr = `?q=${encodeURIComponent(q)}&status=${encodeURIComponent(statusFilter)}`;
      const n = await fetchWithToken('/api/v1/notes' + qstr);
      if (!n.ok) {
        const err = await n.json().catch(()=>({message:'Failed to load notes'}));
        setError(err.message || 'Failed to load notes');
        setNotes([]);
      } else {
        setNotes(await n.json());
      }
    } catch (err) {
      setError('Network error');
    } finally { setLoading(false); }
  }

  useEffect(()=>{ load(); }, [q, statusFilter]);

  const submitNote = async (e)=>{
    e && e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (editId) {
        const res = await fetchWithToken('/api/v1/notes/' + editId, { method: 'PUT', body: JSON.stringify({ title, content }) });
        const data = await res.json();
        if (!res.ok) { setError(data.message || (data.errors && data.errors[0].msg) || 'Update failed'); }
        else { setNotes(prev => prev.map(n=> n._id === data._id ? data : n)); setTitle(''); setContent(''); setEditId(null); showToast('Note updated', 'success'); }
      } else {
        const res = await fetchWithToken('/api/v1/notes', { method: 'POST', body: JSON.stringify({ title, content }) });
        const data = await res.json();
        if (!res.ok) { setError(data.message || (data.errors && data.errors[0].msg) || 'Create failed'); }
        else { setNotes(prev=>[data, ...prev]); setTitle(''); setContent(''); showToast('Note added', 'success'); }
      }
    } catch (err) { setError('Network error'); }
    finally { setSubmitting(false); }
  }

  const startEdit = (note) => { setEditId(note._id); setTitle(note.title || ''); setContent(note.content || ''); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  const cancelEdit = ()=>{ setEditId(null); setTitle(''); setContent(''); }

  const askDelete = (note) => setConfirmingNote(note);

  const del = async (id)=>{
    if (!id) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetchWithToken('/api/v1/notes/' + id, { method: 'DELETE' });
      if (!res.ok) { const d = await res.json().catch(()=>({message:'Delete failed'})); setError(d.message || 'Delete failed'); }
      else { setNotes(prev=>prev.filter(n=>n._id !== id)); showToast('Note deleted', 'success'); }
    } catch (err) { setError('Network error'); }
    finally { setSubmitting(false); setConfirmingNote(null); }
  }

  const logout = ()=>{ localStorage.removeItem('token'); window.location.href = '/'; }

  const search = async (e)=>{ e && e.preventDefault(); load(); }

  const toggleStatus = async (id, currentStatus) => {
    setSubmitting(true);
    setError('');
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    try {
      const res = await fetchWithToken('/api/v1/notes/' + id, { method: 'PUT', body: JSON.stringify({ status: newStatus }) });
      const data = await res.json();
      if (!res.ok) setError(data.message || 'Failed to update');
      else { setNotes(prev => prev.map(n=> n._id === data._id ? data : n)); showToast(`Marked as ${newStatus}`, 'success'); }
    } catch (err) { setError('Network error'); }
    finally { setSubmitting(false); }
  }

  const sortedNotes = [...notes].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  const pendingCount = notes.filter(n => n.status === 'pending').length;
  const completedCount = notes.filter(n => n.status === 'completed').length;

  const cardBg = darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white';
  const mutedText = darkMode ? 'text-gray-300' : 'text-gray-600';
  const secondaryBg = darkMode ? 'bg-slate-950 text-gray-100' : 'bg-gradient-to-b from-slate-50 via-white to-blue-50 text-slate-900';
  const borderAccent = darkMode ? 'border-gray-700' : 'border-blue-100';
  const pillBase = darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-slate-700';
  const pillActive = 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow';

  return (
    <div className={`min-h-screen p-6 ${secondaryBg}`}>
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 rounded-2xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="px-6 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] opacity-80">Notes Dashboard</p>
              <h1 className="text-2xl font-bold">Stay on top of your tasks</h1>
              {profile && <div className="text-sm opacity-90">Signed in as {profile.name} ({profile.email})</div>}
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full px-3 py-1 text-xs font-semibold bg-white/20 hover:bg-white/30 transition" onClick={()=>setDarkMode(!darkMode)}>
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
              <div className="text-sm bg-white/15 px-3 py-1 rounded-full">
                <span className="font-semibold">{pendingCount}</span> pending · <span className="font-semibold">{completedCount}</span> done
              </div>
              <button className="bg-white text-blue-700 px-3 py-1 rounded-full font-semibold shadow hover:translate-y-[-1px] transition" onClick={logout}>Logout</button>
            </div>
          </div>
        </header>

        <section className={`mb-8 p-6 rounded-2xl shadow-xl border ${borderAccent} ${cardBg}`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-blue-400">Create</p>
              <h2 className="text-xl font-semibold">{editId ? 'Edit note' : 'Add a new note'}</h2>
            </div>
          </div>
          <form onSubmit={submitNote} className="grid grid-cols-1 gap-3">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Note title" className="border rounded-lg p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
            <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" className="border rounded-lg p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
            <div className="flex flex-wrap gap-2">
              <button disabled={submitting} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:translate-y-[-1px] hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed">{editId ? 'Save Changes' : 'Add Note'}</button>
              {editId && <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition">Cancel</button>}
            </div>
            {submitting && <div className="text-sm text-gray-400">Submitting...</div>}
            {error && <div className="text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">{error}</div>}
          </form>
        </section>

        <section className="mb-10">
          <div className="flex gap-3 mb-4 items-center flex-wrap">
            <form onSubmit={search} className="flex gap-2 flex-1 min-w-[240px]">
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" className="border rounded-lg p-3 flex-1 bg-white text-slate-800 placeholder-slate-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:shadow-lg hover:translate-y-[-1px] transition">Search</button>
            </form>
            <div className="flex items-center gap-2">
              {['all','pending','completed'].map(key => (
                <button
                  key={key}
                  onClick={()=>setStatusFilter(key)}
                  className={`px-3 py-2 rounded-full text-sm font-semibold border ${borderAccent} transition hover:-translate-y-[1px] hover:shadow ${statusFilter === key ? pillActive : pillBase}`}
                >
                  {key[0].toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
            <select className="border rounded-lg p-2 bg-white/80 dark:bg-gray-800/80" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          {loading && <p className="text-gray-400">Loading notes...</p>}
          <div className="grid gap-4">
            {sortedNotes.map(n=> (
              <div key={n._id} className={`group rounded-2xl shadow-lg border ${borderAccent} p-4 flex justify-between items-start transition hover:-translate-y-[2px] hover:shadow-xl ${n.status === 'completed' ? (darkMode ? 'bg-green-900 text-green-100' : 'bg-green-50') : cardBg}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <button 
                      onClick={()=>toggleStatus(n._id, n.status)} 
                      disabled={submitting}
                      className={`text-lg w-7 h-7 flex items-center justify-center rounded-full border ${n.status === 'completed' ? 'border-green-500 text-green-600 bg-white/60' : 'border-gray-300 text-gray-500 bg-white/80'} transition hover:scale-105 disabled:opacity-60`}
                      title="Click to toggle completion"
                    >
                      {n.status === 'completed' ? '✓' : '○'}
                    </button>
                    <h3 className={`text-lg font-semibold ${n.status === 'completed' ? 'line-through text-gray-500' : ''}`}>{n.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${n.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-900'}`}>{n.status}</span>
                  </div>
                  <p className={`text-sm mt-1 ${n.status === 'completed' ? 'text-gray-400' : mutedText}`}>{n.content}</p>
                  <div className="text-xs text-gray-500 mt-3">{new Date(n.createdAt).toLocaleDateString()} {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-3 text-sm font-semibold">
                    <button className="text-blue-600 hover:text-blue-700 hover:underline transition" onClick={()=>startEdit(n)}>Edit</button>
                    <button className="text-red-500 hover:text-red-600 hover:underline transition" onClick={()=>askDelete(n)} disabled={submitting}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {confirmingNote && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className={`rounded shadow-lg p-4 w-full max-w-sm ${cardBg}`}>
              <h4 className="font-semibold mb-2">Delete note?</h4>
              <p className="text-sm mb-4">This will delete "{confirmingNote.title}" and cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button className="px-3 py-1 rounded bg-gray-300 text-gray-800" onClick={()=>setConfirmingNote(null)}>Cancel</button>
                <button className="px-3 py-1 rounded bg-red-600 text-white" onClick={()=>del(confirmingNote._id)} disabled={submitting}>Delete</button>
              </div>
            </div>
          </div>
        )}
        {toast.message && (
          <div className={`fixed bottom-4 right-4 px-4 py-3 rounded shadow text-sm ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {toast.message}
          </div>
        )}
      </div>
    </div>
  )
}
