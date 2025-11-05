import { useSyncExternalStore, useMemo } from 'react';
import { boardStore } from './store';
import { Compass } from 'lucide-react';

export default function ProgressGauge() {
  const state = useSyncExternalStore(boardStore.subscribe, boardStore.getSnapshot);
  const { percent } = useMemo(() => boardStore.getProgress(), [state]);

  const size = 140;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percent / 100) * circumference;

  return (
    <div className="w-full flex items-center justify-between p-4 sm:p-6 rounded-xl bg-gradient-to-br from-blue-950/90 to-blue-900/80 text-amber-100 shadow-xl ring-1 ring-blue-800/40">
      <div className="flex items-center gap-3">
        <Compass className="text-amber-200" size={28} />
        <div>
          <h2 className="text-xl sm:text-2xl font-serif tracking-wide">The Cartographer's Journey</h2>
          <p className="text-sm text-amber-200/80">Expeditions Completed: {percent}%</p>
        </div>
      </div>
      <div className="relative" style={{ width: size, height: size }} aria-label={`Progress ${percent}%`} role="img">
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(251, 191, 36, 0.25)"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FBBF24"
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold text-amber-100">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
