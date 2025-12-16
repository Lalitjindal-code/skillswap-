import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  Download, 
  Star, 
  ExternalLink,
  Award,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { useGlobal } from '@/contexts/GlobalContext';
import { PageTransition, staggerContainer, staggerItem } from '@/components/PageTransition';

const mockSkills = [
  { name: 'React', verified: true, rating: 4.8, hash: '0x7d3f...a9b2', sessions: 24 },
  { name: 'TypeScript', verified: true, rating: 4.6, hash: '0x8e4a...c1d3', sessions: 18 },
  { name: 'Node.js', verified: true, rating: 4.5, hash: '0x9f5b...d2e4', sessions: 12 },
  { name: 'Python', verified: false, rating: 0, hash: '', sessions: 0 },
];

const stats = [
  { label: 'Sessions', value: '54', icon: Clock },
  { label: 'Students', value: '127', icon: Users },
  { label: 'Rating', value: '4.7', icon: Star },
  { label: 'Level', value: '7', icon: TrendingUp },
];

export default function ProfileCV() {
  const { user } = useGlobal();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>

          {/* Holographic Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="relative"
          >
            {/* Holographic Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-purple/20 rounded-3xl blur-xl" />
            
            <div className="relative glass-card rounded-3xl p-8 border border-white/20 overflow-hidden">
              {/* Animated Gradient Overlay */}
              <motion.div
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 opacity-10"
                style={{
                  background: 'linear-gradient(45deg, transparent, rgba(255,215,0,0.3), transparent, rgba(0,255,255,0.3), transparent)',
                  backgroundSize: '400% 400%',
                }}
              />

              {/* Header */}
              <div className="relative flex items-start gap-6 mb-8">
                {/* Avatar with Verified Shield */}
                <div className="relative">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-secondary p-1"
                  >
                    <img
                      src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                      alt="Profile"
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
                  >
                    <Shield className="w-5 h-5 text-white" />
                  </motion.div>
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1">{user.name || 'Anonymous User'}</h1>
                  <p className="text-muted-foreground mb-3">{user.email || 'user@skillswap.com'}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                      Level {user.level}
                    </span>
                    {user.isPro && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium">
                        PRO
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-4 gap-4 mb-8"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    variants={staggerItem}
                    className="text-center p-4 rounded-xl bg-muted/30"
                  >
                    <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Verified Skills */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Verified Skills
                </h2>
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="space-y-3"
                >
                  {mockSkills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      variants={staggerItem}
                      className={`p-4 rounded-xl ${
                        skill.verified 
                          ? 'bg-gradient-to-r from-muted/50 to-muted/30 border border-primary/20' 
                          : 'bg-muted/20 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {skill.verified ? (
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                              <Shield className="w-4 h-4 text-green-500" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                              <span className="text-xs">🔒</span>
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{skill.name}</p>
                            {skill.verified && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="w-3 h-3 fill-primary text-primary" />
                                <span>{skill.rating}</span>
                                <span className="mx-1">•</span>
                                <span>{skill.sessions} sessions</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {skill.verified && (
                          <motion.a
                            href="#"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(var(--primary), 0.5)' }}
                            className="px-3 py-1.5 rounded-lg bg-muted/50 text-xs font-mono flex items-center gap-2 hover:text-primary transition-colors"
                          >
                            {skill.hash}
                            <ExternalLink className="w-3 h-3" />
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                {/* Shimmer Effect */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                <span className="relative z-10 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%] animate-gradient">
                  Download Verified PDF
                </span>
                <Download className="w-5 h-5 text-primary relative z-10" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
