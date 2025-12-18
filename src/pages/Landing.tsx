import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Eye, Map, FileText, Zap, Users, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { ThreeDCoin } from '@/components/ThreeDCoin';
import { SkillCube } from '@/components/SkillCube';

const features = [
  {
    icon: Eye,
    title: 'Shadow Mode',
    description: 'Watch experts work in real-time, learning passively without interrupting their flow.',
    color: 'purple',
  },
  {
    icon: Map,
    title: 'AI Roadmap',
    description: 'Personalized career GPS that adapts to your pace and learning style.',
    color: 'teal',
  },
  {
    icon: FileText,
    title: 'Skill-CV',
    description: 'Blockchain-verified portfolio that proves your skills to employers.',
    color: 'gold',
  },
];

const pricingPlans = [
  {
    name: 'Learner',
    price: 'Free',
    period: '',
    features: ['5 Hours/month', 'Basic AI Notes', 'Community Access', 'Standard Support'],
    highlight: false,
  },
  {
    name: 'PRO',
    price: '₹99',
    period: '/month',
    features: ['Unlimited Hours', 'Advanced AI Notes', 'Shadow Mode', 'Priority Support', 'Verified Badges'],
    highlight: true,
  },
  {
    name: 'Time Top-Up',
    price: '₹49',
    period: '/5 coins',
    features: ['Instant Coins', 'No Expiry', 'Transfer to Friends', 'Bonus on Bulk'],
    highlight: false,
  },
];

const stats = [
  { value: '10K+', label: 'Hours Exchanged' },
  { value: '₹50L', label: 'Tuition Saved' },
  { value: '5K+', label: 'Skills Verified' },
  { value: '2K+', label: 'Active Mentors' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Landing() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-teal/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="SkillSwap" className="w-10 h-10 rounded-xl object-contain" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Skill<span className="text-primary">Swap</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform duration-200">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform duration-200">
              Pricing
            </a>
            <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform duration-200">
              Login
            </Link>
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/20 rounded-full blur-3xl animate-blob" />
          <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left max-w-2xl"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 cursor-default border border-primary/20"
            >
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm card-text">Join 10,000+ learners worldwide</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground leading-tight"
            >
              Your Time is the{' '}
              <motion.span
                className="text-gradient-gold inline-block"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                New Currency
              </motion.span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-10">
              Exchange knowledge, not money. Teach what you know, learn what you need.
              Welcome to the future of peer-to-peer education.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all gold-glow flex items-center justify-center gap-2 hover:scale-105 active:scale-95 duration-300"
              >
                Start Trading Skills
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://youtu.be/zCS9p263gY8?si=Jx9C8uIwPZI1M8B8"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl glass-card font-semibold text-lg hover:bg-secondary/10 transition-all card-title hover:scale-105 active:scale-95 duration-300"
              >
                Watch Demo
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:flex justify-end w-full max-w-sm"
          >
            <ThreeDCoin />
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 glass-card mx-6 rounded-2xl mt-12 relative z-20 border border-white/10 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="text-center cursor-default"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-gold">{stat.value}</div>
                <div className="card-muted mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-left max-w-xl"
            >
              <h2 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
                Unlock the <span className="text-gradient-gold">Multimodel</span><br /> Learning Universe
              </h2>
              <p className="text-muted-foreground text-lg">
                Explore a multidimensional approach to skills. From coding to design,
                our platform connects every facet of your learning journey into one cohesive ecosystem.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <SkillCube />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-card p-8 hover:shadow-[0_0_30px_rgba(250,204,21,0.1)] transition-all duration-300 group border border-white/5 hover:border-primary/20"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6 ${feature.color === 'purple'
                    ? 'bg-purple/20 text-purple'
                    : feature.color === 'teal'
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-primary/20 text-primary'
                    }`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3 card-title">{feature.title}</h3>
                <p className="card-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Start free, upgrade when you need more
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 1 ? 0 : i === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className={`glass-card p-8 ${plan.highlight
                  ? 'border-primary gold-glow scale-105 z-10'
                  : 'hover:shadow-xl opacity-90 hover:opacity-100'
                  } transition-all duration-300`}
              >
                {plan.highlight && (
                  <div className="text-xs font-semibold text-primary mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 card-title">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold card-title">{plan.price}</span>
                  <span className="card-muted">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${plan.highlight ? 'text-primary' : 'text-secondary'}`} />
                      <span className="card-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/login"
                  className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${plan.highlight
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25'
                    : 'bg-secondary/10 hover:bg-secondary/20 card-title'
                    }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className="glass-card p-12 md:p-20 text-center rounded-3xl border-primary/20 gold-glow relative overflow-hidden"
          >
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob"
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal/10 rounded-full blur-3xl animate-blob animation-delay-2000"
            />

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 card-title relative z-10">
              Ready to Start Trading Skills?
            </h2>
            <p className="text-xl card-muted mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of learners and mentors in the most innovative education platform.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all gold-glow hover:scale-105 active:scale-95 relative z-10"
            >
              <Users className="w-5 h-5" />
              Join the Community
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-teal/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="SkillSwap" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-semibold text-foreground">SkillSwap</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 SkillSwap. Your time, your currency.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
