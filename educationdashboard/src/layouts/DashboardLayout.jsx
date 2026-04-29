import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, BarChart3, Settings, Menu, X, User, Database, Globe, Code2, ChevronDown, ChevronRight, Layers, LogOut, Search, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const DashboardLayout = ({ children, onMenuSelect }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState(null);

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleSubMenu = (label) => {
        setExpandedMenu(expandedMenu === label ? null : label);
    };

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: 'Dashboard',
            active: true,
        },
        // ... (truncated for brevity, logic remains same)
        {
            icon: Layers,
            label: 'Fundamentals',
            active: false,
            subItems: [
                { label: 'Introduction' },
                { label: 'Variables' },
                { label: 'Data types' },
                { label: 'Operators' },
                { label: 'Type Conversion' },
                { label: 'Hoisting' },
            ]
        },
        {
            icon: BarChart3,
            label: 'Logic controls',
            active: false,
            subItems: [
                { label: 'Conditions' },
                { label: 'Loops' },
                { label: 'Functions' },
            ]
        },
        {
            icon: Database,
            label: 'Data structure',
            active: false,
            subItems: [
                { label: 'Array Method' },
                { label: 'String Method' },
                { label: 'Objects' },
                { label: 'Classes' },
                { label: 'Map, Filter, Reduce' },
                { label: 'JSON' },
            ]
        },
        {
            icon: Globe,
            label: 'DOM',
            active: false,
            subItems: [
                { label: 'DOM Basic' },
                { label: 'Events' },
                { label: 'Web Storage' },
                { label: 'APIs' },
                { label: 'Cookies' },
            ]
        },
        {
            icon: Code2,
            label: 'E6+ features',
            active: false,
            subItems: [
                { label: 'E6+ features' },
                { label: 'Callback' },
                { label: 'Promise' },
                { label: 'Async/Await' },
                { label: 'Modules' },
                { label: 'Proxies' },
                { label: 'Iterators' },
            ]
        },
    ];

    // Search Logic
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        const query = searchQuery.toLowerCase();
        const results = [];

        menuItems.forEach(item => {
            // Check top level
            if (item.label.toLowerCase().includes(query)) {
                results.push({ label: item.label, path: item.label, icon: item.icon });
            }

            // Check sub items
            if (item.subItems) {
                item.subItems.forEach(sub => {
                    if (sub.label.toLowerCase().includes(query)) {
                        results.push({
                            label: sub.label,
                            path: `${item.label} > ${sub.label}`,
                            icon: item.icon,
                            actionLabel: sub.label // Actual value to pass to onMenuSelect
                        });
                    }
                });
            }
        });

        setSearchResults(results);
        setIsSearchOpen(true);
    }, [searchQuery]);

    // Close search on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchResultClick = (item) => {
        onMenuSelect && onMenuSelect(item.actionLabel || item.label);
        setSearchQuery('');
        setIsSearchOpen(false);
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden font-sans transition-colors duration-300">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed md:relative z-50 h-full w-72 bg-[#0f172a] dark:bg-slate-950 text-slate-300 transition-all duration-300 ease-out shadow-2xl
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-6 flex items-center justify-between border-b border-slate-800/50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <Code2 className="text-white" size={20} />
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                EduDash
                            </h1>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="md:hidden p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
                        {menuItems.map((item, index) => (
                            <div key={index} className="group">
                                {item.subItems ? (
                                    <div className="space-y-1">
                                        <button
                                            onClick={() => toggleSubMenu(item.label)}
                                            className={`
                                                w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                                                ${item.active || expandedMenu === item.label
                                                    ? 'bg-gradient-to-r from-primary-600/20 to-indigo-600/10 text-primary-400 border border-primary-500/10'
                                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 hover:pl-5'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon size={20} className={item.active || expandedMenu === item.label ? 'text-primary-400' : 'text-slate-500 group-hover:text-slate-300'} />
                                                <span className="font-medium">{item.label}</span>
                                            </div>
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform duration-200 ${expandedMenu === item.label ? 'rotate-180 text-primary-400' : ''}`}
                                            />
                                        </button>

                                        <div
                                            className={`
                                                overflow-hidden transition-all duration-300 ease-in-out
                                                ${expandedMenu === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                                            `}
                                        >
                                            <div className="pl-4 pr-2 py-2 space-y-1 my-1 ml-4 border-l border-slate-800">
                                                {item.subItems.map((sub, subIndex) => (
                                                    <button
                                                        key={subIndex}
                                                        onClick={() => onMenuSelect && onMenuSelect(sub.label)}
                                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:text-primary-300 hover:bg-slate-800/30 rounded-lg transition-all"
                                                    >
                                                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                                                        {sub.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => onMenuSelect && onMenuSelect(item.label)}
                                        className={`
                                            w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                            ${item.active
                                                ? 'bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white hover:pl-5'
                                            }
                                        `}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Footer User Profile */}
                    <div className="p-4 border-t border-slate-800/50">
                        <div
                            onClick={() => onMenuSelect && onMenuSelect('Profile')}
                            className="glass-card bg-slate-800/40 p-3 rounded-xl flex items-center gap-3 hover:bg-slate-800/60 transition-colors group cursor-pointer"
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                                        <User size={20} className="text-indigo-400" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate group-hover:text-primary-300 transition-colors">{user?.name || 'User'}</p>
                                <p className="text-xs text-slate-500 truncate">{user?.email || 'Premium User'}</p>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); logout(); }}
                                className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-colors"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 relative transition-colors duration-300">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-500/5 to-transparent -z-10" />

                {/* Header */}
                <header className="h-20 min-h-[5rem] px-8 flex items-center justify-between z-20 gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h2>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl relative" ref={searchRef}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search for courses, topic, etc..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onClick={() => searchQuery && setIsSearchOpen(true)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400 shadow-sm"
                            />
                        </div>

                        {/* Search Results Dropdown */}
                        {isSearchOpen && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 max-h-80 overflow-y-auto z-50">
                                {searchResults.map((result, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearchResultClick(result)}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left border-b border-slate-50 dark:border-slate-700 last:border-0"
                                    >
                                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                            <result.icon size={16} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800 dark:text-slate-200">{result.label}</p>
                                            <p className="text-xs text-slate-400">{result.path}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:shadow-md transition-all"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <button
                            onClick={() => onMenuSelect && onMenuSelect('Profile')}
                            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:text-primary-600 hover:border-primary-200 hover:shadow-md transition-all relative"
                        >
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                            <Settings size={20} />
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-8">
                    <div className="max-w-7xl mx-auto h-full">
                        <div className="glass dark:glass-dark rounded-3xl p-6 md:p-8 h-full shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border-white/60 dark:border-slate-700/50">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
