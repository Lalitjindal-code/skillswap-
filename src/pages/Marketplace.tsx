import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Eye, Users, Coins, ChevronRight, Radio, TrendingUp, Sparkles } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useGlobal } from '@/contexts/GlobalContext';
import { toast } from 'sonner';
import { RequestTopicModal } from '@/components/RequestTopicModal';

// ... (keep liveMentors and groupPools arrays same as before)
const liveMentors = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    topic: 'Building REST APIs',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1031&auto=format&fit=crop',
    viewers: 23,
    cost: 0.2,
  },
  {
    id: '2',
    name: 'Maya Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya',
    topic: 'UI/UX Design Process',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1000&auto=format&fit=crop',
    viewers: 45,
    cost: 0.2,
  },
  {
    id: '3',
    name: 'Jordan Lee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
    topic: 'Data Structures',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1000&auto=format&fit=crop',
    viewers: 18,
    cost: 0.2,
  },
  {
    id: '4',
    name: 'Sam Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam',
    topic: 'Machine Learning Basics',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop',
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

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState<'shadow' | 'pool'>('shadow');
  const [pools, setPools] = useState(groupPools);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
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

  const handleCreateTopic = (topic: string, targetCoins: number) => {
    const newPool = {
      id: Date.now().toString(),
      topic,
      requester: 'You',
      targetCoins,
      currentCoins: 0,
      participants: 1,
    };
    setPools([newPool, ...pools]);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 text-foreground flex items-center gap-3">
            Marketplace <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </h1>
          <p className="text-foreground/70">
            Discover new learning opportunities and collaborate with others
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('shadow')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'shadow'
              ? 'bg-purple/20 text-purple border border-purple/30 gold-glow'
              : 'glass-card hover:bg-muted/50'
              }`}
          >
            <Eye className="w-5 h-5" />
            Shadow Mode
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('pool')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'pool'
              ? 'bg-secondary/20 text-secondary border border-secondary/30 teal-glow'
              : 'glass-card hover:bg-muted/50'
              }`}
          >
            <Users className="w-5 h-5" />
            Group Pool
          </motion.button>
        </div>

        {/* Content */}
        {activeTab === 'shadow' ? (
          <motion.div
            key="shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Live Mentors</h2>
              <div className="flex items-center gap-2 text-muted-foreground bg-black/30 px-3 py-1 rounded-full border border-white/5">
                <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="text-sm font-medium text-white">{liveMentors.length} live now</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pb-20">
              {liveMentors.map((mentor, i) => (
                <TiltCard key={mentor.id} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="glass-card rounded-2xl overflow-hidden hover:border-purple/50 transition-all group h-full cursor-pointer relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple/0 via-purple/5 to-purple/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

                    {/* Preview */}
                    <div className="aspect-video bg-muted/30 relative overflow-hidden">
                      <motion.img
                        src={mentor.image}
                        alt={mentor.topic}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.8 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded-md bg-red-500/90 text-white text-xs font-bold shadow-lg animate-pulse z-20">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        LIVE
                      </div>

                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-xs border border-white/10 text-white z-20">
                        <Eye className="w-3.5 h-3.5 text-purple-400" />
                        <span className="font-medium">{mentor.viewers} watching</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5 relative z-20 bg-background/5 backdrop-blur-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={mentor.avatar}
                            alt={mentor.name}
                            className="w-12 h-12 rounded-full border-2 border-purple/20 group-hover:border-purple transition-colors p-0.5"
                          />
                          <div>
                            <h3 className="font-bold text-lg group-hover:text-purple-300 transition-colors">{mentor.name}</h3>
                            <p className="text-sm text-muted-foreground">{mentor.topic}</p>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleShadowMode(mentor)}
                        className="w-full py-3.5 rounded-xl bg-purple/10 text-purple font-semibold hover:bg-purple hover:text-white transition-all flex items-center justify-center gap-2 border border-purple/20 group-hover:border-purple/50 shadow-lg shadow-purple/5"
                      >
                        <Eye className="w-5 h-5" />
                        Enter Shadow Mode
                        <div className="ml-auto flex items-center gap-1 text-xs bg-black/20 px-2 py-1 rounded-lg">
                          <Coins className="w-3 h-3 text-gold" />
                          <span className="text-gold font-bold">{mentor.cost}</span>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pool"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Requested Topics</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRequestModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-secondary/20 text-secondary font-medium hover:bg-secondary/30 transition-colors border border-secondary/20 hover:shadow-[0_0_15px_rgba(20,184,166,0.2)]"
              >
                Request Topic
              </motion.button>
            </div>

            <div className="space-y-4 pb-20">
              {pools.map((pool, i) => (
                <motion.div
                  key={pool.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.01 }}
                  className="glass-card p-6 rounded-2xl hover:border-secondary/50 transition-all border border-white/5 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div>
                      <h3 className="text-lg font-bold mb-1 group-hover:text-secondary-300 transition-colors">{pool.topic}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {pool.participants} participants
                        {pool.requester === 'You' && <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded ml-2 font-bold">You</span>}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary flex items-center gap-1">
                        <Coins className="w-6 h-6 animate-pulse" />
                        {pool.currentCoins}<span className="text-sm text-muted-foreground">/{pool.targetCoins}</span>
                      </p>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Funded</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-4 bg-black/40 rounded-full overflow-hidden mb-4 border border-white/5 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(pool.currentCoins / pool.targetCoins) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1), type: "spring" }}
                      className="h-full bg-gradient-to-r from-primary via-yellow-300 to-primary rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-secondary" />
                      {pool.currentCoins >= pool.targetCoins
                        ? <span className="text-secondary font-bold">Fully funded! Session coming soon</span>
                        : <span>{pool.targetCoins - pool.currentCoins} more coins needed</span>
                      }
                    </div>
                    {pool.currentCoins < pool.targetCoins && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChipIn(pool.id)}
                        className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
                      >
                        Chip In 1 Coin
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      <RequestTopicModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={handleCreateTopic}
      />
    </DashboardLayout>
  );
}
