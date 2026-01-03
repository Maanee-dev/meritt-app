
import React, { useState } from 'react';
import { MoreVertical, Plus, Edit2, GripVertical, Search, Filter } from 'lucide-react';
import { PipelineColumn, PipelineType } from '../types';

const HIRING_PIPELINE: PipelineColumn[] = [
  { id: 'h1', title: 'Sourcing', cards: [{ id: 'hc1', title: 'Ahmed S.', client: 'Fullstack Dev', value: 'MVR 25,000' }] },
  { id: 'h2', title: 'Shortlisted', cards: [{ id: 'hc2', title: 'Mariyam K.', client: 'UI Designer', value: 'MVR 12,000' }] },
  { id: 'h3', title: 'Interview', cards: [] },
  { id: 'h4', title: 'Background Check', cards: [] },
  { id: 'h5', title: 'Offer Sent', cards: [] },
  { id: 'h6', title: 'Hired', cards: [] },
];

const ACTIVE_PIPELINE: PipelineColumn[] = [
  { id: 'a1', title: 'Onboarding', cards: [{ id: 'ac1', title: 'Brand Assets', client: 'Oceanic Retail', value: 'In Progress' }] },
  { id: 'a2', title: 'In Progress', cards: [{ id: 'ac2', title: 'React Frontend', client: 'TechWave', value: 'Milestone 2' }] },
  { id: 'a3', title: 'Review', cards: [] },
  { id: 'a4', title: 'Revision', cards: [] },
  { id: 'a5', title: 'Completed', cards: [] },
  { id: 'a6', title: 'Payment', cards: [] },
];

const Pipeline: React.FC = () => {
  const [pipelineType, setPipelineType] = useState<PipelineType>('hiring');
  const [columns, setColumns] = useState<PipelineColumn[]>(pipelineType === 'hiring' ? HIRING_PIPELINE : ACTIVE_PIPELINE);
  
  React.useEffect(() => {
    setColumns(pipelineType === 'hiring' ? HIRING_PIPELINE : ACTIVE_PIPELINE);
  }, [pipelineType]);

  const [editingColId, setEditingColId] = useState<string | null>(null);
  const [tempColTitle, setTempColTitle] = useState('');

  const startEditing = (id: string, currentTitle: string) => {
    setEditingColId(id);
    setTempColTitle(currentTitle);
  };

  const saveColumnTitle = (id: string) => {
    setColumns(prev => prev.map(col => col.id === id ? { ...col, title: tempColTitle } : col));
    setEditingColId(null);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight dark:text-white">Project Pipelines</h1>
          <p className="text-gray-500 text-xs md:text-[13px] dark:text-gray-400">Track and manage your professional stages.</p>
        </div>
        
        <div className="flex items-center p-1 bg-[#F9FAFB] dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-lg transition-colors">
          <button 
            onClick={() => setPipelineType('hiring')}
            className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all ${
              pipelineType === 'hiring' ? 'bg-white dark:bg-dark shadow-sm text-brand' : 'text-gray-400'
            }`}
          >
            Hiring Engine
          </button>
          <button 
            onClick={() => setPipelineType('projects')}
            className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all ${
              pipelineType === 'projects' ? 'bg-white dark:bg-dark shadow-sm text-brand' : 'text-gray-400'
            }`}
          >
            Active Projects
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input className="w-full pl-9 pr-3 py-1.5 border border-[#E2E8F0] dark:border-dark-border rounded-md text-[11px] outline-none dark:bg-dark dark:text-white" placeholder="Search cards..." />
        </div>
        <button className="p-1.5 border border-[#E2E8F0] dark:border-dark-border rounded-md hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors">
          <Filter className="w-4 h-4 text-gray-500" />
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-3 py-1.5 bg-brand text-white rounded-md text-xs font-bold hover:brightness-110 transition-all shadow-lg shadow-brand/20">
          <Plus className="w-3.5 h-3.5" />
          <span>Add New</span>
        </button>
      </div>

      <div className="flex-1 overflow-x-auto no-scrollbar flex gap-4 pb-12 md:pb-4 snap-x">
        {columns.map((column) => (
          <div key={column.id} className="w-[280px] md:w-[320px] shrink-0 flex flex-col gap-4 snap-start">
            <div className="flex items-center justify-between group h-10 border-b border-[#E2E8F0] dark:border-dark-border pb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {editingColId === column.id ? (
                  <input 
                    autoFocus
                    className="bg-white dark:bg-dark border border-brand rounded px-1.5 py-0.5 text-[11px] w-full outline-none font-bold uppercase text-brand"
                    value={tempColTitle}
                    onChange={(e) => setTempColTitle(e.target.value)}
                    onBlur={() => saveColumnTitle(column.id)}
                    onKeyDown={(e) => e.key === 'Enter' && saveColumnTitle(column.id)}
                  />
                ) : (
                  <>
                    <span className="font-bold text-brand uppercase tracking-[0.12em] text-[10px] truncate">
                      {column.title}
                    </span>
                    <span className="text-[9px] bg-brand/5 dark:bg-brand/10 text-brand px-1.5 py-0.5 rounded-full font-bold">
                      {column.cards.length}
                    </span>
                    <button 
                      onClick={() => startEditing(column.id, column.title)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 dark:hover:bg-dark rounded transition-opacity"
                    >
                      <Edit2 className="w-3 h-3 text-gray-400" />
                    </button>
                  </>
                )}
              </div>
              <button className="text-gray-400 hover:text-brand p-1"><MoreVertical className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar">
              {column.cards.map((card) => (
                <div 
                  key={card.id} 
                  className="bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border p-4 rounded-lg shadow-sm hover:border-brand/40 hover:shadow-md cursor-grab transition-all group relative border-l-4 border-l-brand"
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                  <h4 className="font-bold text-brand text-[13px] mb-1 pr-4">{card.title}</h4>
                  <p className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-tight mb-4">{card.client}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-dark-border">
                    <div className="px-2 py-0.5 bg-brand/5 dark:bg-brand/10 border border-brand/20 rounded text-[9px] font-bold text-brand uppercase">
                      {card.value}
                    </div>
                    <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center text-[8px] text-white font-bold">JD</div>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 border border-dashed border-[#E2E8F0] dark:border-dark-border text-gray-400 rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-dark hover:border-brand transition-all text-[10px] flex items-center justify-center gap-1 font-bold uppercase tracking-widest">
                <Plus className="w-3.5 h-3.5" />
                Quick Drop
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pipeline;
