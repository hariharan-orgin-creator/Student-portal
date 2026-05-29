import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DuoButton } from "@/components/duo";
import { cn } from "@/lib/utils";
import { Check, CloudUpload, FileText, Image, Loader2, Trash2, Upload, X } from "lucide-react";

type FileStatus = "uploading" | "completed";

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: FileStatus;
}

interface UploadQuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskTitle: string;
  taskIcon?: string;
  points: number;
  onSubmitSuccess: () => void;
}

const ACCEPTED = "image/jpeg,image/png,application/pdf,video/mp4";

const CONFETTI_PIECES = Array.from({ length: 24 }, (_, n) => ({
  id: `confetti-${n}`,
  left: `${10 + ((n * 3.5) % 80)}%`,
  animationDelay: `${n * 40}ms`,
  background: [
    "var(--duo-green)",
    "var(--duo-yellow)",
    "var(--duo-blue)",
    "var(--duo-orange)",
    "var(--duo-purple)",
  ][n % 5],
}));
const MAX_BYTES = 50 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIcon(type: string) {
  if (type.startsWith("image/")) return Image;
  return FileText;
}

type SuccessOverlayProps = {
  points: number;
  taskTitle: string;
  onDone: () => void;
};

function SuccessOverlay({ points, taskTitle, onDone }: Readonly<SuccessOverlayProps>) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl bg-[oklch(0.98_0.04_145)]">
      <div className="confetti-burst pointer-events-none absolute inset-0 overflow-hidden">
        {CONFETTI_PIECES.map((piece) => (
          <span
            key={piece.id}
            className="confetti-piece"
            style={{
              left: piece.left,
              animationDelay: piece.animationDelay,
              background: piece.background,
            }}
          />
        ))}
      </div>
      <div className="animate-success-pop relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <div className="grid size-24 place-items-center rounded-full border-4 border-duo-green bg-white shadow-[0_6px_0_0_var(--duo-green-dark)]">
          <Check className="size-12 stroke-4 text-duo-green" />
        </div>
        <div className="text-6xl animate-pop-in">🦕</div>
        <h3 className="font-display text-2xl font-bold text-duo-green-dark">
          Quest Complete!
        </h3>
        <p className="max-w-xs text-sm font-bold text-muted-foreground">
          You submitted <span className="text-foreground">{taskTitle}</span>
        </p>
        <div className="animate-success-pop mt-1 rounded-full bg-duo-yellow px-5 py-2 font-numeric text-lg font-bold text-[oklch(0.3_0.08_80)] shadow-[0_4px_0_0_oklch(0.7_0.17_85)]">
          +{points} pts
        </div>
      </div>
    </div>
  );
}

