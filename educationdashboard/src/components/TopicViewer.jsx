import React, { useState, useEffect } from 'react';
import {
    Code, Terminal, Box, Play, Info, Layers, RefreshCw, Globe, ArrowRight,
    ArrowUpRight, Monitor, Layout, Component, Database, Cpu, Share2, MousePointer,
    Smartphone, Moon, Sun, Check, AlertCircle, Copy
} from 'lucide-react';
import { topicData } from '../data/topicData';

// --- Visual Components (Extracted from App.jsx) ---

const ConditionVisual = () => {
    const [hour, setHour] = useState(12);
    const isDay = hour < 18;

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full">
            <div className={`
        relative w-48 h-48 rounded-full border-4 flex items-center justify-center overflow-hidden transition-colors duration-700
        ${isDay ? 'bg-sky-200 border-sky-400' : 'bg-indigo-950 border-indigo-500'}
      `}>
                {/* Sun/Moon Animation */}
                <div className={`
           absolute transition-all duration-700 ease-in-out transform
           ${isDay ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
         `}>
                    <div className="w-20 h-20 bg-yellow-400 rounded-full shadow-[0_0_40px_rgba(251,191,36,0.6)] animate-[pulse_3s_infinite]"></div>
                </div>
                <div className={`
           absolute transition-all duration-700 ease-in-out transform
           ${!isDay ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
         `}>
                    <div className="w-16 h-16 bg-slate-100 rounded-full shadow-[0_0_20px_rgba(248,250,252,0.4)] relative">
                        <div className="absolute top-2 right-4 w-3 h-3 bg-slate-200 rounded-full opacity-50"></div>
                        <div className="absolute bottom-4 left-4 w-5 h-5 bg-slate-200 rounded-full opacity-50"></div>
                    </div>
                </div>
            </div>

            <div className="mt-8 w-full max-w-xs text-center">
                <div className="text-2xl font-bold mb-2 transition-colors duration-500" style={{ color: isDay ? '#0284c7' : '#6366f1' }}>
                    {isDay ? "Good day! ☀️" : "Good evening! 🌙"}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span>00:00</span>
                    <span className="font-bold text-indigo-500">{hour}:00</span>
                    <span>23:00</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="23"
                    value={hour}
                    onChange={(e) => setHour(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
            </div>

            <div className="mt-6 p-4 bg-slate-900 rounded-lg font-mono text-sm border border-slate-700 w-full max-w-sm text-slate-300">
                <div className="text-purple-400">if <span className="text-white">({hour} &lt; 18)</span> {'{'}</div>
                <div className={`transition-all duration-300 ${isDay ? "bg-green-500/20 text-green-300 -mx-4 px-4 border-l-2 border-green-500" : "opacity-30"}`}>
                    &nbsp;&nbsp;return "Good day"; {isDay && "✅"}
                </div>
                <div className="text-purple-400">{'}'} else {'{'}</div>
                <div className={`transition-all duration-300 ${!isDay ? "bg-green-500/20 text-green-300 -mx-4 px-4 border-l-2 border-green-500" : "opacity-30"}`}>
                    &nbsp;&nbsp;return "Good evening"; {!isDay && "✅"}
                </div>
                <div className="text-purple-400">{'}'}</div>
            </div>
        </div>
    );
};

const ArrayVisual = ({ initialData }) => {
    const [fruits, setFruits] = useState(initialData || ["🍎", "🍌", "🍇"]);

    const handlePush = () => {
        const extraFruits = ["🍊", "🍋", "🍉", "🍍", "🥝", "🍒", "🍓"];
        const randomFruit = extraFruits[Math.floor(Math.random() * extraFruits.length)];
        setFruits(prev => [...prev, randomFruit]);
    };

    const handlePop = () => {
        setFruits(prev => prev.slice(0, -1));
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full">
            <div className="min-h-[100px] w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center gap-4 mb-8 flex-wrap p-4">
                {fruits.map((fruit, idx) => (
                    <div key={idx} className="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-4xl animate-[bounce_0.5s_ease-out]">
                        {fruit}
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full text-[10px] flex items-center justify-center font-bold font-mono border border-indigo-200">{idx}</span>
                    </div>
                ))}
                {fruits.length === 0 && <span className="text-slate-400 italic">Array is empty []</span>}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handlePush}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                >
                    <Box size={18} /> Push()
                </button>
                <button
                    onClick={handlePop}
                    className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-rose-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={fruits.length === 0}
                >
                    <Layers size={18} /> Pop()
                </button>
            </div>
            <div className="mt-6 font-mono text-sm text-indigo-400 bg-slate-900 px-6 py-3 rounded-xl border border-slate-800">
                const fruits = [<span className="text-green-400">{fruits.map(f => `"${f}"`).join(', ')}</span>];
            </div>
        </div>
    );
};

