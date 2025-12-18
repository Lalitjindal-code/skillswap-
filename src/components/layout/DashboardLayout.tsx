import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Map,
  Users,

  Settings,
  AlertTriangle,
  Search,
  Coins,
  Menu,
  X,
  BarChart3,
  ChevronDown,
  Trophy,
  Swords,
  Briefcase,
  Flame,
} from 'lucide-react';
import { useGlobal } from '@/contexts/GlobalContext';
import { SOSModal } from '@/components/SOSModal';
import { NotificationDropdown } from '@/components/NotificationDropdown';
import { LevelDetailsModal } from '@/components/LevelDetailsModal';
import { TransactionHistoryModal } from '@/components/TransactionHistoryModal';
import { VisualStatsModal } from '@/components/VisualStatsModal';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/arena', icon: Swords, label: 'Skill Arena' },
  { path: '/opportunities', icon: Briefcase, label: 'Earn & Grow' },
  { path: '/career-gps', icon: Map, label: 'Roadmap' },
  { path: '/marketplace', icon: Users, label: 'Team' },

  { path: '/settings', icon: Settings, label: 'Settings' },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useGlobal();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [gamificationOpen, setGamificationOpen] = useState(true);
  const [sosOpen, setSOSOpen] = useState(false);
  const [levelModalOpen, setLevelModalOpen] = useState(false);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [visualStatsModalOpen, setVisualStatsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const mockSearchResults = [
    { id: 1, type: 'skill', title: 'Python Masterclass', subtitle: 'Skill • 120 Mentors', icon: 'PY', color: 'bg-blue-500/20 text-blue-500' },
    { id: 2, type: 'mentor', title: 'Amit Patel', subtitle: 'Mentor • React Expert', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit' },
    { id: 3, type: 'skill', title: 'React Hooks Deep Dive', subtitle: 'Skill • 85 Mentors', icon: '⚛️', color: 'bg-cyan-500/20 text-cyan-500' },
    { id: 4, type: 'session', title: 'Frontend Architecture', subtitle: 'Workshop • Tomorrow', icon: '🎨', color: 'bg-pink-500/20 text-pink-500' },
    { id: 5, type: 'skill', title: 'Backend with Node.js', subtitle: 'Skill • 95 Mentors', icon: '🟢', color: 'bg-green-500/20 text-green-500' },
    { id: 6, type: 'skill', title: 'App Development (Flutter)', subtitle: 'Course • 4.8 Stars', icon: '📱', color: 'bg-blue-400/20 text-blue-400' },
    { id: 7, type: 'skill', title: 'Game Development (Unity)', subtitle: 'Course • New', icon: '🎮', color: 'bg-purple-500/20 text-purple-500' },
  ];

  const filteredResults = mockSearchResults.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <img src="/logo.png" alt="SkillSwap Logo" className="w-10 h-10 rounded-xl object-contain" />
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
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
                      <div
                        onClick={() => setVisualStatsModalOpen(true)}
                        className="text-center cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-muted-foreground">Level 0</span>
                          <span className="text-xs font-bold text-muted-foreground">Level 1</span>
                        </div>
                        <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full group-hover:brightness-110 transition-all"
                            style={{ width: '50%' }}
                          />
                        </div>
                        <p className="mt-2 text-xs font-mono text-primary font-bold">XP: 50/100</p>
                        <p className="text-[10px] text-muted-foreground mt-1 group-hover:text-primary transition-colors">Click to view stats tree</p>
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
            <div className="relative hidden md:block group z-50">
              <div
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card min-w-[320px] transition-all ${showResults ? 'ring-2 ring-primary/50' : 'focus-within:ring-2 focus-within:ring-primary/50'
                  }`}
              >
                <Search className="w-4 h-4 card-muted" />
                <input
                  type="text"
                  placeholder="Search Skills, Mentors..."
                  className="flex-1 bg-transparent text-sm focus:outline-none card-text placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                />
                <button
                  onClick={() => setShowResults(!showResults)}
                  className="text-xs card-muted border-l border-secondary/20 pl-3 hover:text-primary transition-colors uppercase font-bold"
                >
                  Search
                </button>
              </div>

              {/* Search Dropdown Results */}
              <AnimatePresence>
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-xl p-2 shadow-2xl overflow-hidden"
                  >
                    <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase flex justify-between">
                      <span>{searchQuery ? 'Search Results' : 'Top Learning Items'}</span>
                      <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">{filteredResults.length}</span>
                    </div>

                    <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {filteredResults.length > 0 ? (
                        filteredResults.map((item) => (
                          <Link
                            to={item.type === 'mentor' ? '/profile' : '/marketplace'}
                            key={item.id}
                            className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors group"
                          >
                            {item.type === 'mentor' ? (
                              <img src={item.image} className="w-10 h-10 rounded-full border border-white/10" alt={item.title} />
                            ) : (
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${item.color}`}>
                                {item.icon}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                          No results found.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-500 border border-orange-500/30">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span className="font-bold text-sm">{user.streak} Days</span>
            </div>

            {/* Coins Pill - Clickable for Transaction History */}
            <button
              onClick={() => setTransactionModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <Coins className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-bold card-title">{user.coins} Coins</span>
            </button>

            {/* Level Indicator (Clickable) */}
            <button
              onClick={() => setLevelModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-xs font-bold text-primary-foreground">{user.level}</span>
              </div>
              <span className="font-bold card-title">{user.levelTitle}</span>
            </button>

            {/* Notifications */}
            <NotificationDropdown />

            {/* Stats */}
            <button
              onClick={() => setVisualStatsModalOpen(true)}
              className="p-2 rounded-lg glass-card hover:bg-white/5 transition-colors"
            >
              <BarChart3 className="w-5 h-5 card-text" />
            </button>

            <Link to="/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center border-2 border-primary overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all">
              <img src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'} alt="Profile" className="w-full h-full object-cover" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/* Modals */}
      <SOSModal isOpen={sosOpen} onClose={() => setSOSOpen(false)} />
      <LevelDetailsModal isOpen={levelModalOpen} onClose={() => setLevelModalOpen(false)} />
      <TransactionHistoryModal isOpen={transactionModalOpen} onClose={() => setTransactionModalOpen(false)} />
      <VisualStatsModal isOpen={visualStatsModalOpen} onClose={() => setVisualStatsModalOpen(false)} />
    </div>
  );
};
