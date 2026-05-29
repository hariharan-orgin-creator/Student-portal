import { useMemo, useState } from "react";
import { Bell, Megaphone, CheckCheck } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  STUDENT_ANNOUNCEMENTS,
  STUDENT_NOTIFICATIONS,
  type StudentAnnouncement,
  type StudentNotification,
} from "@/lib/mockData";
import { cn } from "@/lib/utils";

function UnreadDot() {
  return <span className="mt-1.5 size-2 shrink-0 rounded-full bg-duo-blue" aria-hidden />;
}

type NotificationRowProps = {
  item: StudentNotification | StudentAnnouncement;
  onRead: (id: string) => void;
  variant: "notification" | "announcement";
};

function NotificationRow({ item, onRead, variant }: Readonly<NotificationRowProps>) {
  const from = "from" in item ? item.from : undefined;

  return (
    <button
      type="button"
      onClick={() => onRead(item.id)}
      className={cn(
        "flex w-full gap-3 rounded-xl p-3 text-left transition hover:bg-muted/80",
        !item.read && "bg-[oklch(0.97_0.04_240)]",
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-lg">
        {item.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <p
            className={cn("flex-1 text-sm font-bold leading-snug", !item.read && "text-foreground")}
          >
            {item.title}
          </p>
          {!item.read && <UnreadDot />}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{item.body}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-bold text-muted-foreground">
          {from && <span className="text-duo-purple">{from}</span>}
          {from && <span>·</span>}
          <span>{item.time}</span>
          {variant === "announcement" && "pinned" in item && item.pinned && (
            <>
              <span>·</span>
              <span className="text-duo-orange">Pinned</span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(STUDENT_NOTIFICATIONS);
  const [announcements, setAnnouncements] = useState(STUDENT_ANNOUNCEMENTS);
  const [open, setOpen] = useState(false);

  const unreadCount = useMemo(
    () => [...notifications, ...announcements].filter((i) => !i.read).length,
    [notifications, announcements],
  );

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAnnouncementRead = (id: string) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setAnnouncements((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadAnnouncements = announcements.filter((a) => !a.read).length;

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
          className="relative grid size-9 place-items-center rounded-full border-2 border-border bg-card hover:bg-muted data-[state=open]:bg-muted"
        >
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-duo-red px-1 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="card-pop w-[min(100vw-2rem,380px)] border-0 p-0 shadow-lg"
      >
        <div className="border-b border-border/60 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-base font-bold">Alerts</h2>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold text-duo-green-dark hover:bg-muted"
              >
                <CheckCheck className="size-3.5" />
                Mark all read
              </button>
            )}
          </div>
        </div>

        <Tabs defaultValue="notifications" className="px-3 pb-3">
          <TabsList className="mb-2 grid w-full grid-cols-2">
            <TabsTrigger value="notifications" className="gap-1.5 text-xs font-bold">
              <Bell className="size-3.5" />
              Notifications
              {unreadNotifications > 0 && (
                <span className="font-numeric rounded-full bg-duo-blue px-1.5 py-0.5 text-[9px] text-white">
                  {unreadNotifications}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="announcements" className="gap-1.5 text-xs font-bold">
              <Megaphone className="size-3.5" />
              Announcements
              {unreadAnnouncements > 0 && (
                <span className="font-numeric rounded-full bg-duo-purple px-1.5 py-0.5 text-[9px] text-white">
                  {unreadAnnouncements}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="notifications"
            className="mt-0 max-h-[min(60vh,320px)] overflow-y-auto"
          >
            {notifications.length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">No notifications yet</p>
            ) : (
              <ul className="space-y-1">
                {notifications.map((n) => (
                  <li key={n.id}>
                    <NotificationRow
                      item={n}
                      onRead={markNotificationRead}
                      variant="notification"
                    />
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent
            value="announcements"
            className="mt-0 max-h-[min(60vh,320px)] overflow-y-auto"
          >
            {sortedAnnouncements.length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">No announcements yet</p>
            ) : (
              <ul className="space-y-1">
                {sortedAnnouncements.map((a) => (
                  <li key={a.id}>
                    <NotificationRow
                      item={a}
                      onRead={markAnnouncementRead}
                      variant="announcement"
                    />
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
