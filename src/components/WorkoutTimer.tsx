import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Timer, Play, Pause, RotateCcw, X } from "lucide-react";

const WorkoutTimer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
  }, [isRunning]);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(() => {
    pause();
    setTime(0);
  }, [pause]);

  const close = useCallback(() => {
    reset();
    setIsOpen(false);
  }, [reset]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="relative w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="absolute inset-0 rounded-lg bg-primary/15 animate-[ghost-pulse_2.5s_ease-in-out_infinite]" />
        <Timer className="w-5 h-5 relative z-10" />
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="flex items-center gap-2 bg-secondary border border-primary/20 rounded-lg px-3 py-1.5"
      >
        <span className="text-lg font-mono font-bold text-foreground tabular-nums tracking-wider">
          {formatTime(time)}
        </span>

        {isRunning ? (
          <button onClick={pause} className="w-7 h-7 rounded-md bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors">
            <Pause className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button onClick={start} className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
            <Play className="w-3.5 h-3.5" />
          </button>
        )}

        <button onClick={reset} className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button onClick={close} className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default WorkoutTimer;
