import React, { useEffect, useState } from 'react';

interface HeartPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const FloatingCursor: React.FC = () => {
  const [hearts, setHearts] = useState<HeartPoint[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const colors = ['#d4a373', '#faedcd', '#fefae0', '#e9c46a', '#c8963e', '#8c5638'];

    const addHeart = (x: number, y: number) => {
      const newHeart: HeartPoint = {
        id: ++idCounter,
        x,
        y,
        size: Math.random() * 12 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setHearts((prev) => [...prev.slice(-15), newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 800);
    };

    const handlePointerMove = (e: PointerEvent) => {
      // throttle particle creation
      if (Math.random() > 0.3) {
        addHeart(e.clientX, e.clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Burst on click/tap
      for (let i = 0; i < 5; i++) {
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        addHeart(e.clientX + offsetX, e.clientY + offsetY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-float-up select-none"
          style={{
            left: `${h.x}px`,
            top: `${h.y}px`,
            fontSize: `${h.size}px`,
            color: h.color,
            filter: 'drop-shadow(0 2px 4px rgba(255, 111, 174, 0.4))',
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};
