import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MicOff, VideoOff, Eye, EyeOff } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';

export default function ShadowJoin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = async () => {
    setIsEntering(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate(`/session/${id}`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"
          />
        </div>

        {/* Floating Eyes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                x: [0, Math.random() * 40 - 20, 0],
                y: [0, Math.random() * 40 - 20, 0],
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
            >
              <Eye className="w-8 h-8 text-purple-400/30" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="glass-card rounded-3xl p-10 text-center border border-purple-500/20 bg-slate-900/80">
            {/* Icon */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30"
            >
              <EyeOff className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold mb-3 text-white">Entering Shadow Mode</h1>
            <p className="text-purple-200/70 mb-10">
              You are an invisible observer. You cannot interact with the mentor.
            </p>

            {/* Status Indicators */}
            <div className="flex justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-red-500/20 flex items-center justify-center">
                  <MicOff className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-sm text-red-400 font-medium">Mic DISABLED</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-red-500/20 flex items-center justify-center">
                  <VideoOff className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-sm text-red-400 font-medium">Camera DISABLED</p>
              </div>
            </div>

            {/* Enter Button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEnter}
              disabled={isEntering}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-purple-500/30 disabled:opacity-70"
            >
              {isEntering ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Entering...
                </>
              ) : (
                <>
                  Enter Silently 🤫
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
