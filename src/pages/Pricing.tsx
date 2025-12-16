
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, Crown } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageTransition } from '@/components/PageTransition';

export default function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for getting started",
            features: [
                "Access to basic courses",
                "Community support",
                "3 AI Roadmaps/month",
                "Basic Profile"
            ],
            highlight: false
        },
        {
            name: "Pro",
            price: "$19",
            period: "/month",
            description: "Best for serious learners",
            features: [
                "Unlimited AI Roadmaps",
                "Verified Skill Badges",
                "Priority Mentor Matching",
                "Ad-free Experience",
                "Advanced Analytics"
            ],
            highlight: true
        },
        {
            name: "Team",
            price: "$49",
            period: "/month",
            description: "For small groups & startups",
            features: [
                "Everything in Pro",
                "Team Dashboard",
                "Collaborative Learning",
                "Admin Controls",
                "Dedicated Support"
            ],
            highlight: false
        }
    ];

    return (
        <DashboardLayout>
            <PageTransition>
                <div className="p-6 md:p-12 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold inline-block mb-4"
                        >
                            <Crown className="w-4 h-4 inline mr-2" />
                            Unleash Your Potential
                        </motion.span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Simple, transparent pricing
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Choose the perfect plan to accelerate your learning journey with AI-powered guidance and expert mentorship.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative p-8 rounded-3xl border flex flex-col ${plan.highlight
                                        ? 'bg-primary/10 border-primary/50 shadow-[0_0_40px_rgba(250,204,21,0.15)] scale-105 z-10'
                                        : 'glass-card border-white/10 hover:border-white/20'
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground ml-1">{plan.period}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <div className={`p-1 rounded-full ${plan.highlight ? 'bg-primary/20 text-primary' : 'bg-white/10 text-muted-foreground'}`}>
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight
                                        ? 'bg-primary text-primary-foreground hover:scale-105 shadow-lg shadow-primary/25'
                                        : 'bg-white/10 hover:bg-white/20'
                                    }`}>
                                    {plan.highlight ? 'Get Started Pro' : 'Choose ' + plan.name}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <Shield className="w-12 h-12 mx-auto mb-4 text-secondary opacity-80" />
                            <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
                            <p className="text-muted-foreground">Encrypted and safe transactions powered by Stripe.</p>
                        </div>
                        <div className="p-6">
                            <Zap className="w-12 h-12 mx-auto mb-4 text-primary opacity-80" />
                            <h3 className="text-lg font-bold mb-2">Instant Access</h3>
                            <p className="text-muted-foreground">Get premium features immediately after upgrading.</p>
                        </div>
                        <div className="p-6">
                            <Star className="w-12 h-12 mx-auto mb-4 text-green-400 opacity-80" />
                            <h3 className="text-lg font-bold mb-2">Cancel Anytime</h3>
                            <p className="text-muted-foreground">No long-term contracts. Flexible monthly billing.</p>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </DashboardLayout>
    );
}
