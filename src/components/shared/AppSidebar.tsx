import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logo from "@/components/assets/logo.png";


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navGroups = [
  {
    title: "GENERAL",
    items: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/app",
        end: true,
      },
      {
        icon: Users,
        label: "Customers",
        path: "/app/customers",
      },
      {
        icon: Package,
        label: "Assets",
        path: "/app/assets",
      },
    ],
  },

  {
    title: "AI",
    items: [
      {
        icon: Brain,
        label: "AI Analysis",
        path: "/app/ai-analysis",
        badge: "NEW",
      },
      {
        icon: TicketCheck,
        label: "Support Tickets",
        path: "/app/tickets",
        badge: "28",
      },
      {
        icon: BarChart3,
        label: "Reports",
        path: "/app/reports",
      },
      {
        icon: BookOpen,
        label: "Knowledge Base",
        path: "/app/knowledge",
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        icon: Bell,
        label: "Notifications",
        path: "/app/notifications",
        badge: "5",
      },
      {
        icon: Settings,
        label: "Settings",
        path: "/app/settings",
      },
    ],
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({
  collapsed,
  onToggle,
}: AppSidebarProps) {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials =
    user?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "ZC";

  const visibleNavGroups = navGroups
  .map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      if (isAdmin) return true;

      return [
        "/app",
        "/app/assets",
        "/app/tickets",
        "/app/knowledge",
      ].includes(item.path);
    }),
  }))
  .filter((group) => group.items.length > 0);

  return (
    <TooltipProvider delayDuration={300}>
      <motion.aside
        animate={{
          width: collapsed ? 70 : 280,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          fixed
          left-0
          top-0
          z-30
          flex
          h-full
          flex-col
          overflow-hidden
          border-r
          border-white/10
          bg-gradient-to-b
          from-slate-950
          via-slate-900
          to-slate-950
          shadow-2xl
        "
      >
        {/* Logo */}

        <div className="flex h-24 items-center border-b border-white/10 px-5">
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
    <img
        src={logo}
        alt="Logo"
        className="h-8 w-8 object-contain"
    />
</div>

            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <h2 className="text-lg font-bold tracking-wide text-white">
                    ZEISS
                  </h2>

                  <p className="text-sm text-slate-300">
                    ZePSI
                  </p>

                  <p className="text-xs text-slate-500">
                    Enterprise Platform
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!collapsed && (
            <button
              onClick={onToggle}
              className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-3 py-5">
                    {visibleNavGroups.map((group) => (
            <div key={group.title} className="mb-6">
              {!collapsed && (
                <h3 className="mb-3 px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {group.title}
                </h3>
              )}

              <div className="space-y-1">
                {group.items.map((item) => (
                  <SidebarNavItem
                    key={item.path}
                    {...item}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Card */}

        <div className="mx-3 mb-4">
          <Card className="border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
            <div
              className={cn(
                "flex items-center gap-3 p-4",
                collapsed && "justify-center"
              )}
            >
              <Avatar className="h-11 w-11 border-2 border-blue-500">
                <AvatarFallback className="bg-blue-600 font-bold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>

              {!collapsed && (
                <>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-semibold text-white">
                      {user?.name}
                    </p>

                    <p className="text-xs text-slate-400 capitalize">
                      {user?.role}
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />

                      <span className="text-[11px] text-green-400">
                        Online
                      </span>
                    </div>
                  </div>

                  <Button
  variant="ghost"
  size="icon"
  onClick={handleLogout}
  className="h-8 w-8 rounded-lg text-white hover:bg-red-500/10 hover:text-red-400"
>
  <LogOut className="h-4 w-4" />
</Button>
                </>
              )}
            </div>
          </Card>
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
function SidebarNavItem({
  icon: Icon,
  label,
  path,
  badge,
  collapsed,
  end,
}: SidebarNavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={path}
          end={end}
          className={({ isActive }) =>
            cn(
              "group relative flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
              collapsed && "justify-center",
              isActive
                ? "border border-blue-500/30 bg-blue-500/15 text-white"
                : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 35,
                  }}
                  className="absolute inset-0 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-600/20 to-cyan-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                />
              )}

              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: -3,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="relative z-10"
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive
                      ? "text-blue-400"
                      : "text-slate-400 group-hover:text-white"
                  )}
                />
              </motion.div>

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className={cn(
    "relative z-10 flex-1 truncate",
    isActive
      ? "text-white"
      : "text-white group-hover:text-white"
  )}
>
  {label}
</motion.span>
                )}
              </AnimatePresence>

              {!collapsed && badge && (
                <Badge
                  variant="secondary"
                  className="relative z-10 border-none bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-400"
                >
                  {badge}
                </Badge>
              )}
            </>
          )}
        </NavLink>
      </TooltipTrigger>

      {collapsed && (
        <TooltipContent side="right">
          <div className="flex items-center gap-2">
            <span>{label}</span>
            {badge && (
              <Badge
                variant="secondary"
                className="border-none bg-blue-500/20 text-blue-400"
              >
                {badge}
              </Badge>
            )}
          </div>
        </TooltipContent>
      )}
    </Tooltip>
  );
}