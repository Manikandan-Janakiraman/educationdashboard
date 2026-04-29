import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Camera, LogOut, Save, X } from 'lucide-react';

const Profile = () => {
    const { user, logout, login } = useAuth(); // Assuming login updates user context or we might need a specific updateUser method
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const handleSave = (e) => {
        e.preventDefault();
        // meaningful update logic would go here. 
        // For now, we rely on the AuthContext potentially having an update method, 
        // or we just simulate it locally since authService uses localStorage.

        // Simulating update in localStorage
        const users = JSON.parse(localStorage.getItem('edudash_users') || '[]');
        const updatedUsers = users.map(u =>
            u.email === user.email ? { ...u, ...formData } : u
        );
        localStorage.setItem('edudash_users', JSON.stringify(updatedUsers));

        // Update current user session
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('edudash_current_user', JSON.stringify(updatedUser));

        // Force page reload to reflect changes in Context (since we don't have an explicit updateUser method in context yet)
        window.location.reload();

        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30 text-4xl font-bold">
                            {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-white text-indigo-600 rounded-full shadow-lg hover:bg-slate-100 transition-colors">
                            <Camera size={16} />
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold">{user?.name || 'User Name'}</h1>
                        <p className="text-indigo-200">Premium Member</p>
                    </div>
                </div>

                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Profile Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="glass-card dark:bg-slate-800/40 dark:border-slate-700/50 p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Personal Information</h2>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleSave} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        <Save size={18} /> Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Full Name</p>
                                        <p className="font-semibold text-slate-800 dark:text-white">{user?.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Email Address</p>
                                        <p className="font-semibold text-slate-800 dark:text-white">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Member Since</p>
                                        <p className="font-semibold text-slate-800 dark:text-white">January 2025</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Account Actions */}
                <div className="space-y-6">
                    <div className="glass-card dark:bg-slate-800/40 dark:border-slate-700/50 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Account Settings</h2>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left text-slate-700 dark:text-slate-300">
                                <span className="text-sm font-medium">Change Password</span>
                                <span className="text-xs text-indigo-600 dark:text-indigo-400">Update</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left text-slate-700 dark:text-slate-300">
                                <span className="text-sm font-medium">Notifications</span>
                                <span className="text-xs text-indigo-600 dark:text-indigo-400">On</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left text-slate-700 dark:text-slate-300">
                                <span className="text-sm font-medium">Language</span>
                                <span className="text-xs text-indigo-600 dark:text-indigo-400">English</span>
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/50">
                            <button
                                onClick={logout}
                                className="w-full flex items-center justify-center gap-2 p-3 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors font-medium border border-rose-100 dark:border-rose-500/20"
                            >
                                <LogOut size={18} /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
