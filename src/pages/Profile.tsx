import { motion } from 'framer-motion';
import { 
  Star, 
  Shield, 
  ExternalLink, 
  Trophy, 
  Coins, 
  Clock, 
  Users,
  ArrowRight,
  Heart
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useGlobal } from '@/contexts/GlobalContext';

const mockVerifiedSkills = [
  { name: 'React', rating: 4.8, hash: '0x7f3a...b2c1', sessions: 24 },
  { name: 'JavaScript', rating: 4.5, hash: '0x9d2e...f4a8', sessions: 18 },
  { name: 'TypeScript', rating: 4.2, hash: '0x1c5b...e3d7', sessions: 12 },
];

const kindnessChain = [
  { name: 'You', type: 'origin' },
  { name: 'Amit', type: 'taught' },
  { name: 'Sarah', type: 'taught' },
  { name: 'Mike', type: 'taught' },
  { name: 'Lisa', type: 'taught' },
];

const stats = [
  { icon: Clock, label: 'Hours Taught', value: '48' },
  { icon: Users, label: 'Students Helped', value: '32' },
  { icon: Star, label: 'Avg Rating', value: '4.6' },
  { icon: Coins, label: 'Coins Earned', value: '86' },
];

export default function Profile() {
  const { user } = useGlobal();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-2xl text-gray-700"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar with Ring */}
            <div className="relative">
              <div className={`w-32 h-32 rounded-full p-1 ${
                user.isPro 
                  ? 'bg-gradient-to-br from-primary to-primary/60 gold-glow' 
                  : 'bg-muted'
              }`}>
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || 'default'}`}
                  alt="Profile"
                  className="w-full h-full rounded-full bg-card"
                />
              </div>
              {user.isPro && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-2xl font-bold">{user.name || 'Learner'}</h1>
                {user.isPro && (
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-4">{user.email || 'user@skillswap.com'}</p>
              
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="px-4 py-2 rounded-xl bg-muted/50 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-secondary" />
                  Level {user.level} {user.levelTitle}
                </span>
                <span className="px-4 py-2 rounded-xl bg-primary/20 text-primary text-sm font-medium flex items-center gap-2">
                  <Coins className="w-4 h-4" />
                  {user.coins} Coins
                </span>
              </div>
            </div>

            <button className="px-6 py-3 rounded-xl glass-card hover:bg-muted/50 transition-colors font-medium">
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-4 rounded-xl text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Verified CV */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" />
              Verified Skills CV
            </h2>
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              Export CV
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {mockVerifiedSkills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-primary fill-primary" />
                        {skill.rating}
                      </span>
                      <span>•</span>
                      <span>{skill.sessions} sessions</span>
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-secondary hover:underline"
                >
                  <span className="font-mono">{skill.hash}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          {mockVerifiedSkills.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No verified skills yet. Complete the verification quiz to get started!</p>
            </div>
          )}
        </motion.div>

        {/* Kindness Chain */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent" />
            Kindness Chain
          </h2>
          <p className="text-muted-foreground mb-6">
            Your knowledge has rippled through the community. See how your teaching has created a chain of learning!
          </p>

          {/* Chain Visualization */}
          <div className="flex items-center justify-center flex-wrap gap-2 py-6">
            {kindnessChain.map((node, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    i === 0
                      ? 'bg-gradient-to-br from-primary to-primary/60 gold-glow'
                      : 'bg-muted/50'
                  }`}
                >
                  <span className={`font-semibold ${i === 0 ? 'text-primary-foreground' : ''}`}>
                    {node.name.charAt(0)}
                  </span>
                </motion.div>
                {i < kindnessChain.length - 1 && (
                  <ArrowRight className="w-5 h-5 mx-2 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <p className="text-lg">
              <span className="text-primary font-bold">{kindnessChain.length - 1}</span>
              <span className="text-muted-foreground"> people learned from your chain!</span>
            </p>
          </div>
        </motion.div>

        {/* Upgrade CTA */}
        {!user.isPro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 rounded-2xl border-primary/30 gold-glow"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Upgrade to PRO</h3>
                <p className="text-muted-foreground">
                  Unlock unlimited sessions, priority support, and exclusive features
                </p>
              </div>
              <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors gold-glow whitespace-nowrap">
                Upgrade for ₹99/month
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
