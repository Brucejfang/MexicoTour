import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { PhotoBall } from "./components/PhotoBall";

// ── Images ────────────────────────────────────────────────────────────────────
const FLOWER_DOOR  = "./bg/flower_door.webp";
const MEXICO_ST    = "./bg/mexico_st.webp";
const FLOWER_FIELD = "./bg/flower_field.webp";
const SUNLIGHT     = "./bg/sunlight.webp";

// ── Floating petals ───────────────────────────────────────────────────────────
const PETALS = ["🌸","🌺","🌼","🌹","🌷","💕","✨","🌻","💫","🏵️"];

function FloatingPetals() {
  const [items, setItems] = useState<{ id: number; left: number; delay: number; dur: number; size: number; e: string }[]>([]);
  useEffect(() => {
    setItems(Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 16,
      dur: 13 + Math.random() * 10,
      size: 14 + Math.random() * 18,
      e: PETALS[Math.floor(Math.random() * PETALS.length)],
    })));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {items.map(p => (
        <span key={p.id} style={{
          position: "absolute", left: `${p.left}%`, top: -50,
          fontSize: p.size, opacity: 0,
          animation: `petalFall ${p.dur}s ${p.delay}s linear infinite`,
        }}>{p.e}</span>
      ))}
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(-60px) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.75; }
          88%  { opacity: 0.45; }
          100% { transform: translateY(110vh) rotate(420deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ── Fade-up variant ────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 38 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: d, ease: "easeOut" },
  }),
};

