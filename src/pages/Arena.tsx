import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useGlobal } from '@/contexts/GlobalContext';
import { mockDb, Challenge } from '@/services/mockDb';
import { toast } from 'sonner';
import { Swords, Plus, Coins, Trophy, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Arena() {
    const { user, updateCoins } = useGlobal();
    const [activeTab, setActiveTab] = useState<'challenges' | 'create'>('challenges');
    const [challenges, setChallenges] = useState<Challenge[]>(mockDb.getChallenges());
    const [dueling, setDueling] = useState<string | null>(null);

    // Create Challenge State
    const [topic, setTopic] = useState('React.js');
    const [wager, setWager] = useState(5);

    const topics = ['React.js', 'CSS Mastery', 'JavaScript Core', 'Python Basics', 'UI Design'];

    const handleCreateChallenge = () => {
        if (user.coins < wager) {
            toast.error('Not enough coins to create this wager!');
            return;
        }

        const newChallenge = mockDb.addChallenge({
            creatorId: user.id || 'me',
            creatorName: user.name || 'Me',
            topic,
            amount: wager,
        });

        updateCoins(-wager);
        setChallenges(mockDb.getChallenges());
        setActiveTab('challenges');
        toast.success('Challenge created! Coins deducted.');
    };

    const handleAcceptDuel = (challengeId: string) => {
        const challenge = challenges.find(c => c.id === challengeId);
        if (!challenge) return;

        if (user.coins < challenge.amount) {
            toast.error('Not enough coins to accept this duel!');
            return;
        }

        setDueling(challengeId);

        // Simulate Battle
        setTimeout(() => {
            // 50/50 Chance
            const win = Math.random() > 0.5;

            if (win) {
                const reward = challenge.amount * 2;
                updateCoins(reward); // Deducted? No, we pay entry fee first technically, but lets simplify:
                // Logic: 
                // 1. User pays wager (entry fee)
                // 2. If win, gets 2x wager (their fee + opponent fee)
                // 3. If lose, gets 0 (fee lost)

                // Let's implement correct deduction first:
                // updateCoins(-challenge.amount); // Charge entry
                // Wait, if I deduuct, then add 2x, net is +1x. 
                // If I lose, deduct 1x, net is -1x. 
                // Correct.

                updateCoins(-challenge.amount); // Pay entry

                setTimeout(() => {
                    updateCoins(challenge.amount * 2); // Win pot
                    toast.success(`Victory! You won ${challenge.amount * 2} coins!`);
                    confetti();
                }, 500);

            } else {
                updateCoins(-challenge.amount); // Lost entry fee
                toast.error('Defeat! Better luck next time.');
            }

            mockDb.removeChallenge(challengeId);
            setChallenges(mockDb.getChallenges());
            setDueling(null);
        }, 2000);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900 to-black p-8 text-white border border-red-500/30"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Swords size={200} />
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                            <Swords className="text-red-500" />
                            SKILL ARENA
                        </h1>
                        <p className="text-red-200 max-w-lg">
                            Wager your coins in 1v1 duels. Winner takes all. Do you have what it takes?
                        </p>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-white/10 pb-1">
                    <button
                        onClick={() => setActiveTab('challenges')}
                        className={`px-6 py-3 font-bold transition-all ${activeTab === 'challenges'
                                ? 'text-red-500 border-b-2 border-red-500'
                                : 'text-muted-foreground hover:text-white'
                            }`}
                    >
                        Active Challenges
                    </button>
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`px-6 py-3 font-bold transition-all ${activeTab === 'create'
                                ? 'text-red-500 border-b-2 border-red-500'
                                : 'text-muted-foreground hover:text-white'
                            }`}
                    >
                        Create Challenge
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'challenges' ? (
                        <motion.div
                            key="challenges"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid md:grid-cols-2 gap-4"
                        >
                            {challenges.length === 0 ? (
                                <div className="col-span-2 py-10 text-center text-muted-foreground">
                                    No active challenges. Be the first to start one!
                                </div>
                            ) : (
                                challenges.map((challenge) => (
                                    <div key={challenge.id} className="glass-card p-6 flex items-center justify-between border-l-4 border-l-red-500">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{challenge.topic}</h3>
                                            <p className="text-sm text-muted-foreground">vs {challenge.creatorName}</p>
                                        </div>

                                        {dueling === challenge.id ? (
                                            <div className="animate-pulse font-bold text-red-500 flex items-center gap-2">
                                                <Swords className="animate-spin" /> BATTLING...
                                            </div>
                                        ) : (
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 justify-end text-gold font-bold mb-2">
                                                    <Coins size={16} /> {challenge.amount}
                                                </div>
                                                <button
                                                    onClick={() => handleAcceptDuel(challenge.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-red-900/20"
                                                >
                                                    ACCEPT DUEL
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="create"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-xl mx-auto glass-card p-8"
                        >
                            <h3 className="text-xl font-bold mb-6">Create a New Wager</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2">Topic</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {topics.map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setTopic(t)}
                                                className={`p-3 rounded-xl border transition-all ${topic === t ? 'border-red-500 bg-red-500/10 text-white' : 'border-white/10 hover:bg-white/5'
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2 flex justify-between">
                                        <span>Wager Amount</span>
                                        <span className="text-gold font-bold">{wager} Coins</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={wager}
                                        onChange={(e) => setWager(parseInt(e.target.value))}
                                        className="w-full accent-red-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                <button
                                    onClick={handleCreateChallenge}
                                    className="w-full py-4 bg-gradient-to-r from-red-600 to-red-800 rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-xl"
                                >
                                    POST WAGER (-{wager} Coins)
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}