export function UploadQuestDialog({
  open,
  onOpenChange,
  taskTitle,
  taskIcon,
  points,
  onSubmitSuccess,
}: Readonly<UploadQuestDialogProps>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadItem[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const intervalsRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());

  const reset = useCallback(() => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current.clear();
    setFiles([]);
    setShowSuccess(false);
    setDragOver(false);
  }, []);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const simulateUpload = useCallback((id: string, totalSize: number) => {
    const tick = Math.max(8, Math.min(40, totalSize / 3000));
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== id) return f;
          const next = Math.min(100, f.progress + tick);
          if (next >= 100) {
            clearInterval(interval);
            intervalsRef.current.delete(id);
            return { ...f, progress: 100, status: "completed" as const };
          }
          return { ...f, progress: next, status: "uploading" as const };
        }),
      );
    }, 80);
    intervalsRef.current.set(id, interval);
  }, []);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming);
      const valid = list.filter((f) => {
        const okType =
          f.type.startsWith("image/") ||
          f.type === "application/pdf" ||
          f.type === "video/mp4" ||
          f.name.match(/\.(jpe?g|png|pdf|mp4)$/i);
        return okType && f.size <= MAX_BYTES;
      });

      valid.forEach((file) => {
        const id = `${file.name}-${Date.now()}-${Math.random()}`;
        setFiles((prev) => [...prev, { id, file, progress: 0, status: "uploading" }]);
        setTimeout(() => simulateUpload(id, file.size), 50);
      });
    },
    [simulateUpload],
  );

  const removeFile = (id: string) => {
    const interval = intervalsRef.current.get(id);
    if (interval) clearInterval(interval);
    intervalsRef.current.delete(id);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const hasCompleted = files.some((f) => f.status === "completed");
  const isUploading = files.some((f) => f.status === "uploading");

  const handleSubmitQuest = () => {
    if (!hasCompleted || isUploading) return;
    setShowSuccess(true);
  };

  const handleSuccessDone = () => {
    onSubmitSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-md gap-0 overflow-hidden rounded-3xl border-2 border-border p-0 shadow-[0_8px_0_0_var(--shadow-color)] sm:max-w-md",
          "[&>button.absolute]:right-4 [&>button.absolute]:top-4 [&>button.absolute]:rounded-full [&>button.absolute]:border-2 [&>button.absolute]:border-border [&>button.absolute]:p-1.5",
        )}
      >
        {showSuccess && (
          <SuccessOverlay points={points} taskTitle={taskTitle} onDone={handleSuccessDone} />
        )}

        {/* Header */}
        <div className="border-b-2 border-border px-6 pb-4 pt-6">
          <div className="flex items-start gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[oklch(0.94_0.06_240)]">
              <CloudUpload className="size-5 text-duo-blue" />
            </div>
            <div className="flex-1 pr-6">
              <h2 className="font-display text-lg font-bold">Upload files</h2>
              <p className="text-sm text-muted-foreground">
                {taskIcon && <span className="mr-1">{taskIcon}</span>}
                Submit your work for <span className="font-bold text-foreground">{taskTitle}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 px-6 py-5">
          {/* Drop zone */}
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              addFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition",
              dragOver
                ? "border-duo-green bg-[oklch(0.96_0.06_145)]"
                : "border-border bg-muted/30 hover:border-(--duo-green)/50 hover:bg-muted/50",
            )}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ACCEPTED}
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) addFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <Upload className="mx-auto mb-3 size-8 text-muted-foreground" />
            <p className="font-bold">Choose a file or drag & drop it here.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
            </p>
            <DuoButton
              type="button"
              variant="white"
              size="sm"
              className="mt-4"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
            >
              Browse File
            </DuoButton>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <ul className="max-h-48 space-y-2 overflow-y-auto">
              {files.map((item) => {
                const Icon = fileIcon(item.file.type);
                const uploaded = Math.round((item.progress / 100) * item.file.size);
                const done = item.status === "completed";

                return (
                  <li
                    key={item.id}
                    className="overflow-hidden rounded-xl border-2 border-border bg-card p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-lg",
                          done ? "bg-[oklch(0.93_0.08_145)]" : "bg-[oklch(0.95_0.06_25)]",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-5",
                            done ? "text-duo-green-dark" : "text-duo-red",
                          )}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold">{item.file.name}</div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span>
                            {formatBytes(uploaded)} of {formatBytes(item.file.size)}
                          </span>
                          <span>•</span>
                          {done ? (
                            <span className="flex items-center gap-1 font-bold text-duo-green-dark">
                              <Check className="size-3" /> Completed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 font-bold text-duo-blue">
                              <Loader2 className="size-3 animate-spin" /> Uploading…
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(item.id)}
                        className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        aria-label={done ? "Remove file" : "Cancel upload"}
                      >
                        {done ? <Trash2 className="size-4" /> : <X className="size-4" />}
                      </button>
                    </div>
                    <div className="progress-track mt-2.5 h-2">
                      <div
                        className="progress-fill h-2"
                        style={{
                          width: `${item.progress}%`,
                          background: done
                            ? "linear-gradient(180deg, oklch(0.82 0.19 145), oklch(0.65 0.2 145))"
                            : "linear-gradient(180deg, oklch(0.78 0.16 240), oklch(0.6 0.18 240))",
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t-2 border-border px-6 py-4">
          <DuoButton
            type="button"
            variant="white"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </DuoButton>
          <DuoButton
            type="button"
            variant="green"
            className="flex-1"
            disabled={!hasCompleted || isUploading}
            onClick={handleSubmitQuest}
          >
            Submit Quest
          </DuoButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
