import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Activity, ArrowUpRight, Code, Terminal, Box, Play, Info, Layers, RefreshCw, Globe, ArrowRight } from 'lucide-react';
import DashboardLayout from './layouts/DashboardLayout';
import { topicData } from './data/topicData';

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

        <label className="block text-sm text-slate-500 mb-2 font-mono">hour = {hour}</label>
        <input
          type="range"
          min="0"
          max="23"
          value={hour}
          onChange={(e) => setHour(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
          <span>00:00</span>
          <span>12:00</span>
          <span>23:00</span>
        </div>
      </div>

      <div className="mt-6 p-3 bg-slate-100 rounded-md font-mono text-sm border-l-4 border-indigo-500 w-full max-w-sm">
        <div>if ({hour} &lt; 18) {'{'}</div>
        <div className={isDay ? "bg-green-200/50 -mx-3 px-3 transition-colors" : "opacity-50"}>&nbsp;&nbsp;return "Good day"; {isDay && "✅"}</div>
        <div>{'}'} else {'{'}</div>
        <div className={!isDay ? "bg-green-200/50 -mx-3 px-3 transition-colors" : "opacity-50"}>&nbsp;&nbsp;return "Good evening"; {!isDay && "✅"}</div>
        <div>{'}'}</div>
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
      <div className="min-h-[80px] flex items-end justify-center gap-4 mb-8 flex-wrap">
        {fruits.map((fruit, idx) => (
          <div key={idx} className="text-4xl md:text-5xl animate-[bounce_0.5s_ease-out]">
            {fruit}
          </div>
        ))}
        {fruits.length === 0 && <span className="text-slate-400 italic">Array is empty</span>}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePush}
          className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors shadow-sm active:transform active:scale-95"
        >
          <Box size={18} /> Push
        </button>
        <button
          onClick={handlePop}
          className="flex items-center gap-2 px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium transition-colors shadow-sm active:transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={fruits.length === 0}
        >
          <Layers size={18} /> Pop
        </button>
      </div>
      <div className="mt-6 font-mono text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-md">
        fruits = [{fruits.map(f => `"${f}"`).join(', ')}]
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
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className={`
                    w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold text-lg transition-all duration-300
                    ${index === i ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg' : 'bg-slate-100 border-slate-200 text-slate-400'}
                `}>
            {i}
          </div>
        ))}
      </div>
      <div className="font-mono bg-slate-800 text-green-400 p-4 rounded-lg w-full max-w-xs text-center">
        {index === -1 ? "Ready to start loop..." : `Iteration: i = ${index}`}
      </div>
      <button
        onClick={() => { setIndex(-1); setIsRunning(true); }}
        disabled={isRunning}
        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        <Play size={16} /> {isRunning ? "Running..." : "Run Loop"}
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
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-400 font-mono">Input p1</label>
          <input type="number" value={p1} onChange={e => setP1(Number(e.target.value))} className="w-16 p-2 border rounded text-center" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-400 font-mono">Input p2</label>
          <input type="number" value={p2} onChange={e => setP2(Number(e.target.value))} className="w-16 p-2 border rounded text-center" />
        </div>

        <ArrowUpRight className="text-slate-300" />

        <div className={`
                    flex flex-col items-center justify-center w-24 h-24 bg-slate-900 text-white rounded-xl shadow-lg z-10 transition-transform
                    ${isAnimating ? 'scale-110' : 'scale-100'}
                `}>
          <Code size={20} className="mb-2 text-indigo-400" />
          <span className="font-mono text-sm">Func</span>
        </div>

        <ArrowUpRight className="text-slate-300" />

        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-400 font-mono">Output</label>
          <div className="w-16 p-2 bg-green-100 text-green-700 border border-green-200 rounded text-center font-bold">
            {result}
          </div>
        </div>
      </div>
      <button onClick={calculate} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
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
    <div className="flex items-center justify-center gap-4 text-xl font-mono">
      <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="w-16 p-2 border rounded text-center" />
      <select value={op} onChange={e => setOp(e.target.value)} className="p-2 border rounded bg-slate-100 cursor-pointer">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">×</option>
        <option value="/">÷</option>
        <option value="%">%</option>
      </select>
      <input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="w-16 p-2 border rounded text-center" />
      <span className="text-slate-400">=</span>
      <div className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-bold min-w-[3rem] text-center">
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
    <div className="flex flex-col gap-4 w-full max-w-md">
      {Object.entries(values).map(([type, val]) => (
        <div key={type} className="flex items-center gap-4 p-3 bg-slate-50 border rounded-lg hover:border-indigo-300 transition-colors">
          <div className={`
                        w-16 text-center text-xs font-bold uppercase tracking-wider py-1 rounded
                        ${type === 'const' ? 'bg-purple-100 text-purple-700' : type === 'let' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}
                    `}>
            {type}
          </div>
          <div className="font-mono text-slate-500">=</div>
          <input
            type="text"
            value={val}
            onChange={(e) => handleChange(type, e.target.value)}
            className={`flex-1 bg-white border rounded px-3 py-1 font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${type === 'const' ? 'cursor-not-allowed opacity-75' : ''}`}
            readOnly={type === 'const'}
          />
          {type === 'const' && <span className="text-xs text-red-400 absolute right-8">Immutable</span>}
        </div>
      ))}
      <p className="text-xs text-center text-slate-400 mt-2">Try editing the values. Note that 'const' cannot be changed.</p>
    </div>
  );
}

