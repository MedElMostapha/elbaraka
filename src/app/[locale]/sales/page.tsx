import { db } from '@/db';
import SaleForm from '@/components/forms/SaleForm';

export default async function SalesPage() {
  const batches = await db.query.batches.findMany({
    where: (batches, { eq }) => eq(batches.status, 'active')
  });
  
  const clients = await db.query.clients.findMany();

  return (
    <div className="py-6">
      <SaleForm batches={batches} clients={clients} />
    </div>
  );
}
