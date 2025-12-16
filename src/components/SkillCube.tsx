import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code, Database, Globe, Cpu, Cloud, Smartphone } from 'lucide-react';

export const SkillCube = () => {
    const ref = useRef<HTMLDivElement>(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    // Auto-rotate logic could go here, or just interaction
    useAnimationFrame((t) => {
        // Gentle floating rotation
        if (!ref.current?.matches(':hover')) {
            rotateX.set(Math.sin(t / 2000) * 15);
            rotateY.set(Math.cos(t / 3000) * 15 + (t / 100)); // Continuous Y rotation
        }
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        // Calculate rotation based on mouse position
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -45; // Invert Y
        const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 45;

        rotateX.set(rotateXValue);
        rotateY.set(rotateYValue);
    };

    const springConfig = { stiffness: 100, damping: 20 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const faces = [
        { id: 1, icon: Code, color: 'bg-blue-500/20', border: 'border-blue-400', rotate: 'rotateY(0deg)' }, // Front
        { id: 2, icon: Database, color: 'bg-green-500/20', border: 'border-green-400', rotate: 'rotateY(90deg)' }, // Right
        { id: 3, icon: Globe, color: 'bg-purple-500/20', border: 'border-purple-400', rotate: 'rotateY(180deg)' }, // Back
        { id: 4, icon: Cpu, color: 'bg-red-500/20', border: 'border-red-400', rotate: 'rotateY(-90deg)' }, // Left
        { id: 5, icon: Cloud, color: 'bg-cyan-500/20', border: 'border-cyan-400', rotate: 'rotateX(90deg)' }, // Top
        { id: 6, icon: Smartphone, color: 'bg-yellow-500/20', border: 'border-yellow-400', rotate: 'rotateX(-90deg)' } // Bottom
    ];

    return (
        <div
            className="perspective-1000 w-64 h-64 flex items-center justify-center"
            onMouseMove={handleMouseMove}
            ref={ref}
        >
            <motion.div
                style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformStyle: "preserve-3d"
                }}
                className="w-32 h-32 relative"
            >
                {faces.map((face) => (
                    <div
                        key={face.id}
                        className={`absolute inset-0 flex items-center justify-center border-2 ${face.border} ${face.color} backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.2)]`}
                        style={{
                            transform: `${face.rotate} translateZ(64px)`, // 64px = half of width (32 * 4 = 128px width?? No, w-32 is 8rem = 128px. Half is 64px)
                        }}
                    >
                        <face.icon className="w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                    </div>
                ))}
                {/* Inner glow core */}
                <div className="absolute inset-4 bg-primary/30 blur-xl rounded-full animate-pulse" style={{ transform: 'translateZ(0)' }} />
            </motion.div>
        </div>
    );
};
