import {getTranslations} from 'next-intl/server';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default async function DashboardPage() {
  const t = await getTranslations('Dashboard');

  return (
    <div className="p-4 space-y-6 pb-20">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold rtl:text-right">{t('title')}</h1>
        <div className="flex gap-2">
          {/* Locale switcher placeholder */}
          <button className="text-xs border p-1 rounded">FR</button>
          <button className="text-xs border p-1 rounded">AR</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-sm border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>🐣</span> {t('activeBatches')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4</p>
            <p className="text-muted-foreground text-sm">Lots en cours de croissance</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>📉</span> {t('dailyLogs')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Toutes les données sont à jour.</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>📦</span> {t('inventory')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-600 font-semibold">Alerte: Stock d&apos;aliment faible (2 sacs)</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>💸</span> {t('debts')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-red-600">2,450.00 MRU</p>
            <p className="text-xs text-muted-foreground">Créances clients en attente</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
