import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { X, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TransactionHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const transactions = [
    { id: 1, type: 'credit', amount: 50, description: 'Completed "Python Basics"', date: 'Today, 10:30 AM' },
    { id: 2, type: 'debit', amount: 10, description: 'Booked "React Masterclass"', date: 'Yesterday, 2:15 PM' },
    { id: 3, type: 'credit', amount: 20, description: 'Mentored "CSS Grid"', date: 'Dec 12, 11:00 AM' },
    { id: 4, type: 'debit', amount: 5, description: 'Downloaded Resource Pack', date: 'Dec 10, 09:45 AM' },
    { id: 5, type: 'credit', amount: 100, description: 'Level Up Bonus: Apprentice', date: 'Dec 08, 04:20 PM' },
];

export const TransactionHistoryModal = ({ isOpen, onClose }: TransactionHistoryModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#0f1115] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                    <div>
                        <h2 className="text-xl font-bold text-white">Transaction History</h2>
                        <p className="text-sm text-neutral-400">Your coin activity</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors text-neutral-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <ScrollArea className="h-[400px] p-2">
                    <div className="space-y-2 p-4">
                        {transactions.map((tx, i) => (
                            <motion.div
                                key={tx.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                                        }`}>
                                        {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm">{tx.description}</p>
                                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-0.5">
                                            <Clock className="w-3 h-3" />
                                            <span>{tx.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`font-mono font-bold ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'
                                    }`}>
                                    {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollArea>
            </motion.div>
        </div>
    );
};
