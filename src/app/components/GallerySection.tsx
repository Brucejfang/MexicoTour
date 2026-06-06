import { motion } from "motion/react";

const photos = [
  {
    url: "https://images.unsplash.com/photo-1501686962565-1350ab98237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHJvc2VzJTIwZmxvd2VycyUyMHBpbmt8ZW58MXx8fHwxNzgwMDMxNjgwfDA&ixlib=rb-4.1.0&q=80&w=800",
    alt: "Pink rose close up",
    caption: "As delicate as your heart",
  },
  {
    url: "https://images.unsplash.com/photo-1542460533-50ac46fb13d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMGxvdmUlMjBzdW5zZXR8ZW58MXx8fHwxNzgwMDMxNjg0fDA&ixlib=rb-4.1.0&q=80&w=800",
    alt: "Silhouette couple at sunset",
    caption: "Together, always",
  },
  {
    url: "https://images.unsplash.com/photo-1623776025811-fd139155a39b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyb21hbnRpYyUyMHJvc2VzJTIwZmxvd2VycyUyMHBpbmt8ZW58MXx8fHwxNzgwMDMxNjgwfDA&ixlib=rb-4.1.0&q=80&w=800",
    alt: "Pink roses in bloom",
    caption: "In full bloom, like us",
  },
  {
    url: "https://images.unsplash.com/photo-1529516222410-a269d812f320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNhbmRsZWxpZ2h0JTIwZGlubmVyJTIwZmxvd2VycyUyMGJva2VofGVufDF8fHx8MTc4MDAzMTY4NXww&ixlib=rb-4.1.0&q=80&w=800",
    alt: "Roses and candles",
    caption: "Light and warmth",
  },
  {
    url: "https://images.unsplash.com/photo-1640273296013-e4b54eaf52eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxyb21hbnRpYyUyMGNvdXBsZSUyMGxvdmUlMjBzdW5zZXR8ZW58MXx8fHwxNzgwMDMxNjg0fDA&ixlib=rb-4.1.0&q=80&w=800",
    alt: "Couple holding hands at sunset",
    caption: "Hand in hand, forever",
  },
  {
    url: "https://images.unsplash.com/photo-1496175362769-08a34d630326?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxyb21hbnRpYyUyMHJvc2VzJTIwZmxvd2VycyUyMHBpbmt8ZW58MXx8fHwxNzgwMDMxNjgwfDA&ixlib=rb-4.1.0&q=80&w=800",
    alt: "Pink rose closeup",
    caption: "Every petal, a promise",
  },
];

export function GallerySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
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
            moments of beauty
          </p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 600 }}
          >
            Our Story in Flowers
          </h2>
          <div className="w-16 h-px bg-pink-400 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className="relative group rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/3" }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}
              >
                <p
                  className="text-white"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem" }}
                >
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
