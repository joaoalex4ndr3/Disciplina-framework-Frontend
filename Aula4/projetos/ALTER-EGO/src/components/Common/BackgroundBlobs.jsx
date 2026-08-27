import React from "react";
import { motion } from "framer-motion";

/**
 * BACKGROUNDBLOBS COMPONENT
 * Animated background with gradient blobs
 */
export const BackgroundBlobs = () => {
  const blobs = [
    {
      color: "rgba(124,92,252,0.12)",
      size: 600,
      x: "-10%",
      y: "-15%",
      delay: 0,
      duration: 8,
    },
    {
      color: "rgba(34,211,238,0.06)",
      size: 500,
      x: "70%",
      y: "20%",
      delay: 2,
      duration: 10,
    },
    {
      color: "rgba(244,114,182,0.07)",
      size: 450,
      x: "20%",
      y: "60%",
      delay: 4,
      duration: 12,
    },
    {
      color: "rgba(124,92,252,0.08)",
      size: 350,
      x: "80%",
      y: "75%",
      delay: 1,
      duration: 9,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
            background: blob.color,
            filter: "blur(80px)",
          }}
          animate={{
            borderRadius: [
              "60% 40% 30% 70%/60% 30% 70% 40%",
              "30% 60% 70% 40%/50% 60% 30% 60%",
              "60% 40% 30% 70%/60% 30% 70% 40%",
            ],
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#7c5cfc"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default BackgroundBlobs;
