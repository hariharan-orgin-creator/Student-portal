import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "green" | "blue" | "purple" | "yellow" | "orange" | "red" | "pink" | "white";
const variantMap: Record<Variant, string> = {
  green: "bg-[var(--duo-green)] text-white [--shadow-color:var(--duo-green-dark)]",
  blue: "bg-[var(--duo-blue)] text-white [--shadow-color:oklch(0.55_0.16_240)]",
  purple: "bg-[var(--duo-purple)] text-white [--shadow-color:oklch(0.5_0.2_295)]",
  yellow: "bg-[var(--duo-yellow)] text-[oklch(0.3_0.08_80)] [--shadow-color:oklch(0.7_0.17_85)]",
  orange: "bg-[var(--duo-orange)] text-white [--shadow-color:oklch(0.6_0.18_50)]",
  red: "bg-[var(--duo-red)] text-white [--shadow-color:oklch(0.5_0.22_25)]",
  pink: "bg-[var(--duo-pink)] text-white [--shadow-color:oklch(0.6_0.16_350)]",
  white: "bg-card text-foreground border-2 border-border [--shadow-color:var(--border)]",
};

interface DuoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function DuoButton({
  variant = "green",
  size = "md",
  className,
  children,
  ...props
}: Readonly<DuoButtonProps>) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  return (
    <button
      className={cn(
        "btn-pop inline-flex items-center justify-center gap-2",
        variantMap[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type DuoCardProps = {
  children: ReactNode;
  className?: string;
  accent?: Variant;
};

export function DuoCard({
  children,
  className,
  accent: _accent,
}: Readonly<DuoCardProps>) {
  return <div className={cn("card-pop p-5", className)}>{children}</div>;
}

type DuoProgressProps = {
  value: number;
  label?: string;
  color?: Variant;
};

export function DuoProgress({
  value,
  label,
  color = "green",
}: Readonly<DuoProgressProps>) {
  const colorMap: Record<string, string> = {
    green: "linear-gradient(180deg, oklch(0.82 0.19 145), oklch(0.65 0.2 145))",
    blue: "linear-gradient(180deg, oklch(0.78 0.16 240), oklch(0.6 0.18 240))",
    purple: "linear-gradient(180deg, oklch(0.75 0.2 295), oklch(0.55 0.22 295))",
    yellow: "linear-gradient(180deg, oklch(0.9 0.17 90), oklch(0.75 0.18 85))",
    orange: "linear-gradient(180deg, oklch(0.82 0.18 50), oklch(0.65 0.2 50))",
    red: "linear-gradient(180deg, oklch(0.78 0.22 25), oklch(0.6 0.24 25))",
    pink: "linear-gradient(180deg, oklch(0.85 0.15 350), oklch(0.7 0.17 350))",
    white: "",
  };
  return (
    <div className="space-y-1">
      {label && (
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-bold text-muted-foreground">
          <span className="break-words whitespace-normal">{label}</span>
          <span className="font-numeric shrink-0">{value}%</span>
        </div>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: colorMap[color] }}
        />
      </div>
    </div>
  );
}

type ChipProps = {
  children: ReactNode;
  color?: Variant;
};

export function Chip({ children, color = "green" }: Readonly<ChipProps>) {
  const map: Record<string, string> = {
    green: "bg-[oklch(0.93_0.08_145)] text-[oklch(0.4_0.15_145)]",
    blue: "bg-[oklch(0.93_0.06_240)] text-[oklch(0.4_0.15_240)]",
    purple: "bg-[oklch(0.93_0.07_295)] text-[oklch(0.4_0.18_295)]",
    yellow: "bg-[oklch(0.95_0.08_90)] text-[oklch(0.4_0.14_80)]",
    orange: "bg-[oklch(0.94_0.07_50)] text-[oklch(0.45_0.16_50)]",
    red: "bg-[oklch(0.93_0.08_25)] text-[oklch(0.45_0.2_25)]",
    pink: "bg-[oklch(0.95_0.06_350)] text-[oklch(0.45_0.15_350)]",
    white: "bg-muted text-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        map[color],
      )}
    >
      {children}
    </span>
  );
}
