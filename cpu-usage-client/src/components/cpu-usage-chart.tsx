import React from "react";
import ReactECharts from "echarts-for-react";
import { getCpuUsageChartOptions } from "@/utils/cpu-usage-options";
import { UsageMetric } from "@/services/cpu-usage";
import CpuUsageAlerts from "./cpu-usage-alerts";

interface CpuUsageChartProps {
  data: UsageMetric[];
}

const CpuUsageChart: React.FC<CpuUsageChartProps> = ({ data }) => {
  const { option, hotAreas, coolAreas } = getCpuUsageChartOptions(data);
  if (!data) return null;
  return (
    <>
      <ReactECharts option={option} style={{ height: "400px" }} />
      <CpuUsageAlerts hotAreas={hotAreas} coolAreas={coolAreas} />
    </>
  );
};

export default CpuUsageChart;
