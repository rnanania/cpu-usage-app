import { describe, expect, it } from "vitest";
import dayjs from "dayjs";
import { UsageMetric } from "@/services/cpu-usage";
import {
  getHotAreas,
  getCoolAreas,
  getVisualMap,
  getCpuUsageChartOptions,
  updateSeries,
} from "@/utils/cpu-usage-options";

describe("getHotAreas function", () => {
  it("should return correct hot areas", () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 1.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 1.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 1.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 1.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 1.9, time: "12:04" },
      { timestamp: 6, cpuUsage: 1.1, time: "12:05" },
      { timestamp: 7, cpuUsage: 1.3, time: "12:06" },
      { timestamp: 8, cpuUsage: 1.7, time: "12:07" },
      { timestamp: 9, cpuUsage: 1.5, time: "12:08" },
      { timestamp: 10, cpuUsage: 1.8, time: "12:09" },
      { timestamp: 11, cpuUsage: 2.0, time: "12:10" },
      { timestamp: 12, cpuUsage: 1.1, time: "12:11" },
      { timestamp: 13, cpuUsage: 1.4, time: "12:12" },
      { timestamp: 14, cpuUsage: 1.9, time: "12:13" },
      { timestamp: 15, cpuUsage: 1.2, time: "12:14" },
    ];
    const result = getHotAreas(testData);
    expect(result).toEqual([
      [
        { name: "Under Load", xAxis: "12:00", id: 0 },
        { xAxis: "12:14", id: 14 },
      ],
    ]);
  });

  it('should handle single "Under Load" area at end', () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 0.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 0.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 1.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 1.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 1.9, time: "12:04" },
      { timestamp: 6, cpuUsage: 1.1, time: "12:05" },
      { timestamp: 7, cpuUsage: 1.3, time: "12:06" },
      { timestamp: 8, cpuUsage: 1.7, time: "12:07" },
      { timestamp: 9, cpuUsage: 1.5, time: "12:08" },
      { timestamp: 10, cpuUsage: 1.8, time: "12:09" },
      { timestamp: 11, cpuUsage: 2.0, time: "12:10" },
      { timestamp: 12, cpuUsage: 1.1, time: "12:11" },
      { timestamp: 13, cpuUsage: 1.4, time: "12:12" },
      { timestamp: 14, cpuUsage: 1.9, time: "12:13" },
      { timestamp: 15, cpuUsage: 1.2, time: "12:14" },
    ];
    const result = getHotAreas(testData);
    expect(result).toEqual([
      [
        { name: "Under Load", xAxis: "12:01", id: 2 },
        { xAxis: "12:14", id: 14 },
      ],
    ]);
  });

  it('should handle data with no "Under Load" areas', () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 0.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 0.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 0.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 0.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 0.9, time: "12:04" },
      { timestamp: 6, cpuUsage: 0.1, time: "12:05" },
      { timestamp: 7, cpuUsage: 0.3, time: "12:06" },
      { timestamp: 8, cpuUsage: 0.7, time: "12:07" },
      { timestamp: 9, cpuUsage: 0.5, time: "12:08" },
      { timestamp: 10, cpuUsage: 0.8, time: "12:09" },
      { timestamp: 11, cpuUsage: 0.0, time: "12:10" },
      { timestamp: 12, cpuUsage: 0.1, time: "12:11" },
      { timestamp: 13, cpuUsage: 0.4, time: "12:12" },
      { timestamp: 14, cpuUsage: 0.9, time: "12:13" },
      { timestamp: 15, cpuUsage: 0.2, time: "12:14" },
    ];
    const result = getHotAreas(testData);
    expect(result).toEqual([]);
  });

  it("should handle data with not enough heavy load interval", () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 0.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 0.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 1.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 1.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 1.9, time: "12:04" },
      { timestamp: 6, cpuUsage: 1.1, time: "12:05" },
      { timestamp: 7, cpuUsage: 1.3, time: "12:06" },
      { timestamp: 8, cpuUsage: 0.7, time: "12:07" },
      { timestamp: 9, cpuUsage: 0.5, time: "12:08" },
      { timestamp: 10, cpuUsage: 0.8, time: "12:09" },
      { timestamp: 11, cpuUsage: 0.0, time: "12:10" },
      { timestamp: 12, cpuUsage: 0.1, time: "12:11" },
      { timestamp: 13, cpuUsage: 0.4, time: "12:12" },
      { timestamp: 14, cpuUsage: 0.9, time: "12:13" },
      { timestamp: 15, cpuUsage: 0.2, time: "12:14" },
    ];
    const result = getHotAreas(testData);
    expect(result).toEqual([]);
  });

  it("should handle data with enough heavy load with more than interval", () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 0.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 0.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 1.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 1.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 1.9, time: "12:04" },
      { timestamp: 6, cpuUsage: 1.1, time: "12:05" },
      { timestamp: 7, cpuUsage: 1.3, time: "12:06" },
      { timestamp: 8, cpuUsage: 1.7, time: "12:07" },
      { timestamp: 9, cpuUsage: 1.5, time: "12:08" },
      { timestamp: 10, cpuUsage: 1.8, time: "12:09" },
      { timestamp: 11, cpuUsage: 2.0, time: "12:10" },
      { timestamp: 12, cpuUsage: 1.1, time: "12:11" },
      { timestamp: 13, cpuUsage: 1.4, time: "12:12" },
      { timestamp: 14, cpuUsage: 1.9, time: "12:13" },
      { timestamp: 15, cpuUsage: 1.2, time: "12:14" },
      { timestamp: 16, cpuUsage: 1.2, time: "12:15" },
      { timestamp: 17, cpuUsage: 0.5, time: "12:16" },
    ];
    const result = getHotAreas(testData);
    expect(result).toEqual([
      [
        { name: "Under Load", xAxis: "12:01", id: 2 },
        { xAxis: "12:15", id: 15 },
      ],
    ]);
  });
});

