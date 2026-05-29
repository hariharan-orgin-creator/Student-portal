import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  KANBAN_ASSIGNMENTS,
  KANBAN_COLUMNS,
  type KanbanAssignmentCard,
  type KanbanColumnId,
} from "@/lib/mockData";
import { AssignmentCardDetailDialog } from "@/components/assignment-card-detail-dialog";
import { cn } from "@/lib/utils";
import { GripVertical, MessageSquare, FileText, ClipboardList } from "lucide-react";

type KanbanCardProps = {
  card: KanbanAssignmentCard;
  onOpen: (card: KanbanAssignmentCard) => void;
};

function KanbanCard({ card, onOpen }: Readonly<KanbanCardProps>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { type: "card", columnId: card.columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={cn(
        "group cursor-grab rounded-lg border border-border/50 bg-card p-2.5 shadow-sm active:cursor-grabbing",
        isDragging && "opacity-40 shadow-none",
      )}
      {...attributes}
      {...listeners}
      onClick={() => {
        if (!isDragging) onOpen(card);
      }}
    >
      <div className="flex items-start gap-1">
        <GripVertical className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap gap-1">
            {card.labels.slice(0, 2).map((label) => (
              <span
                key={label}
                className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-muted-foreground"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex items-start gap-2">
            <span className="text-base leading-none">{card.icon}</span>
            <div className="min-w-0">
              <h4 className="text-xs font-bold leading-snug">{card.title}</h4>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{card.subject}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between gap-1 text-[10px] text-muted-foreground">
            <span>Due {card.due}</span>
            <span className="font-numeric font-bold text-duo-green-dark">
              +{card.points}
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            {card.kind === "quiz" ? (
              <span className="flex items-center gap-0.5 text-[9px] font-bold text-duo-purple">
                <ClipboardList className="size-3" />
                Quiz
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-[9px] font-bold text-duo-blue">
                <FileText className="size-3" />
                Docs
              </span>
            )}
            {card.commentsCount > 0 && (
              <span className="flex items-center gap-0.5 text-[9px] font-bold text-muted-foreground">
                <MessageSquare className="size-3" />
                {card.commentsCount}
              </span>
            )}
            {card.submittedFiles && card.submittedFiles.length > 0 && (
              <span className="text-[9px] font-bold text-muted-foreground">
                {card.submittedFiles.length} file{card.submittedFiles.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

type KanbanCardPreviewProps = {
  card: KanbanAssignmentCard;
};

function KanbanCardPreview({ card }: Readonly<KanbanCardPreviewProps>) {
  return (
    <article className="rotate-2 rounded-lg border border-border bg-card p-2.5 shadow-lg">
      <div className="flex items-start gap-2">
        <span className="text-base">{card.icon}</span>
        <div>
          <h4 className="text-xs font-bold">{card.title}</h4>
          <p className="text-[10px] text-muted-foreground">{card.subject}</p>
        </div>
      </div>
    </article>
  );
}

type KanbanColumnProps = {
  columnId: KanbanColumnId;
  title: string;
  accent: string;
  cards: KanbanAssignmentCard[];
  onOpenCard: (card: KanbanAssignmentCard) => void;
};

function KanbanColumn({ columnId, title, accent, cards, onOpenCard }: Readonly<KanbanColumnProps>) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId, data: { type: "column", columnId } });
  const cardIds = cards.map((c) => c.id);

  return (
    <div
      className={cn(
        "flex w-[272px] shrink-0 flex-col rounded-xl",
        accent,
        isOver && "ring-2 ring-duo-blue ring-offset-2",
      )}
    >
      <div className="flex items-center justify-between px-3 py-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wide text-foreground/80">{title}</h3>
        <span className="font-numeric rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-bold">
          {cards.length}
        </span>
      </div>
      <div ref={setNodeRef} className="flex min-h-[120px] flex-1 flex-col gap-2 px-2 pb-2">
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} onOpen={onOpenCard} />
          ))}
        </SortableContext>
        {cards.length === 0 && (
          <p className="rounded-lg border border-dashed border-border/60 px-2 py-6 text-center text-[10px] text-muted-foreground">
            Drop cards here
          </p>
        )}
      </div>
    </div>
  );
}

function resolveColumnId(overId: string, cards: KanbanAssignmentCard[]): KanbanColumnId | null {
  if (KANBAN_COLUMNS.some((c) => c.id === overId)) return overId as KanbanColumnId;
  const overCard = cards.find((c) => c.id === overId);
  return overCard?.columnId ?? null;
}

export function AssignmentsKanbanBoard() {
  const [cards, setCards] = useState(KANBAN_ASSIGNMENTS);
  const [activeCard, setActiveCard] = useState<KanbanAssignmentCard | null>(null);
  const [selectedCard, setSelectedCard] = useState<KanbanAssignmentCard | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  );

  const cardsByColumn = useMemo(() => {
    const map = Object.fromEntries(
      KANBAN_COLUMNS.map((c) => [c.id, [] as KanbanAssignmentCard[]]),
    ) as Record<KanbanColumnId, KanbanAssignmentCard[]>;
    for (const card of cards) {
      map[card.columnId].push(card);
    }
    return map;
  }, [cards]);

  const handleDragStart = (event: DragStartEvent) => {
    const card = cards.find((c) => c.id === event.active.id);
    setActiveCard(card ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const card = cards.find((c) => c.id === activeId);
    if (!card) return;

    const targetColumnId = resolveColumnId(String(over.id), cards);
    if (!targetColumnId || targetColumnId === card.columnId) return;

    setCards((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, columnId: targetColumnId } : c)),
    );
  };

  const openDetail = (card: KanbanAssignmentCard) => {
    setSelectedCard(card);
    setDetailOpen(true);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 overflow-x-auto pb-4">
          {KANBAN_COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              columnId={col.id}
              title={col.title}
              accent={col.accent}
              cards={cardsByColumn[col.id]}
              onOpenCard={openDetail}
            />
          ))}
        </div>
        <DragOverlay dropAnimation={null}>
          {activeCard ? <KanbanCardPreview card={activeCard} /> : null}
        </DragOverlay>
      </DndContext>

      <AssignmentCardDetailDialog
        card={selectedCard}
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open);
          if (!open) setSelectedCard(null);
        }}
      />
    </>
  );
}
