import React from 'react';
import { BookOpen } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen w-full flex bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            {/* Left Decoration Side */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 z-0"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

                <div className="relative z-10 text-center p-12">
                    <div className="w-20 h-20 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/50">
                        <BookOpen size={40} className="text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-6">EduDash</h1>
                    <p className="text-xl text-slate-300 max-w-md mx-auto leading-relaxed">
                        Empower your learning journey with interactive lessons, progress tracking, and detailed analytics.
                    </p>
                </div>

                {/* Floating shapes */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            {/* Right Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <div className="lg:hidden w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <BookOpen size={24} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">{title}</h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 transition-colors">{subtitle}</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