describe("getCoolAreas function", () => {
  it("should return correct cool areas", () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 0.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 0.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 0.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 0.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 0.9, time: "12:04" },
      { timestamp: 6, cpuUsage: 0.1, time: "12:05" },
      { timestamp: 7, cpuUsage: 0.3, time: "12:06" },
      { timestamp: 8, cpuUsage: 0.7, time: "12:07" },
      { timestamp: 9, cpuUsage: 0.5, time: "12:08" },
      { timestamp: 10, cpuUsage: 0.8, time: "12:09" },
      { timestamp: 11, cpuUsage: 0.0, time: "12:10" },
      { timestamp: 12, cpuUsage: 0.1, time: "12:11" },
      { timestamp: 13, cpuUsage: 0.4, time: "12:12" },
      { timestamp: 14, cpuUsage: 0.9, time: "12:13" },
      { timestamp: 15, cpuUsage: 0.2, time: "12:14" },
    ];
    const result = getCoolAreas(testData);
    expect(result).toEqual([
      [
        { name: "Recovery", xAxis: "12:00", id: 0 },
        { xAxis: "12:14", id: 14 },
      ],
    ]);
  });

  it("should handle single recovery area at end", () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 1.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 1.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 0.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 0.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 0.9, time: "12:04" },
      { timestamp: 6, cpuUsage: 0.1, time: "12:05" },
      { timestamp: 7, cpuUsage: 0.3, time: "12:06" },
      { timestamp: 8, cpuUsage: 0.7, time: "12:07" },
      { timestamp: 9, cpuUsage: 0.5, time: "12:08" },
      { timestamp: 10, cpuUsage: 0.8, time: "12:09" },
      { timestamp: 11, cpuUsage: 0.0, time: "12:10" },
      { timestamp: 12, cpuUsage: 0.1, time: "12:11" },
      { timestamp: 13, cpuUsage: 0.4, time: "12:12" },
      { timestamp: 14, cpuUsage: 0.9, time: "12:13" },
      { timestamp: 15, cpuUsage: 0.2, time: "12:14" },
    ];
    const result = getCoolAreas(testData);
    expect(result).toEqual([
      [
        { name: "Recovery", xAxis: "12:01", id: 2 },
        { xAxis: "12:14", id: 14 },
      ],
    ]);
  });

  it("should handle data with no cool areas", () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 1.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 1.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 1.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 1.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 1.9, time: "12:04" },
      { timestamp: 6, cpuUsage: 1.1, time: "12:05" },
      { timestamp: 7, cpuUsage: 1.3, time: "12:06" },
      { timestamp: 8, cpuUsage: 1.7, time: "12:07" },
      { timestamp: 9, cpuUsage: 1.5, time: "12:08" },
      { timestamp: 10, cpuUsage: 1.8, time: "12:09" },
      { timestamp: 11, cpuUsage: 1.0, time: "12:10" },
      { timestamp: 12, cpuUsage: 1.1, time: "12:11" },
      { timestamp: 13, cpuUsage: 1.4, time: "12:12" },
      { timestamp: 14, cpuUsage: 1.9, time: "12:13" },
      { timestamp: 15, cpuUsage: 1.2, time: "12:14" },
    ];
    const result = getCoolAreas(testData);
    expect(result).toEqual([]);
  });

  it("should handle data with not enough cool load interval", () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 0.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 0.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 1.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 1.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 1.9, time: "12:04" },
      { timestamp: 6, cpuUsage: 1.1, time: "12:05" },
      { timestamp: 7, cpuUsage: 1.3, time: "12:06" },
      { timestamp: 8, cpuUsage: 0.7, time: "12:07" },
      { timestamp: 9, cpuUsage: 0.5, time: "12:08" },
      { timestamp: 10, cpuUsage: 0.8, time: "12:09" },
      { timestamp: 11, cpuUsage: 0.0, time: "12:10" },
      { timestamp: 12, cpuUsage: 0.1, time: "12:11" },
      { timestamp: 13, cpuUsage: 0.4, time: "12:12" },
      { timestamp: 14, cpuUsage: 0.9, time: "12:13" },
      { timestamp: 15, cpuUsage: 0.2, time: "12:14" },
    ];
    const result = getCoolAreas(testData);
    expect(result).toEqual([]);
  });

  it("should handle data with enough cool load with more than interval", () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 1.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 1.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 0.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 0.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 0.9, time: "12:04" },
      { timestamp: 6, cpuUsage: 0.1, time: "12:05" },
      { timestamp: 7, cpuUsage: 0.3, time: "12:06" },
      { timestamp: 8, cpuUsage: 0.7, time: "12:07" },
      { timestamp: 9, cpuUsage: 0.5, time: "12:08" },
      { timestamp: 10, cpuUsage: 0.8, time: "12:09" },
      { timestamp: 11, cpuUsage: 0.0, time: "12:10" },
      { timestamp: 12, cpuUsage: 0.1, time: "12:11" },
      { timestamp: 13, cpuUsage: 0.4, time: "12:12" },
      { timestamp: 14, cpuUsage: 0.9, time: "12:13" },
      { timestamp: 15, cpuUsage: 0.2, time: "12:14" },
      { timestamp: 16, cpuUsage: 0.2, time: "12:15" },
      { timestamp: 17, cpuUsage: 1.5, time: "12:16" },
    ];
    const result = getCoolAreas(testData);
    expect(result).toEqual([
      [
        { name: "Recovery", xAxis: "12:01", id: 2 },
        { xAxis: "12:15", id: 15 },
      ],
    ]);
  });
});

