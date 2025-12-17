import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, User, KeyRound, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { useGlobal } from '@/contexts/GlobalContext';
import { PageTransition } from '@/components/PageTransition';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { login, signup, verifyOtp, loginWithGoogle, user, logout } = useGlobal();
  const navigate = useNavigate();

  // REMOVED AUTO-REDIRECT USE-EFFECT to satisfy user request of "asking for details first"
  // Instead, we render a "Switch Account" view if logged in.

  const handleContinue = () => {
    if (user.hasCompletedOnboarding) {
      toast.success(`Welcome back, ${user.name}!`);
      navigate('/dashboard');
    } else {
      toast.info("Resuming your onboarding journey...");
      navigate('/onboarding');
    }
  };

  const handleSwitchAccount = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
    toast.success("Signed out. Please enter new details.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (showOtp) {
        // Verify OTP Stage
        await verifyOtp(email, otp);
        toast.success('Email verified successfully!');
        // After verify, user.isLoggedIn becomes true, component re-renders, shows "Session Gate" or redirects?
        // Let's rely on the user clicking "Continue" or auto-redirecting ONLY after explicit action?
        // Actually, after explicit login, auto-redirect is fine.
        // It's the "visiting page while already logged in" that was annoying.
        navigate('/onboarding'); // Direct them after successful interaction
      } else if (isSignup) {
        // Init Signup
        await signup(email, password, name);
        toast.success('Confirmation code sent to your email!');
        setShowOtp(true);
      } else {
        // Normal Login
        await login(email, password);
        toast.success('Welcome back!');
        // Manually navigate after explicit login action
        // We can't know immediately if onboarding is done usually, but login() updates 'user'.
        // For smoother UX, we can just check 'hasCompletedOnboarding' logic here if we wait?
        // Simpler: Just refresh/navigate.
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error: any) {
      toast.error(error.message || 'Google login failed');
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setShowOtp(false); // Reset OTP state on mode switch
  };

  // If already logged in, show "Session Gate"
  if (user.isLoggedIn) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          </div>

          <div className="glass-card p-8 rounded-2xl w-full max-w-md text-center border-primary/20 relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-primary to-purple-600">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.name}
                className="w-full h-full rounded-full bg-background object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Welcome back, {user.name}!</h2>
            <p className="text-muted-foreground mb-8">You are currently signed in as {user.email}</p>

            <div className="space-y-3">
              <button
                onClick={handleContinue}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all gold-glow"
              >
                <span className="flex items-center gap-2">
                  {user.hasCompletedOnboarding ? <LayoutDashboard className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                  {user.hasCompletedOnboarding ? "Go to Dashboard" : "Resume Onboarding"}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleSwitchAccount}
                className="w-full py-4 rounded-xl glass-card border border-white/10 hover:bg-white/5 font-medium flex items-center justify-center gap-2 transition-all text-muted-foreground hover:text-white"
              >
                <LogOut className="w-5 h-5" />
                Switch Account
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1.1, 1, 1.1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple/10 rounded-full blur-[80px]"
          />
        </div>

        {/* Login Card with Flip Animation */}
        <div className="w-full max-w-md relative z-10 perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignup ? 'signup' : 'login'}
              initial={{ opacity: 0, rotateY: isSignup ? -90 : 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: isSignup ? 90 : -90 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full"
            >
              <div className="glass-card p-8 rounded-2xl text-black backdrop-blur-xl">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center gap-3 mb-8">
                  <img src="/logo.png" alt="SkillSwap" className="w-12 h-12 rounded-xl object-contain" />
                  <span className="text-2xl font-bold tracking-tight text-white">
                    Skill<span className="text-primary">Swap</span>
                  </span>
                </Link>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h1 className="text-2xl font-bold text-center mb-2 text-white">
                    {showOtp ? 'Check Your Email' : (isSignup ? 'Create Account' : 'Welcome Back')}
                  </h1>
                  <p className="text-muted-foreground text-center mb-8">
                    {showOtp
                      ? `We've sent a 6-digit code to ${email}`
                      : (isSignup ? 'Start your learning journey today' : 'Sign in to continue your learning journey')
                    }
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {showOtp ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center space-y-4"
                    >
                      <div className="relative w-full flex justify-center">
                        <div className="bg-white/10 p-2 rounded-xl">
                          <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} className="border-white/20 text-white w-10 h-12" />
                              <InputOTPSlot index={1} className="border-white/20 text-white w-10 h-12" />
                              <InputOTPSlot index={2} className="border-white/20 text-white w-10 h-12" />
                            </InputOTPGroup>
                            <div className="w-4"></div>
                            <InputOTPGroup>
                              <InputOTPSlot index={3} className="border-white/20 text-white w-10 h-12" />
                              <InputOTPSlot index={4} className="border-white/20 text-white w-10 h-12" />
                              <InputOTPSlot index={5} className="border-white/20 text-white w-10 h-12" />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Didn't receive code? <button type="button" onClick={() => signup(email, password, name)} className="text-primary hover:underline">Resend</button>
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      {isSignup && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <label className="text-sm font-medium text-foreground text-white">Full Name</label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="John Doe"
                              required={isSignup}
                              className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 placeholder:text-muted-foreground transition-all"
                            />
                          </div>
                        </motion.div>
                      )}

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground text-white">Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 placeholder:text-muted-foreground transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground text-white">Password</label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 placeholder:text-muted-foreground transition-all"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {!isSignup && !showOtp && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-white/20 bg-muted accent-primary" />
                        <span className="text-muted-foreground">Remember me</span>
                      </label>
                      <a href="#" className="text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(var(--primary), 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-70 gold-glow"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                    ) : (
                      <>
                        {showOtp ? 'Verify Code' : (isSignup ? 'Create Account' : 'Sign In')}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-4 text-sm text-muted-foreground rounded-full border border-white/5">or continue with</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleLogin}
                  className="w-full py-3 rounded-xl glass-card border border-white/10 font-medium flex items-center justify-center gap-3 hover:bg-muted/50 transition-colors text-white"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </motion.button>

                <p className="text-center text-muted-foreground mt-8 text-sm">
                  {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={toggleMode}
                    className="text-primary hover:underline font-medium"
                  >
                    {isSignup ? 'Sign in' : 'Sign up for free'}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