const LoopVisual = () => {
    const [index, setIndex] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(() => {
            setIndex(prev => {
                if (prev >= 4) {
                    setIsRunning(false);
                    return -1;
                }
                return prev + 1;
            });
        }, 800);
        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex gap-3">
                {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className={`
                      w-14 h-14 flex flex-col items-center justify-center rounded-xl border-2 font-bold text-lg transition-all duration-300 relative
                      ${index === i ? 'bg-indigo-600 border-indigo-500 text-white scale-110 shadow-xl shadow-indigo-600/30' : 'bg-white border-slate-200 text-slate-300'}
                  `}>
                        <span className="text-xs font-mono font-normal opacity-50 mb-1">i=</span>
                        {i}
                        {index === i && (
                            <div className="absolute -bottom-2 translate-y-full">
                                <ArrowUpRight className="text-indigo-600 animate-bounce" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="w-full max-w-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Console Output</span>
                    {isRunning && <span className="text-xs text-green-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Running</span>}
                </div>
                <div className="font-mono bg-slate-900 text-slate-300 p-4 rounded-xl w-full text-center border border-slate-800 min-h-[60px] flex items-center justify-center">
                    {index === -1 ? <span className="text-slate-600">Waiting to start...</span> : <span className="text-green-400">Iteration: i = {index}</span>}
                </div>
            </div>

            <button
                onClick={() => { setIndex(-1); setIsRunning(true); }}
                disabled={isRunning}
                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all font-medium shadow-lg shadow-indigo-600/30"
            >
                <Play size={18} fill="currentColor" /> {isRunning ? "Looping..." : "Run Loop"}
            </button>
        </div>
    );
};

const FunctionVisual = () => {
    const [p1, setP1] = useState(5);
    const [p2, setP2] = useState(10);
    const [result, setResult] = useState(50);
    const [isAnimating, setIsAnimating] = useState(false);

    const calculate = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setResult(p1 * p2);
            setIsAnimating(false);
        }, 500);
    }

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex items-center gap-6 p-8 bg-white border border-slate-200 rounded-2xl relative shadow-sm">
                <div className="flex flex-col gap-3">
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Param 1</label>
                    <input type="number" value={p1} onChange={e => setP1(Number(e.target.value))} className="w-20 p-3 border border-slate-200 rounded-lg text-center font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Param 2</label>
                    <input type="number" value={p2} onChange={e => setP2(Number(e.target.value))} className="w-20 p-3 border border-slate-200 rounded-lg text-center font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>

                <div className="relative px-4">
                    <div className={`h-1 w-16 bg-slate-200 rounded overflow-hidden`}>
                        <div className={`h-full bg-indigo-500 transition-all duration-500 ${isAnimating ? 'w-full ml-16' : 'w-0'}`}></div>
                    </div>
                </div>

                <div className={`
                      flex flex-col items-center justify-center w-28 h-28 bg-slate-900 text-white rounded-2xl shadow-xl z-10 transition-all duration-300 border-4 border-slate-800
                      ${isAnimating ? 'scale-110 border-indigo-500 shadow-indigo-500/30' : 'scale-100'}
                  `}>
                    <Code size={24} className="mb-2 text-indigo-400" />
                    <span className="font-mono text-sm font-bold">Process</span>
                </div>

                <div className="relative px-4">
                    <ArrowRight className={`text-slate-300 transition-all duration-300 ${isAnimating ? 'text-indigo-500 translate-x-2' : ''}`} />
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Return</label>
                    <div className="w-20 p-3 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg text-center font-bold text-xl">
                        {result}
                    </div>
                </div>
            </div>
            <button onClick={calculate} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">
                Execute myFunction({p1}, {p2})
            </button>
        </div>
    );
}

