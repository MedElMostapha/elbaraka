import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import BottomNav from '@/components/layout/BottomNav';
import '../globals.css';
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en' | 'fr' | 'ar')) {
    notFound();
  }
 
  // Providing all messages to the client
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
 
  return (
    <html lang={locale} dir={dir}>
      <body className="antialiased font-sans selection:bg-primary/20">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
            <BottomNav />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
