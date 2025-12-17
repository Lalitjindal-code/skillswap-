import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { MicOff, VideoOff, Eye, EyeOff, Shield, Radio, ChevronRight, Fingerprint, User } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';

export default function ShadowJoin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    // Simulate initial system scan
    const interval = setInterval(() => {
      setScanProgress(prev => Math.min(prev + 1, 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = async () => {
    setIsEntering(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate(`/session/${id}`, {
      state: {
        mic: false,
        cam: false
      }
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#050510] flex items-center justify-center p-6 relative overflow-hidden font-mono perspective-1000">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(100, 116, 139, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 116, 139, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Radar Sweep Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-t from-transparent via-transparent to-primary/10 rounded-full"
            style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0)' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-lg"
        >
          {/* Top Status Bar like a HUD */}
          <div className="flex justify-between items-center mb-6 text-xs text-muted-foreground uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${scanProgress === 100 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 animate-pulse'}`} />
              System Ready
            </div>
            <div>
              Secure Connection
            </div>
          </div>

          <div className="relative bg-[#0a0a1a]/90 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
            {/* Scan Line Animation */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-20 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Decorative Corner lines */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-3xl" />

            <div className="p-10 pt-12 relative z-10">
              {/* 3D Holographic Card Header */}
              <div className="text-center mb-10 perspective-1000 h-40 flex items-center justify-center">
                <motion.div
                  className="relative w-32 h-40 preserve-3d cursor-pointer"
                  animate={{ rotateY: [0, 180, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1 }}
                >
                  {/* Front Face: Public Profile (Hidden) */}
                  <div
                    className="absolute inset-0 bg-slate-800/80 rounded-xl border border-white/10 flex flex-col items-center justify-center backface-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <User className="w-12 h-12 text-blue-400 mb-2" />
                    <span className="text-[10px] uppercase tracking-widest text-blue-200">Public ID</span>
                    <div className="w-16 h-1 bg-blue-500/30 rounded-full mt-2" />
                  </div>

                  {/* Back Face: Shadow Identity (Active) */}
                  <div
                    className="absolute inset-0 bg-purple-900/40 rounded-xl border border-purple-500/50 flex flex-col items-center justify-center backface-hidden shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <EyeOff className="w-12 h-12 text-purple-400 mb-2 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-purple-200">Shadow Mode</span>
                    <div className="w-16 h-1 bg-purple-500/50 rounded-full mt-2 box-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 text-center translate-y-8">
                  <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Shadow Mode</h1>
                  <p className="text-purple-300/60 text-sm">Invisible Observer Access Granted</p>
                </div>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-2 gap-4 mb-10 mt-12">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-4 group hover:bg-red-500/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <MicOff className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-red-300/70 font-bold uppercase">Microphone</p>
                    <p className="text-sm text-red-400 font-bold">Disabled</p>
                  </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-4 group hover:bg-red-500/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <VideoOff className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-red-300/70 font-bold uppercase">Camera</p>
                    <p className="text-sm text-red-400 font-bold">Disabled</p>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-10">
                {[
                  { icon: Eye, text: "Observe without being seen", color: "text-blue-400" },
                  { icon: Shield, text: "Identity completely hidden", color: "text-green-400" },
                  { icon: Radio, text: "Access to live audio & chat", color: "text-orange-400" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm text-gray-400 bg-white/5 p-3 rounded-lg border border-white/5"
                  >
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    {item.text}
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEnter}
                disabled={isEntering}
                className="group relative w-full h-14 bg-white text-black font-bold text-lg rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-white to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  {isEntering ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Establishing Uplink...
                    </>
                  ) : (
                    <>
                      <Fingerprint className="w-5 h-5 text-purple-600 group-hover:text-purple-800" />
                      Enter Shadow Mode
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground/50">SESSION ID: {id || 'UNKNOWN'} • ENCRYPTED • {scanProgress}% LOADED</p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
