import { useEffect, useRef, useState, useCallback } from "react";

const BASE = import.meta.env.BASE_URL;

const PHOTOS = [
  { url: BASE + "photos/webp/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-06-06_161627_354.webp", alt: "照片 1" },
  { url: BASE + "photos/webp/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-06-06_161709_032.webp", alt: "照片 2" },
  { url: BASE + "photos/webp/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-06-06_161725_276.webp", alt: "照片 3" },
  { url: BASE + "photos/webp/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-06-06_161735_206.webp", alt: "照片 4" },
  { url: BASE + "photos/webp/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-06-06_161814_063.webp", alt: "照片 5" },
  { url: BASE + "photos/webp/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-06-06_161840_998.webp", alt: "照片 6" },
  { url: BASE + "photos/webp/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-06-06_161850_419.webp", alt: "照片 7" },
  { url: BASE + "photos/webp/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2026-06-06_161925_470.webp", alt: "照片 8" },
];

function distributeOnSphere(count: number) {
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  return Array.from({ length: count }, (_, i) => ({
    theta: Math.acos(1 - (2 * (i + 0.5)) / count),
    phi: (2 * Math.PI * i) / goldenRatio,
  }));
}

interface PhotoItem {
  url: string; alt: string;
  x: number; y: number; z: number;
}

function buildPhotoItems(radius: number): PhotoItem[] {
  const points = distributeOnSphere(PHOTOS.length);
  return PHOTOS.map((photo, i) => {
    const { theta, phi } = points[i];
    return {
      ...photo,
      x: radius * Math.sin(theta) * Math.cos(phi),
      y: radius * Math.cos(theta),
      z: radius * Math.sin(theta) * Math.sin(phi),
    };
  });
}

export function PhotoBall({ compact = false }: { compact?: boolean }) {
  const radius = compact ? 170 : 220;
  const itemSize = compact ? 72 : 90;

  const [rotX, setRotX] = useState(20);
  const [rotY, setRotY] = useState(0);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number | null>(null);
  const rotRef = useRef({ x: 20, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const photoItems = buildPhotoItems(radius);

  const animate = useCallback(() => {
    if (!isDragging.current) {
      velRef.current.y += 0.05;
      velRef.current.x *= 0.96;
      velRef.current.y *= 0.985;
      rotRef.current.x += velRef.current.x;
      rotRef.current.y += velRef.current.y;
      setRotX(rotRef.current.x);
      setRotY(rotRef.current.y);
    }
    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [animate]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    velRef.current = { x: 0, y: 0 };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    velRef.current = { x: dy * 0.3, y: dx * 0.3 };
    rotRef.current.x += dy * 0.3;
    rotRef.current.y += dx * 0.3;
    setRotX(rotRef.current.x);
    setRotY(rotRef.current.y);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => { isDragging.current = false; };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    velRef.current = { x: 0, y: 0 };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - lastMouse.current.x;
    const dy = e.touches[0].clientY - lastMouse.current.y;
    velRef.current = { x: dy * 0.3, y: dx * 0.3 };
    rotRef.current.x += dy * 0.3;
    rotRef.current.y += dx * 0.3;
    setRotX(rotRef.current.x);
    setRotY(rotRef.current.y);
    lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = () => { isDragging.current = false; };

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  function getZ(item: PhotoItem) {
    const rx = toRad(rotX), ry = toRad(rotY);
    const z1 = item.y * Math.sin(rx) + item.z * Math.cos(rx);
    return -item.x * Math.sin(ry) + z1 * Math.cos(ry);
  }

  function getTransform(item: PhotoItem) {
    const rx = toRad(rotX), ry = toRad(rotY);
    const y1 = item.y * Math.cos(rx) - item.z * Math.sin(rx);
    const z1 = item.y * Math.sin(rx) + item.z * Math.cos(rx);
    const x2 = item.x * Math.cos(ry) + z1 * Math.sin(ry);
    const z2 = -item.x * Math.sin(ry) + z1 * Math.cos(ry);
    const perspective = 700;
    const scale = perspective / (perspective - z2);
    const opacity = Math.max(0.1, (z2 + radius) / (2 * radius));
    return { tx: x2, ty: y1, scale, opacity };
  }

  const sorted = [...photoItems].sort((a, b) => getZ(a) - getZ(b));
  const W = radius * 2 + itemSize;

  return (
    <div
      className="relative flex items-center justify-center w-full overflow-hidden select-none"
      style={{ height: W }}
    >
      {/* glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: W * 0.8, height: W * 0.8,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,200,50,0.12) 0%, rgba(50,180,100,0.08) 50%, transparent 70%)",
          filter: "blur(30px)",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />

      <div
        ref={containerRef}
        style={{
          width: W, height: W,
          position: "relative",
          cursor: isDragging.current ? "grabbing" : "grab",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {sorted.map((item, i) => {
          const { tx, ty, scale, opacity } = getTransform(item);
          const size = itemSize * scale;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: W / 2 + tx - size / 2,
                top: W / 2 + ty - size / 2,
                width: size, height: size,
                opacity,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: opacity > 0.65
                  ? "0 4px 20px rgba(0,0,0,0.45), 0 0 0 2px rgba(255,255,255,0.25)"
                  : "0 2px 8px rgba(0,0,0,0.3)",
                zIndex: Math.round(opacity * 100),
                pointerEvents: "none",
                transition: "none",
              }}
            >
              <img src={item.url} alt={item.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      
    </div>
  );
}
