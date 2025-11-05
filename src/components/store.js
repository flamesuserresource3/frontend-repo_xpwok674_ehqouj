// Simple observable store using the Observer Pattern with useSyncExternalStore support

let nextId = 1;

const initialExpeditions = [
  { id: String(nextId++), title: 'Chart the northern reefs', column: 'todo' },
  { id: String(nextId++), title: 'Provision the crew', column: 'inprogress' },
  { id: String(nextId++), title: 'Plot the trade winds', column: 'todo' },
];

const state = {
  expeditions: initialExpeditions,
};

const listeners = new Set();

function emit() {
  for (const l of listeners) l();
}

export const boardStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return state;
  },
  addExpedition(title) {
    const trimmed = title.trim();
    if (!trimmed) return;
    state.expeditions = [
      ...state.expeditions,
      { id: String(nextId++), title: trimmed, column: 'todo' },
    ];
    emit();
  },
  moveExpedition(id, toColumn) {
    let changed = false;
    state.expeditions = state.expeditions.map((e) => {
      if (e.id === id && e.column !== toColumn) {
        changed = true;
        return { ...e, column: toColumn };
      }
      return e;
    });
    if (changed) emit();
  },
  getProgress() {
    const total = state.expeditions.length;
    const complete = state.expeditions.filter((e) => e.column === 'complete').length;
    const percent = total === 0 ? 0 : Math.round((complete / total) * 100);
    return { total, complete, percent };
  },
};
