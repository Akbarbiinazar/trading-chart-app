import { UTCTimestamp } from "lightweight-charts";

export interface CandleData {
    time: UTCTimestamp ;
    open: number;
    high: number;
    low: number;
    close: number;
  }