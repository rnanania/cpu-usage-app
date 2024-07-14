import React from "react";
import ReactECharts from "echarts-for-react";
import { getCpuUsageChartOptions } from '@/utils/cpu-usage-options';
import { UsageMetric } from "@/services/cpu-usage";

interface CpuUsageChartProps {
  data: UsageMetric[];
}

const CpuUsageChart: React.FC<CpuUsageChartProps> = ({ data }) => {
  const option = getCpuUsageChartOptions(data);
  if (!data) return null;
  return <ReactECharts option={option} style={{ height: "400px" }} />;
};

export default CpuUsageChart;
