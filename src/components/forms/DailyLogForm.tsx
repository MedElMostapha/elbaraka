'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveDailyLog } from '@/lib/actions/farm';
import { useState } from 'react';

interface DailyLogFormData {
  batchId: string;
  mortality: number;
  feedConsumedKg: number;
  waterConsumedL: number;
  medication: string;
  notes: string;
}

export default function DailyLogForm({ batches }: { batches: { id: string; name: string }[] }) {
  const t = useTranslations('DailyTracking');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm<DailyLogFormData>({
    defaultValues: {
      mortality: 0,
      feedConsumedKg: 0,
      waterConsumedL: 0,
    }
  });

  const onSubmit = async (data: DailyLogFormData) => {
    setIsSubmitting(true);
    try {
      // Sanitize inputs to ensure no NaN is sent to the DB
      const sanitizedData = {
        ...data,
        mortality: isNaN(data.mortality) ? 0 : data.mortality,
        feedConsumedKg: isNaN(data.feedConsumedKg) ? 0 : data.feedConsumedKg,
        waterConsumedL: isNaN(data.waterConsumedL) ? 0 : data.waterConsumedL,
        date: new Date(),
      };

      const result = await saveDailyLog(sanitizedData);
      if (result.success) {
        alert(t('successMessage') || 'Entry Saved Successfully');
        reset();
      } else {
        alert('Error: ' + result.error);
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
            {t('title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Batch Selection */}
            <div className="space-y-2">
              <Label className="rtl:text-right block">{t('batch')}</Label>
              <Select onValueChange={(val) => setValue('batchId', val)}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder={t('placeholderBatch')} />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id}>
                      {batch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mortality - Large Touch Target */}
            <div className="space-y-2">
              <Label className="rtl:text-right block">{t('mortality')}</Label>
              <Input
                type="number"
                inputMode="numeric"
                className="h-14 text-2xl text-center"
                {...register('mortality', { valueAsNumber: true })}
              />
            </div>

            {/* Feed Consumption */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="rtl:text-right block">{t('feedKg')}</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  className="h-12 text-lg"
                  {...register('feedConsumedKg', { valueAsNumber: true })}
                  />
                  </div>
                  <div className="space-y-2">
                  <Label className="rtl:text-right block">{t('waterL')}</Label>
                  <Input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  className="h-12 text-lg"
                  {...register('waterConsumedL', { valueAsNumber: true })}

                />
              </div>
            </div>

            {/* Medication */}
            <div className="space-y-2">
              <Label className="rtl:text-right block">{t('medication')}</Label>
              <Input
                className="h-12 text-lg"
                {...register('medication')}
                placeholder={t('placeholderMed')}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label className="rtl:text-right block">{t('notes')}</Label>
              <Textarea
                className="text-lg"
                {...register('notes')}
                placeholder={t('placeholderNotes')}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-14 text-xl font-bold mt-4">
              {t('saveEntry')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
