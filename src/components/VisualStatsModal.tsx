import { motion } from 'framer-motion';
import { X, Activity, GitCommit } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VisualStatsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VisualStatsModal = ({ isOpen, onClose }: VisualStatsModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-4xl bg-[#0f1115] rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                    <div>
                        <h2 className="text-xl font-bold text-white">Your Impact & Growth</h2>
                        <p className="text-sm text-neutral-400">Detailed analytics of your journey</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors text-neutral-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <ScrollArea className="max-h-[80vh]">
                    <div className="p-8 grid md:grid-cols-2 gap-8">
                        {/* Learning Velocity (Large) */}
                        <div className="glass-card p-6 rounded-2xl bg-white/5">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">Learning Velocity</h3>
                                    <p className="text-xs text-neutral-400">Weekly learning hours</p>
                                </div>
                            </div>

                            <div className="h-64 flex items-end justify-between gap-3 px-2 border-b border-white/5 pb-2">
                                {[30, 45, 25, 60, 75, 50, 80].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        className="w-full bg-gradient-to-t from-primary/20 to-primary/60 rounded-t-lg hover:from-primary/40 hover:to-primary relative group cursor-pointer"
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 px-3 py-1.5 rounded-lg text-sm font-bold text-primary border border-primary/20 pointer-events-none shadow-xl">
                                            {h} hours
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-sm text-neutral-500 font-medium px-2 uppercase tracking-wider">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                            </div>
                        </div>

                        {/* Kindness Tree (Large) */}
                        <div className="glass-card p-6 rounded-2xl bg-white/5 flex flex-col">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 rounded-lg bg-secondary/20 text-secondary">
                                    <GitCommit className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">Kindness Tree</h3>
                                    <p className="text-xs text-neutral-400">Visualizing your community impact</p>
                                </div>
                            </div>

                            <div className="flex-1 min-h-[300px] relative flex items-center justify-center bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                                {/* Background Grid */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

                                {/* Central Node */}
                                <div className="absolute top-1/2 left-[20%] -translate-y-1/2 z-10 group cursor-pointer">
                                    <motion.div
                                        animate={{ boxShadow: ['0 0 0 0 rgba(74, 222, 128, 0)', '0 0 0 10px rgba(74, 222, 128, 0.1)', '0 0 0 0 rgba(74, 222, 128, 0)'] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center shadow-lg border-4 border-background relative"
                                    >
                                        <span className="text-sm font-bold text-primary-foreground">You</span>
                                    </motion.div>
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-20 border border-white/10">
                                        3 people helped directly
                                    </div>
                                </div>

                                {/* Lines */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="none">
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d="M 80 150 C 200 150, 200 80, 320 80"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.2)"
                                        strokeWidth="3"
                                        strokeDasharray="5 5"
                                    />
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                                        d="M 80 150 C 200 150, 200 220, 320 220"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.2)"
                                        strokeWidth="3"
                                        strokeDasharray="5 5"
                                    />
                                </svg>

                                {/* Child Nodes */}
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }}
                                    className="absolute top-[20%] right-[15%] w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center cursor-pointer group hover:bg-secondary/40 transition-colors"
                                >
                                    <span className="text-sm font-bold text-secondary-foreground">R</span>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-20">
                                        Rahul
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}
                                    className="absolute bottom-[20%] right-[15%] w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center cursor-pointer hover:bg-secondary/40 transition-colors group"
                                >
                                    <span className="text-sm font-bold text-secondary-foreground">S</span>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-20">
                                        Sneha
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </motion.div>
        </div>
    );
};
