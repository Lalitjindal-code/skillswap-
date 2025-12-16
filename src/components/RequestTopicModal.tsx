import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquarePlus, Coins } from 'lucide-react';
import { toast } from 'sonner';

interface RequestTopicModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (topic: string, coins: number) => void;
}

export const RequestTopicModal = ({ isOpen, onClose, onSubmit }: RequestTopicModalProps) => {
    const [topic, setTopic] = useState('');
    const [targetCoins, setTargetCoins] = useState(10);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            toast.error('Please enter a topic');
            return;
        }
        onSubmit(topic, targetCoins);
        setTopic('');
        setTargetCoins(10);
        onClose();
        toast.success('Topic requested successfully!');
    };

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
                        className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                                    <MessageSquarePlus className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Request Topic</h2>
                                    <p className="text-xs text-muted-foreground">Start a crowdfunding pool</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                                    Topic Name
                                </label>
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g., Advanced TypeScript Patterns"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5 flex justify-between">
                                    Target Coins
                                    <span className="text-secondary font-bold">{targetCoins} Coins</span>
                                </label>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    step="5"
                                    value={targetCoins}
                                    onChange={(e) => setTargetCoins(Number(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-secondary"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                    <span>5 Coins</span>
                                    <span>50 Coins</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Coins className="w-4 h-4" />
                                    Create Pool
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
