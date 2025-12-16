import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Map,
  Users,
  FileText,
  Settings,
  AlertTriangle,
  Search,
  Coins,
  Menu,
  X,
  BarChart3,
  ChevronDown,
  Trophy,
} from 'lucide-react';
import { useGlobal } from '@/contexts/GlobalContext';
import { SOSModal } from '@/components/SOSModal';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/career-gps', icon: Map, label: 'Roadmap' },
  { path: '/marketplace', icon: Users, label: 'Team' },
  { path: '/profile/cv', icon: FileText, label: 'CV' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useGlobal();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [gamificationOpen, setGamificationOpen] = useState(true);
  const [sosOpen, setSOSOpen] = useState(false);

  const trophies = [
    { unlocked: true, color: 'from-amber-600 to-amber-400' },
    { unlocked: true, color: 'from-gray-400 to-gray-300' },
    { unlocked: true, color: 'from-amber-500 to-yellow-400' },
    { unlocked: false, color: 'from-gray-600 to-gray-500' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed lg:relative z-40 w-64 h-screen glass-panel flex flex-col"
          >
            {/* Logo */}
            <div className="p-5">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center">
                  <span className="text-xl font-bold text-white">S</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Skill<span className="text-primary">Swap</span>
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={i}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'sidebar-item-active font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
            </nav>

            {/* Gamification Section */}
            <div className="px-3 pb-3">
              <button
                onClick={() => setGamificationOpen(!gamificationOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-muted/30 text-foreground"
              >
                <span className="font-semibold text-sm uppercase tracking-wider">Gamification</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${gamificationOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {gamificationOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 px-2">
                      <div className="flex justify-center gap-2 mb-3">
                        {trophies.map((trophy, i) => (
                          <div
                            key={i}
                            className={`w-10 h-10 rounded-lg bg-gradient-to-b ${trophy.color} flex items-center justify-center ${
                              !trophy.unlocked ? 'opacity-40' : ''
                            }`}
                          >
                            <Trophy className="w-5 h-5 text-white" />
                          </div>
                        ))}
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl font-bold text-primary">60%</span>
                          <span className="text-sm text-muted-foreground">to Golden Tick</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
                          <div className="h-full w-3/5 bg-gradient-to-r from-primary to-gold-dark rounded-full" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SOS Help Button */}
            <div className="p-3">
              <motion.button 
                onClick={() => setSOSOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30 transition-colors"
              >
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  <AlertTriangle className="w-5 h-5" />
                </motion.div>
                <span className="font-semibold">SOS Help</span>
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 sticky top-0 z-30 bg-transparent">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-muted/30 transition-colors text-foreground lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Search Bar */}
            <div className="relative hidden md:block">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card min-w-[320px]">
                <Search className="w-4 h-4 card-muted" />
                <input
                  type="text"
                  placeholder="Search Skills"
                  className="flex-1 bg-transparent text-sm focus:outline-none card-text placeholder:text-muted-foreground"
                />
                <span className="text-sm card-muted border-l border-secondary/20 pl-3">Search</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Coins Pill */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <Coins className="w-5 h-5 text-primary" />
              <span className="font-bold card-title">{user.coins} Coins</span>
            </div>

            {/* Level Indicator */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">▶</span>
              </div>
              <span className="font-bold card-title">Level {user.level}</span>
            </div>

            {/* Stats & Avatar */}
            <button className="p-2 rounded-lg glass-card">
              <BarChart3 className="w-5 h-5 card-text" />
            </button>
            
            <Link to="/profile/cv" className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center border-2 border-primary overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all">
              <img src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'} alt="Profile" className="w-full h-full object-cover" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/* SOS Modal */}
      <SOSModal isOpen={sosOpen} onClose={() => setSOSOpen(false)} />
    </div>
  );
};
