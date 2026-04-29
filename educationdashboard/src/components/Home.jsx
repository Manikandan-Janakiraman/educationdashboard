import React, { useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';
import {
    TrendingUp, Clock, CheckCircle, Calendar,
    ChevronLeft, ChevronRight, MoreHorizontal
} from 'lucide-react';

const StatCard = ({ title, value, label, icon: Icon, trend, color }) => (
    <div className="glass-card dark:bg-slate-800/40 dark:border-slate-700/50 p-6 rounded-2xl relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon size={64} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-current`}>
                    <Icon size={20} className={color.replace('bg-', 'text-')} />
                </div>
                <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">{title}</span>
            </div>
            <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h3>
                {trend && (
                    <span className="text-xs font-medium text-emerald-500 flex items-center bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <TrendingUp size={12} className="mr-1" /> {trend}
                    </span>
                )}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{label}</p>
        </div>
    </div>
);

const CalendarWidget = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);

    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const dayInMonth = checkDate.getDate();

    const days = [];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= dayInMonth; i++) {
        days.push(i);
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

    return (
        <div className="glass-card dark:bg-slate-800/40 dark:border-slate-700/50 p-6 rounded-3xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">{monthNames[currentDate.getMonth()]}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{currentDate.getFullYear()}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors"><ChevronLeft size={18} /></button>
                    <button onClick={nextMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors"><ChevronRight size={18} /></button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} className="text-xs font-semibold text-slate-400 py-1">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 flex-1">
                {days.map((day, idx) => (
                    <div key={idx} className="aspect-square flex items-center justify-center relative">
                        {day ? (
                            <button className={`
                                w-8 h-8 rounded-full text-sm flex items-center justify-center transition-all
                                ${day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                }
                            `}>
                                {day}
                                {/* Random dot for events */}
                                {[3, 15, 22].includes(day) && (
                                    <span className="absolute bottom-1 w-1 h-1 bg-rose-500 rounded-full"></span>
                                )}
                            </button>
                        ) : null}
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                    <span className="text-slate-600 dark:text-slate-400">Upcoming Quiz</span>
                </div>
            </div>
        </div>
    );
};

const ActivityChart = () => {
    const data = [
        { name: 'Mon', hours: 2.5 },
        { name: 'Tue', hours: 4.0 },
        { name: 'Wed', hours: 3.2 },
        { name: 'Thu', hours: 5.5 },
        { name: 'Fri', hours: 3.8 },
        { name: 'Sat', hours: 6.2 },
        { name: 'Sun', hours: 4.5 },
    ];

    return (
        <div className="glass-card dark:bg-slate-800/40 dark:border-slate-700/50 p-6 rounded-3xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">Weekly Activity</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Hours spent learning</p>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="flex-1 min-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" strokeOpacity={0.2} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(30, 41, 59, 0.9)', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="hours"
                            stroke="#6366f1"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorHours)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Daily Progress"
                    value="85%"
                    label="Goals completed today"
                    icon={TrendingUp}
                    trend="+12%"
                    color="text-indigo-600"
                />
                <StatCard
                    title="Time Spent"
                    value="4h 12m"
                    label="Total learning time"
                    icon={Clock}
                    trend="+50m"
                    color="text-blue-600"
                />
                <StatCard
                    title="Modules Done"
                    value="12/15"
                    label="Course completion"
                    icon={CheckCircle}
                    color="text-emerald-600"
                />
            </div>

            {/* Main Charts & Calendar Layer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-[400px]">
                    <ActivityChart />
                </div>
                <div className="h-[400px]">
                    <CalendarWidget />
                </div>
            </div>

            {/* Recent Topics / Quick Continue */}
            <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 px-1">Continue Learning</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {['Variables', 'Arrays', 'Objects', 'Functions'].map((item, i) => (
                        <div key={i} className="glass-card dark:bg-slate-800/40 dark:border-slate-700/50 p-4 rounded-xl hover:scale-[1.02] transition-transform cursor-pointer border border-white/50 dark:border-slate-700">
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs px-2 py-1 rounded font-medium">JS Basics</span>
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                </div>
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-1">{item}</h4>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(4 - i) * 20}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
