import { MobileIcon } from "../ui/icons/mobile-icon";
import { isViewMode, ViewMode } from "./funnel";

import { DesktopIcon, Switcher } from "@/libs/ui";

type DeviceViewSwitcherProps = {
  viewMode: ViewMode;
  onChange: (value: ViewMode) => void;
};

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
        },
        {
          value: "mobile",
          icon: <MobileIcon />,
        },
      ]}
    />
  );
}