const DOMEventVisual = () => {
  const [events, setEvents] = useState([]);

  const logEvent = (type) => {
    setEvents(prev => [{ id: Date.now(), type }, ...prev.slice(0, 4)]);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-4">
        <button
          onClick={() => logEvent('click')}
          onMouseEnter={() => logEvent('mouseenter')}
          onMouseLeave={() => logEvent('mouseleave')}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
        >
          Interact With Me
        </button>
      </div>
      <div className="w-full max-w-sm bg-slate-800 rounded-lg p-4 min-h-[150px]">
        <div className="text-xs text-slate-400 mb-2 border-b border-slate-700 pb-1">Event Log</div>
        <div className="flex flex-col gap-1 font-mono text-sm">
          {events.length === 0 && <span className="text-slate-600 italic">No events yet...</span>}
          {events.map(e => (
            <div key={e.id} className="text-green-400 animate-[fadeIn_0.2s_ease-out]">
              <span className="text-slate-500 text-xs">{(new Date(e.id)).toLocaleTimeString()}</span> {e.type}
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
      <div className="w-full max-w-sm border-2 border-dashed border-slate-300 p-4 rounded-xl relative">
        <div className="absolute -top-3 left-4 bg-white px-2 text-xs text-slate-400">document.body</div>

        <div
          onMouseEnter={(e) => { e.stopPropagation(); setHovered('parent') }}
          onMouseLeave={() => setHovered(null)}
          className={`
                        p-6 border-2 rounded-lg transition-colors cursor-default
                        ${hovered === 'parent' ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-slate-200 bg-slate-50'}
                    `}
        >
          <div className="text-xs text-slate-400 mb-2">div#parent</div>

          <div className="flex gap-4">
            <div
              onMouseEnter={(e) => { e.stopPropagation(); setHovered('child1') }}
              onMouseLeave={(e) => { e.stopPropagation(); setHovered('parent') }}
              className={`
                                flex-1 p-4 border-2 rounded transition-colors
                                ${hovered === 'child1' ? 'border-pink-500 bg-pink-50' : 'border-slate-200 bg-white'}
                            `}
            >
              <span className="text-xs text-slate-400">span.child</span>
            </div>
            <div
              onMouseEnter={(e) => { e.stopPropagation(); setHovered('child2') }}
              onMouseLeave={(e) => { e.stopPropagation(); setHovered('parent') }}
              className={`
                                flex-1 p-4 border-2 rounded transition-colors
                                ${hovered === 'child2' ? 'border-pink-500 bg-pink-50' : 'border-slate-200 bg-white'}
                            `}
            >
              <span className="text-xs text-slate-400">span.child</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-8 font-mono text-indigo-600 font-bold">
        {hovered ? `Selected: ${hovered}` : "Hover over elements above"}
      </div>
    </div>
  );
}

const StorageVisual = () => {
  const [items, setItems] = useState([{ key: 'user', value: 'John' }]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2">
        <button onClick={() => setItems([...items, { key: `k${items.length}`, value: `v${Math.floor(Math.random() * 100)}` }])} className="px-3 py-1 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600">Add Item</button>
        <button onClick={() => setItems([])} className="px-3 py-1 bg-rose-500 text-white rounded text-sm hover:bg-rose-600">Clear</button>
      </div>
      <div className="bg-slate-50 border rounded-lg p-2 min-h-[100px]">
        {items.length === 0 ? <span className="text-slate-400 italic text-sm">Empty storage...</span> :
          items.map((item, i) => (
            <div key={i} className="flex justify-between items-center p-2 border-b border-slate-200 last:border-0 hover:bg-white animate-[fadeIn_0.3s]">
              <span className="font-mono text-indigo-600 text-sm">{item.key}</span>
              <span className="font-mono text-slate-600 text-sm">{item.value}</span>
            </div>
          ))
        }
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
    <div className="flex flex-col items-center gap-6 w-full">
      <button
        onClick={fetchData}
        disabled={status === 'loading'}
        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {status === 'loading' ? <RefreshCw className="animate-spin" size={16} /> : <Globe size={16} />}
        Fetch User Data
      </button>

      <div className="w-full max-w-sm bg-slate-900 rounded-lg p-4 min-h-[120px] font-mono text-sm relative overflow-hidden">
        {status === 'idle' && <span className="text-slate-500">Waiting for request...</span>}
        {status === 'loading' && <span className="text-yellow-400">Fetching data from API...</span>}
        {status === 'success' && (
          <div className="text-green-400 animate-[slideIn_0.3s] whitespace-pre">
            {JSON.stringify(data, null, 2)}
          </div>
        )}
      </div>
    </div>
  );
};

const AsyncVisual = () => {
  const [step, setStep] = useState(0);
  // 0: Start, 1: Waiting, 2: Done

  const runAsync = () => {
    setStep(1);
    setTimeout(() => {
      setStep(2);
      setTimeout(() => setStep(0), 2000);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-500 ${step >= 0 ? 'bg-indigo-600 scale-110' : 'bg-slate-300'}`}>1</div>
        <ArrowRight className={`transition-colors duration-500 ${step >= 1 ? 'text-indigo-600' : 'text-slate-300'}`} />
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-500 ${step >= 1 ? (step === 1 ? 'bg-yellow-500 animate-pulse scale-125' : 'bg-indigo-600') : 'bg-slate-300'}`}>
          {step === 1 ? "..." : "2"}
        </div>
        <ArrowRight className={`transition-colors duration-500 ${step >= 2 ? 'text-indigo-600' : 'text-slate-300'}`} />
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-500 ${step === 2 ? 'bg-green-500 scale-110' : 'bg-slate-300'}`}>3</div>
      </div>

      <div className="h-6 font-mono text-sm text-slate-600">
        {step === 0 && "Ready to start process"}
        {step === 1 && "Async Operation in progress..."}
        {step === 2 && "Operation Completed!"}
      </div>

      <button onClick={runAsync} disabled={step !== 0} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
        Start Async Flow
      </button>
    </div>
  )
};

const ObjectVisual = () => {
  const [obj, setObj] = useState({ brand: "Ford", model: "Mustang" });

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2 justify-center">
        <button onClick={() => setObj({ ...obj, year: 2020 })} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-xs">Add Year</button>
        <button onClick={() => setObj({ ...obj, color: "Red" })} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-xs">Add Color</button>
        <button onClick={() => setObj({ brand: "Ford", model: "Mustang" })} className="px-3 py-1 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 text-xs">Reset</button>
      </div>
      <div className="bg-white border rounded-xl p-6 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 bg-slate-100 rounded-bl-xl text-xs text-slate-400 font-mono">Object</div>
        {Object.entries(obj).map(([k, v], i) => (
          <div key={k} className="flex gap-2 font-mono text-sm mb-2 animate-[fadeIn_0.3s]">
            <span className="text-purple-600">{k}:</span>
            <span className="text-green-600">"{v}"</span>
          </div>
        ))}
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
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="p-4 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl w-full text-center">
        <span className="text-xs font-mono text-slate-400 block mb-2">class Car</span>
        <div className="flex gap-4 justify-center">
          <button onClick={() => createInstance('red')} className="w-8 h-8 rounded-full bg-red-500 hover:scale-110 transition-transform shadow-sm"></button>
          <button onClick={() => createInstance('blue')} className="w-8 h-8 rounded-full bg-blue-500 hover:scale-110 transition-transform shadow-sm"></button>
          <button onClick={() => createInstance('green')} className="w-8 h-8 rounded-full bg-green-500 hover:scale-110 transition-transform shadow-sm"></button>
        </div>
        <span className="text-xs text-slate-400 mt-2 block">Click color to new Car(color)</span>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {instances.map(car => (
          <div key={car.id} className={`w-20 h-12 rounded-lg bg-${car.color}-500 shadow-md animate-[bounce_0.5s_ease-out] flex items-center justify-center text-white text-xs font-bold`}>
            Car
          </div>
        ))}
      </div>
      {instances.length > 0 && <button onClick={() => setInstances([])} className="text-xs text-slate-400 underline">Clear</button>}
    </div>
  )
}

const ArrayTransformVisual = () => {
  const [nums, setNums] = useState([1, 2, 3]);
  const [mode, setMode] = useState('original'); // original, map, filter

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-2 items-center text-sm font-mono bg-slate-100 px-4 py-2 rounded-full">
        <span>Original: [1, 2, 3]</span>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setMode('map')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${mode === 'map' ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}>Map (x2)</button>
        <button onClick={() => setMode('filter')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${mode === 'filter' ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}>Filter (&gt;1)</button>
        <button onClick={() => setMode('reduce')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${mode === 'reduce' ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}>Reduce (+)</button>
      </div>

      <div className="flex gap-4 items-center h-16">
        {mode === 'original' && [1, 2, 3].map((n, i) => <div key={i} className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center font-bold text-slate-600">{n}</div>)}

        {mode === 'map' && [2, 4, 6].map((n, i) => (
          <div key={i} className="w-10 h-10 bg-blue-100 border-2 border-blue-400 rounded flex items-center justify-center font-bold text-blue-600 animate-[pulse_0.5s]">{n}</div>
        ))}

        {mode === 'filter' && [2, 3].map((n, i) => (
          <div key={i} className="w-10 h-10 bg-green-100 border-2 border-green-400 rounded flex items-center justify-center font-bold text-green-600 animate-[bounce_0.5s]">{n}</div>
        ))}

        {mode === 'reduce' && (
          <div className="w-16 h-16 bg-purple-100 border-2 border-purple-500 rounded-full flex items-center justify-center font-bold text-xl text-purple-700 animate-[spin_0.5s_ease-out]">6</div>
        )}
      </div>
    </div>
  )
}

const ModuleVisual = () => {
  return (
    <div className="flex items-center justify-center gap-8 w-full">
      <div className="w-24 h-32 bg-slate-50 border-2 border-slate-200 rounded-lg p-2 relative flex flex-col gap-2">
        <div className="text-[10px] text-slate-400">lib.js</div>
        <div className="w-full h-2 bg-indigo-100 rounded"></div>
        <div className="w-3/4 h-2 bg-indigo-100 rounded"></div>
        <div className="mt-auto px-2 py-1 bg-green-100 text-green-700 text-[10px] rounded border border-green-200 text-center font-mono">Export</div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-slate-300 animate-[ping_1.5s_infinite]"></div>
        <div className="h-1 bg-slate-300 w-16"></div>
        <ArrowRight size={16} className="text-slate-300" />
      </div>

      <div className="w-24 h-32 bg-slate-50 border-2 border-slate-200 rounded-lg p-2 relative flex flex-col gap-2">
        <div className="text-[10px] text-slate-400">main.js</div>
        <div className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] rounded border border-blue-200 text-center font-mono">Import</div>
        <div className="w-full h-2 bg-slate-200 rounded"></div>
        <div className="w-1/2 h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  )
}

const ProxyVisual = () => {
  const [accessCount, setAccessCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-8 w-full relative">
      {/* Target */}
      <div className="relative w-24 h-24 bg-slate-200 rounded-lg flex items-center justify-center">
        <span className="text-slate-500 font-bold">Target</span>
      </div>

      {/* Proxy Layer */}
      <div className={`
                absolute inset-0 bg-indigo-600/10 border-4 border-indigo-500 rounded-xl flex items-center justify-center pointer-events-none transition-all duration-200
                ${accessCount > 0 ? 'scale-110 opacity-100' : 'scale-100 opacity-50'}
            `}>
        {accessCount > 0 && <span className="absolute -top-8 bg-indigo-600 text-white text-xs px-2 py-1 rounded animate-[fadeOut_1s_forwards]">Intercepted!</span>}
      </div>

      <button
        onClick={() => { setAccessCount(c => c + 1); setTimeout(() => setAccessCount(0), 1000) }}
        className="mt-24 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 z-10"
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
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-2">
        {items.map((item, i) => (
          <div key={i} className={`
                        w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold text-xl transition-all duration-300
                        ${step === i ? 'bg-indigo-600 border-indigo-600 text-white scale-110' : 'bg-slate-50 border-slate-200 text-slate-300'}
                    `}>
            {item}
          </div>
        ))}
      </div>

      <button
        onClick={() => setStep(prev => (prev + 1) % 4)}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {step >= 3 ? "Reset" : "next()"}
      </button>

      <div className="font-mono text-sm text-slate-500">
        Output: {step < 3 ? `{ value: "${items[step]}", done: false }` : `{ value: undefined, done: true }`}
      </div>
    </div>
  )
}

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
      case 'condition-interactive':
        return <ConditionVisual />;
      case 'array-interactive':
        return <ArrayVisual initialData={data.visualData} />;
      case 'boxes':
        return (
          <div className="flex flex-wrap gap-4 mt-4">
            {data.visualData.map((item, idx) => (
              <div key={idx} className={`p-4 rounded-lg border-2 ${item.color} w-32`}>
                <div className="font-mono text-xs mb-1 text-slate-500">{item.label}</div>
                <div className="text-xl font-bold text-slate-800">{item.value}</div>
              </div>
            ))}
          </div>
        );
      case 'list':
        return (
          <div className="flex flex-wrap gap-2 mt-4">
            {data.visualData.map((item, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
                {item}
              </span>
            ))}
          </div>
        );
      case 'flow':
        return (
          <div className="flex items-center gap-2 mt-4 overflow-x-auto p-2">
            {data.visualSteps.map((step, idx) => (
              <div key={idx} className="flex items-center">
                <div className="px-4 py-2 bg-indigo-50 border border-indigo-200 rounded text-indigo-700 font-mono text-sm whitespace-nowrap">
                  {step}
                </div>
                {idx < data.visualSteps.length - 1 && <span className="mx-2 text-slate-400">→</span>}
              </div>
            ))}
          </div>
        );
      case 'text-animation':
        return (
          <div className="flex items-center justify-center h-full min-h-[200px] w-full bg-slate-900 rounded-lg overflow-hidden relative">
            <style>{`
               @keyframes typing {
                 from { width: 0 }
                 to { width: 100% }
               }
               @keyframes blink-caret {
                 from, to { border-color: transparent }
                 50% { border-color: #6366f1 }
               }
             `}</style>
            <div className="font-mono text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 overflow-hidden whitespace-nowrap border-r-4 border-indigo-500 pr-2 animate-typing" style={{
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
          <div className="mt-4 p-8 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
            <Info className="w-8 h-8 text-slate-400 mb-2" />
            <p className="text-slate-600 font-medium">{data.visualContent || "Visual representation available"}</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Code size={24} />
          </span>
          {data.title || topic}
        </h1>
        <p className="mt-2 text-slate-600 leading-relaxed text-lg">
          {data.definition}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Example */}
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg flex flex-col">
          <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
            <span className="text-slate-400 text-sm font-mono flex items-center gap-2">
              <Terminal size={14} /> Example Code
            </span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="p-4 overflow-x-auto flex-1">
            <pre className="font-mono text-sm text-green-400">
              <code>{data.code}</code>
            </pre>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Box size={16} /> Visual Representation
          </h3>
          <div className="flex-1 bg-slate-50/50 rounded-lg border border-slate-100 p-4 min-h-[200px] flex items-center justify-center">
            {renderVisual()}
          </div>
        </div>
      </div>

    </div>
  );
}

function App() {
  const [currentTopic, setCurrentTopic] = useState('Introduction');

  return (
    <DashboardLayout onMenuSelect={(topic) => setCurrentTopic(topic)}>
      {/* Topic Viewer */}
      <TopicViewer topic={currentTopic} />
    </DashboardLayout>
  )
}

export default App
