import { motion } from 'framer-motion';

export default function Particles() {
  const particles = Array.from({ length: 30 });

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-full bg-white/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: ['100vh', '-10vh'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}vw`,
          }}
        />
      ))}
    </div>
  );
}
