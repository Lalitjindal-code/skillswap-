import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const ThreeDCoin = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate normalized position from center (-100 to 100)
        x.set(((e.clientX - centerX) / (rect.width / 2)) * 100);
        y.set(((e.clientY - centerY) / (rect.height / 2)) * 100);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            className="perspective-1000 w-64 h-64 flex items-center justify-center cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={ref}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-48 h-48 relative"
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 flex items-center justify-center border-4 border-yellow-200 shadow-xl"
                    style={{ backfaceVisibility: "hidden", transform: "translateZ(10px)" }}
                >
                    <span className="text-6xl font-bold text-yellow-50 drop-shadow-md">Skills</span>
                    <div className="absolute inset-0 rounded-full border-[6px] border-yellow-400 opacity-50" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-800 flex items-center justify-center border-4 border-yellow-300 shadow-xl"
                    style={{ backfaceVisibility: "hidden", transform: "translateZ(-10px) rotateY(180deg)" }}
                >
                    <span className="text-6xl font-bold text-yellow-100 drop-shadow-md">Time</span>
                    <div className="absolute inset-0 rounded-full border-[6px] border-dashed border-yellow-200 opacity-40 mix-blend-overlay" />
                </div>

                {/* Edge/Thickness Simulation (Simplified layers) */}
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 rounded-full bg-yellow-600"
                        style={{
                            transform: `translateZ(${i * 4 - 10}px)`,
                            zIndex: -1
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};
