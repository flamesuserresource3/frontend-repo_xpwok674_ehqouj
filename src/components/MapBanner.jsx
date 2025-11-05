import { Compass } from 'lucide-react';

export default function MapBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl ring-1 ring-blue-800/40">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px, 12px 12px',
          backgroundPosition: '0 0, 6px 6px',
        }}
      />
      <div className="bg-gradient-to-br from-blue-950 to-blue-900 text-amber-100 px-6 py-10 sm:px-10">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-blue-800/60 ring-1 ring-blue-700/50">
            <Compass size={28} className="text-amber-200" />
          </div>
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-wide">The Cartographer's Journey</h1>
            <p className="mt-2 text-amber-200/80 max-w-2xl">
              Plot, embark, and arrive. Organize expeditions across harbor, open sea, and destination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
