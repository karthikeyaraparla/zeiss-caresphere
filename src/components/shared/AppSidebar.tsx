import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Package,
  Brain,
  TicketCheck,
  BarChart3,
  Bell,
  BookOpen,
  Settings,
  LogOut,
  Microscope,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/app', end: true },
  { icon: Users, label: 'Customers', path: '/app/customers' },
  { icon: Package, label: 'Assets', path: '/app/assets' },
  { icon: Brain, label: 'AI Analysis', path: '/app/ai-analysis', badge: 'NEW' },
  { icon: TicketCheck, label: 'Support Tickets', path: '/app/tickets', badge: '28' },
  { icon: BarChart3, label: 'Reports', path: '/app/reports' },
  { icon: Bell, label: 'Notifications', path: '/app/notifications', badge: '5' },
  { icon: BookOpen, label: 'Knowledge Base', path: '/app/knowledge' },
];

const bottomItems = [
  { icon: Settings, label: 'Settings', path: '/app/settings' },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'ZC';

  return (
    <TooltipProvider delayDuration={300}>
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed left-0 top-0 h-full z-30 flex flex-col glass-sidebar border-r border-sidebar-border overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-3 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary shrink-0">
              <Microscope className="size-4 text-primary-foreground" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <span className="text-sm font-bold text-sidebar-foreground">CareSphere</span>
                  <span className="text-xs text-sidebar-foreground/50 ml-1">AI</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={onToggle}
            className={cn(
              'ml-auto flex items-center justify-center size-6 rounded-md text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors shrink-0',
              collapsed && 'hidden'
            )}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5">
          {navItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              {...item}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* Bottom items */}
        <div className="px-2 pb-2 space-y-0.5 border-t border-sidebar-border pt-2">
          {bottomItems.map((item) => (
            <SidebarNavItem key={item.path} {...item} collapsed={collapsed} />
          ))}

          {/* User profile */}
          <div
            className={cn(
              'flex items-center gap-3 px-2 py-2 mt-1 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors group',
              collapsed && 'justify-center'
            )}
          >
            <Avatar className="size-7 shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 overflow-hidden min-w-0"
                >
                  <p className="text-xs font-semibold text-sidebar-foreground truncate">{user?.name}</p>
                  <p className="text-xs text-sidebar-foreground/50 truncate capitalize">{user?.role}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {!collapsed && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleLogout}
                  className="size-6 flex items-center justify-center rounded-md text-sidebar-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="Logout"
                >
                  <LogOut className="size-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}

interface SidebarNavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  badge?: string;
  collapsed: boolean;
  end?: boolean;
}

function SidebarNavItem({ icon: Icon, label, path, badge, collapsed, end }: SidebarNavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={path}
          end={end}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all duration-150 group relative',
              collapsed ? 'justify-center' : '',
              isActive
                ? 'bg-sidebar-accent text-sidebar-foreground font-medium'
                : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/60'
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-sidebar-accent rounded-lg"
                  transition={{ duration: 0.2 }}
                />
              )}
              <Icon className={cn('size-4 shrink-0 relative z-10', isActive ? 'text-primary' : '')} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 flex-1 truncate"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
              {badge && !collapsed && (
                <Badge
                  variant="secondary"
                  className="relative z-10 text-xs h-5 min-w-5 px-1.5 bg-primary/10 text-primary border-none"
                >
                  {badge}
                </Badge>
              )}
            </>
          )}
        </NavLink>
      </TooltipTrigger>
      {collapsed && (
        <TooltipContent side="right" className="font-medium">
          {label}
          {badge && <span className="ml-2 text-primary">({badge})</span>}
        </TooltipContent>
      )}
    </Tooltip>
  );
}
