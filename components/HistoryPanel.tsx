import React from 'react';
import { HistoryItem } from '../types';
import { Trash2, Copy, Download, X } from 'lucide-react';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistory,
  onClearHistory,
}) => {
  
  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  const handleExport = () => {
    if (history.length === 0) return;
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Timestamp,Expression,Result\n"
      + history.map(h => `${new Date(h.timestamp).toISOString()},"${h.expression}",${h.result}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "calculator_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-calculator-surface shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-white/5 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-calculator-text">History</h2>
          <div className="flex gap-2">
            <button 
              onClick={handleExport}
              disabled={history.length === 0}
              className="p-2 text-calculator-secondaryText hover:text-calculator-accent transition-colors disabled:opacity-50"
              title="Export CSV"
            >
              <Download size={20} />
            </button>
            <button 
              onClick={onClearHistory}
              disabled={history.length === 0}
              className="p-2 text-calculator-secondaryText hover:text-red-400 transition-colors disabled:opacity-50"
              title="Clear All"
            >
              <Trash2 size={20} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-calculator-secondaryText hover:text-white transition-colors md:hidden"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-calculator-secondaryText opacity-50">
              <span className="text-sm">No history yet</span>
            </div>
          ) : (
            history.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectHistory(item)}
                className="group p-3 rounded-lg bg-calculator-bg/50 border border-white/5 hover:border-calculator-accent/30 hover:bg-calculator-bg cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-calculator-secondaryText text-sm font-mono truncate mr-2">{item.expression}</span>
                  <button 
                    onClick={(e) => handleCopy(e, item.result)}
                    className="text-calculator-secondaryText opacity-0 group-hover:opacity-100 hover:text-calculator-accent transition-opacity"
                    title="Copy Result"
                  >
                    <Copy size={14} />
                  </button>
                </div>
                <div className="text-right text-calculator-text font-medium text-lg font-mono">= {item.result}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryPanel;
