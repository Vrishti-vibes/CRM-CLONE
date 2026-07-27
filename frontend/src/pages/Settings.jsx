import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { settingsService } from '../services/settingsService';
import {
  FiSettings,
  FiUser,
  FiLock,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiSave,
} from 'react-icons/fi';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form State
  const [fullName, setFullName] = useState(user?.name || user?.full_name || '');
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [profileSubmitting, setProfileSubmitting] = useState(false);

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);

  // RBAC Team Users State (Admin Only)
  const [teamUsers, setTeamUsers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(false);

  const fetchTeamUsers = useCallback(async () => {
    if (user?.role !== 'admin' && user?.role !== 'ADMIN') return;
    setTeamLoading(true);
    try {
      const res = await settingsService.getTeamUsers();
      setTeamUsers(res.items || []);
    } catch (err) {
      console.error('Failed to load team users:', err);
    } finally {
      setTeamLoading(false);
    }
  }, [user?.role]);

  useEffect(() => {
    if (activeTab === 'rbac') {
      fetchTeamUsers();
    }
  }, [activeTab, fetchTeamUsers]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: '', text: '' });
    setProfileSubmitting(true);
    try {
      await settingsService.updateProfile(fullName);
      setProfileMsg({ type: 'success', text: 'Profile name updated successfully!' });
    } catch (err) {
      setProfileMsg({
        type: 'error',
        text: err.response?.data?.detail || 'Failed to update profile.',
      });
    } finally {
      setProfileSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });
    setPasswordSubmitting(true);
    try {
      await settingsService.changePassword(currentPassword, newPassword);
      setPasswordMsg({ type: 'success', text: 'Password changed successfully!' });
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPasswordMsg({
        type: 'error',
        text: err.response?.data?.detail || 'Failed to change password.',
      });
    } finally {
      setPasswordSubmitting(false);
    }
  };

  const handleRoleChange = async (userId, newRole, isActive) => {
    try {
      await settingsService.updateUserRBAC(userId, newRole, isActive);
      // Optimistic local state update
      setTeamUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole, is_active: isActive } : u))
      );
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to update user RBAC permissions.');
    }
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'ADMIN';

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
          <FiSettings className="text-indigo-600 dark:text-indigo-400" />
          <span>System Settings & RBAC Control</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">
          Manage your personal account profile, security credentials, and organization team access
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-darkbg-border gap-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-4 text-xs font-extrabold transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'profile'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FiUser />
          <span>My Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 px-4 text-xs font-extrabold transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'security'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FiLock />
          <span>Password & Security</span>
        </button>

        {isAdmin && (
          <button
            onClick={() => setActiveTab('rbac')}
            className={`pb-3 px-4 text-xs font-extrabold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'rbac'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FiShield />
            <span>Team RBAC Roles</span>
          </button>
        )}
      </div>

      {/* TAB 1: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-darkbg-card border border-slate-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xl max-w-2xl space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Personal Profile Information</h3>

          {profileMsg.text && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-center gap-2 border ${
                profileMsg.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400 font-bold'
              }`}
            >
              {profileMsg.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
              <span>{profileMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Email Address (Read-only)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-darkbg/40 border border-slate-200 dark:border-darkbg-border text-slate-400 text-sm font-semibold cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Assigned RBAC Role
              </label>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                <FiShield />
                <span className="uppercase">{user?.role}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={profileSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all disabled:opacity-50"
              >
                <FiSave />
                <span>{profileSubmitting ? 'Updating...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Security & Password */}
      {activeTab === 'security' && (
        <div className="bg-white dark:bg-darkbg-card border border-slate-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xl max-w-2xl space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Change Account Password</h3>

          {passwordMsg.text && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-center gap-2 border ${
                passwordMsg.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400 font-bold'
              }`}
            >
              {passwordMsg.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
              <span>{passwordMsg.text}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={passwordSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all disabled:opacity-50"
              >
                <FiLock />
                <span>{passwordSubmitting ? 'Changing Password...' : 'Update Password'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: Team RBAC Management (Admin Only) */}
      {activeTab === 'rbac' && isAdmin && (
        <div className="bg-white dark:bg-darkbg-card border border-slate-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Team Members & Role Access</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 font-medium">
              Assign roles and control active user permissions across the organization
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-slate-700 dark:text-slate-300 text-xs font-medium">
              <thead className="bg-slate-50 dark:bg-darkbg text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-200 dark:border-darkbg-border">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4">Account Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-darkbg-border">
                {teamLoading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-slate-400 font-bold">
                      Loading team access lists...
                    </td>
                  </tr>
                ) : (
                  teamUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-darkbg-hover transition-colors">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{u.full_name}</td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">{u.email}</td>
                      <td className="p-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value, u.is_active)}
                          className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-indigo-600"
                        >
                          <option value="REP">Sales Representative (REP)</option>
                          <option value="MANAGER">Sales Manager (MANAGER)</option>
                          <option value="admin">System Administrator (ADMIN)</option>
                          <option value="ADMIN">System Administrator (ADMIN)</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleRoleChange(u.id, u.role, !u.is_active)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black border transition-colors ${
                            u.is_active
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 hover:bg-rose-500/20'
                          }`}
                        >
                          {u.is_active ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}