const OperatorVisual = () => {
    const [a, setA] = useState(10);
    const [b, setB] = useState(5);
    const [op, setOp] = useState('+');

    const result = {
        '+': a + b,
        '-': a - b,
        '*': a * b,
        '/': b !== 0 ? (a / b).toFixed(2) : 'Err',
        '%': b !== 0 ? a % b : 'Err',
    }[op];

    return (
        <div className="flex items-center justify-center gap-4 text-2xl font-mono p-8 bg-slate-50 rounded-2xl border border-slate-200">
            <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="w-24 p-4 border-2 border-slate-200 rounded-xl text-center bg-white focus:border-indigo-500 focus:outline-none transition-colors" />

            <select value={op} onChange={e => setOp(e.target.value)} className="p-4 border-2 border-slate-200 rounded-xl bg-white cursor-pointer hover:border-indigo-400 focus:border-indigo-500 focus:outline-none transition-all font-bold text-indigo-600">
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">×</option>
                <option value="/">÷</option>
                <option value="%">%</option>
            </select>

            <input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="w-24 p-4 border-2 border-slate-200 rounded-xl text-center bg-white focus:border-indigo-500 focus:outline-none transition-colors" />

            <span className="text-slate-400">=</span>

            <div className="px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold min-w-[5rem] text-center shadow-lg shadow-indigo-600/30">
                {result}
            </div>
        </div>
    );
}

const VariableVisual = () => {
    const [values, setValues] = useState({
        var: "25",
        let: "John",
        const: "3.14"
    });

    const handleChange = (type, val) => {
        if (type === 'const') {
            alert("Assignment to constant variable! TypeError");
            return;
        }
        setValues(prev => ({ ...prev, [type]: val }));
    }

    return (
        <div className="flex flex-col gap-4 w-full max-w-lg">
            {Object.entries(values).map(([type, val]) => (
                <div key={type} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all group">
                    <div className={`
                          w-20 text-center text-xs font-bold uppercase tracking-wider py-1.5 rounded-lg
                          ${type === 'const' ? 'bg-purple-100 text-purple-700' : type === 'let' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}
                      `}>
                        {type}
                    </div>
                    <div className="font-mono text-slate-300">=</div>
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={val}
                            onChange={(e) => handleChange(type, e.target.value)}
                            className={`w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${type === 'const' ? 'cursor-not-allowed opacity-75 bg-slate-100' : ''}`}
                            readOnly={type === 'const'}
                        />
                        {type === 'const' && <LockIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />}
                    </div>
                    {type === 'const' && <span className="text-[10px] uppercase font-bold text-red-400 border border-red-200 px-2 py-0.5 rounded">Immutable</span>}
                </div>
            ))}
            <p className="text-xs text-center text-slate-400 mt-2 bg-slate-50 py-2 rounded-lg border border-slate-100">
                <Info size={12} className="inline mr-1" />
                Try editing the values. 'const' requires initialization and cannot be reassigned.
            </p>
        </div>
    );
}

// Helper icon for VariableVisual
const LockIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
)

