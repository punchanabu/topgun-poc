interface EdgeData {
    timestamp: string;
    machineId: string;
    soundFeatures: {
      frequency: number[];
      amplitude: number[];
      spectrum: number[];
    };
    anomalyScore: number;
    prediction: {
      status: 'normal' | 'warning' | 'critical';
      confidence: number;
    };
}

interface ToolTipData {
  active: boolean;
  payload: Array<{ value: number }>;
}

export type { EdgeData, ToolTipData };