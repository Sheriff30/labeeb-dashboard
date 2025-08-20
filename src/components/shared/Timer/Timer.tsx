import React, { useEffect, useState } from "react";

interface TimerProps {
  onComplete?: () => void;
  duration?: number;
  isActive?: boolean;
}

export default function Timer({
  onComplete,
  duration = 5,
  isActive = false,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(isActive);

  // Reset timer when isActive changes
  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [isActive, duration]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setIsRunning(false);
          setTimeout(() => {
            onComplete?.();
          }, 0);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return <span className="font-roboto">{formatTime(timeLeft)}</span>;
}
