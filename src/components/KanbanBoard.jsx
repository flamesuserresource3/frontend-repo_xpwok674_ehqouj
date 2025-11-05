import { useSyncExternalStore, useMemo } from 'react';
import { boardStore } from './store';

const columns = [
  { key: 'todo', title: 'The Harbor (To Do)' },
  { key: 'inprogress', title: 'The Open Sea (In Progress)' },
  { key: 'complete', title: 'The Destination (Complete)' },
];

export default function KanbanBoard() {
  const state = useSyncExternalStore(boardStore.subscribe, boardStore.getSnapshot);
  const grouped = useMemo(() => {
    const g = { todo: [], inprogress: [], complete: [] };
    for (const e of state.expeditions) g[e.column].push(e);
    return g;
  }, [state]);

  const onDrop = (toColumn, e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    boardStore.moveExpedition(id, toColumn);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {columns.map((col) => (
        <div key={col.key} className="flex flex-col gap-3">
          <h3 className="font-serif text-lg text-blue-900/90">{col.title}</h3>
          <div
            className="min-h-[260px] rounded-xl bg-amber-50/70 border border-amber-200 p-3 md:p-4 shadow-inner backdrop-blur-sm"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(col.key, e)}
          >
            <div className="flex flex-col gap-3">
              {grouped[col.key].map((card) => (
                <Card key={card.id} card={card} />
              ))}
              {grouped[col.key].length === 0 && (
                <p className="text-amber-800/60 text-sm italic">Drag an expedition here</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Card({ card }) {
  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="cursor-grab active:cursor-grabbing select-none bg-white/90 border border-amber-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
      aria-label={`Expedition: ${card.title}`}
    >
      <div className="text-blue-950 font-medium">{card.title}</div>
      <div className="mt-1 text-xs text-amber-800/70">ID: {card.id}</div>
    </div>
  );
}
