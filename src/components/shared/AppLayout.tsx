import { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Bell, Search, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

export function AppLayout() {
  const { isAuthenticated } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content */}
      <motion.div
        animate={{ marginLeft: sidebarCollapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-1 flex flex-col overflow-hidden"
      >
        {/* Top bar */}
        <header className="h-14 border-b border-border/60 bg-background/80 backdrop-blur-md flex items-center px-4 gap-3 shrink-0 z-20">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="shrink-0"
          >
            {sidebarCollapsed ? <Menu className="size-4" /> : <ChevronLeft className="size-4" />}
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground transition-colors">
              <Search className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive" />
            </Button>
            <ModeToggle />
          </div>
        </header>

        {/* Page content with per-route animation */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}
