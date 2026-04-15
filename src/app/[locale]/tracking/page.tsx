import { db } from '@/db';
import DailyLogForm from '@/components/forms/DailyLogForm';

export default async function TrackingPage() {
  // Fetch real batches from the database
  const realBatches = await db.query.batches.findMany({
    where: (batches, { eq }) => eq(batches.status, 'active'),
    columns: {
      id: true,
      name: true,
    }
  });

  return (
    <div className="py-6">
      <DailyLogForm batches={realBatches} />
    </div>
  );
}
