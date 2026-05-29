import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { GripVertical, Pause, Play, RotateCcw, Timer } from "lucide-react";

const POMODORO_WORK = 25 * 60;
const POMODORO_BREAK = 5 * 60;
const STORAGE_KEY = "floating_pomodoro_pos";

function formatTimer(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function clampPosition(x: number, y: number, width: number, height: number) {
  const maxX = typeof window !== "undefined" ? window.innerWidth - width - 8 : x;
  const maxY = typeof window !== "undefined" ? window.innerHeight - height - 8 : y;
  return {
    x: Math.max(8, Math.min(maxX, x)),
    y: Math.max(8, Math.min(maxY, y)),
  };
}

export function FloatingPomodoroWidget() {
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_WORK);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<"work" | "break">("work");
  const [pos, setPos] = useState({ x: 24, y: 100 });
  const [minimized, setMinimized] = useState(false);

  const widgetRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  useEffect(() => {
    const applyPosition = () => {
      const el = widgetRef.current;
      const w = el?.offsetWidth ?? 148;
      const h = el?.offsetHeight ?? 118;
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const { x, y } = JSON.parse(saved) as { x: number; y: number };
          setPos(clampPosition(x, y, w, h));
        } else {
          setPos(clampPosition(window.innerWidth - w - 8, 100, w, h));
        }
      } catch {}
    };
    applyPosition();
    requestAnimationFrame(applyPosition);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
  }, [pos]);

  useEffect(() => {
    if (!running || secondsLeft > 0) return;
    setPhase((p) => {
      const next = p === "work" ? "break" : "work";
      setSecondsLeft(next === "work" ? POMODORO_WORK : POMODORO_BREAK);
      return next;
    });
  }, [running, secondsLeft]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const reset = () => {
    setRunning(false);
    setPhase("work");
    setSecondsLeft(POMODORO_WORK);
  };

  const progress =
    phase === "work"
      ? ((POMODORO_WORK - secondsLeft) / POMODORO_WORK) * 100
      : ((POMODORO_BREAK - secondsLeft) / POMODORO_BREAK) * 100;

  const onDragStart = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      dragRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        origX: pos.x,
        origY: pos.y,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [pos.x, pos.y],
  );

  const onDragMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;
    const w = widgetRef.current?.offsetWidth ?? 148;
    const h = widgetRef.current?.offsetHeight ?? 118;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos(clampPosition(dragRef.current.origX + dx, dragRef.current.origY + dy, w, h));
  }, []);

  const onDragEnd = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;
    dragRef.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  }, []);

  useEffect(() => {
    const onResize = () => {
      const w = widgetRef.current?.offsetWidth ?? 148;
      const h = widgetRef.current?.offsetHeight ?? 118;
      setPos((p) => clampPosition(p.x, p.y, w, h));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [minimized]);

  return (
    <div
      ref={widgetRef}
      className="fixed z-50 select-none"
      style={{ left: pos.x, top: pos.y }}
      role="region"
      aria-label="Pomodoro timer"
    >
      <div className="card-pop w-[148px] overflow-hidden rounded-lg border border-border/60 bg-card shadow-md">
        <div
          className="flex cursor-grab items-center justify-between border-b border-border/50 bg-muted/40 px-1.5 py-1 active:cursor-grabbing"
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
        >
          <span className="flex items-center gap-0.5 text-[10px] font-bold text-muted-foreground">
            <GripVertical className="size-3" />
            <Timer className="size-3 text-[var(--duo-red)]" />
            Pomodoro
          </span>
          <div className="flex items-center gap-0.5">
            <span
              className={cn(
                "rounded-full px-1.5 py-px text-[8px] font-bold uppercase",
                phase === "work"
                  ? "bg-[oklch(0.95_0.08_25)] text-[var(--duo-red)]"
                  : "bg-[oklch(0.95_0.08_145)] text-[var(--duo-green-dark)]",
              )}
            >
              {phase === "work" ? "Focus" : "Break"}
            </span>
            <button
              type="button"
              onClick={() => setMinimized((m) => !m)}
              className="rounded px-1 py-px text-[9px] font-bold text-muted-foreground hover:bg-muted"
              aria-label={minimized ? "Expand timer" : "Minimize timer"}
            >
              {minimized ? "▲" : "▼"}
            </button>
          </div>
        </div>

        {!minimized && (
          <div className="px-2 py-1.5">
            <div className="font-numeric text-center text-lg font-extrabold leading-none tracking-tight">
              {formatTimer(secondsLeft)}
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full transition-all",
                  phase === "work" ? "bg-[var(--duo-red)]" : "bg-[var(--duo-green)]",
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-center gap-1.5">
              <button
                type="button"
                onClick={() => setRunning((r) => !r)}
                className="grid size-7 place-items-center rounded-full bg-[var(--duo-green)] text-white shadow-sm"
              >
                {running ? <Pause className="size-3" /> : <Play className="size-3 ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={reset}
                className="grid size-7 place-items-center rounded-full bg-muted"
              >
                <RotateCcw className="size-3" />
              </button>
            </div>
          </div>
        )}

        {minimized && (
          <button
            type="button"
            onClick={() => setMinimized(false)}
            className="font-numeric w-full px-2 py-1 text-center text-sm font-extrabold"
          >
            {formatTimer(secondsLeft)}
          </button>
        )}
      </div>
    </div>
  );
}
