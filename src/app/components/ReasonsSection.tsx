import { motion } from "motion/react";

const reasons = [
  { icon: "✨", title: "Your Smile", desc: "It lights up every room you walk into and makes my heart skip a beat every single time." },
  { icon: "💫", title: "Your Kindness", desc: "The way you care for others with such warmth and gentleness is something truly rare and beautiful." },
  { icon: "🌙", title: "Your Laugh", desc: "It's the most wonderful sound in the world. I'd do anything just to hear it again and again." },
  { icon: "🌸", title: "Your Strength", desc: "You face every challenge with such grace and courage. You inspire me to be better every day." },
  { icon: "💝", title: "Your Heart", desc: "Pure, loving, and full of goodness — you have the most beautiful heart I have ever known." },
  { icon: "🌟", title: "Simply You", desc: "Everything about you — the way you think, move, and exist in this world — is my favorite thing." },
];

export function ReasonsSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-pink-400 mb-3"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2rem" }}
          >
            why i love you
          </p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 600 }}
          >
            A Thousand Reasons
          </h2>
          <div className="w-16 h-px bg-pink-400 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="rounded-2xl p-7 backdrop-blur-sm border border-pink-500/20"
              style={{ background: "rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, background: "rgba(255,107,157,0.12)" }}
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3
                className="text-white mb-2"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                {reason.title}
              </h3>
              <p
                className="text-pink-200/70 leading-relaxed"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "0.95rem" }}
              >
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
