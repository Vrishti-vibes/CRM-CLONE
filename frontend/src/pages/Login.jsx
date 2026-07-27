import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiLock, FiMail, FiShield, FiArrowRight, 
  FiCheckCircle, FiUserCheck, FiBriefcase 
} from 'react-icons/fi';

export default function Login() {
  const [email, setEmail] = useState('admin@enterprise.io');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await login(email, password);
      navigate('/deals');
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAccount = (type) => {
    if (type === 'admin') {
      setEmail('admin@enterprise.io');
      setPassword('AdminPass123!');
    } else {
      setEmail('ted@enterprise.io');
      setPassword('SalesPass123!');
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-slate-900 text-slate-100 font-sans overflow-hidden">
      
      {/* Left Column: Branding Showcase */}
      <div className="hidden lg:flex lg:w-7/12 relative bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-16 flex-col justify-between overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-indigo-500/30">
            C
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white">CRM Enterprise</h1>
            <p className="text-xs text-indigo-400 font-extrabold uppercase tracking-widest">Revenue OS v4.2</p>
          </div>
        </div>

        {/* Value Proposition Hero */}
        <div className="relative z-10 max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
            <FiShield className="w-4 h-4 text-indigo-400" />
            <span>SOC2 Type II & GDPR Compliant Security</span>
          </div>

          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight">
            Accelerate your sales engine with real-time intelligence.
          </h2>

          <p className="text-base text-slate-400 leading-relaxed font-medium">
            Manage pipelines, automate activity tracking, and project revenue forecasts with built-in RBAC governance.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <p className="text-2xl font-black text-white">$14.2M</p>
              <p className="text-xs text-slate-400 font-medium">Quarterly Pipeline</p>
            </div>
            <div>
              <p className="text-2xl font-black text-indigo-400">99.98%</p>
              <p className="text-xs text-slate-400 font-medium">Uptime Guarantee</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">3.8x</p>
              <p className="text-xs text-slate-400 font-medium">Avg Win Rate Increase</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-500 font-medium">
          © 2026 Enterprise Systems Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column: Authentication Panel */}
      <div className="w-full lg:w-5/12 bg-white dark:bg-darkbg-card p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          {/* Header */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Sign in to your account
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Enter your credentials or choose a quick demo account below.
            </p>
          </div>

          {/* Quick Demo Account Selector Chips */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Quick Role Preset
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fillDemoAccount('admin')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  email.includes('admin')
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'border-slate-200 dark:border-darkbg-border text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-darkbg'
                }`}
              >
                <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0">
                  <FiShield className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black truncate">Admin Account</p>
                  <p className="text-[10px] opacity-75 truncate">Full Control</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount('user')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  !email.includes('admin')
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'border-slate-200 dark:border-darkbg-border text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-darkbg'
                }`}
              >
                <div className="p-2 rounded-lg bg-slate-800 text-white shrink-0">
                  <FiBriefcase className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black truncate">Sales Rep</p>
                  <p className="text-[10px] opacity-75 truncate">Standard User</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <FiMail className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <FiLock className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Platform</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}