describe("getVisualMap function", () => {
  it("should return correct visual maps for mixed data", () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 0.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 1.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 0.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 1.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 0.9, time: "12:04" },
    ];
    const result = getVisualMap(testData);
    expect(result).toEqual([
      { color: "green", lte: 0 },
      { color: "red", gt: 0, lte: 1 },
      { color: "green", gt: 1, lte: 2 },
      { color: "red", gt: 2, lte: 3 },
      { color: "green", gt: 3, lte: 5 },
    ]);
  });

  it("should return correct visual maps for mixed data starting with high", () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 1, time: "12:00" },
      { timestamp: 2, cpuUsage: 1.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 0.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 1.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 0.9, time: "12:04" },
    ];
    const result = getVisualMap(testData);
    expect(result).toEqual([
      { color: "red", lte: 1 },
      { color: "green", gt: 1, lte: 2 },
      { color: "red", gt: 2, lte: 3 },
      { color: "green", gt: 3, lte: 5 },
    ]);
  });

  it('should handle data with all "Cool" values', () => {
    const testDataCool: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 0.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 0.9, time: "12:01" },
      { timestamp: 3, cpuUsage: 0.6, time: "12:02" },
    ];
    const result = getVisualMap(testDataCool);
    expect(result).toEqual([{ color: "green", gt: 0, lte: 3 }]);
  });

  it('should handle data with all "Hot" values', () => {
    const testDataHot: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 1.2, time: "12:00" },
      { timestamp: 2, cpuUsage: 1.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 1.1, time: "12:02" },
    ];
    const result = getVisualMap(testDataHot);
    expect(result).toEqual([{ color: "red", gt: 0, lte: 3 }]);
  });
});

