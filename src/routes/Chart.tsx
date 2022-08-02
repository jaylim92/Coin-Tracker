import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface HistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<HistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );

  return (
    <h1>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparant",
            },
            stroke: { curve: "smooth", width: 5 },
            grid: { show: false },
            xaxis: {
              labels: {
                show: false,

                datetimeFormatter: { day: "'dd' 'mmm'" },
              },
              type: "datetime",
              axisTicks: { show: false },
              categories: data?.map((price) => price.time_close) ?? [],
            },
            yaxis: { show: false },
            tooltip: { y: { formatter: (value) => `$ ${value.toFixed(2)}` } },
          }}
        />
      )}
    </h1>
  );
}

export default Chart;
