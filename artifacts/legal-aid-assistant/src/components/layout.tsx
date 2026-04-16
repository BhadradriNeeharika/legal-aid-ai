import React from 'react';
import { Link, useLocation } from 'wouter';
import { MessageCircle, Phone, HeartHandshake, MapPin, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: '/', label: 'Support Chat', icon: MessageCircle },
  { href: '/helplines', label: 'Emergency Helplines', icon: Phone },
  { href: '/ngos', label: 'Support NGOs', icon: HeartHandshake },
  { href: '/legal-clinics', label: 'Legal Clinics', icon: MapPin },
];

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex flex-col space-y-2 w-full">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.href;
        return (
          <Link key={item.href} href={item.href} onClick={onClick}>
            <div
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer w-full text-left",
                isActive 
                  ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                  : "text-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-primary mb-1">Legal Aid Assistant</h1>
          <p className="text-sm text-muted-foreground">A safe space for legal guidance</p>
        </div>
        <div className="flex-1 px-4 py-2 overflow-y-auto">
          <NavLinks />
        </div>
        <div className="p-4 border-t border-sidebar-border bg-sidebar/50">
          <p className="text-xs text-muted-foreground text-center">
            Information provided is for guidance and does not constitute formal legal advice.
          </p>
        </div>
      </aside>

      {/* Mobile Header & Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-background">
          <div>
            <h1 className="text-lg font-semibold text-primary">Legal Aid Assistant</h1>
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar border-r-sidebar-border p-0 flex flex-col">
              <div className="p-6 pb-2">
                <h2 className="text-xl font-semibold text-primary mb-1">Menu</h2>
              </div>
              <div className="flex-1 px-4 py-4 overflow-y-auto">
                <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 overflow-y-auto bg-background focus:outline-none relative">
          {children}
        </main>
      </div>
    </div>
  );
}