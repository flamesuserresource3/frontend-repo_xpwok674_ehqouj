import { useState } from 'react';
import { boardStore } from './store';
import { Plus } from 'lucide-react';

export default function ExpeditionForm() {
  const [title, setTitle] = useState('');

  const add = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    boardStore.addExpedition(title);
    setTitle('');
  };

  return (
    <form onSubmit={add} className="w-full flex items-center gap-3 bg-amber-100/80 border border-amber-200 rounded-lg p-3 shadow-sm">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new Expedition..."
        className="flex-1 bg-transparent placeholder-amber-700/60 text-amber-900 outline-none"
        aria-label="New Expedition Title"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-amber-100 px-3 py-2 rounded-md transition-colors"
      >
        <Plus size={18} /> Add
      </button>
    </form>
  );
}
