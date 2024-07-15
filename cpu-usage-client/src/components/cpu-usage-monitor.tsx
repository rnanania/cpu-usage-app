import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/shadcn/components/ui/use-toast";
import CpuUsageChart from "./cpu-usage-chart";
import {
  useCpuUsageSeriesOptions,
  useCpuUsageMutation,
} from "@/services/cpu-usage";

const CpuUsageMonitor = () => {
  // CPU usage load series data.
  const { data: series, isError } = useQuery(useCpuUsageSeriesOptions);
  const cpuUsageMutation = useCpuUsageMutation();
  const { isError: updateError } = cpuUsageMutation;
  const { toast } = useToast();

  // CPU usage load update every 10 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      cpuUsageMutation.mutate();
    }, 10_000);

    // Clear Interval
    return () => {
      interval && clearInterval(interval);
    };
  }, [cpuUsageMutation]);

  // Error handling around CPU usage series data fetching
  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Fetching CPU usage data failed!!",
        duration: 10_000,
        description: "Please contact our super heroes engineering team.",
      });
    }
  }, [isError, toast]);

  // Error handling around CPU usage data update
  useEffect(() => {
    if (updateError) {
      toast({
        variant: "destructive",
        title: "Updating CPU usage data failed!!",
        description: "Please contact our super heroes engineering team.",
      });
    }
  }, [updateError, toast]);

  if (!series && isError)
    return (
      <h2 className="text-sm font-medium leading-none">
        CPU Usage chart data not available.
      </h2>
    );
  if (!series)
    return <p className="text-sm font-medium leading-none">Loading...</p>;
  return <CpuUsageChart data={series} />;
};

export default CpuUsageMonitor;
