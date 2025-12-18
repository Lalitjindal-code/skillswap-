import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  ChevronRight,
  ChevronLeft,
  Star,
  Check,
  Heart,
  Bookmark,
  MessageCircle,
  Sparkles,
  MoreHorizontal,
  Calendar,
  Clock,
  Plus,
  GitCommit,
  Activity
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useGlobal } from '@/contexts/GlobalContext';
import { PageTransition, staggerContainer, staggerItem } from '@/components/PageTransition';
import { BookingModal } from '@/components/BookingModal';

const roadmapNodes = [
  { id: 'html', label: 'HTML', status: 'completed', progress: 100 },
  { id: 'css', label: 'CSS', status: 'completed', progress: 100 },
  { id: 'react', label: 'React', status: 'current', progress: 60, nextStep: true },
];

const snippetShorts = [
  {
    id: '1',
    title: 'Teach Styles',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    rating: 4.3,
    comments: 4,
    coins: 2,
  },
  {
    id: '2',
    title: 'Guitar Riffs',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
    rating: 4.7,
    comments: 2,
    coins: 2,
  },
  {
    id: '3',
    title: 'Excel Hack',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    rating: 4.1,
    comments: 2,
    coins: 0,
  },
];

const initialSessions = [
  { id: 1, title: 'React Hooks Deep Dive', mentor: 'Amit', time: '10:00 AM', date: 'Today' },
  { id: 2, title: 'TypeScript Fundamentals', mentor: 'Sara', time: '2:30 PM', date: 'Tomorrow' },
  { id: 3, title: 'Node.js REST APIs', mentor: 'Raj', time: '11:00 AM', date: 'Dec 18' },
];



// ... imports

