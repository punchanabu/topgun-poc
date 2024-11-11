import { EdgeData } from "@/types/sound.dto";

class MockDataGenerator {
  private machineIds = ['MACHINE_001', 'MACHINE_002', 'MACHINE_003'];
  private currentMachineIndex = 0;
  private anomalyScoreTrend = 0.1;
  private trendDirection = 0.01;

  private generateFrequencyData(): number[] {
    const length = 50;
    return Array.from({ length }, (_, i) => {
      const baseFreq = Math.sin(i / 5) * 0.5 + 0.5;
      const noise = Math.random() * 0.2;
      return Number((baseFreq + noise).toFixed(3));
    });
  }

  private generateAmplitudeData(): number[] {
    const length = 50;
    return Array.from({ length }, (_, i) => {
      const baseAmp = Math.cos(i / 10) * 0.3 + 0.7;
      const noise = Math.random() * 0.15;
      return Number((baseAmp + noise).toFixed(3));
    });
  }

  private generateSpectrumData(): number[] {
    const length = 50;
    return Array.from({ length }, (_, i) => {
      const baseSpectrum = Math.exp(-i / 20) * 0.8;
      const noise = Math.random() * 0.1;
      return Number((baseSpectrum + noise).toFixed(3));
    });
  }

  private updateAnomalyScore() {
    this.anomalyScoreTrend += this.trendDirection;
    
    if (this.anomalyScoreTrend > 0.8) {
      this.trendDirection = -0.01;
      // Randomly switch machine when reaching high anomaly
      if (Math.random() > 0.7) {
        this.currentMachineIndex = (this.currentMachineIndex + 1) % this.machineIds.length;
      }
    } else if (this.anomalyScoreTrend < 0.1) {
      this.trendDirection = 0.01;
    }

    const noise = (Math.random() - 0.5) * 0.1;
    return Number(Math.max(0, Math.min(1, this.anomalyScoreTrend + noise)).toFixed(3));
  }

  private updateStatus(anomalyScore: number): 'normal' | 'warning' | 'critical' {
    if (anomalyScore < 0.3) return 'normal';
    if (anomalyScore < 0.7) return 'warning';
    return 'critical';
  }

  generateMockData(): EdgeData {
    const anomalyScore = this.updateAnomalyScore();
    const status = this.updateStatus(anomalyScore);
    
    return {
      timestamp: new Date().toISOString(),
      machineId: this.machineIds[this.currentMachineIndex],
      soundFeatures: {
        frequency: this.generateFrequencyData(),
        amplitude: this.generateAmplitudeData(),
        spectrum: this.generateSpectrumData(),
      },
      anomalyScore,
      prediction: {
        status,
        confidence: Number((0.8 + Math.random() * 0.2).toFixed(3)),
      },
    };
  }
}

export { MockDataGenerator };