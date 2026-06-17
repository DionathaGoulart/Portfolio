"use client";
import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  loop?: boolean;
}

export const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  speed = 50, 
  delay = 2000, 
  className,
  loop = true
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayedText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, speed);
      } else if (loop) {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delay);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length - 1));
        }, speed / 2);
      } else {
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, text, speed, delay, loop]);

  return (
    <span className={`inline-block ${className}`}>
      <span>{displayedText}</span>
      <span className="terminal-cursor" />
    </span>
  );
};
