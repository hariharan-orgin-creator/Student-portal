import { Lock } from "lucide-react";

export function DuoConfidentialBadge() {
  return (
    <div className="rounded-2xl bg-[oklch(0.96_0.04_350)] p-3 text-xs border border-pink-100">
      <div className="flex items-center gap-2 font-bold text-duo-pink mb-1">
        <Lock className="size-3.5" /> Confidential Area
      </div>
      <p className="text-muted-foreground leading-normal">
        All counselling records are encrypted and protected under FERPA & HIPAA directives.
      </p>
    </div>
  );
}
