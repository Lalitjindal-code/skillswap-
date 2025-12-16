import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  Clock,
  ChevronRight,
  Shuffle,
  Star,
  Check,
  Lock,
  Trophy,
  Zap,
  Users,
  TrendingUp,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useGlobal } from '@/contexts/GlobalContext';

const roadmapNodes = [
  { id: 'html', label: 'HTML', status: 'completed' },
  { id: 'css', label: 'CSS', status: 'completed' },
  { id: 'react', label: 'React', status: 'current' },
  { id: 'nodejs', label: 'Node.js', status: 'locked' },
  { id: 'database', label: 'Database', status: 'locked' },
];

const upcomingSessions = [
  {
    id: '1',
    title: 'Physics Fundamentals',
    mentor: 'Amit Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit',
    startsIn: '10 minutes',
    coins: 1,
  },
  {
    id: '2',
    title: 'React Hooks Deep Dive',
    mentor: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    startsIn: '2 hours',
    coins: 2,
  },
];

const recentActivity = [
  { type: 'earned', amount: 2, description: 'Teaching JavaScript basics' },
  { type: 'spent', amount: 1, description: 'Learning Figma with Maya' },
  { type: 'earned', amount: 1, description: 'Quiz completion bonus' },
];

const skillSuggestions = ['Machine Learning', 'UI/UX Design', 'Data Science', 'Blockchain', 'Cloud Computing'];

export default function Dashboard() {
  const { user } = useGlobal();
  const [spinning, setSpinning] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(skillSuggestions[0]);

  const spinRoulette = () => {
    if (spinning) return;
    setSpinning(true);
    
    let count = 0;
    const interval = setInterval(() => {
      setCurrentSuggestion(skillSuggestions[Math.floor(Math.random() * skillSuggestions.length)]);
      count++;
      if (count > 10) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 100);
  };

  return (
    <DashboardLayout>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  Welcome back, {user.name || 'Learner'}! 👋
                </h1>
                <p className="text-muted-foreground">
                  You have {user.coins} coins ready to spend on learning
                </p>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">This week</p>
                  <p className="font-semibold text-primary">+3 hours taught</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Career GPS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                AI Career GPS
              </h2>
              <span className="text-sm text-muted-foreground">Web Development Path</span>
            </div>

            {/* Metro Map */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted rounded-full -translate-y-1/2" />
              <div className="flex justify-between relative">
                {roadmapNodes.map((node, i) => (
                  <div key={node.id} className="flex flex-col items-center z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        node.status === 'completed'
                          ? 'bg-green-500 text-white'
                          : node.status === 'current'
                          ? 'bg-secondary text-white animate-pulse blue-glow'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {node.status === 'completed' ? (
                        <Check className="w-5 h-5" />
                      ) : node.status === 'locked' ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </motion.div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        node.status === 'current' ? 'text-secondary' : 'text-muted-foreground'
                      }`}
                    >
                      {node.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Upcoming Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                Upcoming Sessions
              </h2>
              <Link to="/marketplace" className="text-sm text-primary hover:underline">
                Browse all
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingSessions.map((session, i) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={session.avatar}
                      alt={session.mentor}
                      className="w-12 h-12 rounded-full bg-muted"
                    />
                    <div>
                      <h3 className="font-semibold">{session.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        with {session.mentor} • Starts in {session.startsIn}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/session/${session.id}`}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    Join
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Skill Roulette */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 rounded-2xl"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shuffle className="w-5 h-5 text-purple" />
              Skill Roulette
            </h2>
            <div className="text-center">
              <motion.div
                animate={spinning ? { rotate: 360 } : {}}
                transition={{ duration: 0.5, ease: 'linear', repeat: spinning ? Infinity : 0 }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple to-purple/50 flex items-center justify-center"
              >
                <Shuffle className="w-8 h-8 text-white" />
              </motion.div>
              <p className="text-lg font-medium mb-4">{currentSuggestion}</p>
              <button
                onClick={spinRoulette}
                disabled={spinning}
                className="w-full py-3 rounded-xl bg-purple/20 text-purple font-medium hover:bg-purple/30 transition-colors disabled:opacity-50"
              >
                {spinning ? 'Spinning...' : 'Discover New Skill'}
              </button>
            </div>
          </motion.div>

          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 rounded-2xl"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Level Progress
            </h2>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center gold-glow">
                <span className="text-3xl font-bold text-primary-foreground">{user.level}</span>
              </div>
              <p className="text-lg font-semibold mb-1">{user.levelTitle}</p>
              <p className="text-sm text-muted-foreground mb-4">340 XP to next level</p>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6 rounded-2xl"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-secondary" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <span
                    className={`font-semibold ${
                      activity.type === 'earned' ? 'text-green-500' : 'text-accent'
                    }`}
                  >
                    {activity.type === 'earned' ? '+' : '-'}{activity.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6 rounded-2xl"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/marketplace"
                className="w-full py-3 rounded-xl bg-secondary/20 text-secondary font-medium hover:bg-secondary/30 transition-colors block text-center"
              >
                Find a Mentor
              </Link>
              <Link
                to="/session/new"
                className="w-full py-3 rounded-xl bg-primary/20 text-primary font-medium hover:bg-primary/30 transition-colors block text-center"
              >
                Start Teaching
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
