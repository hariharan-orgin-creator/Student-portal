import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DuoButton } from "@/components/duo";
import type { KanbanAssignmentCard } from "@/lib/mockData";
import {
  ExternalLink,
  FileImage,
  FileText,
  FileVideo,
  MessageSquare,
  ClipboardList,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

function fileIcon(type: string) {
  if (type === "image") return FileImage;
  if (type === "video") return FileVideo;
  return FileText;
}

type AssignmentCardDetailDialogProps = {
  card: KanbanAssignmentCard | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AssignmentCardDetailDialog({
  card,
  open,
  onOpenChange,
}: Readonly<AssignmentCardDetailDialogProps>) {
  if (!card) return null;

  const hasFiles = card.submittedFiles && card.submittedFiles.length > 0;
  const hasQuiz = card.kind === "quiz" && card.quiz;
  const hasComments = card.comments && card.comments.length > 0;
  const isSuccess = card.columnId === "successful-submissions";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="card-pop max-h-[90vh] max-w-lg overflow-y-auto border-0 p-0 sm:max-w-lg">
        <div className="border-b border-border/60 bg-muted/30 px-5 py-4">
          <DialogHeader className="space-y-2 text-left">
            <div className="flex items-start gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-card text-2xl shadow-sm">
                {card.icon}
              </span>
              <div className="min-w-0 flex-1">
                <DialogTitle className="font-display text-lg font-bold leading-snug">
                  {card.title}
                </DialogTitle>
                <DialogDescription className="text-xs font-bold">
                  {card.subject} · Due {card.due} ·{" "}
                  <span className="font-numeric text-duo-green-dark">+{card.points} pts</span>
                </DialogDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {card.labels.map((label) => (
                <span
                  key={label}
                  className="rounded-md bg-card px-2 py-0.5 text-[10px] font-bold text-muted-foreground"
                >
                  {label}
                </span>
              ))}
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase",
                  card.kind === "quiz"
                    ? "bg-[oklch(0.93_0.08_295)] text-duo-purple"
                    : "bg-[oklch(0.93_0.08_240)] text-duo-blue",
                )}
              >
                {card.kind === "quiz" ? "Online quiz" : "Document upload"}
              </span>
            </div>
          </DialogHeader>
        </div>

        <div className="space-y-4 px-5 py-4">
          <p className="text-sm text-muted-foreground">{card.description}</p>

          {hasQuiz && card.quiz && (
            <section className="rounded-xl border border-border/60 bg-[oklch(0.97_0.04_295)] p-4">
              <div className="mb-3 flex items-center gap-2">
                <ClipboardList className="size-4 text-duo-purple" />
                <h3 className="font-display text-sm font-bold text-duo-purple">Online quiz</h3>
              </div>
              <p className="text-sm font-bold">{card.quiz.title}</p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>
                  <span className="font-numeric font-bold">{card.quiz.totalQuestions}</span>{" "}
                  questions ·{" "}
                  <span className="font-numeric font-bold">{card.quiz.timeLimitMinutes}</span> min
                  limit
                </li>
                {card.quiz.completedAt && (
                  <li>
                    Completed {card.quiz.completedAt}
                    {card.quiz.score != null && (
                      <>
                        {" "}
                        · Score:{" "}
                        <span className="font-numeric font-bold text-duo-green-dark">
                          {card.quiz.score}%
                        </span>
                      </>
                    )}
                  </li>
                )}
              </ul>
              <a
                href={card.quiz.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex"
              >
                <DuoButton variant="purple" size="sm" className="gap-1.5">
                  {typeof card.quiz.score === "number" ? "View quiz results" : "Open quiz"}
                  <ExternalLink className="size-3.5" />
                </DuoButton>
              </a>
            </section>
          )}

          {hasFiles && (
            <section className="rounded-xl border border-border/60 bg-muted/20 p-4">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="size-4 text-duo-blue" />
                <h3 className="font-display text-sm font-bold text-duo-blue">Submitted files</h3>
              </div>
              <ul className="space-y-2">
                {card.submittedFiles!.map((file) => {
                  const Icon = fileIcon(file.type);
                  return (
                    <li
                      key={file.id}
                      className="flex items-center gap-3 rounded-lg bg-card p-3 shadow-sm transition hover:bg-muted/50"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[oklch(0.95_0.06_240)]">
                        <Icon className="size-4 text-duo-blue" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{file.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {file.size} · {file.uploadedAt}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="shrink-0 rounded-lg px-2 py-1 text-[10px] font-bold text-duo-blue hover:bg-muted"
                      >
                        View
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {!hasFiles && !hasQuiz && (
            <p className="rounded-lg bg-muted/40 px-3 py-4 text-center text-xs text-muted-foreground">
              No files or quiz attached yet. Move this card to In Progress to start working.
            </p>
          )}

          {hasComments && (
            <section className="rounded-xl border border-border/60 bg-[oklch(0.97_0.04_295)] p-4">
              <div className="mb-3 flex items-center gap-2">
                <MessageSquare className="size-4 text-duo-purple" />
                <h3 className="font-display text-sm font-bold text-duo-purple">Comments</h3>
              </div>
              <ul className="space-y-3">
                {card.comments!.map((c) => (
                  <li key={c.id} className="flex gap-2">
                    <span className="text-lg">{c.avatar}</span>
                    <div className="min-w-0 flex-1 rounded-lg bg-card p-2.5">
                      <p className="text-xs font-bold">{c.author}</p>
                      <p className="mt-0.5 text-sm">{c.text}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{c.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {isSuccess && (
            <div className="flex items-center gap-2 rounded-xl bg-[oklch(0.95_0.08_145)] px-4 py-3">
              <Trophy className="size-5 text-duo-green-dark" />
              <p className="text-sm font-bold text-duo-green-dark">
                Successfully submitted and graded!
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
