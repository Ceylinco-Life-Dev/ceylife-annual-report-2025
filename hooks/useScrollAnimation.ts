'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isVisible };
}

/** Returns inline style for a fade-up animation with optional delay (ms) */
export function fadeUp(isVisible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
  };
}

/** Returns inline style for a fade-in animation with optional delay (ms) */
export function fadeIn(isVisible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transition: `opacity 0.75s ease ${delay}ms`,
  };
}

/** Returns inline style for a slide-in from left animation with optional delay (ms) */
export function slideLeft(isVisible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
  };
}

/** Returns inline style for a slide-in from right animation with optional delay (ms) */
export function slideRight(isVisible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(60px)',
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
  };
}
