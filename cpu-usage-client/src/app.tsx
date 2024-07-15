import AppNavigation from '@/components/app-navigation'
import CpuUsageMonitor from './components/cpu-usage-monitor'
import { Toaster } from "@/shadcn/components/ui/toaster"

const App = ()  => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full px-4">
        <div className="border-b-2 z-100" style={{ backgroundColor: "hsl(var(--background))" }}>
          <AppNavigation />
        </div>
        <main className="flex-1">
          <div className="mx-auto w-full h-full py-4">
            {/* If we have multiple routes within app router outlet goes here */}
            <CpuUsageMonitor />
          </div>
          <Toaster />
        </main>
      </div>
    </div>
  )
}

export default App


