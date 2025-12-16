import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coins,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  X,
  Plus
} from 'lucide-react';
import { useGlobal } from '@/contexts/GlobalContext';

const quizQuestions = [
  {
    question: "What does useState return in React?",
    options: [
      "A single state value",
      "An array with state and setter function",
      "An object with state methods",
      "A promise"
    ],
    correct: 1
  },
  {
    question: "What is the purpose of useEffect?",
    options: [
      "To define state variables",
      "To handle side effects",
      "To create components",
      "To style elements"
    ],
    correct: 1
  },
  {
    question: "What is JSX?",
    options: [
      "A database query language",
      "A syntax extension for JavaScript",
      "A CSS framework",
      "A testing library"
    ],
    correct: 1
  }
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [teachSkills, setTeachSkills] = useState<string[]>([]);
  const [learnSkills, setLearnSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [animatingCoins, setAnimatingCoins] = useState(false);
  const [dynamicQuestions, setDynamicQuestions] = useState<any[]>([]);

  const { addSkill, verifySkill, updateCoins } = useGlobal();
  const navigate = useNavigate();

  const mockQuizDatabase: Record<string, any[]> = {
    'python': [
      { question: "What is a Tuple?", options: ["Immutable sequence", "Mutable array", "Hash map", "A loop"], correct: 0 },
      { question: "How do you define a function?", options: ["func MyFunc", "def my_func():", "function myFunc", "void myFunc"], correct: 1 },
      { question: "What acts as a constructor?", options: ["__start__", "init()", "__init__", "constructor"], correct: 2 },
    ],
    'react': [
      { question: "What does useState return?", options: ["Value only", "Value and Setter", "Object", "Promise"], correct: 1 },
      { question: "What is a pure component?", options: ["Renders same output for same props", "Has no state", "Uses classes", "None of above"], correct: 0 },
      { question: "useEffect runs when?", options: ["Only on mount", "On every render", "Based on dependency array", "On click"], correct: 2 },
    ],
    'default': [
      { question: "What is the best way to learn?", options: ["Reading only", "Teaching others", "Watching videos", "Sleeping"], correct: 1 },
      { question: "What is peer learning?", options: ["Learning alone", "Learning with instructors", "Learning with equals", "None"], correct: 2 },
      { question: "How to stay consistent?", options: ["Motivation", "Discipline & Habits", "Luck", "Coffee"], correct: 1 },
    ]
  };

  const handleAddSkill = (type: 'teach' | 'learn') => {
    if (!skillInput.trim()) return;

    if (type === 'teach') {
      const newSkills = [...teachSkills, skillInput];
      setTeachSkills(newSkills);
      addSkill(skillInput, 'teach');

      // Select questions based on the first added skill
      const skillKey = skillInput.toLowerCase();
      if (mockQuizDatabase[skillKey]) {
        setDynamicQuestions(mockQuizDatabase[skillKey]);
      } else {
        setDynamicQuestions(mockQuizDatabase['default']);
      }

    } else {
      setLearnSkills([...learnSkills, skillInput]);
      addSkill(skillInput, 'learn');
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (type: 'teach' | 'learn', index: number) => {
    if (type === 'teach') {
      setTeachSkills(teachSkills.filter((_, i) => i !== index));
    } else {
      setLearnSkills(learnSkills.filter((_, i) => i !== index));
    }
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setVerified(true);
    setIsVerifying(false);
    if (teachSkills[0]) {
      verifySkill(teachSkills[0]);
    }
  };

  const handleFinish = async () => {
    setAnimatingCoins(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    updateCoins(3); // Updated to 3 coins
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">What can you teach?</h2>
              <p className="text-muted-foreground mt-2">
                Share your expertise and earn time credits
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill('teach')}
                  placeholder="e.g., React, Figma, Python..."
                  className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddSkill('teach')}
                  className="px-4 py-3 rounded-xl bg-primary text-primary-foreground"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex flex-wrap gap-2 min-h-[48px]">
                {teachSkills.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-4 py-2 rounded-full bg-primary/20 text-primary flex items-center gap-2"
                  >
                    {skill}
                    <button onClick={() => handleRemoveSkill('teach', i)}>
                      <X className="w-4 h-4" />
                    </button>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary/20 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold">What do you want to learn?</h2>
              <p className="text-muted-foreground mt-2">
                Find mentors for your learning goals
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill('learn')}
                  placeholder="e.g., Machine Learning, UI Design..."
                  className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddSkill('learn')}
                  className="px-4 py-3 rounded-xl bg-secondary text-secondary-foreground"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex flex-wrap gap-2 min-h-[48px]">
                {learnSkills.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-4 py-2 rounded-full bg-secondary/20 text-secondary flex items-center gap-2"
                  >
                    {skill}
                    <button onClick={() => handleRemoveSkill('learn', i)}>
                      <X className="w-4 h-4" />
                    </button>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-purple" />
              </div>
              <h2 className="text-2xl font-bold">Verify Your Skills</h2>
              <p className="text-muted-foreground mt-2">
                Complete a quick quiz to earn your verified badge
              </p>
            </div>

            {!verified ? (
              <div className="space-y-6">
                {(dynamicQuestions.length > 0 ? dynamicQuestions : quizQuestions).map((q, qi) => (
                  <div key={qi} className="glass-card p-5 rounded-xl space-y-3">
                    <p className="font-medium">{qi + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((option: string, oi: number) => (
                        <label
                          key={oi}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${quizAnswers[qi] === oi
                            ? 'bg-primary/20 border-primary'
                            : 'bg-muted/30 hover:bg-muted/50'
                            } border border-white/10`}
                        >
                          <input
                            type="radio"
                            name={`question-${qi}`}
                            checked={quizAnswers[qi] === oi}
                            onChange={() => handleQuizAnswer(qi, oi)}
                            className="accent-primary"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerify}
                  disabled={quizAnswers.length < 3 || isVerifying}
                  className="w-full py-3 rounded-xl bg-purple text-white font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Submit Quiz
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center gold-glow"
                >
                  <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gradient-gold mb-2">
                  Verified Badge Earned!
                </h3>
                <p className="text-muted-foreground">
                  Your {teachSkills[0] || 'skill'} expertise is now verified
                </p>
              </motion.div>
            )}
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center py-10"
          >
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center gold-glow">
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to SkillSync!</h2>
              <p className="text-muted-foreground">
                Here's your starter reward
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <motion.div
                animate={animatingCoins ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center gap-4"
              >
                <motion.div
                  animate={animatingCoins ? { rotateY: 360 } : {}}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center gold-glow"
                >
                  <Coins className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <div className="text-left">
                  <motion.p
                    animate={animatingCoins ? { scale: [1, 1.3, 1] } : {}}
                    className="text-5xl font-bold text-gradient-gold"
                  >
                    {animatingCoins ? '3' : '0'} → 3
                  </motion.p>
                  <p className="text-muted-foreground">Time Coins</p>
                </div>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinish}
              className="px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg gold-glow flex items-center justify-center gap-2 mx-auto"
            >
              Enter Dashboard
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${s === step
                ? 'w-8 bg-primary'
                : s < step
                  ? 'w-2 bg-primary/50'
                  : 'w-2 bg-muted'
                }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="glass-card p-8 rounded-2xl">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(s => Math.max(1, s - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(s => Math.min(4, s + 1))}
                disabled={(step === 1 && teachSkills.length === 0) ||
                  (step === 2 && learnSkills.length === 0) ||
                  (step === 3 && !verified)}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium disabled:opacity-50"
              >
                {step === 3 && !verified ? 'Complete Quiz' : 'Continue'}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
