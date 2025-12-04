export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export enum CalculatorMode {
  BASIC = 'BASIC',
  SCIENTIFIC = 'SCIENTIFIC'
}

export type AngleUnit = 'DEG' | 'RAD';