const DOMEventVisual = () => {
    const [events, setEvents] = useState([]);

    const logEvent = (type) => {
        setEvents(prev => [{ id: Date.now(), type }, ...prev.slice(0, 4)]);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <button
                    onClick={() => logEvent('click')}
                    onMouseEnter={() => logEvent('mouseenter')}
                    onMouseLeave={() => logEvent('mouseleave')}
                    className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-xl shadow-indigo-600/30 hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all font-bold text-lg flex items-center gap-3"
                >
                    <MousePointer size={20} /> Interact With Me
                </button>
            </div>

            <div className="w-full max-w-sm bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">Event Listener Console</span>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-2 font-mono text-sm min-h-[160px]">
                    {events.length === 0 && <span className="text-slate-600 italic">Listening for events...</span>}
                    {events.map(e => (
                        <div key={e.id} className="text-green-400 animate-[slideIn_0.2s_ease-out] border-l-2 border-green-500/30 pl-2">
                            <span className="text-slate-500 text-xs opacity-50 mr-2">{(new Date(e.id)).toLocaleTimeString().split(' ')[0]}</span>
                            <span className="font-bold">{e.type}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const DOMTreeVisual = () => {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="w-full max-w-md border-2 border-dashed border-slate-300 p-8 rounded-2xl relative bg-slate-50/50">
                <div className="absolute -top-3 left-6 bg-white px-2 text-xs text-slate-400 font-bold uppercase tracking-wider border border-slate-100 rounded">document.body</div>

                <div
                    onMouseEnter={(e) => { e.stopPropagation(); setHovered('parent') }}
                    onMouseLeave={() => setHovered(null)}
                    className={`
                          p-8 border-2 rounded-xl transition-all duration-200 cursor-default shadow-sm
                          ${hovered === 'parent' ? 'border-indigo-500 bg-indigo-50 shadow-md scale-[1.02]' : 'border-slate-300 bg-white'}
                      `}
                >
                    <div className="text-xs text-slate-400 mb-4 font-mono">div#parent</div>

                    <div className="flex gap-4">
                        <div
                            onMouseEnter={(e) => { e.stopPropagation(); setHovered('child1') }}
                            onMouseLeave={(e) => { e.stopPropagation(); setHovered('parent') }}
                            className={`
                                  flex-1 p-6 border-2 rounded-lg transition-all duration-200
                                  ${hovered === 'child1' ? 'border-pink-500 bg-pink-50 shadow-md -translate-y-1' : 'border-slate-200 bg-slate-50'}
                              `}
                        >
                            <span className="text-xs text-slate-400 font-mono">span.child</span>
                        </div>
                        <div
                            onMouseEnter={(e) => { e.stopPropagation(); setHovered('child2') }}
                            onMouseLeave={(e) => { e.stopPropagation(); setHovered('parent') }}
                            className={`
                                  flex-1 p-6 border-2 rounded-lg transition-all duration-200
                                  ${hovered === 'child2' ? 'border-pink-500 bg-pink-50 shadow-md -translate-y-1' : 'border-slate-200 bg-slate-50'}
                              `}
                        >
                            <span className="text-xs text-slate-400 font-mono">span.child</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-10 px-6 flex items-center bg-indigo-600 text-white rounded-full font-mono text-sm font-bold shadow-lg shadow-indigo-600/20">
                {hovered ? `Selected: ${hovered}` : "Hover over elements above"}
            </div>
        </div>
    );
}

const StorageVisual = () => {
    const [items, setItems] = useState([{ key: 'user', value: 'John' }]);

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-2 justify-end">
                <button onClick={() => setItems([...items, { key: `k${items.length}`, value: `v${Math.floor(Math.random() * 100)}` }])} className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-200 transition-colors">Add Item</button>
                <button onClick={() => setItems([])} className="px-4 py-1.5 bg-rose-100 text-rose-700 rounded-lg text-sm font-semibold hover:bg-rose-200 transition-colors">Clear</button>
            </div>
            <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden min-h-[120px] shadow-sm">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider font-bold">
                    LocalStorage Simulator
                </div>
                <div>
                    {items.length === 0 ?
                        <div className="p-8 text-center text-slate-400 italic text-sm">Empty storage...</div> :
                        items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-3 border-b border-slate-100 last:border-0 hover:bg-indigo-50/50 animate-[fadeIn_0.3s]">
                                <span className="font-mono text-indigo-600 text-sm font-bold">{item.key}</span>
                                <span className="font-mono text-slate-600 text-sm bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{item.value}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

const ApiVisual = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [data, setData] = useState(null);

    const fetchData = () => {
        setStatus('loading');
        setData(null);
        setTimeout(() => {
            const users = ["Alice", "Bob", "Charlie", "Dave"];
            const randomUser = users[Math.floor(Math.random() * users.length)];
            setData({ id: Math.floor(Math.random() * 1000), name: randomUser, role: "User" });
            setStatus('success');
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <button
                onClick={fetchData}
                disabled={status === 'loading'}
                className="flex items-center gap-3 px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-70 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
            >
                {status === 'loading' ? <RefreshCw className="animate-spin" size={20} /> : <Globe size={20} />}
                <span className="font-bold">Fetch User Data</span>
            </button>

            <div className="w-full max-w-sm bg-[#0f172a] rounded-xl p-6 min-h-[140px] font-mono text-sm relative border border-slate-800 shadow-2xl">
                <div className="absolute top-3 right-3 flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                </div>

                {status === 'idle' && <span className="text-slate-600 flex items-center gap-2"><ArrowRight size={14} /> Waiting for request...</span>}
                {status === 'loading' && <span className="text-yellow-400 flex items-center gap-2"><RefreshCw size={14} className="animate-spin" /> GET /api/user...</span>}
                {status === 'success' && (
                    <div className="text-green-400 animate-[slideIn_0.3s]">
                        <div className="text-xs text-slate-500 mb-2">200 OK</div>
                        <pre className="font-mono text-xs leading-relaxed opacity-90">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

const AsyncVisual = () => {
    const [step, setStep] = useState(0);

    const runAsync = () => {
        setStep(1);
        setTimeout(() => {
            setStep(2);
            setTimeout(() => setStep(0), 3000);
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex items-center gap-6">
                <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white transition-all duration-500 shadow-lg
                ${step >= 0 ? 'bg-indigo-600 scale-100 shadow-indigo-500/30' : 'bg-slate-200'}
            `}>
                    <span className="text-xl">1</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className={`h-1 w-12 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-indigo-300' : 'bg-slate-200'}`}></div>
                </div>
                <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white transition-all duration-500 shadow-lg
                ${step >= 1 ? (step === 1 ? 'bg-yellow-500 animate-pulse scale-110 shadow-yellow-500/30' : 'bg-indigo-600') : 'bg-slate-200'}
            `}>
                    {step === 1 ? <RefreshCw className="animate-spin" /> : <span className="text-xl">2</span>}
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className={`h-1 w-12 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-indigo-300' : 'bg-slate-200'}`}></div>
                </div>
                <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white transition-all duration-500 shadow-lg
                ${step === 2 ? 'bg-emerald-500 scale-110 shadow-emerald-500/30' : 'bg-slate-200'}
            `}>
                    {step === 2 ? <Check size={28} /> : <span className="text-xl">3</span>}
                </div>
            </div>

            <div className="bg-slate-50 px-6 py-2 rounded-full border border-slate-200">
                <span className="font-mono text-sm text-slate-600 font-medium">
                    {step === 0 && "Ready to start process"}
                    {step === 1 && "Async Operation in progress..."}
                    {step === 2 && "Operation Completed!"}
                </span>
            </div>

            <button onClick={runAsync} disabled={step !== 0} className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 font-medium shadow-md active:scale-95 transition-all">
                Start Async Flow
            </button>
        </div>
    )
};

const ObjectVisual = () => {
    const [obj, setObj] = useState({ brand: "Ford", model: "Mustang" });

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex gap-2 justify-center">
                <button onClick={() => setObj({ ...obj, year: 2020 })} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 text-xs font-bold transition-colors border border-indigo-100">Add Year</button>
                <button onClick={() => setObj({ ...obj, color: "Red" })} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-xs font-bold transition-colors border border-purple-100">Add Color</button>
                <button onClick={() => setObj({ brand: "Ford", model: "Mustang" })} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-xs font-bold transition-colors border border-slate-200">Reset</button>
            </div>
            <div className="bg-white border text-center border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden group mx-auto w-full max-w-sm">
                <div className="absolute top-0 right-0 px-3 py-1 bg-slate-100 rounded-bl-xl text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">Object Representation</div>
                <div className="flex flex-col gap-2 mt-4 text-left">
                    {Object.entries(obj).map(([k, v], i) => (
                        <div key={k} className="flex items-center gap-3 font-mono text-sm p-2 rounded hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 animate-[fadeIn_0.3s]">
                            <div className="w-16 text-right text-purple-600 font-semibold">{k}:</div>
                            <div className="text-slate-400">→</div>
                            <div className="text-emerald-600 font-bold">"{v}"</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const ClassVisual = () => {
    const [instances, setInstances] = useState([]);

    const createInstance = (color) => {
        setInstances([...instances, { color, id: Date.now() }]);
    }

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl w-full text-center shadow-sm">
                <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest block mb-4">class CarFactory</span>
                <div className="flex gap-6 justify-center">
                    <button onClick={() => createInstance('red')} className="w-12 h-12 rounded-full bg-red-500 hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 transition-all shadow-md active:scale-95"></button>
                    <button onClick={() => createInstance('blue')} className="w-12 h-12 rounded-full bg-blue-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 transition-all shadow-md active:scale-95"></button>
                    <button onClick={() => createInstance('green')} className="w-12 h-12 rounded-full bg-green-500 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30 transition-all shadow-md active:scale-95"></button>
                </div>
                <span className="text-xs text-slate-400 mt-4 block">Click color to instantiate new Car(color)</span>
            </div>

            <div className="flex flex-wrap gap-4 justify-center min-h-[60px]">
                {instances.map(car => (
                    <div key={car.id} className={`w-24 h-14 rounded-xl bg-${car.color}-500 shadow-lg shadow-${car.color}-500/20 animate-[bounce_0.5s_ease-out] flex flex-col items-center justify-center text-white`}>
                        <span className="text-[10px] opacity-75 font-mono">Instance</span>
                        <span className="text-xs font-bold">Car</span>
                    </div>
                ))}
                {instances.length === 0 && <span className="text-slate-300 italic text-sm py-4">No instances created yet</span>}
            </div>
            {instances.length > 0 && <button onClick={() => setInstances([])} className="text-xs text-slate-400 hover:text-rose-500 transition-colors font-medium">Clear All Instances</button>}
        </div>
    )
}

const ArrayTransformVisual = () => {
    const [mode, setMode] = useState('original'); // original, map, filter

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-wrap gap-2 justify-center">
                <button onClick={() => setMode('map')} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'map' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>Map (x2)</button>
                <button onClick={() => setMode('filter')} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'filter' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>Filter (&gt;1)</button>
                <button onClick={() => setMode('reduce')} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'reduce' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>Reduce (+)</button>
            </div>

            <div className="flex gap-4 items-center h-24 bg-slate-50 px-8 rounded-2xl border border-slate-200 w-full justify-center">
                {mode === 'original' && [1, 2, 3].map((n, i) => <div key={i} className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center font-bold text-slate-600 shadow-sm">{n}</div>)}

                {mode === 'map' && [2, 4, 6].map((n, i) => (
                    <div key={i} className="w-12 h-12 bg-blue-50 border-2 border-blue-400 rounded-xl flex items-center justify-center font-bold text-blue-600 animate-[pulse_0.5s] shadow-sm">{n}</div>
                ))}

                {mode === 'filter' && [2, 3].map((n, i) => (
                    <div key={i} className="w-12 h-12 bg-green-50 border-2 border-green-400 rounded-xl flex items-center justify-center font-bold text-green-600 animate-[bounce_0.5s] shadow-sm">{n}</div>
                ))}

                {mode === 'reduce' && (
                    <div className="w-20 h-20 bg-purple-100 border-4 border-purple-500 rounded-full flex items-center justify-center font-bold text-3xl text-purple-700 animate-[spin_0.5s_ease-out] shadow-xl shadow-purple-500/20">6</div>
                )}
            </div>

            <div className="text-sm text-slate-500 font-mono">
                {mode === 'original' && "Original Array: [1, 2, 3]"}
                {mode === 'map' && "map(x => x * 2)"}
                {mode === 'filter' && "filter(x => x > 1)"}
                {mode === 'reduce' && "reduce((acc, curr) => acc + curr, 0)"}
            </div>
        </div>
    )
}

const ModuleVisual = () => {
    return (
        <div className="flex items-center justify-center gap-10 w-full">
            <div className="w-28 h-36 bg-white border border-slate-200 rounded-xl p-3 relative flex flex-col gap-2 shadow-sm">
                <div className="text-[10px] text-slate-400 font-mono">lib.js</div>
                <div className="w-full h-2 bg-indigo-50 rounded"></div>
                <div className="w-3/4 h-2 bg-indigo-50 rounded"></div>
                <div className="mt-auto px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] rounded border border-emerald-100 text-center font-mono font-bold">Export</div>
            </div>

            <div className="flex flex-col items-center gap-1 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-[ping_1.5s_infinite]"></div>
                <div className="h-0.5 bg-current w-16"></div>
                <ArrowRight size={16} />
            </div>

            <div className="w-28 h-36 bg-white border border-slate-200 rounded-xl p-3 relative flex flex-col gap-2 shadow-sm">
                <div className="text-[10px] text-slate-400 font-mono">main.js</div>
                <div className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] rounded border border-blue-100 text-center font-mono font-bold">Import</div>
                <div className="w-full h-2 bg-slate-100 rounded"></div>
                <div className="w-1/2 h-2 bg-slate-100 rounded"></div>
            </div>
        </div>
    )
}

const ProxyVisual = () => {
    const [accessCount, setAccessCount] = useState(0);

    return (
        <div className="flex flex-col items-center gap-8 w-full relative">
            <div className="relative">
                {/* Target */}
                <div className="relative w-32 h-32 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Target Object</span>
                </div>

                {/* Proxy Layer */}
                <div className={`
                        absolute inset-0 -m-2 bg-indigo-600/5 border-2 border-indigo-500 border-dashed rounded-3xl flex items-center justify-center pointer-events-none transition-all duration-300
                        ${accessCount > 0 ? 'scale-110 opacity-100 bg-indigo-600/10' : 'scale-100 opacity-60'}
                    `}>
                    {accessCount > 0 && <span className="absolute -top-10 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-[fadeOut_1s_forwards] shadow-lg">Intercepted access!</span>}
                </div>
            </div>

            <button
                onClick={() => { setAccessCount(c => c + 1); setTimeout(() => setAccessCount(0), 1000) }}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 z-10 font-bold text-sm shadow-lg shadow-indigo-600/20 active:translate-y-0.5"
            >
                Access Property
            </button>
        </div>
    )
}

const IteratorVisual = () => {
    const [step, setStep] = useState(0);
    const items = ["A", "B", "C"];

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex gap-4">
                {items.map((item, i) => (
                    <div key={i} className={`
                          w-16 h-16 flex items-center justify-center rounded-2xl border-2 font-bold text-2xl transition-all duration-300 shadow-sm
                          ${step === i ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-xl shadow-indigo-600/30' : 'bg-white border-slate-100 text-slate-300'}
                      `}>
                        {item}
                    </div>
                ))}
            </div>

            <button
                onClick={() => setStep(prev => (prev + 1) % 4)}
                className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold transition-all"
            >
                {step >= 3 ? "Reset Iterator" : "iterator.next()"}
            </button>

            <div className="font-mono text-sm bg-slate-900 text-green-400 px-6 py-3 rounded-lg border border-slate-800">
                Output: {step < 3 ? `{ value: "${items[step]}", done: false }` : `{ value: undefined, done: true }`}
            </div>
        </div>
    )
}

const HoistingVisual = () => {
    const [mode, setMode] = useState('before'); // before, after

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex gap-2 mb-2">
                <button
                    onClick={() => setMode('before')}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'before' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                    📝 Your Code
                </button>
                <button
                    onClick={() => setMode('after')}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'after' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                    🚀 After Hoisting
                </button>
            </div>

            <div className="w-full max-w-md bg-slate-900 rounded-xl p-4 border border-slate-700 font-mono text-xs leading-relaxed min-h-[240px]">
                {mode === 'before' && (
                    <>
                        <div className="text-slate-400">
                            <div className="text-orange-400 font-bold">console.log(name);</div>
                            <div className="text-slate-400 mt-1">// Output: ❌ undefined (ReferenceError)</div>
                            <div className="mt-4"></div>
                            <div className="text-blue-400 font-bold">var name = "John";</div>
                        </div>
                        <div className="mt-6 p-3 bg-orange-900/30 border border-orange-500/30 rounded text-orange-300 text-[10px]">
                            ⚠️ You access the variable BEFORE declaring it!
                        </div>
                    </>
                )}
                {mode === 'after' && (
                    <>
                        <div className="text-slate-400">
                            <div className="text-green-400 font-bold">var name;</div>
                            <div className="text-slate-500 text-[10px] ml-2">// ↑ Declaration moved to top (value: undefined)</div>
                            <div className="mt-3"></div>
                            <div className="text-blue-400 font-bold">console.log(name);</div>
                            <div className="text-slate-400 mt-1">// Output: ✅ undefined</div>
                            <div className="mt-3"></div>
                            <div className="text-blue-400 font-bold">name = "John";</div>
                            <div className="text-slate-500 text-[10px] ml-2">// ↑ Assignment stays in place</div>
                        </div>
                        <div className="mt-6 p-3 bg-emerald-900/30 border border-emerald-500/30 rounded text-emerald-300 text-[10px]">
                            ✅ JS hoists the declaration to the top, but assignment stays below!
                        </div>
                    </>
                )}
            </div>

            {/* Visual Flow */}
            <div className="w-full max-w-md flex flex-col gap-3">
                <div className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Execution Flow</div>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                    <div className={`flex-1 px-4 py-2 rounded-lg text-xs font-mono ${mode === 'before' ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`}>
                        {mode === 'before' ? 'ReferenceError' : 'Declaration created (value = undefined)'}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                    <div className="flex-1 px-4 py-2 rounded-lg text-xs font-mono bg-blue-100 text-blue-700 border border-blue-300">
                        Variable is logged
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                    <div className="flex-1 px-4 py-2 rounded-lg text-xs font-mono bg-purple-100 text-purple-700 border border-purple-300">
                        Value is assigned
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Main Topic Viewer Component ---

const TopicViewer = ({ topic }) => {
    const data = topicData[topic] || topicData['default'];

    // Render visual based on type
    const renderVisual = () => {
        switch (data.visualType) {
            case 'loop-visual': return <LoopVisual />;
            case 'function-visual': return <FunctionVisual />;
            case 'variable-visual': return <VariableVisual />;
            case 'operator-visual': return <OperatorVisual />;
            case 'dom-event-visual': return <DOMEventVisual />;
            case 'dom-tree-visual': return <DOMTreeVisual />;
            case 'storage-visual': return <StorageVisual />;
            case 'api-visual': return <ApiVisual />;
            case 'async-visual': return <AsyncVisual />;
            case 'object-visual': return <ObjectVisual />;
            case 'class-visual': return <ClassVisual />;
            case 'array-transform-visual': return <ArrayTransformVisual />;
            case 'module-visual': return <ModuleVisual />;
            case 'proxy-visual': return <ProxyVisual />;
            case 'iterator-visual': return <IteratorVisual />;
            case 'hoisting-interactive': return <HoistingVisual />;
            case 'condition-interactive': return <ConditionVisual />;
            case 'array-interactive': return <ArrayVisual initialData={data.visualData} />;
            case 'boxes':
                return (
                    <div className="flex flex-wrap gap-4 mt-4 justify-center">
                        {data.visualData.map((item, idx) => (
                            <div key={idx} className={`p-6 rounded-2xl border-2 ${item.color.replace('border-', 'border-opacity-50 ')} w-36 text-center bg-white dark:bg-slate-800 shadow-sm hover:scale-105 transition-transform`}>
                                <div className="font-mono text-xs mb-2 text-slate-400 uppercase tracking-widest">{item.label}</div>
                                <div className="text-2xl font-bold text-slate-800 dark:text-white">{item.value}</div>
                            </div>
                        ))}
                    </div>
                );
            case 'list':
                return (
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                        {data.visualData.map((item, idx) => (
                            <span key={idx} className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-bold border border-slate-200 dark:border-slate-700 shadow-sm">
                                {item}
                            </span>
                        ))}
                    </div>
                );
            case 'flow':
                return (
                    <div className="flex items-center gap-2 mt-4 overflow-x-auto p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl justify-center">
                        {data.visualSteps.map((step, idx) => (
                            <div key={idx} className="flex items-center">
                                <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-500/30 rounded-lg text-indigo-700 dark:text-indigo-300 font-mono text-sm font-bold whitespace-nowrap shadow-sm">
                                    {step}
                                </div>
                                {idx < data.visualSteps.length - 1 && <ArrowRight size={16} className="mx-2 text-slate-300 dark:text-slate-600" />}
                            </div>
                        ))}
                    </div>
                );
            case 'text-animation':
                return (
                    <div className="flex items-center justify-center h-full min-h-[200px] w-full bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-800 shadow-2xl">
                        <style>{`
               @keyframes typing { from { width: 0 } to { width: 100% } }
               @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #6366f1 } }
             `}</style>
                        <div className="font-mono text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 overflow-hidden whitespace-nowrap border-r-4 border-indigo-500 pr-2" style={{
                            animation: "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
                            width: "fit-content"
                        }}>
                            {data.visualContent}
                        </div>
                    </div>
                );
            case 'math':
            case 'branch':
            case 'cycle':
            case 'box-io':
            case 'info':
            default:
                return (
                    <div className="mt-4 p-12 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <Info className="w-8 h-8 text-indigo-400" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">{data.visualContent || "Visual representation coming soon"}</p>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 p-8 md:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                {/* Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest mb-4 text-indigo-100">
                        <Layers size={12} /> JavaScript Fundamentals
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{data.title || topic}</h1>
                    <p className="text-indigo-100 text-lg leading-relaxed max-w-2xl opacity-90">
                        {data.definition}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Code Example - Mac Terminal Style */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 px-1">
                        <Terminal size={18} className="text-slate-400" />
                        <h3 className="font-bold text-slate-700 dark:text-slate-300">Code Example</h3>
                    </div>

                    <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 group h-full">
                        {/* Terminal Header */}
                        <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-black/20">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                            </div>
                            <div className="flex gap-3 text-xs text-slate-500 font-mono">
                                <span className="flex items-center gap-1"><Copy size={12} /> Copy</span>
                                <span className="hover:text-slate-300 cursor-pointer">example.js</span>
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="p-6 overflow-x-auto relative">
                            <pre className="font-mono text-sm leading-relaxed">
                                <code className="text-[#a9b7c6]">
                                    {data.code.split('\n').map((line, i) => (
                                        <div key={i} className="table-row">
                                            <span className="table-cell select-none text-slate-600 text-right pr-4 w-8">{i + 1}</span>
                                            <span className="table-cell" dangerouslySetInnerHTML={{
                                                // A very basic syntax highlighting simulation
                                                __html: line
                                                    .replace(/(const|let|var|function|return|if|else)/g, '<span class="text-[#cc7832] font-bold">$1</span>')
                                                    .replace(/('.*?')|(".*?")/g, '<span class="text-[#6a8759]">$1</span>')
                                                    .replace(/(\/\/.*)/g, '<span class="text-slate-500 italic">$1</span>')
                                                    .replace(/\b(\d+)\b/g, '<span class="text-[#6897bb]">$1</span>')
                                                    .replace(/(console|log)/g, '<span class="text-[#9876aa]">$1</span>')
                                            }} />
                                        </div>
                                    ))}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Visual Representation & Interaction */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 px-1">
                        <Monitor size={18} className="text-slate-400" />
                        <h3 className="font-bold text-slate-700 dark:text-slate-300">Interactive Visual</h3>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl h-full flex flex-col relative overflow-hidden transition-colors">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-20"></div>

                        <div className="flex-1 flex items-center justify-center relative z-10 text-slate-900 dark:text-slate-200">
                            {renderVisual()}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                            <div className="text-xs font-bold text-slate-400 tracking-wider uppercase">Live Preview</div>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopicViewer;