// ── Section divider ─────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "0 24px" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(255,180,180,0.3))" }} />
      <span style={{ fontSize: 18, opacity: 0.6 }}>🌸</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(255,180,180,0.3))" }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#fef7f3", position: "relative", overflowX: "hidden" }}>

      {/* Fixed flower bg */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${FLOWER_DOOR})`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.85) saturate(1.4)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(254,247,243,0.25) 0%, rgba(250,238,230,0.12) 50%, rgba(254,247,243,0.3) 100%)",
        }} />
      </div>

      <FloatingPetals />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center text-center"
          style={{ minHeight: "100vh", padding: "80px 24px 60px" }}>

          {/* Background: bright flower field */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${FLOWER_FIELD})`,
            backgroundSize: "cover", backgroundPosition: "center 40%",
            filter: "brightness(0.85) saturate(1.2)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(254,247,243,0.2) 0%, rgba(250,238,230,0.1) 45%, rgba(254,247,243,0.35) 100%)",
          }} />

          <div className="relative z-10" style={{ maxWidth: 680, margin: "0 auto" }}>

            {/* Location badge */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(200,140,150,0.5)",
                borderRadius: 999, padding: "7px 18px",
                marginBottom: "2rem",
              }}>
              <span style={{ fontSize: 16 }}>📍</span>
              <span style={{
                fontFamily: "'Lato', sans-serif", fontSize: "0.78rem",
                letterSpacing: "0.14em", color: "rgba(100,50,55,0.8)",
                textTransform: "uppercase",
              }}>México · World Cup 2026</span>
            </motion.div>

            {/* Italic opener */}
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(1.8rem,5vw,2.8rem)",
                color: "#d4687c",
                marginBottom: "0.3em",
              }}>
              墨西哥出差，一路顺风
            </motion.p>

            {/* Main headline */}
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.36}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.6rem,9vw,5.8rem)",
                fontWeight: 700, color: "#3d1a1a",
                lineHeight: 1.1,
                textShadow: "0 2px 30px rgba(200,100,120,0.15)",
                marginBottom: "0.6em",
              }}>愿你在异乡<br /><span style={{ color: "#e8536c" }}>一切安好</span></motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.52}
              style={{
                fontFamily: "'Lato', sans-serif", fontWeight: 300,
                fontSize: "clamp(1rem,2.5vw,1.15rem)",
                color: "rgba(90,40,45,0.68)",
                lineHeight: 1.9, marginBottom: "2.8rem",
              }}>
              鲜花盛开的季节，送上最真诚的祝福，<br />
              工作顺利，身体健康，平安归来。
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.68}
              style={{ fontSize: "2.2rem" }}>
              🌸
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 9, 0] }} transition={{ duration: 1.9, repeat: Infinity }}>
            <div style={{
              width: 1, height: 56,
              background: "linear-gradient(to bottom, rgba(255,107,157,0.6), transparent)",
              margin: "0 auto",
            }} />
          </motion.div>
        </section>

        {/* ── MEXICO STRIP ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ minHeight: 320 }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${MEXICO_ST})`,
            backgroundSize: "cover", backgroundPosition: "center 60%",
            filter: "brightness(0.85) saturate(1.3)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(254,247,243,0.3), rgba(250,238,230,0.12), rgba(254,247,243,0.3))",
          }} />

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-8"
            style={{ minHeight: 320, paddingTop: 60, paddingBottom: 60 }}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontSize: 36, marginBottom: "1rem" }}>
              🇲🇽
            </motion.div>
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}
              style={{
                fontFamily: "'Playfair Display', serif", fontStyle: "italic",
                fontSize: "clamp(1.2rem,3.5vw,1.9rem)",
                color: "#3d1a1a",
                lineHeight: 1.7,
                textShadow: "0 1px 15px rgba(200,100,120,0.15)",
                maxWidth: 600,
              }}>
              "2026 世界杯即将在这片土地点燃，<br />
              愿你的出差之旅与这场盛事一样精彩。"
            </motion.p>
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3}
              style={{
                fontFamily: "'Lato', sans-serif", fontWeight: 300,
                fontSize: "0.8rem", color: "rgba(130,70,75,0.45)",
                letterSpacing: "0.12em", marginTop: "1.2rem",
              }}>
              CIUDAD DE MÉXICO · 2026
            </motion.p>
          </div>
        </section>

        {/* ── PHOTO WALL ───────────────────────────────────────────────────── */}
        <section style={{ padding: "80px 0 50px" }}>
          <div className="text-center px-6 mb-0">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "#d4687c" }}>
              花与美景，定格此刻
            </motion.p>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem,5vw,3rem)",
                fontWeight: 700, color: "#3d1a1a",
                marginTop: "0.2em",
                textShadow: "0 0 30px rgba(200,100,120,0.1)",
              }}>cc照片墙</motion.h2>
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.28}
              style={{
                fontFamily: "'Lato', sans-serif", fontWeight: 300,
                fontSize: "0.9rem", color: "rgba(130,70,75,0.4)",
                marginTop: "0.4rem",
              }}></motion.p>
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.35}>
            <PhotoBall compact />
          </motion.div>
        </section>

        <Divider />

        {/* ── BLESSING ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ padding: "90px 24px 100px" }}>

          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${SUNLIGHT})`,
            backgroundSize: "cover", backgroundPosition: "center",
            filter: "brightness(0.85) saturate(1.2)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(254,247,243,0.25), rgba(250,238,230,0.1), rgba(254,247,243,0.3))",
          }} />

          <div className="relative z-10 text-center" style={{ maxWidth: 640, margin: "0 auto" }}>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontSize: 44, marginBottom: "1.8rem" }}>
              🌸 🌺 🌸
            </motion.div>

            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(1.8rem,5vw,2.8rem)", color: "#d4687c",
                marginBottom: "2.5rem",
              }}>
              送上最真诚的祝愿
            </motion.p>

            {/* Card 1 */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
              style={{
                background: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(200,140,150,0.4)",
                borderRadius: 22, padding: "2.4rem 2rem",
                marginBottom: "1.4rem",
              }}>
              <div style={{ fontSize: 38, marginBottom: "0.8rem" }}>💼</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 700,
                color: "#3d1a1a", marginBottom: "0.8rem",
                textShadow: "0 0 15px rgba(200,100,120,0.12)",
              }}>
                祝工作顺利
              </h3>
              <p style={{
                fontFamily: "'Lato', sans-serif", fontWeight: 300,
                fontSize: "1rem", color: "rgba(90,40,45,0.65)",
                lineHeight: 1.9,
              }}>
                愿出差期间诸事顺利，<br />
                所有计划都能如期推进，<br />
                不虚此行。
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.35}
              style={{
                background: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(200,140,150,0.4)",
                borderRadius: 22, padding: "2.4rem 2rem",
                marginBottom: "2.8rem",
              }}>
              <div style={{ fontSize: 38, marginBottom: "0.8rem" }}>🌿</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 700,
                color: "#3d1a1a", marginBottom: "0.8rem",
                textShadow: "0 0 15px rgba(200,100,120,0.12)",
              }}>
                注意身体健康
              </h3>
              <p style={{
                fontFamily: "'Lato', sans-serif", fontWeight: 300,
                fontSize: "1rem", color: "rgba(90,40,45,0.65)",
                lineHeight: 1.9,
              }}>
                在外出差辛苦了，<br />
                记得按时吃饭、好好休息，<br />
                身体才是最重要的。
              </p>
            </motion.div>

            {/* Final closing line */}
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.5}
              style={{
                fontFamily: "'Playfair Display', serif", fontStyle: "italic",
                fontSize: "clamp(1.1rem,3vw,1.5rem)",
                color: "rgba(100,50,55,0.6)",
                lineHeight: 1.75,
              }}>
              "愿鲜花盛开的季节，<br />
              给你的旅途带来好运与美好。"
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.65}
              style={{ marginTop: "2rem", fontSize: "1.8rem" }}>
              🌸
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer style={{
          background: "rgba(245,235,228,0.6)",
          padding: "44px 24px",
          textAlign: "center",
          borderTop: "1px solid rgba(200,140,150,0.2)",
        }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div style={{ fontSize: 26, marginBottom: "0.8rem" }}>🌸 💕 🌺</div>
            <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.5rem", color: "#d4687c", marginBottom: "0.4rem" }}>
              出差顺利，平安归来
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "0.72rem", color: "rgba(130,70,75,0.35)", letterSpacing: "0.1em" }}>
              México · 2026 · With love
            </p>
          </motion.div>
        </footer>

      </div>
    </div>
  );
}
