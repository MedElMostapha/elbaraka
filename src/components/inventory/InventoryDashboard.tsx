'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { updateStock } from '@/lib/actions/farm';
import { useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minThreshold: number | null;
}

export default function InventoryDashboard({ items }: { items: InventoryItem[] }) {
  const t = useTranslations('Inventory');
  const [localItems, setLocalItems] = useState(items);

  const handleQuickAdd = async (id: string, amount: number) => {
    const item = localItems.find(i => i.id === id);
    if (!item) return;

    const newQty = item.quantity + amount;
    const result = await updateStock(id, newQty);
    
    if (result.success) {
      setLocalItems(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i));
    }
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {localItems.map((item) => {
        const percentage = Math.min((item.quantity / (item.minThreshold || 100)) * 100, 100);
        const isLow = item.quantity <= (item.minThreshold || 10);

        return (
          <Card key={item.id} className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>{item.name}</span>
                <span className={`text-2xl font-black ${isLow ? 'text-red-600' : 'text-primary'}`}>
                  {item.quantity} {item.unit}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={percentage} className={isLow ? 'bg-red-100 h-2' : 'h-2'} />
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-12 border-2" onClick={() => handleQuickAdd(item.id, 5)}>
                  +5 {item.unit}
                </Button>
                <Button variant="outline" className="h-12 border-2" onClick={() => handleQuickAdd(item.id, 25)}>
                  +25 {item.unit}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
