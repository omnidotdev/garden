"use client";

import { useEffect, useRef, useState } from "react";

import cn from "@/lib/util/cn";

interface RotatingTextProps {
  prefix?: string;
  suffix?: string;
  words: string[];
  interval?: number;
  className?: string;
}

const colors = [
  "from-purple-500 to-blue-500",
  "from-blue-500 to-teal-500",
  "from-teal-500 to-emerald-500",
  "from-emerald-500 to-yellow-500",
  "from-yellow-500 to-orange-500",
  "from-orange-500 to-red-500",
  "from-red-500 to-pink-500",
  "from-pink-500 to-purple-500",
];

// TODO: stabilize width

const RotatingText = ({
  prefix = "Visualize your",
  suffix = "Ecosystem",
  interval = 3000,
  className = "",
  words,
}: RotatingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const wordRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // handle word rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setIsChanging(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setCurrentColor((prevColor) => (prevColor + 1) % colors.length);

        setTimeout(() => {
          setIsChanging(false);
        }, 100);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <h1 className="flex flex-col flex-wrap items-center justify-center py-2 font-bold text-4xl tracking-tighter md:flex-row md:text-5xl">
        <span
          className={`transition-all duration-300 ease-in-out ${
            isChanging && "md:translate-x-[8px]"
          }`}
        >
          {prefix}
        </span>

        <div
          ref={containerRef}
          className="relative mx-3 inline-block text-center"
        >
          <span
            ref={wordRef}
            className={cn(
              `inline-block bg-gradient-to-r ${colors[currentColor]} bg-clip-text py-1 text-transparent transition-all duration-300`,
              isChanging ? "scale-95 opacity-0" : "scale-100 opacity-100",
            )}
          >
            {words[currentIndex]}
          </span>
        </div>

        <span
          // className="transition-all duration-300 ease-in-out"
          className={`transition-all duration-300 ease-in-out ${
            isChanging && "md:translate-x-[-8px]"
          }`}
        >
          {suffix}
        </span>
      </h1>
    </div>
  );
};

export default RotatingText;
