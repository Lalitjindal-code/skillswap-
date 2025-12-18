import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useGlobal } from '@/contexts/GlobalContext';
import { mockDb, Internship, Project } from '@/services/mockDb';
import { toast } from 'sonner';
import { Briefcase, Rocket, Coins, Users, CheckCircle2 } from 'lucide-react';

export default function Opportunities() {
    const { user, updateCoins } = useGlobal();
    const [internships, setInternships] = useState<Internship[]>(mockDb.getInternships());
    const [projects, setProjects] = useState<Project[]>(mockDb.getProjects());

    const handleApply = (id: string) => {
        // Just a visual update for demo
        setInternships(prev =>
            prev.map(i => i.id === id ? { ...i, status: 'assigned' } : i)
        );
        toast.success('Application sent to Employer!');
    };

    const handleBackProject = (id: string) => {
        const amount = 2;
        if (user.coins < amount) {
            toast.error('Not enough coins to back this project!');
            return;
        }

        updateCoins(-amount);

        const updatedProject = mockDb.updateProject(id, {
            raised: (projects.find(p => p.id === id)?.raised || 0) + amount
        });

        if (updatedProject) {
            setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
            toast.success(`Backed ${updatedProject.title} with ${amount} coins!`);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold mb-2">Earn & Grow Hub</h1>
                    <p className="text-muted-foreground">Find work or support the next big thing.</p>
                </motion.div>

                {/* Section A: Micro-Internships */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="text-primary" />
                        <h2 className="text-xl font-bold">Micro-Internships</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {internships.map((job) => (
                            <motion.div
                                key={job.id}
                                whileHover={{ y: -5 }}
                                className="glass-card p-5 relative overflow-hidden group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                                        <Briefcase size={20} />
                                    </div>
                                    <div className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-bold flex items-center gap-1">
                                        <Coins size={12} /> {job.reward}
                                    </div>
                                </div>

                                <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

                                <button
                                    onClick={() => handleApply(job.id)}
                                    disabled={job.status !== 'open'}
                                    className={`w-full py-2 rounded-lg font-semibold transition-all ${job.status === 'open'
                                            ? 'bg-secondary/20 text-secondary hover:bg-secondary hover:text-white'
                                            : 'bg-green-500/20 text-green-500 cursor-default'
                                        }`}
                                >
                                    {job.status === 'open' ? 'Apply Now' : 'Applied ✓'}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Section B: Project Kickstarter */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Rocket className="text-purple-500" />
                        <h2 className="text-xl font-bold">Project Kickstarter</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => {
                            const progress = Math.min((project.raised / project.goal) * 100, 100);
                            return (
                                <motion.div
                                    key={project.id}
                                    whileHover={{ y: -5 }}
                                    className="glass-card p-0 overflow-hidden flex flex-col"
                                >
                                    <div className="h-24 bg-gradient-to-r from-purple-900 to-indigo-900 mx-1 mt-1 rounded-t-xl relative p-4">
                                        <h3 className="text-white font-bold text-lg">{project.title}</h3>
                                        <div className="absolute top-2 right-2 text-xs text-white/70 bg-black/30 px-2 py-1 rounded">
                                            by {project.creatorName}
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <p className="text-sm text-muted-foreground mb-4 flex-1">
                                            {project.description}
                                        </p>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between text-xs font-semibold">
                                                <span>{project.raised} Raised</span>
                                                <span className="text-muted-foreground">Goal: {project.goal}</span>
                                            </div>
                                            <div className="h-2 bg-secondary/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleBackProject(project.id)}
                                            className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                                        >
                                            <span>Back Project</span>
                                            <span className="text-xs bg-black/20 px-1.5 py-0.5 rounded">(2 Coins)</span>
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}