describe("getCpuUsageChartOptions function", () => {
  it("should return correct chart option", () => {
    const testData: UsageMetric[] = [
      { timestamp: 1, cpuUsage: 1.8, time: "12:00" },
      { timestamp: 2, cpuUsage: 1.5, time: "12:01" },
      { timestamp: 3, cpuUsage: 1.6, time: "12:02" },
      { timestamp: 4, cpuUsage: 1.2, time: "12:03" },
      { timestamp: 5, cpuUsage: 1.9, time: "12:04" },
      { timestamp: 6, cpuUsage: 1.1, time: "12:05" },
      { timestamp: 7, cpuUsage: 1.3, time: "12:06" },
      { timestamp: 8, cpuUsage: 1.7, time: "12:07" },
      { timestamp: 9, cpuUsage: 1.5, time: "12:08" },
      { timestamp: 10, cpuUsage: 1.8, time: "12:09" },
      { timestamp: 11, cpuUsage: 2.0, time: "12:10" },
      { timestamp: 12, cpuUsage: 1.1, time: "12:11" },
      { timestamp: 13, cpuUsage: 1.4, time: "12:12" },
      { timestamp: 14, cpuUsage: 1.9, time: "12:13" },
      { timestamp: 15, cpuUsage: 1.2, time: "12:14" },
    ];
    const chartOptions = getCpuUsageChartOptions(testData);

    expect(chartOptions.coolAreas.length).toBe(0);
    expect(chartOptions.hotAreas.length).toBe(1);
    expect(chartOptions.option.title.text).toBe("CPU Usage - 1.2");
    expect(chartOptions.option.xAxis.data.length).toBe(15);
    expect(chartOptions.option.visualMap.pieces.length).toBe(1);
  });
});

describe("updateSeries function", () => {
  let series: UsageMetric[];

  it("should add new data when timestamp is newer", () => {
    const now = Date.now();
    series = [{ timestamp: now, cpuUsage: Math.random(), time: "00:10" }];
    const newData: UsageMetric = {
      timestamp: now + 10_000,
      cpuUsage: Math.random(),
      time: "00:20",
    };
    const updatedSeries = updateSeries(series, newData);

    expect(updatedSeries).toHaveLength(2);
    expect(updatedSeries[1]).toEqual(newData);
  });

  it("should not add new data when timestamp is older or equal", () => {
    const now = Date.now();
    series = [{ timestamp: now, cpuUsage: Math.random(), time: "00:10" }];
    const newData: UsageMetric = {
      timestamp: now,
      cpuUsage: Math.random(),
      time: "00:20",
    };
    const updatedSeries = updateSeries(series, newData);

    expect(updatedSeries).toHaveLength(1);
    expect(updatedSeries[0]).not.toEqual(newData);
  });

  it("should maintain series length at MAX_BUFFER", () => {
    const MAX_BUFFER = 60;
    const now = Date.now();
    series = Array.from({ length: MAX_BUFFER });
    series = series.map((_, id) => {
      const timestamp = now + id * 10_000;
      return {
        timestamp,
        cpuUsage: Math.random(),
        time: dayjs(timestamp).format("mm:ss"),
      };
    });
    const timestamp = now + MAX_BUFFER * 10_000;
    const newData: UsageMetric = {
      timestamp,
      cpuUsage: Math.random(),
      time: dayjs(timestamp).format("mm:ss"),
    };
    const updatedSeries = updateSeries(series, newData);

    expect(updatedSeries).toHaveLength(60);
    expect(updatedSeries[MAX_BUFFER - 1]).toEqual(newData);
  });
});
