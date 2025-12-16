
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Lock, Unlock, Star, Crown } from 'lucide-react';
import { useGlobal } from '@/contexts/GlobalContext';

interface LevelDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const levels = [
    {
        level: 0,
        title: "Novice",
        xp: "0 - 100",
        benefits: ["Basic Access", "Join Sessions", "Create Profile"],
        icon: Star,
        color: "text-gray-400",
        bg: "bg-gray-400/10",
        border: "border-gray-400/20"
    },
    {
        level: 1,
        title: "Apprentice",
        xp: "100 - 500",
        benefits: ["Unlock Group Sessions", "Earn Verified Badges", "Join Communities"],
        icon: Trophy,
        color: "text-amber-600",
        bg: "bg-amber-600/10",
        border: "border-amber-600/20"
    },
    {
        level: 2,
        title: "Guide",
        xp: "500 - 2000",
        benefits: ["Unlock Paid Teaching", "Create Courses", "Mentor Others"],
        icon: Crown,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20"
    },
    {
        level: 3,
        title: "Master",
        xp: "2000+",
        benefits: ["Gold Ring Profile", "Top Search Ranking", "Premium Support"],
        icon: Crown,
        color: "text-yellow-300",
        bg: "bg-yellow-300/10",
        border: "border-yellow-300/20"
    }
];

export const LevelDetailsModal = ({ isOpen, onClose }: LevelDetailsModalProps) => {
    const { user } = useGlobal();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <div>
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500">
                                    Level Progression Map
                                </h2>
                                <p className="text-muted-foreground text-sm">Unlock new features as you gain experience</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            {levels.map((lvl) => {
                                const isUnlocked = user.level >= lvl.level;
                                const isNext = user.level === lvl.level - 1;

                                return (
                                    <div
                                        key={lvl.level}
                                        className={`relative p-5 rounded-2xl border transition-all ${isUnlocked
                                            ? `${lvl.bg} ${lvl.border}`
                                            : 'bg-white/5 border-white/5 opacity-60 grayscale'
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isUnlocked ? 'bg-black/20' : 'bg-white/5'
                                                }`}>
                                                <lvl.icon className={`w-6 h-6 ${isUnlocked ? lvl.color : 'text-white/30'}`} />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className={`text-xl font-bold ${isUnlocked ? 'text-white' : 'text-muted-foreground'}`}>
                                                            {lvl.title}
                                                        </h3>
                                                        {isUnlocked && (
                                                            <div className="text-[10px] font-bold px-2 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/30">
                                                                UNLOCKED
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-mono font-bold text-white/70">
                                                        XP: {lvl.xp}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 mt-3">
                                                    {lvl.benefits.map((benefit, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                                                            {isUnlocked ? (
                                                                <Unlock className="w-3 h-3 text-green-400" />
                                                            ) : (
                                                                <Lock className="w-3 h-3 text-white/30" />
                                                            )}
                                                            {benefit}
                                                        </div>
                                                    ))}
                                                </div>

                                                {isNext && (
                                                    <div className="mt-4 pt-4 border-t border-white/10">
                                                        <p className="text-xs font-bold text-primary mb-1">CURRENT GOAL (50/100 XP)</p>
                                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full w-1/2 bg-primary animate-pulse" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
