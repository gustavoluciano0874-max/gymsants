import { motion } from "framer-motion";
import { WorkoutDay } from "@/data/workouts";

interface DaySelectorProps {
  days: WorkoutDay[];
  activeDay: string;
  onSelect: (id: string) => void;
}

const DaySelector = ({ days, activeDay, onSelect }: DaySelectorProps) => {
  return (
    <div className="flex gap-1.5 bg-secondary/50 rounded-xl p-1.5">
      {days.map((day) => {
        const isActive = day.id === activeDay;
        return (
          <button
            key={day.id}
            onClick={() => onSelect(day.id)}
            className="relative flex-1 flex flex-col items-center gap-0.5 py-3 rounded-lg transition-colors"
          >
            {isActive && (
              <motion.div
                layoutId="dayBg"
                className="absolute inset-0 bg-primary rounded-lg shadow-lg shadow-primary/20"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 font-mono-display text-[13px] font-bold tracking-wide ${
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {day.dayShort}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DaySelector;
