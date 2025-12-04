import React from 'react';
import Button from './Button';
import { CalculatorMode } from '../types';
import { Delete } from 'lucide-react';

interface KeypadProps {
  onInput: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onCalculate: () => void;
  mode: CalculatorMode;
}

const Keypad: React.FC<KeypadProps> = ({ onInput, onClear, onDelete, onCalculate, mode }) => {
  
  const handleFunc = (func: string) => onInput(`${func}(`);

  // --- Render Functions ---

  const renderScientificKeys = () => (
    <div className="grid grid-cols-4 gap-3">
      {/* Row 1 */}
      <Button label="sin" variant="function" onClick={() => handleFunc('sin')} />
      <Button label="cos" variant="function" onClick={() => handleFunc('cos')} />
      <Button label="tan" variant="function" onClick={() => handleFunc('tan')} />
      <Button label="log" variant="function" onClick={() => handleFunc('log')} title="Common Log (base 10)" />

      {/* Row 2 */}
      <Button label={<span>sin<sup>-1</sup></span>} variant="function" onClick={() => handleFunc('asin')} title="Inverse Sine" />
      <Button label={<span>cos<sup>-1</sup></span>} variant="function" onClick={() => handleFunc('acos')} title="Inverse Cosine" />
      <Button label={<span>tan<sup>-1</sup></span>} variant="function" onClick={() => handleFunc('atan')} title="Inverse Tangent" />
      <Button label="ln" variant="function" onClick={() => handleFunc('ln')} title="Natural Log" />

      {/* Row 3 */}
      <Button label="(" variant="function" onClick={() => onInput('(')} />
      <Button label=")" variant="function" onClick={() => onInput(')')} />
      <Button label="^" variant="function" onClick={() => onInput('^')} title="Power" />
      <Button label="√" variant="function" onClick={() => handleFunc('sqrt')} title="Square Root" />

      {/* Row 4 */}
      <Button label="!" variant="function" onClick={() => onInput('!')} title="Factorial" />
      <Button label="π" variant="function" onClick={() => onInput('pi')} />
      <Button label="e" variant="function" onClick={() => onInput('e')} title="Euler's Number" />
      <Button label="n√" variant="function" onClick={() => handleFunc('nthRoot')} title="nth Root (root, val)" />

       {/* Row 5 - New additions for alignment and EE */}
       <Button label="EE" variant="function" onClick={() => onInput('E')} title="Exponential Notation (x10^)" />
       <Button label={<span>x<sup>2</sup></span>} variant="function" onClick={() => onInput('^2')} title="Square" />
       <Button label="1/x" variant="function" onClick={() => onInput('^(-1)')} title="Reciprocal" />
       <Button label="|x|" variant="function" onClick={() => handleFunc('abs')} title="Absolute Value" />
    </div>
  );

  const renderStandardKeys = () => (
    <div className="grid grid-cols-4 gap-3">
      {/* Row 1 */}
      <Button label="C" variant="danger" onClick={onClear} />
      <Button label={<Delete size={20}/>} variant="function" onClick={onDelete} />
      <Button label="%" variant="function" onClick={() => onInput('%')} />
      <Button label="÷" variant="operator" onClick={() => onInput('/')} />

      {/* Row 2 */}
      <Button label="7" onClick={() => onInput('7')} />
      <Button label="8" onClick={() => onInput('8')} />
      <Button label="9" onClick={() => onInput('9')} />
      <Button label="×" variant="operator" onClick={() => onInput('*')} />

      {/* Row 3 */}
      <Button label="4" onClick={() => onInput('4')} />
      <Button label="5" onClick={() => onInput('5')} />
      <Button label="6" onClick={() => onInput('6')} />
      <Button label="-" variant="operator" onClick={() => onInput('-')} />

      {/* Row 4 */}
      <Button label="1" onClick={() => onInput('1')} />
      <Button label="2" onClick={() => onInput('2')} />
      <Button label="3" onClick={() => onInput('3')} />
      <Button label="+" variant="operator" onClick={() => onInput('+')} />

      {/* Row 5 */}
      <Button label="0" onClick={() => onInput('0')} className="col-span-2" />
      <Button label="." onClick={() => onInput('.')} />
      <Button label="=" variant="accent" onClick={onCalculate} />
    </div>
  );

  return (
    <div className={`flex flex-col gap-3 transition-all duration-300 ${mode === CalculatorMode.SCIENTIFIC ? 'md:flex-row' : ''}`}>
      
      {/* Scientific Panel - Shows on top for mobile, left for desktop when enabled */}
      {mode === CalculatorMode.SCIENTIFIC && (
        <div className="w-full md:w-80 transition-all duration-300 animate-in fade-in slide-in-from-top-4 md:slide-in-from-left-4">
          {renderScientificKeys()}
        </div>
      )}

      {/* Standard Panel - Always visible */}
      <div className="w-full">
        {renderStandardKeys()}
      </div>

    </div>
  );
};

export default Keypad;