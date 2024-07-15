import { Badge } from "@/shadcn/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { LoadType } from "@/utils/cpu-usage-options";

type CpuUsageAlertsProps = { hotAreas: LoadType[][]; coolAreas: LoadType[][] };
const CpuUsageAlerts = ({ hotAreas, coolAreas }: CpuUsageAlertsProps) => {
  const alerts = [...hotAreas, ...coolAreas].sort((a, b) => b[0].id - a[0].id);
  return (
    <Table>
      <TableCaption>
        A list of CPU usage alerts in last 10 minutes.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>CPU Status</TableHead>
          <TableHead>Time Interval</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alerts.map(([start, end]) => (
          <TableRow key={`${start.id}-${end.id}`}>
            <TableCell>
              <Badge variant={start.name === 'Under Load' ? 'destructive' : 'secondary'}>{start.name}</Badge>
            </TableCell>
            <TableCell>
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                From {start.xAxis} - To {end.xAxis}
              </code>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CpuUsageAlerts;
