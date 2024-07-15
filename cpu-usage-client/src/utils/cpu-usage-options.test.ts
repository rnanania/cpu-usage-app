import { describe, expect, it } from "vitest";
import dayjs from "dayjs";
import { UsageMetric } from "@/services/cpu-usage";
import { updateSeries } from "@/utils/cpu-usage-options";

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
