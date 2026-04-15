import { db } from './src/db';
import { inventory } from './src/db/schema';

async function seed() {
  console.log('Seed started...');
  
  await db.insert(inventory).values([
    {
      name: 'Aliment Croissance',
      category: 'feed',
      quantity: 500,
      unit: 'kg',
      minThreshold: 50,
    },
    {
      name: 'Vaccin Newcastle',
      category: 'medicine',
      quantity: 10,
      unit: 'vials',
      minThreshold: 2,
    }
  ]);

  console.log('Seed finished: Created initial inventory items.');
}

seed().catch(console.error);
