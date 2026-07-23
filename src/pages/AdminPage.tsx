import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, LogOut, RefreshCw, Heart, Lock } from 'lucide-react';
import { fetchInquiries, loginAdmin, InquiryRecord } from '../lib/inquiriesApi';

const SESSION_KEY = 'love_admin_session';

type Session = { username: string; password: string };

function loadSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function saveSession(session: Session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export const AdminPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(() => loadSession());
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadInquiries = async (s: Session) => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await fetchInquiries(s.username, s.password);
      setInquiries(data);
    } catch {
      setLoadError('Could not load inquiries. Is the API server running?');
      setInquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      void loadInquiries(session);
    }
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const ok = await loginAdmin(username.trim(), password);
      if (!ok) {
        setLoginError('Wrong username or password');
        return;
      }
      const next = { username: username.trim(), password };
      saveSession(next);
      setSession(next);
    } catch {
      setLoginError('Login failed. Is the API server running?');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setPassword('');
    setInquiries([]);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_#4a2612_0%,_#1c0c04_100%)] text-white flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl space-y-5"
        >
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-sm text-white/70">See her date inquiries</p>
          </div>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-white/80">Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faedcd] text-[#3d2314] font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300"
              autoComplete="username"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-white/80">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#faedcd] text-[#3d2314] font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300"
              autoComplete="current-password"
            />
          </label>

          {loginError && (
            <p className="text-sm text-rose-200 bg-rose-500/20 border border-rose-300/30 rounded-xl px-3 py-2">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3 rounded-2xl bg-[#faedcd] text-[#3d2314] font-extrabold hover:bg-[#fefae0] transition disabled:opacity-60"
          >
            {isLoggingIn ? 'Signing in…' : 'Login'}
          </button>

          <Link to="/" className="block text-center text-xs text-white/60 hover:text-white/90">
            ← Back to invitation
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_#4a2612_0%,_#1c0c04_100%)] text-white px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
              <Heart className="w-7 h-7 fill-white" /> Her Inquiries
            </h1>
            <p className="text-sm text-white/70 mt-1">{inquiries.length} submission(s)</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => session && void loadInquiries(session)}
              className="px-3 py-2 rounded-xl bg-white/15 border border-white/25 hover:bg-white/25 transition flex items-center gap-1.5 text-sm"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-white/15 border border-white/25 hover:bg-white/25 transition flex items-center gap-1.5 text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        {loadError && (
          <p className="text-sm text-amber-100 bg-amber-500/20 border border-amber-300/30 rounded-2xl px-4 py-3">
            {loadError}
          </p>
        )}

        {!isLoading && inquiries.length === 0 && !loadError && (
          <div className="bg-white/10 border border-white/20 rounded-3xl p-10 text-center text-white/70">
            No inquiries yet. When she confirms a date, it will show up here.
          </div>
        )}

        <div className="space-y-4">
          {inquiries.map((item) => (
            <article
              key={item.id}
              className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-3xl p-5 sm:p-6 shadow-lg"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {item.partnerName}
                </h2>
                <span className="text-xs text-white/60">{formatWhen(item.createdAt)}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="flex items-start gap-2 bg-white/10 rounded-2xl p-3">
                  <Calendar className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white/60 text-xs">Date</div>
                    <div className="font-semibold">{item.date}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white/10 rounded-2xl p-3">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white/60 text-xs">Time</div>
                    <div className="font-semibold">
                      {item.customTimeStr || item.time}
                      {item.timeCategory ? ` (${item.timeCategory})` : ''}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white/10 rounded-2xl p-3 sm:col-span-1">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white/60 text-xs">Location</div>
                    <div className="font-semibold">{item.locationName}</div>
                    {item.locationAddress && (
                      <div className="text-xs text-white/60 mt-0.5">{item.locationAddress}</div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <Link to="/" className="block text-center text-xs text-white/60 hover:text-white/90 pt-2">
          ← Back to invitation
        </Link>
      </div>
    </div>
  );
};
