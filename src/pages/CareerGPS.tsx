import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Lock,
  ChevronRight,
  X,
  Clock,
  BookOpen,
  Play,
  Search,
  Sparkles
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageTransition, staggerContainer, staggerItem } from '@/components/PageTransition';
import { CareerPathNode, SyllabusItem } from '@/services/gemini';
import { toast } from 'sonner';

export default function CareerGPS() {
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [path, setPath] = useState<CareerPathNode[]>([]);
  const [syllabus, setSyllabus] = useState<SyllabusItem[]>([]);
  const [selectedNode, setSelectedNode] = useState<CareerPathNode | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockPath: CareerPathNode[] = [
        {
          id: '1',
          name: 'Foundations',
          status: 'completed',
          duration: '2 weeks',
          description: 'Core concepts and basic syntax',
          lessons: 12
        },
        {
          id: '2',
          name: 'Advanced Concepts',
          status: 'active',
          duration: '3 weeks',
          description: 'Deep dive into complex topics',
          lessons: 18
        },
        {
          id: '3',
          name: 'Real-world Application',
          status: 'locked',
          duration: '4 weeks',
          description: 'Build production-ready projects',
          lessons: 8
        },
      ];

      const mockSyllabus: SyllabusItem[] = [
        { title: 'Project Structure & Setup', duration: '45 mins', completed: true },
        { title: 'Component Architecture', duration: '1.5 hours', completed: false },
        { title: 'State Management Patterns', duration: '2 hours', completed: false },
        { title: 'Performance Optimization', duration: '1 hour', completed: false },
      ];

      setPath(mockPath);
      setSyllabus(mockSyllabus);
      setHasGenerated(true);
      setIsLoading(false);
      toast.success(`Roadmap for ${topic} generated!`);
    }, 2000);
  };

  const [showTutors, setShowTutors] = useState(false);

  // Reset tutor view when node changes
  useEffect(() => {
    setShowTutors(false);
  }, [selectedNode]);

  const mockTutors = [
    { name: "Sarah Chen", role: "Senior Python Dev", rate: "₹800/hr", users: 120, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { name: "Amit Patel", role: "Data Scientist", rate: "₹600/hr", users: 85, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
    { name: "Jessica Lee", role: "Full Stack AI", rate: "₹950/hr", users: 200, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica" },
  ];

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">AI Career GPS</h1>
            <p className="text-muted-foreground">Your personalized learning roadmap powered by Gemini</p>
          </div>

          <form onSubmit={handleGenerate} className="mb-8 flex gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What do you want to learn? (e.g., Python, UI Design)"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Roadmap
                </>
              )}
            </button>
          </form>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary mb-6"
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-lg font-medium"
              >
                Creating your custom roadmap for "{topic}"...
              </motion.p>
            </div>
          ) : !hasGenerated ? (
            <div className="text-center py-20 bg-card/30 rounded-2xl border-2 border-dashed border-white/10">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Ready to Start?</h3>
              <p className="text-muted-foreground">Enter a topic above to generate a tailored learning path.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Vertical Metro Map */}
              <div className="lg:col-span-2">
                <div className="glass-card rounded-2xl p-8 mb-8 relative min-h-[500px]">
                  {/* Vertical Line Background */}
                  <div className="absolute left-[3.25rem] top-12 bottom-12 w-1 bg-white/5 rounded-full" />

                  <div className="flex flex-col gap-0">
                    {path.map((node, i) => (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative flex items-start group min-w-0" // min-w-0 fixes flex child overflow
                      >
                        {/* Connection Line Fragment (Active) */}
                        {i < path.length - 1 && (path[i + 1].status === 'completed' || node.status === 'completed') && (
                          <div className="absolute left-[3.25rem] top-16 bottom-[-3rem] w-1 bg-green-500 z-0" />
                        )}
                        {i < path.length - 1 && node.status === 'active' && (
                          <div className="absolute left-[3.25rem] top-16 bottom-[-3rem] w-1 bg-gradient-to-b from-primary to-white/5 z-0" />
                        )}

                        <motion.button
                          onClick={() => setSelectedNode(node)}
                          className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-4 border-background transition-all duration-300 ${node.status === 'completed' ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' :
                            node.status === 'active' ? 'bg-primary text-primary-foreground shadow-[0_0_30px_rgba(250,204,21,0.4)] scale-110' :
                              'bg-muted text-muted-foreground border-white/5'
                            }`}
                        >
                          {node.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> :
                            node.status === 'locked' ? <Lock className="w-5 h-5" /> :
                              <span className="font-bold">{node.id}</span>
                          }
                        </motion.button>

                        <div className="ml-6 pt-2 pb-12 w-full min-w-0">
                          <div
                            onClick={() => setSelectedNode(node)}
                            className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${node.status === 'active' ? 'bg-white/5 border-primary/30' :
                              'bg-transparent border-transparent hover:bg-white/5'
                              }`}
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                              <h3 className={`text-lg font-bold break-words pr-2 ${node.status === 'active' ? 'text-primary' : ''}`}>{node.name}</h3>
                              <span className="flex-shrink-0 text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded whitespace-nowrap">{node.duration}</span>
                            </div>
                            <p className="text-sm text-muted-foreground break-words">{node.description || `Master the core concepts of ${node.name}`}</p>

                            {node.status === 'active' && (
                              <div className="mt-4 flex gap-2">
                                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded flex items-center gap-1">
                                  <BookOpen className="w-3 h-3" /> {node.lessons} Lessons
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Stats */}
              <div className="lg:col-span-1 space-y-4">
                <motion.div variants={staggerItem} className="glass-card rounded-xl p-6 sticky top-6">
                  <p className="text-muted-foreground text-sm mb-1">Total Milestones</p>
                  <p className="text-3xl font-bold text-primary">{path.length}</p>
                  <div className="h-px bg-white/10 my-4" />
                  <p className="text-muted-foreground text-sm mb-1">Estimated Time</p>
                  <p className="text-3xl font-bold">3 Months</p>
                </motion.div>
              </div>
            </div>
          )}

          {/* Side Sheet */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex justify-end"
              >
                <div
                  className="absolute inset-0 bg-background/60 backdrop-blur-sm"
                  onClick={() => setSelectedNode(null)}
                />

                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25 }}
                  className="relative w-full max-w-md glass-panel h-full p-6 overflow-y-auto border-l border-white/10 shadow-2xl"
                >
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted/50 z-20"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="mb-6 relative">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold">
                      Milestone {selectedNode.id}
                    </span>
                    <h2 className="text-2xl font-bold mt-3">{selectedNode.name}</h2>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedNode.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {selectedNode.lessons} lessons
                      </span>
                    </div>
                  </div>

                  {!showTutors ? (
                    <>
                      <h3 className="font-semibold mb-4 text-lg">Module Syllabus</h3>
                      <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="space-y-3 mb-8"
                      >
                        {syllabus.map((item, i) => (
                          <motion.div
                            key={i}
                            variants={staggerItem}
                            className={`p-4 rounded-xl flex items-center justify-between ${item.completed ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/5 border border-white/5'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              {item.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : (
                                <Play className="w-5 h-5 text-primary" />
                              )}
                              <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.duration}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </motion.div>
                        ))}
                      </motion.div>

                      <div className="mt-auto">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowTutors(true)}
                          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20"
                        >
                          Start This Module
                        </motion.button>
                        <p className="text-center text-xs text-muted-foreground mt-3">
                          Starting will match you with expert mentors
                        </p>
                      </div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-2 mb-6 text-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Module Started!</span>
                      </div>

                      <h3 className="text-xl font-bold mb-2">Recommended Tutors</h3>
                      <p className="text-muted-foreground text-sm mb-6">Based on your learning style and this topic.</p>

                      <div className="space-y-4">
                        {mockTutors.map((tutor, i) => (
                          <div key={i} className="glass-card p-4 rounded-xl border border-white/10 hover:border-primary/50 transition-colors flex gap-4 items-center">
                            <img src={tutor.img} alt={tutor.name} className="w-12 h-12 rounded-full bg-white/10" />
                            <div className="flex-1">
                              <h4 className="font-bold">{tutor.name}</h4>
                              <p className="text-xs text-muted-foreground">{tutor.role}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">{tutor.rate}</p>
                              <button className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg mt-1 transition-colors">
                                Book
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setShowTutors(false)}
                        className="w-full mt-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-medium"
                      >
                        Back to Syllabus
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
