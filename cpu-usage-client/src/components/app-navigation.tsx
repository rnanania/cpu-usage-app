import ModeToggle from "./mode-toggle";

const AppNavigation = () => {
  return (
    <div className="mx-auto w-full">
      <div className="flex h-12 items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          CPU Usage Monitor
        </h2>
        <ModeToggle />
      </div>
    </div>
  );
};

export default AppNavigation;
