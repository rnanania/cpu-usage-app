import { updateSeries } from "@/utils/cpu-usage-options";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export type UsageMetric = {
  timestamp: number;
  cpuUsage: number;
  time: string;
};

export type UsageMetricSeries = {
  series: UsageMetric[];
};

async function fetchCpuUsageSeries(): Promise<UsageMetric[]> {
  const response = await fetch("/api/cpu-usage-series");
  if (!response.ok) {
    throw new Error("Unable to get the cpu usage metrics");
  }
  const data = await response.json();
  if (data && data.series) {
    return data.series;
  }
  return [];
}

async function fetchCpuUsage(): Promise<UsageMetric> {
  const response = await fetch("/api/cpu-usage-now");
  if (!response.ok) {
    throw new Error("Unable to get the current cpu usage metrics");
  }
  const data = await response.json();
  return data;
}

export const useCpuUsageSeriesOptions = queryOptions({
  queryKey: ["cpu-usage-series"],
  queryFn: fetchCpuUsageSeries,
  refetchOnWindowFocus: true,
});

export const useCpuUsageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cpu-usage-mutation"],
    mutationFn: fetchCpuUsage,
    onSuccess: (data) => {
      queryClient.setQueryData(["cpu-usage-series"], (series: UsageMetric[]) =>
        updateSeries(series, data)
      );
    },
    onError: () => {
      throw Error("Unable to fetch cpu upate");
    },
  });
};
