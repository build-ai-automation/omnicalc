import React, { useState, useEffect, useCallback } from 'react';
import { History, Calculator as CalculatorIcon, FlaskConical } from 'lucide-react';
import Display from './components/Display';
import Keypad from './components/Keypad';
import HistoryPanel from './components/HistoryPanel';
import { CalculatorMode, HistoryItem } from './types';
import { evaluateExpression, generateId } from './utils/mathUtils';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.BASIC);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // --- Keyboard Support ---
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    
    // Numbers & Basic Operators
    if (/^[0-9+\-*/%.^()]$/.test(key)) {
      e.preventDefault();
      setInput(prev => prev + key);
    }
    
    // Enter/Return
    if (key === 'Enter') {
      e.preventDefault();
      calculateResult();
    }
    
    // Backspace
    if (key === 'Backspace') {
      e.preventDefault();
      handleDelete();
    }
    
    // Escape (Clear)
    if (key === 'Escape') {
      e.preventDefault();
      handleClear();
    }
  }, [input]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // --- Logic ---

  const handleInput = (val: string) => {
    // Prevent multiple decimals in a single number segment (simplified check)
    if (val === '.' && input.slice(-1) === '.') return;
    
    // Reset error state on new input
    if (isError) {
      setIsError(false);
      setInput(val);
      setResult('');
      return;
    }

    setInput(prev => prev + val);
  };

  const handleDelete = () => {
    if (isError) {
      handleClear();
      return;
    }
    setInput(prev => prev.slice(0, -1));
    setResult('');
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setIsError(false);
  };

  const calculateResult = () => {
    if (!input) return;

    const calcResult = evaluateExpression(input);

    if (calcResult === "Error") {
      setIsError(true);
      setResult("Error");
    } else {
      setResult(calcResult);
      setIsError(false);
      
      // Add to history
      const newItem: HistoryItem = {
        id: generateId(),
        expression: input,
        result: calcResult,
        timestamp: Date.now()
      };
      setHistory(prev => [newItem, ...prev]);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setInput(item.expression);
    setResult(item.result);
    setIsError(false);
    // Optional: Auto close history on mobile selection
    if (window.innerWidth < 768) {
      setIsHistoryOpen(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === CalculatorMode.BASIC ? CalculatorMode.SCIENTIFIC : CalculatorMode.BASIC);
  };

  return (
    <div className="min-h-screen bg-calculator-bg flex items-center justify-center p-4 md:p-8 relative">
      
      {/* 
        Container width logic: 
        Basic Mode: max-w-sm (Classic narrow calculator)
        Scientific Mode: max-w-4xl (Wide calculator for side-by-side)
      */}
      <div className={`w-full flex flex-col gap-6 relative z-10 transition-all duration-500 ease-in-out ${mode === CalculatorMode.SCIENTIFIC ? 'max-w-4xl' : 'max-w-sm'}`}>
        
        {/* Header / Controls */}
        <div className="flex justify-between items-center bg-calculator-surface/50 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="flex gap-2">
            <button 
              onClick={toggleMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${mode === CalculatorMode.BASIC ? 'bg-calculator-accent text-calculator-bg shadow-lg shadow-calculator-accent/20' : 'text-calculator-secondaryText hover:text-white hover:bg-white/5'}`}
            >
              <CalculatorIcon size={16} />
              <span className="hidden md:inline">Basic</span>
            </button>
            <button 
              onClick={toggleMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${mode === CalculatorMode.SCIENTIFIC ? 'bg-calculator-function text-calculator-bg shadow-lg shadow-calculator-function/20' : 'text-calculator-secondaryText hover:text-white hover:bg-white/5'}`}
            >
              <FlaskConical size={16} />
              <span className="hidden md:inline">Scientific</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className="p-3 text-calculator-text hover:bg-white/10 rounded-xl transition-colors relative"
              title="History"
            >
              <History size={20} />
              {history.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-calculator-accent rounded-full animate-pulse"></span>
              )}
            </button>
          </div>
        </div>

        {/* Main Calculator Body */}
        <div className="bg-calculator-surface p-6 rounded-3xl shadow-2xl border border-white/5 flex flex-col gap-4">
            <Display input={input} result={result} isError={isError} />
            <Keypad 
              mode={mode}
              onInput={handleInput}
              onClear={handleClear}
              onDelete={handleDelete}
              onCalculate={calculateResult}
            />
        </div>

        {/* Footer info */}
        <div className="text-center text-calculator-secondaryText/40 text-xs font-mono">
          OmniCalc Pro v1.0 • React • Tailwind • MathJS
        </div>
      </div>

      {/* Slide-over History Panel */}
      <HistoryPanel 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistory={handleHistorySelect}
        onClearHistory={() => setHistory([])}
      />

    </div>
  );
};

export default App;