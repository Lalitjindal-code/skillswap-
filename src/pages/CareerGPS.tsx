import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Lock, 
  ChevronRight,
  X,
  Clock,
  BookOpen,
  Play
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageTransition, staggerContainer, staggerItem } from '@/components/PageTransition';

const careerPath = [
  { id: 1, name: 'HTML', status: 'completed', duration: '2 weeks', lessons: 12 },
  { id: 2, name: 'CSS', status: 'completed', duration: '3 weeks', lessons: 18 },
  { id: 3, name: 'JavaScript', status: 'completed', duration: '4 weeks', lessons: 24 },
  { id: 4, name: 'React', status: 'active', duration: '6 weeks', lessons: 30 },
  { id: 5, name: 'TypeScript', status: 'locked', duration: '3 weeks', lessons: 15 },
  { id: 6, name: 'Node.js', status: 'locked', duration: '4 weeks', lessons: 20 },
  { id: 7, name: 'Database', status: 'locked', duration: '3 weeks', lessons: 16 },
  { id: 8, name: 'DevOps', status: 'locked', duration: '4 weeks', lessons: 18 },
];

const syllabus = [
  { title: 'Introduction to React', duration: '45 min', completed: true },
  { title: 'Components & Props', duration: '60 min', completed: true },
  { title: 'State Management', duration: '90 min', completed: false },
  { title: 'Hooks Deep Dive', duration: '120 min', completed: false },
  { title: 'Context API', duration: '60 min', completed: false },
  { title: 'React Router', duration: '45 min', completed: false },
];

export default function CareerGPS() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<typeof careerPath[0] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">AI Career GPS</h1>
            <p className="text-muted-foreground">Your personalized learning roadmap</p>
          </div>

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
                AI is analyzing career paths...
              </motion.p>
              
              {/* Skeleton Metro Map */}
              <div className="w-full mt-10 overflow-x-auto">
                <div className="flex items-center gap-4 min-w-max px-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-16 h-16 rounded-full bg-muted"
                      />
                      {i < 7 && (
                        <motion.div
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                          className="w-20 h-2 bg-muted"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Metro Map */}
              <div className="glass-card rounded-2xl p-8 mb-8 overflow-x-auto">
                <div className="flex items-center gap-0 min-w-max">
                  {careerPath.map((node, i) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center"
                    >
                      {/* Node */}
                      <motion.button
                        whileHover={node.status !== 'locked' ? { scale: 1.1 } : {}}
                        whileTap={node.status !== 'locked' ? { scale: 0.95 } : {}}
                        onClick={() => node.status === 'active' && setSelectedNode(node)}
                        className={`relative flex flex-col items-center ${
                          node.status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        {/* Glow ring for active */}
                        {node.status === 'active' && (
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute w-20 h-20 rounded-full bg-primary/30"
                          />
                        )}
                        
                        <div
                          className={`relative w-16 h-16 rounded-full flex items-center justify-center z-10 ${
                            node.status === 'completed'
                              ? 'bg-green-500 text-white'
                              : node.status === 'active'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted/50 text-muted-foreground'
                          }`}
                        >
                          {node.status === 'completed' ? (
                            <CheckCircle2 className="w-8 h-8" />
                          ) : node.status === 'locked' ? (
                            <Lock className="w-6 h-6" />
                          ) : (
                            <span className="text-lg font-bold">{node.id}</span>
                          )}
                        </div>
                        
                        <span className={`mt-3 text-sm font-medium ${
                          node.status === 'locked' ? 'text-muted-foreground' : ''
                        }`}>
                          {node.name}
                        </span>
                      </motion.button>

                      {/* Connection Line */}
                      {i < careerPath.length - 1 && (
                        <div
                          className={`w-20 h-1 mx-2 rounded-full ${
                            careerPath[i + 1].status === 'completed' || node.status === 'completed'
                              ? 'bg-green-500'
                              : node.status === 'active'
                              ? 'bg-gradient-to-r from-primary to-muted'
                              : 'bg-muted/30'
                          }`}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <motion.div variants={staggerItem} className="glass-card rounded-xl p-6">
                  <p className="text-muted-foreground text-sm mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-500">3 Skills</p>
                </motion.div>
                <motion.div variants={staggerItem} className="glass-card rounded-xl p-6">
                  <p className="text-muted-foreground text-sm mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-primary">React</p>
                </motion.div>
                <motion.div variants={staggerItem} className="glass-card rounded-xl p-6">
                  <p className="text-muted-foreground text-sm mb-1">Est. Completion</p>
                  <p className="text-3xl font-bold">6 Months</p>
                </motion.div>
              </motion.div>
            </>
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
                  className="relative w-full max-w-md glass-panel h-full p-6 overflow-y-auto"
                >
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted/50"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="mb-6">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                      Currently Learning
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

                  <h3 className="font-semibold mb-4">Syllabus</h3>
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-3"
                  >
                    {syllabus.map((item, i) => (
                      <motion.div
                        key={i}
                        variants={staggerItem}
                        className={`p-4 rounded-xl flex items-center justify-between ${
                          item.completed ? 'bg-green-500/10' : 'bg-muted/30'
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

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold"
                  >
                    Continue Learning
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
