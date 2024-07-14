import { useQuery } from '@tanstack/react-query'
import { useCpuUsageSeriesOptions } from '@/services/cpu-usage'
import CpuUsageChart from './cpu-usage-chart'

const CpuUsageMonitor = () => {
    const { data } = useQuery(useCpuUsageSeriesOptions);
    if(!data) return null;
    return <CpuUsageChart data={data}/>
}

export default CpuUsageMonitor;