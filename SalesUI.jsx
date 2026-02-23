import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Zap, Target, DollarSign, PieChart, Activity } from 'lucide-react';

const App = () => {
  // Existing Customer State (舊客)
  const [existingData, setExistingData] = useState({
    upsell: 0,
    birthday: 0,
    avgTicket: 5000,
  });

  // New Customer State (新客)
  const [newData, setNewData] = useState({
    tail: 0,
    icb: 0,
    avgTicket: 8000,
  });

  // Global ACB/Target Headcount
  const [acb, setAcb] = useState(10);

  // Derived Values
  const existingSigns = Number(existingData.upsell) + Number(existingData.birthday);
  const newSigns = Number(newData.tail) + Number(newData.icb);
  
  const existingSales = existingSigns * Number(existingData.avgTicket);
  const newSales = newSigns * Number(newData.avgTicket);
  const totalSales = existingSales + newSales;

  // Percentage distribution
  const existingPct = totalSales > 0 ? (existingSales / totalSales) * 100 : 50;
  const newPct = totalSales > 0 ? (newSales / totalSales) * 100 : 50;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('zh-HK', {
      style: 'currency',
      currency: 'HKD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const InputField = ({ label, value, onChange, icon: Icon }) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 text-cyan-600 group-focus-within:text-cyan-400 transition-colors" />
        </div>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          placeholder="0"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans p-4 md:p-8 selection:bg-cyan-500 selection:text-white">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
          AI 銷售規劃模擬器
        </h1>
        <p className="text-slate-500 text-sm tracking-widest uppercase">Neo Derm - Sales Optimization Engine</p>
        
        <div className="mt-8 inline-flex items-center gap-4 bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex flex-col items-start px-4">
            <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">ACB 基數</span>
            <input 
              type="number" 
              value={acb} 
              onChange={(e) => setAcb(e.target.value)}
              className="bg-transparent text-2xl font-bold text-white w-20 focus:outline-none"
            />
          </div>
          <div className="h-8 w-[1px] bg-slate-700"></div>
          <div className="flex flex-col items-start px-4">
            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">當前日期</span>
            <span className="text-xl font-bold">{new Date().toLocaleDateString('zh-HK')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Pillar 1: Existing Customers */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-3xl blur opacity-30 transition duration-1000 group-hover:opacity-50"></div>
          <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">舊客 (Existing)</h2>
                <p className="text-cyan-500/80 text-sm font-medium">Customer Retention & Upsell</p>
              </div>
              <div className="bg-cyan-500/10 p-3 rounded-2xl">
                <Users className="w-8 h-8 text-cyan-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <InputField 
                label="Upsell Sign" 
                value={existingData.upsell} 
                onChange={(v) => setExistingData({...existingData, upsell: v})}
                icon={TrendingUp}
              />
              <InputField 
                label="Birthday Sign" 
                value={existingData.birthday} 
                onChange={(v) => setExistingData({...existingData, birthday: v})}
                icon={Zap}
              />
            </div>

            <div className="mt-auto">
              <InputField 
                label="平均客單價 (Avg Ticket)" 
                value={existingData.avgTicket} 
                onChange={(v) => setExistingData({...existingData, avgTicket: v})}
                icon={DollarSign}
              />
              
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="flex justify-between items-end">
                  <span className="text-slate-400 text-sm">小計銷售額</span>
                  <span className="text-2xl font-mono font-bold text-cyan-400 tracking-tight">
                    {formatCurrency(existingSales)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 2: New Customers */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/20 to-transparent rounded-3xl blur opacity-30 transition duration-1000 group-hover:opacity-50"></div>
          <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">新客 (New)</h2>
                <p className="text-blue-500/80 text-sm font-medium">Acquisition & Reactivation</p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-2xl">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <InputField 
                label="一龍尾 (Tail)" 
                value={newData.tail} 
                onChange={(v) => setNewData({...newData, tail: v})}
                icon={Activity}
              />
              <InputField 
                label="ICB 激活 (Reactivation)" 
                value={newData.icb} 
                onChange={(v) => setNewData({...newData, icb: v})}
                icon={Zap}
              />
            </div>

            <div className="mt-auto">
              <InputField 
                label="平均客單價 (Avg Ticket)" 
                value={newData.avgTicket} 
                onChange={(v) => setNewData({...newData, avgTicket: v})}
                icon={DollarSign}
              />
              
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="flex justify-between items-end">
                  <span className="text-slate-400 text-sm">小計銷售額</span>
                  <span className="text-2xl font-mono font-bold text-blue-400 tracking-tight">
                    {formatCurrency(newSales)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900/80 border border-slate-700 rounded-[2rem] p-8 overflow-hidden relative">
          {/* Progress Bar Background */}
          <div className="absolute bottom-0 left-0 right-0 h-1 flex">
            <div className="h-full bg-cyan-500 transition-all duration-700" style={{ width: ${existingPct}% }}></div>
            <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: ${newPct}% }}></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">總計模擬銷售額</span>
              <div className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                {formatCurrency(totalSales)}
              </div>
            </div>

            <div className="flex gap-8 items-center bg-black/40 p-6 rounded-2xl border border-slate-800">
              <div className="text-center">
                <div className="text-cyan-400 text-2xl font-bold">{existingPct.toFixed(0)}%</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">舊客佔比</div>
              </div>
              <div className="w-[1px] h-10 bg-slate-800"></div>
              <div className="text-center">
                <div className="text-blue-400 text-2xl font-bold">{newPct.toFixed(0)}%</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">新客佔比</div>
              </div>
              <div className="w-[1px] h-10 bg-slate-800"></div>
              <div className="text-center">
                <div className="text-white text-2xl font-bold">{existingSigns + newSigns}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">總成交數</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Visual Cue from Pic */}
        <div className="mt-12 grid grid-cols-2 gap-0 border border-slate-800 rounded-xl overflow-hidden opacity-50">
          <div className="bg-white/5 py-4 text-center border-r border-slate-800">
             <span className="text-3xl font-black text-white">50%</span>
             <p className="text-xs text-slate-400">TARGET PILLAR A</p>
          </div>
          <div className="bg-white/5 py-4 text-center">
             <span className="text-3xl font-black text-white">50%</span>
             <p className="text-xs text-slate-400">TARGET PILLAR B</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
