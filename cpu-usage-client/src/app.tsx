import AppNavigation from '@/components/app-navigation'
import CpuUsageMonitor from './components/cpu-usage-monitor'

const App = ()  => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full px-4">
        <div className="sticky top-0 border-b-2 z-100" style={{ backgroundColor: "hsl(var(--background))" }}>
          <AppNavigation />
        </div>
        <main className="flex-1">
          <div className="mx-auto w-full h-full p-4">
            {/* If we have multiple routes within app outlet goes here */}
            <CpuUsageMonitor />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App


