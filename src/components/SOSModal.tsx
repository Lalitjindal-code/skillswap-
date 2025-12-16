import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Radio, Loader2 } from 'lucide-react';
import { modalVariants, backdropVariants, modalTransition } from './PageTransition';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  'Technical Issue',
  'Mentor Not Responding',
  'Content Quality',
  'Payment Problem',
  'Other Emergency',
];

export const SOSModal = ({ isOpen, onClose }: SOSModalProps) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [bounty, setBounty] = useState(3);
  const [isBlasting, setIsBlasting] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  const handleBlast = async () => {
    setShowRipple(true);
    setIsBlasting(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsBlasting(false);
    setShowRipple(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Intense Red Backdrop with Blur */}
          <motion.div
            className="absolute inset-0 bg-red-950/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Ripple Effect Animation */}
          <AnimatePresence>
            {showRipple && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute border border-red-500 rounded-full"
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: 800, height: 800, opacity: 0 }}
                    transition={{
                      duration: 2,
                      delay: i * 0.4,
                      ease: "easeOut"
                    }}
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={modalTransition}
            className="relative w-full max-w-lg bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.3)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 blur-xl opacity-50 animate-pulse" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center border border-white/10 shadow-xl">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Emergency SOS</h2>
                <p className="text-red-200/70 font-medium">Request Immediate Assistance</p>
              </div>
            </div>

            {isBlasting ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-600/20 flex items-center justify-center"
                >
                  <Radio className="w-12 h-12 text-red-500" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-white">Broadcasting...</h3>
                <p className="text-red-200/60 mb-8">Notifying 500+ active mentors in your network</p>
                <div className="h-1.5 w-48 mx-auto bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5 }}
                  />
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Category Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80 ml-1">What's the emergency?</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500/50 appearance-none transition-all hover:bg-white/10"
                    >
                      <option value="" className="bg-gray-900">Select a category...</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">▼</div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80 ml-1">Details</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe what you need help with..."
                    rows={3}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500/50 resize-none transition-all hover:bg-white/10 placeholder:text-white/20"
                  />
                </div>

                {/* Bounty Slider */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-red-900/20 to-transparent border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-white/80">Offer Bounty</label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-yellow-500">{bounty}</span>
                      <span className="text-xs font-bold text-yellow-500/70 border border-yellow-500/30 px-2 py-0.5 rounded uppercase">Coins</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={bounty}
                    onChange={(e) => setBounty(Number(e.target.value))}
                    className="w-full h-2 rounded-full bg-black/40 appearance-none cursor-pointer accent-red-500"
                  />
                  <p className="text-center text-xs text-white/30 mt-3">Higher bounty attracts faster responses</p>
                </div>

                {/* Blast Button */}
                <motion.button
                  whileHover={{ scale: 1.02, textShadow: "0 0 8px rgb(255,255,255)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBlast}
                  disabled={!category || !description}
                  className="w-full py-5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_50px_rgba(239,68,68,0.6)] transition-all border border-red-400/20"
                >
                  <Radio className="w-6 h-6 animate-pulse" />
                  BLAST SIGNAL NOW
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
