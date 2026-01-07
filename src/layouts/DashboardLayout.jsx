import React, { useState } from 'react';
import { LayoutDashboard, BarChart3, Settings, Menu, X, User, Database, Globe, Code2, ChevronDown, ChevronRight } from 'lucide-react';

const DashboardLayout = ({ children, onMenuSelect }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState('Fundamentals'); // Default open for demo

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleSubMenu = (label) => {
        setExpandedMenu(expandedMenu === label ? null : label);
    };

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: 'Fundamentals',
            active: true,
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
            label: 'Advanced E6+ features',
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

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed md:relative z-50 h-full w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
            >
                <div className="p-6 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-primary-500">Analytics</h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="px-4 space-y-2 overflow-y-auto max-h-[calc(100vh-180px)]">
                    {menuItems.map((item, index) => (
                        <div key={index}>
                            {item.subItems ? (
                                // Collapsible Menu Item
                                <div className="space-y-1">
                                    <button
                                        onClick={() => toggleSubMenu(item.label)}
                                        className={`
                                        w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors
                                        ${item.active || expandedMenu === item.label
                                                ? 'bg-primary-600/10 text-primary-400'
                                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                            }
                                    `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={20} />
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        {expandedMenu === item.label ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    </button>

                                    {/* Sub Items */}
                                    {expandedMenu === item.label && (
                                        <div className="pl-11 space-y-1">
                                            {item.subItems.map((sub, subIndex) => (
                                                <button
                                                    key={subIndex}
                                                    onClick={() => onMenuSelect && onMenuSelect(sub.label)}
                                                    className="block w-full text-left py-2 text-sm text-slate-400 hover:text-white transition-colors"
                                                >
                                                    {sub.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Standard Menu Item
                                <button
                                    onClick={() => onMenuSelect && onMenuSelect(item.label)}
                                    className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                    ${item.active
                                            ? 'bg-primary-600 text-white'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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

                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                            <User size={20} className="text-slate-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">John Doe</p>
                            <p className="text-xs text-slate-400">Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="md:hidden text-slate-600 hover:text-slate-900">
                            <Menu size={24} />
                        </button>
                        <h2 className="text-lg font-semibold text-slate-800">Dashboard</h2>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