export default function Dashboard() {
  const { user, checkStreak } = useGlobal();
  const [sessions, setSessions] = useState(initialSessions);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    checkStreak();
  }, []); // Run once on mount

  const handleBookSession = (newSession: any) => {
    setSessions([...sessions, { ...newSession, id: Date.now() }]);
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          {/* Pro Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div>
                <h2 className="text-lg font-bold card-title">Go Pro to Remove Ads</h2>
                <p className="text-sm card-muted">
                  Upgrade to <span className="font-semibold text-primary">SkillSwap Pro</span> and enjoy an ad-free experience!
                </p>
              </div>
              <div className="flex items-center gap-4 ml-8">
                <div className="px-4 py-2 border border-dashed border-secondary/30 rounded-lg text-sm card-muted">
                  Your ad here
                </div>
                <div className="px-4 py-2 border border-dashed border-secondary/30 rounded-lg text-sm card-muted">
                  Your ad here
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm card-text">
                  Upgrade to <span className="font-bold text-primary">SkillSwap</span> Pro
                </p>
                <p className="text-sm card-muted">and enjoy an ad-free experience!</p>
              </div>
              <Link to="/pricing" className="px-5 py-2.5 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors">
                Upgrade Now
              </Link>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column (Session & Graph) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Session Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🌅</span>
                  <h2 className="text-lg font-bold card-title">Upcoming Session</h2>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=amit"
                      alt="Mentor"
                      className="w-14 h-14 rounded-full bg-secondary/10"
                    />
                    <div>
                      <h3 className="text-xl font-bold card-title">React Basics</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm card-muted">👤 Amit</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <span className="text-sm card-text">4.8</span>
                        </div>
                      </div>
                      <p className="text-sm font-semibold card-text mt-2">Starts in: 10m</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-teal-light to-secondary/20 flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-secondary to-teal rounded-full flex items-center justify-center">
                        <span className="text-3xl">🤖</span>
                      </div>
                    </div>
                    <Link
                      to="/group-join/1"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-lg"
                    >
                      <Play className="w-5 h-5" />
                      JOIN NOW
                      <span className="ml-1">📅</span>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Progress Graph & Kindness Tree */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Activity Graph */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-5 h-5 text-primary" />
                      <h3 className="font-bold card-title">Learning Velocity</h3>
                    </div>
                    <div className="h-56 flex items-end justify-between gap-2 px-2 border-b border-white/5 pb-2">
                      {[3, 4.5, 2.5, 6, 7.5, 5, 8].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${(h / 8) * 100}%` }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="w-full bg-gradient-to-t from-primary/20 to-primary/60 rounded-t-sm relative group"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 px-2 py-1 rounded text-xs font-bold text-primary border border-primary/20 pointer-events-none">
                            {h}h
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground px-1 uppercase tracking-wider">
                      <span>Mon</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  {/* Kindness Tree */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <GitCommit className="w-5 h-5 text-secondary" />
                      <h3 className="font-bold card-title">Kindness Tree</h3>
                    </div>
                    <div className="h-56 relative flex items-center justify-center bg-white/5 rounded-xl border border-white/5">
                      {/* Central Node */}
                      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 z-10 group cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center shadow-lg border-2 border-background scale-110">
                          <span className="text-xs font-bold text-primary-foreground">You</span>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-20">
                          You helped 3 people
                        </div>
                      </div>

                      {/* Lines - Using ViewBox for easier scaling */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 224" preserveAspectRatio="none">
                        <path d="M 80 112 C 200 112, 200 50, 320 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                        <path d="M 80 112 C 200 112, 200 174, 320 174" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                      </svg>

                      {/* Child Nodes */}
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
                        className="absolute top-[15%] right-[15%] w-10 h-10 rounded-full bg-secondary/20 border border-secondary flex items-center justify-center cursor-pointer group hover:bg-secondary/40 transition-colors"
                      >
                        <span className="text-xs font-bold">R</span>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-20">
                          Rahul helped Sneha
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}
                        className="absolute bottom-[15%] right-[15%] w-10 h-10 rounded-full bg-secondary/20 border border-secondary flex items-center justify-center hover:bg-secondary/40 transition-colors"
                      >
                        <span className="text-xs font-bold">S</span>
                      </motion.div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-2">Your impact ripple effect</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column (Schedule & Widgets) */}
            <div className="lg:col-span-1 space-y-6">


              {/* Upcoming Schedule Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glass-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold card-title">Schedule</h2>
                  </div>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar"
                >
                  {sessions.map((session, i) => (
                    <motion.div
                      key={session.id}
                      variants={staggerItem}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium card-title text-sm">{session.title}</h4>
                          <p className="text-xs card-muted">with {session.mentor}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-primary">{session.time}</p>
                          <p className="text-xs card-muted">{session.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <Link
                  to="/calendar"
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                >
                  View Full Calendar
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Career GPS (Mini) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-secondary" />
                    <h2 className="text-lg font-bold card-title">Career GPS</h2>
                  </div>
                  <button className="p-1 hover:bg-secondary/10 rounded">
                    <MoreHorizontal className="w-5 h-5 card-muted" />
                  </button>
                </div>

                <div className="space-y-3">
                  {roadmapNodes.map((node) => (
                    <div key={node.id} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${node.status === 'completed' ? 'text-secondary' : 'card-muted'}`} />
                      <span className="font-medium card-text w-16">{node.label}</span>
                      <div className="flex-1 h-2 bg-secondary/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${node.status === 'completed' ? 'bg-secondary' : 'bg-primary'}`}
                          style={{ width: `${node.progress}%` }}
                        />
                      </div>
                      {node.nextStep ? (
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">Next</span>
                      ) : (
                        <Check className="w-5 h-5 text-secondary" />
                      )}
                    </div>
                  ))}
                </div>

                <Link
                  to="/career-gps"
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  View Full Roadmap
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Snippet Shorts (Full Width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔥</span>
              <h2 className="text-lg font-bold card-title">Snippet Shorts</h2>
              <span className="text-sm card-muted">TikTok-Style Discovery</span>
            </div>

            <div className="relative">
              <div className="flex gap-4 overflow-hidden">
                {snippetShorts.map((snippet, i) => (
                  <motion.div
                    key={snippet.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ scale: 1.03 }}
                    className="flex-shrink-0 w-56 rounded-2xl overflow-hidden relative group cursor-pointer"
                  >
                    <img
                      src={snippet.thumbnail}
                      alt={snippet.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 snippet-overlay" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold">{snippet.title}</h3>
                        <Heart className="w-4 h-4 text-white opacity-80" />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2 text-white/80 text-xs">
                          <span>{snippet.rating}</span>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{snippet.comments}</span>
                          </div>
                        </div>
                        <Bookmark className="w-4 h-4 text-white opacity-80" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full glass-card shadow-lg flex items-center justify-center hover:bg-secondary/10 transition-colors">
                <ChevronLeft className="w-4 h-4 card-text" />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-secondary text-white shadow-lg flex items-center justify-center hover:bg-secondary/90 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </PageTransition>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onBook={handleBookSession}
      />
    </DashboardLayout>
  );
}
