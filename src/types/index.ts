// Define types for our Redux store
export interface CounterState {
  value: number;
}

export interface RootState {
  counter: CounterState;
}
