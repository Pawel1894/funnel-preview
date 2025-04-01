import { MobileIcon } from "@/libs/ui";
import { isViewMode, ViewMode, previewViewportSizes } from "./domain/funnel";
import { DesktopIcon, Switcher } from "@/libs/ui";

type DeviceViewSwitcherProps = {
  viewMode: ViewMode;
  onChange: (value: ViewMode) => void;
};

function ViewportTooltip({ mode }: { mode: ViewMode }) {
  const size = previewViewportSizes[mode];

  return (
    <div className="flex flex-col gap-1">
      <div className="font-medium">{mode === "desktop" ? "Desktop" : "Mobile"} Preview</div>
      {mode === "desktop" && <div className="font-medium mt-0.5">*Height adjusts to content</div>}
      <div className="text-sm">
        {size.width} × {size.height}px
      </div>
    </div>
  );
}

export function DeviceViewSwitcher({ onChange, viewMode }: DeviceViewSwitcherProps) {
  const handleViewModeChange = (value: string) => {
    if (isViewMode(value)) {
      onChange(value);
    }
  };

  return (
    <Switcher
      value={viewMode}
      onChange={handleViewModeChange}
      options={[
        {
          value: "desktop",
          icon: <DesktopIcon />,
          tooltip: <ViewportTooltip mode="desktop" />,
        },
        {
          value: "mobile",
          icon: <MobileIcon />,
          tooltip: <ViewportTooltip mode="mobile" />,
        },
      ]}
    />
  );
}
