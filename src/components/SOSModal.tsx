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
          {/* Red-tinted backdrop */}
          <motion.div
            className="absolute inset-0 bg-red-900/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Ripple Effect */}
          <AnimatePresence>
            {showRipple && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-32 h-32 rounded-full border-2 border-red-500"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 20, opacity: 0 }}
                    transition={{ 
                      duration: 2, 
                      delay: i * 0.3,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={modalTransition}
            className="relative w-full max-w-md glass-card rounded-2xl p-6 border border-red-500/30"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-500">SOS Help</h2>
                <p className="text-sm text-muted-foreground">Emergency assistance request</p>
              </div>
            </div>

            {isBlasting ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <Radio className="w-full h-full text-red-500" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">Broadcasting Signal...</h3>
                <p className="text-muted-foreground">Reaching out to 500+ Mentors</p>
                <motion.div
                  className="mt-4 flex justify-center gap-1"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-8 bg-red-500 rounded-full"
                      animate={{ scaleY: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <div className="space-y-5">
                {/* Category Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Problem Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  >
                    <option value="">Select a category...</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your emergency..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"
                  />
                </div>

                {/* Bounty Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Bounty Offer</label>
                    <span className="text-lg font-bold text-primary">{bounty} Coins</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={bounty}
                    onChange={(e) => setBounty(Number(e.target.value))}
                    className="w-full h-2 rounded-full bg-muted appearance-none cursor-pointer accent-red-500"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 Coin</span>
                    <span>10 Coins</span>
                  </div>
                </div>

                {/* Blast Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBlast}
                  disabled={!category || !description}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-shadow"
                >
                  <Radio className="w-5 h-5" />
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
