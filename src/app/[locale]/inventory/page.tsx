import { db } from '@/db';
import InventoryDashboard from '@/components/inventory/InventoryDashboard';

export default async function InventoryPage() {
  const items = await db.query.inventory.findMany();

  return (
    <div className="py-6">
      <InventoryDashboard items={items} />
    </div>
  );
}
