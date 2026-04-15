'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardList, Package, CircleDollarSign, Layers } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Accueil', href: '/', icon: Home },
    { label: 'Lots', href: '/batches', icon: Layers },
    { label: 'Suivi', href: '/tracking', icon: ClipboardList },
    { label: 'Stocks', href: '/inventory', icon: Package },
    { label: 'Ventes', href: '/sales', icon: CircleDollarSign },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t flex items-center justify-around px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-colors ${
              isActive ? 'bg-primary/10' : 'bg-transparent'
            }`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
