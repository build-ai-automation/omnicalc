import React, { useEffect, useRef } from 'react';

interface DisplayProps {
  input: string;
  result: string;
  isError: boolean;
}

const Display: React.FC<DisplayProps> = ({ input, result, isError }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to end of input when it changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [input]);

  return (
    <div className="flex flex-col items-end justify-end w-full h-32 md:h-40 bg-calculator-display rounded-2xl p-6 mb-4 shadow-inner border border-white/5 relative overflow-hidden group">
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-calculator-accent/5 rounded-full blur-3xl group-hover:bg-calculator-accent/10 transition-colors duration-500 pointer-events-none"></div>

      {/* Main Input Display */}
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto overflow-y-hidden no-scrollbar whitespace-nowrap text-right scroll-smooth"
      >
        <span className={`text-3xl md:text-5xl font-mono tracking-tight ${input ? 'text-calculator-text' : 'text-calculator-secondaryText/50'}`}>
          {input || '0'}
        </span>
      </div>

      {/* Result Preview / Final Result */}
      <div className="mt-2 h-8 w-full text-right overflow-hidden">
        <span className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${isError ? 'text-red-400' : 'text-calculator-secondaryText'}`}>
          {result && !isError ? `= ${result}` : isError ? 'Error' : ''}
        </span>
      </div>
    </div>
  );
};

export default Display;
