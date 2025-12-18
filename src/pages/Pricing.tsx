
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, Crown } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageTransition } from '@/components/PageTransition';

export default function Pricing() {
    const plans = [
        {
            name: "Learner",
            title: "Learner", // Display title if different from name, or just use name
            price: "Free",
            period: "",
            description: "Essential access for casual learners",
            features: [
                "5 Hours/month",
                "Basic AI Notes",
                "Community Access",
                "Standard Support"
            ],
            highlight: false,
            buttonText: "Get Started"
        },
        {
            name: "PRO",
            title: "PRO",
            price: "₹99",
            period: "/month",
            description: "Unlock your full potential",
            features: [
                "Unlimited Hours",
                "Advanced AI Notes",
                "Shadow Mode",
                "Priority Support",
                "Verified Badges"
            ],
            highlight: true,
            buttonText: "Get Started"
        },
        {
            name: "Time Top-Up",
            title: "Time Top-Up", // Using title for display consistency
            price: "₹49",
            period: "/5 coins",
            description: "Add hours whenever you need",
            features: [
                "Instant Coins",
                "No Expiry",
                "Transfer to Friends",
                "Bonus on Bulk"
            ],
            highlight: false,
            buttonText: "Get Started"
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
                                    ? 'bg-primary/10 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.15)] scale-105 z-10'
                                    : 'glass-card border-white/10 hover:border-white/20'
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">{plan.title || plan.name}</h3>
                                    {plan.name === 'Learner' && <h4 className="text-4xl font-bold mb-6">Free</h4>}
                                    {plan.name !== 'Learner' && (
                                        <div className="flex items-baseline mb-6">
                                            <span className="text-4xl font-bold">{plan.price}</span>
                                            <span className="text-muted-foreground ml-1">{plan.period}</span>
                                        </div>
                                    )}
                                    {plan.name === 'Learner' && <div className="mb-8"></div>} {/* Spacer */}
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
                                    {plan.buttonText}
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
