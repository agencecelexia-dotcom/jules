import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AccessibleIconProps = {
  icon: LucideIcon;
  className?: string;
} & (
  | { decorative: true; label?: never }
  | { decorative?: false; label: string }
);

export function AccessibleIcon({
  icon: Icon,
  className,
  ...props
}: AccessibleIconProps) {
  if (props.decorative) {
    return <Icon className={cn("h-5 w-5", className)} aria-hidden="true" />;
  }

  return (
    <Icon
      className={cn("h-5 w-5", className)}
      role="img"
      aria-label={props.label}
    />
  );
}
