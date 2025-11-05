import MapBanner from './components/MapBanner';
import ProgressGauge from './components/ProgressGauge';
import ExpeditionForm from './components/ExpeditionForm';
import KanbanBoard from './components/KanbanBoard';

export default function App() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage:
          'linear-gradient(0deg, rgba(245, 222, 179, 0.75), rgba(245, 222, 179, 0.75)), url(https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1742&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <MapBanner />

        <div className="mt-6 grid gap-4">
          <ProgressGauge />
          <ExpeditionForm />
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}
