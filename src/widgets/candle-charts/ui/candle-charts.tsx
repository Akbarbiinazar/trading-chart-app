import { useEffect, useRef, useState, useCallback } from "react";

import { createChart, ISeriesApi, UTCTimestamp } from "lightweight-charts";

import { chartData } from "../mocks/data";
import { CandleData } from "../lib/types";

const chartOptions = {
  layout: {
    background: { color: "#222" },
    textColor: "#DDD",
  },
  grid: {
    vertLines: { color: "#444" },
    horzLines: { color: "#444" },
  },
  height: 500,
  crossHair: {
    mode: 1,
  },
  timeScale: {
    borderVisible: false,
    timeVisible: true,
    tickMarkFormatter: () => "",
  },
};

export const CandleCharts = () => {
  const [_, setCandles] = useState<CandleData[]>(chartData);
  const [isTapped, setIsTapped] = useState(false);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  // Generate a new random candle based on the last candle's data
  const generateRandomCandle = useCallback(
    (lastCandle: CandleData, isGreen: boolean): CandleData => {
      const time = (lastCandle.time + 10) as UTCTimestamp;
      const directionFactor = isGreen ? 1 : -1;
      const open = lastCandle.close;
      const close = open + Math.random() * 0.5 * directionFactor;
      const high = Math.max(open, close) + Math.random() * 0.5;
      const low = Math.min(open, close) - Math.random() * 0.5;

      return { time, open, high, low, close };
    },
    []
  );

  // Initialize the chart and set up the series
  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container || chartRef.current) return;

    chartRef.current = createChart(container, {
      width: container.clientWidth,
      height: 250,
      layout: chartOptions.layout,
      grid: chartOptions.grid,
      crosshair: chartOptions.crossHair,
      timeScale: chartOptions.timeScale,
    });

    seriesRef.current = chartRef.current.addCandlestickSeries();

    seriesRef.current.setData(chartData);

    chartRef.current.timeScale().fitContent();

    // Handle chart resizing
    const handleResize = () => {
      chartRef.current?.applyOptions({ width: container.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chartRef.current?.remove();
      chartRef.current = null;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Add new candle every 5 seconds
  useEffect(() => {
    if (!seriesRef.current) return;

    const intervalId = setInterval(() => {
      setCandles((prevCandles) => {
        const lastCandle = prevCandles[prevCandles.length - 1];
        const newCandle = generateRandomCandle(lastCandle, isTapped);

        seriesRef.current?.update(newCandle);
        return [...prevCandles, newCandle];
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isTapped, generateRandomCandle]);

  const handleTap = () => setIsTapped((prev: boolean) => !prev);
  console.log(import.meta.env.VITE_TELEGRAM_BOT_TOKEN);
  return (
    <div
      ref={chartContainerRef}
      onClick={handleTap}
      style={{
        touchAction: "manipulation",
        overflowX: "hidden",
        position: "relative",
      }}
    />
  );
};
