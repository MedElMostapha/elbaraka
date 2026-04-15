'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { recordSale } from '@/lib/actions/farm';
import { useState } from 'react';

interface SalesFormData {
  batchId: string;
  clientId: string;
  quantity: number;
  unitPrice: number;
  type: 'wholesale' | 'retail';
  amountPaid: number;
}

export default function SaleForm({ 
  batches, 
  clients 
}: { 
  batches: { id: string; name: string }[], 
  clients: { id: string; name: string }[] 
}) {
  const t = useTranslations('Sales');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, setValue, watch, reset } = useForm<SalesFormData>({
    defaultValues: { type: 'retail', amountPaid: 0 }
  });

  const quantity = watch('quantity') || 0;
  const unitPrice = watch('unitPrice') || 0;
  const totalPrice = quantity * unitPrice;

  const onSubmit = async (data: SalesFormData) => {
    setIsSubmitting(true);
    try {
      const result = await recordSale({
        ...data,
        totalPrice,
        date: new Date(),
      });
      if (result.success) {
        alert('Sale Recorded');
        reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <Card className="shadow-lg border-2">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-xl font-bold rtl:text-right">
            {t('newSale')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>{t('batch')}</Label>
              <Select onValueChange={(val) => setValue('batchId', val)}>
                <SelectTrigger className="h-12"><SelectValue placeholder="..." /></SelectTrigger>
                <SelectContent>
                  {batches.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t('client')}</Label>
              <Select onValueChange={(val) => setValue('clientId', val)}>
                <SelectTrigger className="h-12"><SelectValue placeholder="..." /></SelectTrigger>
                <SelectContent>
                  {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('quantity')}</Label>
                <Input type="number" step="0.1" className="h-12" {...register('quantity', { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label>{t('unitPrice')}</Label>
                <Input type="number" step="0.1" className="h-12" {...register('unitPrice', { valueAsNumber: true })} />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg flex justify-between items-center">
               <span className="font-bold">{t('total')}</span>
               <span className="text-xl font-black text-primary">{totalPrice.toFixed(2)} MRU</span>
            </div>

            <div className="space-y-2">
              <Label>{t('amountPaid')}</Label>
              <Input type="number" step="0.1" className="h-12 border-2 border-primary/20" {...register('amountPaid', { valueAsNumber: true })} />
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full h-14 text-lg">
              {isSubmitting ? '...' : t('confirmSale')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
