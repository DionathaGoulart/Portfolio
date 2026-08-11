"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  loop?: boolean;
}

/**
 * Types `text` out one character at a time, optionally erasing and repeating.
 *
 * The effect is keyed on the props only. The previous version listed `displayedText` in its
 * dependency array, so every character re-ran the whole effect and the loop restarted itself
 * through a synchronous setState. Here a single self-chaining timeout drives the animation
 * and the visible text is the only piece of state.
 */
export const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 50,
  delay = 2000,
  className,
  loop = true,
}) => {
  const [typed, setTyped] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reduceMotion = useReducedMotion();

  // Restart from an empty string when the text prop changes, adjusted during render so the
  // effect never has to reset state synchronously.
  const [renderedText, setRenderedText] = useState(text);
  if (renderedText !== text) {
    setRenderedText(text);
    setTyped("");
  }

  useEffect(() => {
    if (reduceMotion) return;

    let length = 0;
    let erasing = false;

    const tick = () => {
      if (!erasing) {
        length++;
        setTyped(text.slice(0, length));
        if (length < text.length) {
          timeoutRef.current = setTimeout(tick, speed);
        } else if (loop) {
          erasing = true;
          timeoutRef.current = setTimeout(tick, delay);
        }
        return;
      }

      length--;
      setTyped(text.slice(0, length));
      if (length > 0) {
        timeoutRef.current = setTimeout(tick, speed / 2);
      } else {
        erasing = false;
        timeoutRef.current = setTimeout(tick, speed);
      }
    };

    timeoutRef.current = setTimeout(tick, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [text, speed, delay, loop, reduceMotion]);

  const displayedText = reduceMotion ? text : typed;

  return (
    <span className={`inline-block ${className}`}>
      <span>{displayedText}</span>
      <span className="terminal-cursor" />
    </span>
  );
};
