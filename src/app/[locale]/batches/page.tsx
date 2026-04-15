import { db } from '@/db';
import { batches } from '@/db/schema';
import { eq } from 'drizzle-orm';
import BatchForm from '@/components/forms/BatchForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function BatchesPage() {
  const allBatches = await db.query.batches.findMany({
    orderBy: (batches, { desc }) => [desc(batches.arrivalDate)]
  });

  return (
    <div className="py-6 space-y-6">
      <BatchForm />
      
      <div className="px-4 space-y-4">
        <h2 className="text-xl font-bold">Liste des Lots</h2>
        {allBatches.map(batch => (
          <Card key={batch.id} className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between">
                <span>{batch.name}</span>
                <span className={`text-sm px-2 py-1 rounded ${batch.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
                  {batch.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 text-sm text-muted-foreground">
                <p>Race: {batch.breed}</p>
                <p>Initial: {batch.initialQuantity}</p>
                <p>Date: {new Date(batch.arrivalDate).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
