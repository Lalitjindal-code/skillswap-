import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Map,
  Eye,
  Users,
  Bell,
  Search,
  Coins,
  AlertTriangle,
  Menu,
  X,
  User,
  ShoppingBag,
  LogOut,
} from 'lucide-react';
import { useGlobal } from '@/contexts/GlobalContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/dashboard', icon: Map, label: 'Roadmap', hash: '#roadmap' },
  { path: '/marketplace', icon: Eye, label: 'Shadow Mode' },
  { path: '/marketplace', icon: Users, label: 'Group Pool', hash: '#pool' },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, notifications } = useGlobal();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed lg:relative z-40 w-64 h-screen glass-panel border-r border-white/5 flex flex-col"
          >
            <div className="p-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  SkillSync
                </span>
              </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={i}
                    to={`${item.path}${item.hash || ''}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary gold-glow'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* SOS Button */}
            <div className="p-4 mt-auto">
              <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent/20 text-accent pulse-red hover:bg-accent/30 transition-colors">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">SOS Help</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 glass-panel border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search skills, mentors..."
                className="w-64 pl-10 pr-4 py-2 rounded-xl bg-muted/50 border border-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Wallet Pill */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card gold-glow">
              <Coins className="w-4 h-4 text-primary" />
              <span className="font-semibold text-primary">{user.coins} Coins</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 glass-card p-4 rounded-xl"
                  >
                    <h4 className="font-semibold mb-3">Notifications</h4>
                    <div className="space-y-3">
                      {notifications.map(n => (
                        <div
                          key={n.id}
                          className={`p-3 rounded-lg ${n.read ? 'bg-muted/30' : 'bg-primary/10'}`}
                        >
                          <p className="font-medium text-sm">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                          <span className="text-xs text-muted-foreground">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Links */}
            <Link
              to="/profile"
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/marketplace"
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
