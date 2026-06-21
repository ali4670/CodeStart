import { cn } from "@/lib/utils";

export function LeverSwitch({
  checked,
  onChange,
  className,
  label = "Toggle option",
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  label?: string;
}) {
  return (
<label className={cn("toggle-container", className)} aria-label={label}>
  <input className="toggle-input" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
  <div className="toggle-handle-wrapper">
    <div className="toggle-handle">
      <div className="toggle-handle-knob"></div>
      <div className="toggle-handle-bar-wrapper">
        <div className="toggle-handle-bar"></div>
      </div>
    </div>
  </div>
  <div className="toggle-base">
    <div className="toggle-base-inside"></div>
  </div>
</label>
  );
}

export const Component = LeverSwitch;
