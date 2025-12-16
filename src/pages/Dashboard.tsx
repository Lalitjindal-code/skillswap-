import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  Clock,
  ChevronRight,
  ChevronLeft,
  Star,
  Check,
  Heart,
  Bookmark,
  MessageCircle,
  Sparkles,
  MoreHorizontal,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useGlobal } from '@/contexts/GlobalContext';

const roadmapNodes = [
  { id: 'html', label: 'HTML', status: 'completed', progress: 100 },
  { id: 'css', label: 'CSS', status: 'completed', progress: 100 },
  { id: 'react', label: 'React', status: 'current', progress: 60, nextStep: true },
];

const snippetShorts = [
  {
    id: '1',
    title: 'Teach Styles',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    rating: 4.3,
    comments: 4,
    coins: 2,
  },
  {
    id: '2',
    title: 'Guitar Riffs',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
    rating: 4.7,
    comments: 2,
    coins: 2,
  },
  {
    id: '3',
    title: 'Excel Hack',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    rating: 4.1,
    comments: 2,
    coins: 0,
  },
];

export default function Dashboard() {
  const { user } = useGlobal();
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Pro Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Go Pro to Remove Ads</h2>
              <p className="text-sm text-gray-500">
                Upgrade to <span className="font-semibold text-primary">SkillSwap Pro</span> and enjoy an ad-free experience!
              </p>
            </div>
            <div className="flex items-center gap-4 ml-8">
              <div className="px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-400">
                Your ad here
              </div>
              <div className="px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-400">
                Your ad here
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Upgrade to <span className="font-bold text-primary">SkillSwap</span> Pro
              </p>
              <p className="text-sm text-gray-500">and enjoy an ad-free experience!</p>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors">
              Upgrade Now
            </button>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Session */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌅</span>
              <h2 className="text-lg font-bold text-gray-800">Upcoming Session</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=amit"
                  alt="Mentor"
                  className="w-14 h-14 rounded-full bg-gray-100"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">React Basics</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">👤 Amit</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mt-2">Starts in: 10m</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-teal-light to-secondary/20 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary to-teal rounded-full flex items-center justify-center">
                    <span className="text-3xl">🤖</span>
                  </div>
                </div>
                <Link
                  to="/session/1"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  JOIN NOW
                  <span className="ml-1">📅</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Career GPS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-bold text-gray-800">Career GPS (AI)</h2>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              {roadmapNodes.map((node) => (
                <div key={node.id} className="flex items-center gap-3">
                  <Check className={`w-5 h-5 ${node.status === 'completed' ? 'text-secondary' : 'text-gray-300'}`} />
                  <span className="font-medium text-gray-700 w-16">{node.label}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${node.status === 'completed' ? 'bg-secondary' : 'bg-primary'}`}
                      style={{ width: `${node.progress}%` }}
                    />
                  </div>
                  {node.nextStep ? (
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">Next Step</span>
                  ) : (
                    <Check className="w-5 h-5 text-secondary" />
                  )}
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors">
              <Sparkles className="w-4 h-4" />
              Guide Me
            </button>
          </motion.div>
        </div>

        {/* Snippet Shorts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🔥</span>
            <h2 className="text-lg font-bold text-gray-800">Snippet Shorts</h2>
            <span className="text-sm text-gray-500">TikTok-Style Discovery</span>
          </div>
          
          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {snippetShorts.map((snippet, i) => (
                <motion.div
                  key={snippet.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex-shrink-0 w-72 rounded-2xl overflow-hidden relative group cursor-pointer"
                >
                  <img
                    src={snippet.thumbnail}
                    alt={snippet.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 snippet-overlay" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-bold text-lg">{snippet.title}</h3>
                      <Heart className="w-5 h-5 text-white opacity-80" />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 text-white/80 text-sm">
                        <span>{snippet.rating}</span>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{snippet.comments}</span>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white">
                          +
                        </div>
                      </div>
                      <Bookmark className="w-5 h-5 text-white opacity-80" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-secondary text-white shadow-lg flex items-center justify-center hover:bg-secondary/90 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
