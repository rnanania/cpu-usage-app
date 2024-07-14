import { queryOptions } from "@tanstack/react-query";

export type UsageMetric = {
  timestamp: number;
  cpuUsage: number;
  time: string;
};

export type UsageMetricSeries = {
  series: UsageMetric[]
}

async function fetchCpuUsageSeries(): Promise<UsageMetric[]> {
  const response = await fetch('/api/cpu-usage-series')
  if (!response.ok) {
    throw new Error("Unable to get the cpu usage metrics");
  }
  const data = await response.json();
  if (data && data.series) {
    return data.series;
  }
  return []
}

export const useCpuUsageSeriesOptions = queryOptions({
  queryKey: ["cpu-usage-series"],
  queryFn: fetchCpuUsageSeries,
  refetchOnWindowFocus: true,
});
