import { motion } from "motion/react";

export function LoveLetter() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="rounded-3xl p-10 md:p-14 relative overflow-hidden border border-pink-400/20"
          style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Decorative corner roses */}
          <div className="absolute top-4 left-4 text-4xl opacity-30 rotate-[-30deg]">🌹</div>
          <div className="absolute top-4 right-4 text-4xl opacity-30 rotate-[30deg]">🌹</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-30 rotate-[30deg]">🌹</div>
          <div className="absolute bottom-4 right-4 text-4xl opacity-30 rotate-[-30deg]">🌹</div>

          <div className="text-center mb-8">
            <p
              className="text-pink-400"
              style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.5rem" }}
            >
              A Letter For You
            </p>
          </div>

          <div
            className="text-pink-100/80 leading-8 space-y-5"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "1.05rem" }}
          >
            <p>My dearest,</p>
            <p>
              There are words I keep searching for — ones beautiful enough to describe how you make me feel.
              But even the grandest poetry falls short when it comes to you.
            </p>
            <p>
              You are the warmth in the morning I look forward to. You are the calm I find
              when the world feels loud. In every small and quiet moment, I find traces of you —
              and I am grateful, endlessly grateful, for every one of them.
            </p>
            <p>
              Loving you is the easiest thing I have ever done. Choosing you, again and again,
              is the best decision I make every single day.
            </p>
            <p>
              I hope you know that you are seen, adored, and deeply, deeply loved —
              not for what you do, but for who you are.
            </p>
            <p className="pt-4">
              Forever yours, with all my heart. 💕
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
