import { UsageMetric } from "@/services/cpu-usage";

type LoadType = {
  id: number;
  name?: string;
  xAxis: string;
};

type VisualMapType = {
  gt?: number;
  lte?: number;
  color?: string;
};

const LOAD_THRESHOLD = 1;
const MIN_LOAD_COUNT = 12; // Each load is for 10 seconds so 12 loads needed to see the heavy load for 2 minutes.

// Traverse through data and find the cool area for cpu load data
const getHotAreas = (data: UsageMetric[]) => {
  const hotAreas: LoadType[][] = [];
  let area: LoadType[] = [];

  // Traverse through data and find the hot area within data
  data.forEach((item, index) => {
    const { cpuUsage } = item;
    // Looking for the first heavy load index
    if (area.length == 0 && cpuUsage >= LOAD_THRESHOLD) {
      const { time } = data[index - 1] || data[index];
      area.push({ name: "HOT", xAxis: time, id: index });
    }

    // Previously heavy load found
    if (area.length == 1 && cpuUsage < LOAD_THRESHOLD) {
      const { time } = data[index - 1];
      area.push({ xAxis: time, id: index - 1 });
    }

    // heavy load area found already
    if (area.length == 2) {
      const [{ id: idStart }, { id: idEnds }] = area;
      if (idEnds - idStart >= MIN_LOAD_COUNT) {
        hotAreas.push(area);
      }
      area = [];
    }
  });

  // Previously heavy load found and no cool down found
  if (area.length == 1) {
    const { time, cpuUsage } = data[data.length - 1];
    if (cpuUsage >= LOAD_THRESHOLD) {
      area.push({ xAxis: time, id: data.length - 1 });
      const [{ id: idStart }, { id: idEnds }] = area;
      if (idEnds - idStart >= MIN_LOAD_COUNT) {
        hotAreas.push(area);
      }
    }
  }

  return hotAreas;
};

// Traverse through data and find the cool area for cpu load data
const getCoolAreas = (data: UsageMetric[]) => {
  const coolAreas: LoadType[][] = [];
  let area: LoadType[] = [];

  // Traverse through data and find the cool area within data
  data.forEach((item, index) => {
    const { cpuUsage } = item;
    // Looking for the first heavy load index
    if (area.length == 0 && cpuUsage < LOAD_THRESHOLD) {
      const { time } = data[index - 1] || data[index];
      area.push({ name: "COOL", xAxis: time, id: index });
    }

    // Previously cool load found
    if (area.length == 1 && cpuUsage >= LOAD_THRESHOLD) {
      const { time } = data[index - 1];
      area.push({ xAxis: time, id: index - 1 });
    }

    // cool load area found already
    if (area.length == 2) {
      const [{ id: idStart }, { id: idEnds }] = area;
      if (idEnds - idStart >= MIN_LOAD_COUNT) {
        coolAreas.push(area);
      }
      area = [];
    }
  });

  // Previously cool load found and no hot found
  if (area.length == 1) {
    const { time, cpuUsage } = data[data.length - 1];
    if (cpuUsage < LOAD_THRESHOLD) {
      area.push({ xAxis: time, id: data.length - 1 });
      const [{ id: idStart }, { id: idEnds }] = area;
      if (idEnds - idStart >= MIN_LOAD_COUNT) {
        coolAreas.push(area);
      }
    }
  }  
  return coolAreas;
};

// Traverse through data and highlight the each group of Hot or Cold load with specific color.
const getVisualMap = (data: UsageMetric[]) => {
  const visualMaps: VisualMapType[] = [];
  const lastLoad = data[0].cpuUsage;
  let lastVisualId = 0;
  let isLastHot = lastLoad >= LOAD_THRESHOLD;

  data.forEach((item, index) => {
    const { cpuUsage } = item;
    // Already Hot looking for the next Cool
    if (isLastHot && cpuUsage < LOAD_THRESHOLD) {
      if (visualMaps.length === 0) {
        visualMaps.push({ color: "red", lte: index - 1 });
      } else {
        visualMaps.push({ color: "red", gt: lastVisualId, lte: index - 1 });
      }
      lastVisualId = index - 1;
      isLastHot = false;
    }

    // Already Cool looking for the next Hot
    if (!isLastHot && cpuUsage >= LOAD_THRESHOLD) {
      if (visualMaps.length === 0) {
        visualMaps.push({ color: "green", lte: index - 1 });
      } else {
        visualMaps.push({ color: "green", gt: lastVisualId, lte: index - 1 });
      }
      lastVisualId = index - 1;
      isLastHot = true;
    }
  });

  if (isLastHot) {
    visualMaps.push({ color: "red", gt: lastVisualId, lte: data.length });
  } else {
    visualMaps.push({ color: "green", gt: lastVisualId, lte: data.length });
  }

  return visualMaps;
};

export const getCpuUsageChartOptions = (data: UsageMetric[]) => {
  const visualMaps = getVisualMap(data);
  const hotAreas = getHotAreas(data);
  const coolAreas = getCoolAreas(data);
  console.info(visualMaps);

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((item) => item.time),
    },
    yAxis: {
      type: "value",
      axisPointer: {
        snap: true,
      },
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [...visualMaps],
    },
    series: [
      {
        name: "CPU Usage",
        type: "line",
        smooth: true,
        data: data.map((item) => item.cpuUsage),
        markArea: {
          itemStyle: {
            color: "rgba(76, 88, 151, 0.4)",
          },
          data: [...hotAreas, ...coolAreas],
        },
      },
    ],
  };
};