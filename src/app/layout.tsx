import BottomNav from '@/components/layout/BottomNav';
import './globals.css';
 
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr">
      <body className="antialiased font-sans selection:bg-primary/20">
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
