import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, Video, Coins, CheckCircle2, Settings } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';

export default function GroupJoin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);
  const [micLevel, setMicLevel] = useState(0);
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  // Simulate mic level
  useEffect(() => {
    if (!micOn) {
      setMicLevel(0);
      return;
    }
    const interval = setInterval(() => {
      setMicLevel(Math.random() * 100);
    }, 100);
    return () => clearInterval(interval);
  }, [micOn]);

  const handleJoin = async () => {
    setIsJoining(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate(`/session/${id}`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-xl"
        >
          <div className="glass-card rounded-3xl p-8">
            <h1 className="text-2xl font-bold mb-2 text-center">Join Group Session</h1>
            <p className="text-muted-foreground text-center mb-8">
              Check your audio and video before joining
            </p>

            {/* Camera Preview */}
            <div className="aspect-video rounded-2xl bg-muted/30 mb-6 overflow-hidden relative">
              {videoOn ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=preview"
                    alt="Preview"
                    className="w-32 h-32 rounded-full"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                  <Video className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              
              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMicOn(!micOn)}
                  className={`p-3 rounded-full ${
                    micOn ? 'bg-muted/80' : 'bg-red-500'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setVideoOn(!videoOn)}
                  className={`p-3 rounded-full ${
                    videoOn ? 'bg-muted/80' : 'bg-red-500'
                  }`}
                >
                  <Video className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-muted/80"
                >
                  <Settings className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Mic Testing Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Microphone Level</span>
                <span className={`text-sm ${micOn ? 'text-green-500' : 'text-red-500'}`}>
                  {micOn ? 'Active' : 'Muted'}
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted/50 overflow-hidden">
                <motion.div
                  animate={{ width: `${micOn ? micLevel : 0}%` }}
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                />
              </div>
            </div>

            {/* Contribution Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 mb-8"
            >
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="font-medium">Pool Contribution:</span>
              <div className="flex items-center gap-1">
                <Coins className="w-5 h-5 text-primary" />
                <span className="font-bold text-primary">1 Coin Confirmed</span>
              </div>
            </motion.div>

            {/* Join Button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(34, 197, 94, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleJoin}
              disabled={isJoining}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-500/30 disabled:opacity-70"
            >
              {isJoining ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Joining...
                </>
              ) : (
                <>
                  Join Main Stage 🎤
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
