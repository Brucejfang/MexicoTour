import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const colors = ["#ff6b9d", "#ff8fab", "#ffb3c6", "#ff4d6d", "#c9184a", "#ff85a1"];
    const generated: Heart[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 10 + Math.random() * 24,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 6,
      opacity: 0.15 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: `${heart.x}%`, bottom: "-60px" }}
          animate={{
            y: [0, -(window.innerHeight + 120)],
            x: [0, Math.sin(heart.id) * 60],
            opacity: [0, heart.opacity, heart.opacity, 0],
            rotate: [0, heart.id % 2 === 0 ? 15 : -15],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
          >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
