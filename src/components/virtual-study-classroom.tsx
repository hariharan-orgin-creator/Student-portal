import { useCallback, useEffect, useRef, useState } from "react";
import { FloatingPomodoroWidget } from "@/components/floating-pomodoro-widget";
import { DuoButton, DuoCard } from "@/components/duo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  STUDY_ROOM,
  FOCUS_BUDDIES,
  STUDY_ROOM_PARTICIPANTS,
  STUDY_GROUPS,
  CLASS_CONVERSATIONS,
  TEACHER_DOUBT_MESSAGES,
  COURSE_BOOKS,
  STUDY_NOTES,
  type FocusBuddy,
  type CourseBook,
  type StudyNote,
  type TeacherChatMessage,
  type ClassChatMessage,
} from "@/lib/mockData";
import {
  Video,
  VideoOff,
  MonitorUp,
  Mic,
  MicOff,
  Timer,
  Users,
  MessageCircle,
  BookOpen,
  Bookmark,
  Send,
  CheckCheck,
  Radio,
  X,
  Pin,
  Rocket,
} from "lucide-react";

type StudyParticipantTileProps = {
  participant: FocusBuddy;
  cameraOn: boolean;
};

function StudyParticipantTile({ participant, cameraOn }: Readonly<StudyParticipantTileProps>) {
  const isBreak = participant.status === "break";

  return (
    <div
      className={cn(
        "group relative aspect-4/3 overflow-hidden rounded-lg bg-[oklch(0.18_0.02_260)] shadow-md transition hover:ring-2 hover:ring-white/30",
        participant.isMe && "ring-2 ring-duo-green",
      )}
    >
      <img
        src={participant.imageUrl}
        alt={`${participant.name} studying`}
        className={cn(
          "h-full w-full object-cover transition",
          !cameraOn && "scale-105 opacity-30 blur-[2px]",
          isBreak && "opacity-70",
        )}
        loading="lazy"
      />

      {isBreak && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
          <span className="font-display text-lg font-bold text-duo-green">BREAK</span>
          <span className="font-numeric text-2xl font-bold text-white">5:00</span>
        </div>
      )}

      <div className="absolute left-1 top-1 flex items-center gap-0.5 rounded-md bg-black/55 px-1.5 py-0.5 backdrop-blur-sm">
        <Rocket className="size-2.5 text-duo-yellow" />
        <span className="font-numeric text-[9px] font-bold text-white">
          {participant.focusMinutes ?? 0}
        </span>
        {participant.pinned && <Pin className="size-2.5 text-white/90" />}
      </div>

      {participant.badge != null && (
        <span className="absolute right-1 top-1 rounded bg-duo-yellow px-1 py-0.5 font-numeric text-[9px] font-extrabold text-[oklch(0.3_0.08_80)] shadow-sm">
          {participant.badge}
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/85 via-black/40 to-transparent px-1.5 pb-1 pt-6">
        <p className="truncate text-[10px] font-bold text-white">
          {participant.name}
          {participant.isMe && " · You"}
        </p>
        <p className="truncate text-[8px] capitalize text-white/75">
          {participant.status} · {participant.subject}
        </p>
      </div>

      {!cameraOn && (
        <span className="absolute right-1 bottom-8 rounded bg-black/60 p-0.5">
          <VideoOff className="size-3 text-white" />
        </span>
      )}
    </div>
  );
}

type WhatsAppTeacherChatProps = {
  messages: TeacherChatMessage[];
  onSend: (text: string) => void;
};

function WhatsAppTeacherChat({ messages, onSend }: Readonly<WhatsAppTeacherChatProps>) {
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft("");
  };

  return (
    <div className="flex h-full min-h-[280px] flex-col rounded-xl overflow-hidden border border-border/60">
      <div className="flex items-center gap-2 bg-[oklch(0.42_0.12_145)] px-3 py-2.5">
        <span className="text-xl">{STUDY_ROOM.teacher.avatar}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-white">{STUDY_ROOM.teacher.name}</p>
          <p className="text-[10px] text-white/80">Ask doubts · online</p>
        </div>
      </div>
      <div
        className="flex-1 space-y-2 overflow-y-auto p-3"
        style={{
          background:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cdc4' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundColor: "oklch(0.94 0.02 85)",
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex", m.from === "student" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-lg px-2.5 py-1.5 shadow-sm",
                m.from === "student"
                  ? "rounded-br-none bg-[oklch(0.88_0.08_145)]"
                  : "rounded-bl-none bg-white",
              )}
            >
              <p className="text-sm">{m.text}</p>
              <div className="mt-0.5 flex items-center justify-end gap-1">
                <span className="text-[9px] text-muted-foreground">{m.time}</span>
                {m.from === "student" && (
                  <CheckCheck
                    className={cn(
                      "size-3",
                      m.read ? "text-duo-blue" : "text-muted-foreground",
                    )}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2 border-t border-border/60 bg-card p-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type your doubt…"
          className="h-9 text-sm"
        />
        <button
          type="button"
          onClick={send}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-duo-green text-white"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
}

type BookReaderProps = {
  book: CourseBook;
  onClose: () => void;
};

function BookReader({ book, onClose }: Readonly<BookReaderProps>) {
  const [page, setPage] = useState(book.currentPage);

  return (
    <DuoCard className="flex flex-col p-0 overflow-hidden">
      <div
        className="flex items-center justify-between border-b border-border/60 px-3 py-2"
        style={{ background: book.coverColor }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{book.icon}</span>
          <div>
            <p className="text-sm font-bold">{book.title}</p>
            <p className="text-[10px] text-muted-foreground">
              Page {page} of {book.pages}
            </p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="rounded-lg p-1 hover:bg-black/5">
          <X className="size-4" />
        </button>
      </div>
      <div className="min-h-[200px] flex-1 bg-[oklch(0.99_0.01_90)] p-6">
        <p className="font-display text-lg font-bold">Chapter content</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This is a preview of <strong>{book.title}</strong> — page {page}. In a live session, your
          school e-textbook would render here with highlights, bookmarks, and search. Tap the edges
          or use arrows to turn pages while you study with your class.
        </p>
        <div className="mt-6 rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
          📖 Sample paragraph for {book.subject} — continue reading with your focus group.
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-border/60 px-3 py-2">
        <DuoButton
          size="sm"
          variant="white"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Prev
        </DuoButton>
        <DuoButton
          size="sm"
          variant="green"
          disabled={page >= book.pages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next →
        </DuoButton>
      </div>
    </DuoCard>
  );
}

export function VirtualStudyClassroom() {
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [selectedBuddies, setSelectedBuddies] = useState<string[]>(["b1", "b3", "b5"]);
  const [joinedGroup, setJoinedGroup] = useState<string | null>("g1");
  const [classMessages, setClassMessages] = useState<ClassChatMessage[]>(CLASS_CONVERSATIONS);
  const [teacherMessages, setTeacherMessages] =
    useState<TeacherChatMessage[]>(TEACHER_DOUBT_MESSAGES);
  const [notes, setNotes] = useState<StudyNote[]>(STUDY_NOTES);
  const [openBook, setOpenBook] = useState<CourseBook | null>(null);
  const [classDraft, setClassDraft] = useState("");
  const [newNote, setNewNote] = useState("");

  const participants = STUDY_ROOM_PARTICIPANTS.map((p) => (p.isMe ? { ...p, cameraOn } : p));

  const toggleBuddy = (id: string) => {
    setSelectedBuddies((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const sendClassMessage = () => {
    if (!classDraft.trim()) return;
    setClassMessages((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        senderId: "me",
        senderName: "You",
        avatar: "🦕",
        text: classDraft.trim(),
        time: "now",
        isMe: true,
      },
    ]);
    setClassDraft("");
  };

  const sendTeacherMessage = useCallback((text: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setTeacherMessages((prev) => [
      ...prev,
      { id: `t-${Date.now()}`, from: "student", text, time, read: false },
    ]);
  }, []);

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes((prev) => [
      { id: `n-${Date.now()}`, title: newNote.slice(0, 40), snippet: newNote, savedAt: "Just now" },
      ...prev,
    ]);
    setNewNote("");
  };

  return (
    <div className="flex flex-col gap-3">
      <FloatingPomodoroWidget />

      {/* Room header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-duo-red px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              <Radio className="size-3 animate-pulse" />
              Live
            </span>
            <h1 className="font-display text-lg font-bold md:text-xl">{STUDY_ROOM.name}</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Room code <span className="font-mono font-bold">{STUDY_ROOM.code}</span> ·{" "}
            <span className="font-numeric font-bold">{STUDY_ROOM.onlineCount}</span> studying now
          </p>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]">
        {/* Main study stage — live gallery */}
        <div className="flex flex-col gap-3">
          <DuoCard className="overflow-hidden bg-[oklch(0.94_0.01_90)] p-2 sm:p-3">
            {screenSharing && (
              <div className="mb-2 flex items-center gap-2 rounded-lg bg-(--duo-blue)/15 px-3 py-2 text-xs font-bold text-duo-blue">
                <MonitorUp className="size-4" />
                You are sharing your screen with the study room
              </div>
            )}
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {participants.map((p) => (
                <StudyParticipantTile key={p.id} participant={p} cameraOn={p.cameraOn} />
              ))}
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 rounded-xl bg-[oklch(0.2_0.02_260)] p-2">
              <button
                type="button"
                onClick={() => setMicOn((m) => !m)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-white",
                  micOn ? "bg-white/15" : "bg-duo-red",
                )}
              >
                {micOn ? <Mic className="size-4" /> : <MicOff className="size-4" />}
                {micOn ? "Mic on" : "Muted"}
              </button>
              <button
                type="button"
                onClick={() => setCameraOn((c) => !c)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-white",
                  cameraOn ? "bg-white/15" : "bg-duo-red",
                )}
              >
                {cameraOn ? <Video className="size-4" /> : <VideoOff className="size-4" />}
                {cameraOn ? "Camera on" : "Camera off"}
              </button>
              <button
                type="button"
                onClick={() => setScreenSharing((s) => !s)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-white",
                  screenSharing ? "bg-duo-blue" : "bg-white/15",
                )}
              >
                <MonitorUp className="size-4" />
                {screenSharing ? "Stop share" : "Share screen"}
              </button>
            </div>
          </DuoCard>

          {openBook ? (
            <BookReader book={openBook} onClose={() => setOpenBook(null)} />
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {COURSE_BOOKS.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => setOpenBook(book)}
                  className="card-pop flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-left transition hover:-translate-y-0.5"
                  style={{ background: book.coverColor }}
                >
                  <span className="text-lg">{book.icon}</span>
                  <div className="min-w-0">
                    <p className="max-w-[120px] truncate text-[10px] font-bold">{book.title}</p>
                    <p className="text-[9px] text-muted-foreground">p. {book.currentPage}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right panel */}
        <DuoCard className="flex min-h-[400px] flex-col p-2 lg:min-h-0 lg:max-h-[calc(100vh-10rem)]">
          <Tabs defaultValue="conversations" className="flex h-full flex-col">
            <TabsList className="mb-2 grid h-auto w-full grid-cols-3 gap-1 p-1 lg:grid-cols-2">
              <TabsTrigger value="conversations" className="gap-1 px-1.5 py-1.5 text-[10px]">
                <MessageCircle className="size-3" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="teacher" className="gap-1 px-1.5 py-1.5 text-[10px]">
                👩‍🏫 Doubts
              </TabsTrigger>
              <TabsTrigger value="buddies" className="gap-1 px-1.5 py-1.5 text-[10px]">
                <Users className="size-3" />
                Buddies
              </TabsTrigger>
              <TabsTrigger value="groups" className="gap-1 px-1.5 py-1.5 text-[10px]">
                Groups
              </TabsTrigger>
              <TabsTrigger value="notes" className="gap-1 px-1.5 py-1.5 text-[10px]">
                <Bookmark className="size-3" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="timer" className="gap-1 px-1.5 py-1.5 text-[10px]">
                <Timer className="size-3" />
                Timer
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="conversations"
              className="mt-0 flex min-h-0 flex-1 flex-col data-[state=inactive]:hidden"
            >
              <ScrollArea className="mb-2 h-[280px] flex-1 rounded-lg bg-muted/30 p-2">
                <ul className="space-y-2">
                  {classMessages.map((m) => (
                    <li key={m.id} className={cn("flex gap-2", m.isMe && "flex-row-reverse")}>
                      <span className="text-lg">{m.avatar}</span>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-2 py-1.5",
                          m.isMe ? "bg-(--duo-green)/15" : "bg-card",
                        )}
                      >
                        <p className="text-[10px] font-bold text-muted-foreground">
                          {m.senderName}
                        </p>
                        <p className="text-xs">{m.text}</p>
                        <p className="text-[9px] text-muted-foreground">{m.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <div className="flex gap-2">
                <Input
                  value={classDraft}
                  onChange={(e) => setClassDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendClassMessage()}
                  placeholder="Message classmates…"
                  className="h-9 text-xs"
                />
                <button
                  type="button"
                  onClick={sendClassMessage}
                  className="grid size-9 place-items-center rounded-full bg-duo-green text-white"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </TabsContent>

            <TabsContent
              value="teacher"
              className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden"
            >
              <WhatsAppTeacherChat messages={teacherMessages} onSend={sendTeacherMessage} />
            </TabsContent>

            <TabsContent value="buddies" className="mt-0 data-[state=inactive]:hidden">
              <p className="mb-2 text-[10px] text-muted-foreground">
                Choose focus buddies to study with on camera
              </p>
              <ul className="space-y-2">
                {FOCUS_BUDDIES.map((b) => (
                  <BuddyRow
                    key={b.id}
                    buddy={b}
                    selected={selectedBuddies.includes(b.id)}
                    onToggle={() => toggleBuddy(b.id)}
                  />
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="groups" className="mt-0 data-[state=inactive]:hidden">
              <ul className="space-y-2">
                {STUDY_GROUPS.map((g) => (
                  <li key={g.id}>
                    <button
                      type="button"
                      onClick={() => setJoinedGroup(joinedGroup === g.id ? null : g.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-xl p-2.5 text-left transition",
                        joinedGroup === g.id
                          ? "bg-[oklch(0.95_0.08_145)] ring-2 ring-duo-green"
                          : "bg-muted/40 hover:bg-muted",
                      )}
                    >
                      <span className="text-xl">{g.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold">{g.name}</p>
                        <p className="truncate text-[10px] text-muted-foreground">{g.topic}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {g.members} members {g.live && "· 🔴 Live"}
                        </p>
                      </div>
                      {joinedGroup === g.id && (
                        <span className="text-[10px] font-bold text-duo-green-dark">
                          Joined
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="notes" className="mt-0 data-[state=inactive]:hidden">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Quick note or bookmark…"
                className="mb-2 min-h-[60px] text-xs"
              />
              <DuoButton size="sm" variant="green" className="mb-3 w-full" onClick={addNote}>
                <Bookmark className="size-3.5" />
                Save note
              </DuoButton>
              <ScrollArea className="h-[220px]">
                <ul className="space-y-2">
                  {notes.map((n) => (
                    <li key={n.id} className="rounded-lg bg-muted/40 p-2.5">
                      <p className="text-xs font-bold">{n.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-[10px] text-muted-foreground">
                        {n.snippet}
                      </p>
                      <p className="mt-1 text-[9px] text-muted-foreground">
                        {n.savedAt}
                        {n.page != null && ` · p.${n.page}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="timer" className="mt-0 data-[state=inactive]:hidden">
              <p className="rounded-lg bg-muted/40 px-3 py-6 text-center text-xs text-muted-foreground">
                Drag the floating Pomodoro timer anywhere on screen. Use the grip bar at the top of
                the widget to move it while you study.
              </p>
            </TabsContent>
          </Tabs>
        </DuoCard>
      </div>
    </div>
  );
}

type BuddyRowProps = {
  buddy: FocusBuddy;
  selected: boolean;
  onToggle: () => void;
};

function BuddyRow({ buddy, selected, onToggle }: Readonly<BuddyRowProps>) {
  const statusColor = {
    studying: "bg-[var(--duo-green)]",
    break: "bg-[var(--duo-yellow)]",
    offline: "bg-muted-foreground",
  }[buddy.status];

  return (
    <li className="flex items-center gap-2 rounded-xl bg-muted/30 p-2">
      <span className="relative text-2xl">
        {buddy.avatar}
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-card",
            statusColor,
          )}
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold">{buddy.name}</p>
        <p className="text-[10px] capitalize text-muted-foreground">
          {buddy.subject} · {buddy.status}
          {buddy.streak > 0 && ` · 🔥${buddy.streak}`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {buddy.cameraOn ? (
          <Video className="size-3.5 text-duo-green" />
        ) : (
          <VideoOff className="size-3.5 text-muted-foreground" />
        )}
        <Switch
          checked={selected}
          onCheckedChange={onToggle}
          disabled={buddy.status === "offline"}
        />
      </div>
    </li>
  );
}
