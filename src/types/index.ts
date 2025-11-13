export interface CounterState {
  value: number;
}

export interface RootState {
  counter: CounterState;
}

// Anomaly Analysis Types
export interface TemperatureHumidityDetails {
  value: number;
  normal_min: number;
  normal_max: number;
  deviation_from_mean: number;
}

export interface AnomalyClassification {
  type: string;
  confidence: number;
  details: {
    temperature: TemperatureHumidityDetails;
    humidity: TemperatureHumidityDetails;
  };
}

export interface MeasurementAnomaly {
  id: number;
  temperature: number;
  humidity: number;
  timestamp: Date;
  is_anomalous: boolean;
  diagnosis: AnomalyClassification | null;
}

export interface AnomalyAnalysisResponse {
  measurements: MeasurementAnomaly[];
  total_count: number;
  anomalous_count: number;
  start_time: Date;
  end_time: Date;
  min_interval_minutes: number | null;
}
