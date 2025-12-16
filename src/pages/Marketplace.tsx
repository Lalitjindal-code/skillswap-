import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Users, Coins, ChevronRight, Radio, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useGlobal } from '@/contexts/GlobalContext';
import { toast } from 'sonner';

const liveMentors = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    topic: 'Building REST APIs',
    viewers: 23,
    cost: 0.2,
  },
  {
    id: '2',
    name: 'Maya Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya',
    topic: 'UI/UX Design Process',
    viewers: 45,
    cost: 0.2,
  },
  {
    id: '3',
    name: 'Jordan Lee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
    topic: 'Data Structures',
    viewers: 18,
    cost: 0.2,
  },
  {
    id: '4',
    name: 'Sam Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam',
    topic: 'Machine Learning Basics',
    viewers: 67,
    cost: 0.2,
  },
];

const groupPools = [
  {
    id: '1',
    topic: 'Advanced React Patterns',
    requester: 'Community',
    targetCoins: 5,
    currentCoins: 3,
    participants: 12,
  },
  {
    id: '2',
    topic: 'System Design Interview Prep',
    requester: 'Community',
    targetCoins: 8,
    currentCoins: 6,
    participants: 24,
  },
  {
    id: '3',
    topic: 'Blockchain Development',
    requester: 'Community',
    targetCoins: 10,
    currentCoins: 4,
    participants: 18,
  },
];

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState<'shadow' | 'pool'>('shadow');
  const [pools, setPools] = useState(groupPools);
  const { user, updateCoins } = useGlobal();

  const handleShadowMode = (mentor: typeof liveMentors[0]) => {
    if (user.coins < mentor.cost) {
      toast.error('Not enough coins!');
      return;
    }
    updateCoins(-mentor.cost);
    toast.success(`Entering Shadow Mode with ${mentor.name}...`);
  };

  const handleChipIn = (poolId: string) => {
    if (user.coins < 1) {
      toast.error('Not enough coins!');
      return;
    }
    updateCoins(-1);
    setPools(prev => prev.map(p => 
      p.id === poolId 
        ? { ...p, currentCoins: Math.min(p.currentCoins + 1, p.targetCoins) }
        : p
    ));
    toast.success('Chipped in 1 coin!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 text-foreground">Marketplace</h1>
          <p className="text-foreground/70">
            Discover new learning opportunities and collaborate with others
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('shadow')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'shadow'
                ? 'bg-purple/20 text-purple border border-purple/30'
                : 'glass-card hover:bg-muted/50'
            }`}
          >
            <Eye className="w-5 h-5" />
            Shadow Mode
          </button>
          <button
            onClick={() => setActiveTab('pool')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'pool'
                ? 'bg-secondary/20 text-secondary border border-secondary/30'
                : 'glass-card hover:bg-muted/50'
            }`}
          >
            <Users className="w-5 h-5" />
            Group Pool
          </button>
        </div>

        {/* Content */}
        {activeTab === 'shadow' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Live Mentors</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Radio className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-sm">{liveMentors.length} live now</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {liveMentors.map((mentor, i) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden hover:border-purple/30 transition-all group"
                >
                  {/* Preview */}
                  <div className="aspect-video bg-muted/30 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-secondary/20" />
                    <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded-md bg-accent/90 text-accent-foreground text-xs">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      LIVE
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-background/80 text-xs">
                      <Eye className="w-3 h-3" />
                      {mentor.viewers} watching
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={mentor.avatar}
                          alt={mentor.name}
                          className="w-10 h-10 rounded-full bg-muted"
                        />
                        <div>
                          <h3 className="font-semibold">{mentor.name}</h3>
                          <p className="text-sm text-muted-foreground">{mentor.topic}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleShadowMode(mentor)}
                      className="w-full py-3 rounded-xl bg-purple/20 text-purple font-medium hover:bg-purple/30 transition-colors flex items-center justify-center gap-2 group-hover:bg-purple group-hover:text-white"
                    >
                      <Eye className="w-4 h-4" />
                      Enter Shadow Mode
                      <span className="ml-auto flex items-center gap-1 text-sm">
                        <Coins className="w-4 h-4" />
                        {mentor.cost}
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Requested Topics</h2>
              <button className="px-4 py-2 rounded-xl bg-secondary/20 text-secondary font-medium hover:bg-secondary/30 transition-colors">
                Request Topic
              </button>
            </div>

            <div className="space-y-4">
              {pools.map((pool, i) => (
                <motion.div
                  key={pool.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 rounded-2xl hover:border-secondary/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{pool.topic}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {pool.participants} participants
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary flex items-center gap-1">
                        <Coins className="w-5 h-5" />
                        {pool.currentCoins}/{pool.targetCoins}
                      </p>
                      <p className="text-sm text-muted-foreground">coins collected</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(pool.currentCoins / pool.targetCoins) * 100}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      {pool.currentCoins >= pool.targetCoins 
                        ? 'Fully funded! Session coming soon'
                        : `${pool.targetCoins - pool.currentCoins} more coins needed`
                      }
                    </div>
                    {pool.currentCoins < pool.targetCoins && (
                      <button
                        onClick={() => handleChipIn(pool.id)}
                        className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                      >
                        Chip In 1 Coin
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
