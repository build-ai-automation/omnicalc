import { create, all } from 'mathjs';

// Configure mathjs
const math = create(all, {
  number: 'BigNumber',
  precision: 64,
});

/**
 * Evaluates a mathematical expression safely.
 * @param expression The string expression to evaluate (e.g., "sin(45 deg) + 2")
 * @returns The calculated result as a string or "Error"
 */
export const evaluateExpression = (expression: string): string => {
  try {
    // Basic sanitization
    // Replace '×' with '*' and '÷' with '/' for standard parsing if visual symbols are used
    let sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√\(/g, 'sqrt(')
      .replace(/log\(/g, 'log10(') // Map UI 'log' to log10
      .replace(/ln\(/g, 'log(');   // Map UI 'ln' to natural log

    // Handle percentage logic: "50 + 10%" -> "50 + (50 * 0.1)" or "50%" -> "0.5"
    // mathjs handles "50%" as 0.5. However, "100 + 10%" in mathjs might not work as "110" depending on config.
    // For this basic implementation, we rely on mathjs default percentage behavior (0.5).
    
    // Evaluate
    const result = math.evaluate(sanitized);

    // Format output
    // If it's a number, format it nicely.
    if (typeof result === 'number' || (result && result.isBigNumber)) {
        return math.format(result, { precision: 14 });
    }
    return String(result);
  } catch (error) {
    console.error("Math evaluation error:", error);
    return "Error";
  }
};

/**
 * Helper to generate a unique ID for history items
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
