'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createBatch } from '@/lib/actions/farm';
import { useState } from 'react';

interface BatchFormData {
  name: string;
  breed: string;
  initialQuantity: number;
  costPerChick: number;
  arrivalDate: string;
}

export default function BatchForm() {
  const t = useTranslations('Batches');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<BatchFormData>();

  const onSubmit = async (data: BatchFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createBatch({
        ...data,
        arrivalDate: new Date(data.arrivalDate),
      });
      if (result.success) {
        alert('Batch Created');
        reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="rtl:text-right">{t('newBatch')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>{t('name')}</Label>
              <Input className="h-12" {...register('name')} placeholder="Lot A..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('breed')}</Label>
                <Input className="h-12" {...register('breed')} />
              </div>
              <div className="space-y-2">
                <Label>{t('arrivalDate')}</Label>
                <Input type="date" className="h-12" {...register('arrivalDate')} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('initialQuantity')}</Label>
                <Input type="number" className="h-12" {...register('initialQuantity', { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label>{t('costPerChick')}</Label>
                <Input type="number" step="0.1" className="h-12" {...register('costPerChick', { valueAsNumber: true })} />
              </div>
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full h-14">
              {t('save')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
