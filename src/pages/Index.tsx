import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { workoutData } from "@/data/workouts";
import { workoutDataInferior } from "@/data/workouts-inferior";
import DaySelector from "@/components/DaySelector";
import ExerciseList from "@/components/ExerciseList";
import { Dumbbell, ChevronLeft, Clock, Flame, Repeat, Zap, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import WorkoutTimer from "@/components/WorkoutTimer";

type PlanType = "superior" | "inferior";

const Index = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const today = new Date().getDay();
  const dayMap: Record<number, string> = { 1: "seg", 2: "ter", 3: "qua", 4: "qui", 5: "sex" };
  const defaultDay = dayMap[today] || "seg";

  const [plan, setPlan] = useState<PlanType>("superior");
  const [activeDay, setActiveDay] = useState(defaultDay);
  const scrollRef = useRef<HTMLDivElement>(null);

  const data = plan === "superior" ? workoutData : workoutDataInferior;
  const currentWorkout = data.find((d) => d.id === activeDay)!;

  // Auto scroll animation - infinite loop
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.8;
    let animationId: number;

    const animate = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset to start for infinite loop (when reaches middle, reset)
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [plan, activeDay]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-5 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 transition-all active:scale-95"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <WorkoutTimer />
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>

        {/* Plan Toggle */}
        <div className="flex items-center bg-secondary rounded-lg p-1 mb-4">
          {(["superior", "inferior"] as PlanType[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlan(p)}
              className={`flex-1 text-xs font-semibold uppercase tracking-wider py-2 rounded-md transition-all ${
                plan === p
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "superior" ? "Superior" : "Inferior"}
            </button>
          ))}
        </div>

        {/* Day Selector */}
        <DaySelector
          days={data}
          activeDay={activeDay}
          onSelect={setActiveDay}
        />

        {/* Workout Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${plan}-${currentWorkout.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-7 mb-6"
          >
            <p className="text-[11px] font-mono-display tracking-[0.2em] uppercase text-primary mb-2">
              {currentWorkout.dayFull}
            </p>
            <h2 className="text-[28px] font-bold tracking-tight text-foreground leading-none">
              {currentWorkout.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              {currentWorkout.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Meta card - Carousel */}
        <div className="mb-6 -mx-4 bg-secondary border-t border-b border-primary/20 overflow-hidden">
          <div 
            ref={scrollRef}
            className="overflow-x-scroll"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex" style={{ width: 'max-content' }}>
              {/* Duplicate items for infinite scroll effect */}
              {[...Array(2)].map((_, dupIndex) => (
                [
                  { icon: Flame, label: `${currentWorkout.muscleGroups[0].exercises.length + (currentWorkout.muscleGroups[1]?.exercises.length || 0)} exercícios` },
                  { icon: Clock, label: "~1 hora" },
                  { icon: Repeat, label: "3×10-12 ou 4×8-12" },
                  { icon: Zap, label: currentWorkout.calories },
                ].map(({ icon: Icon, label }, i, arr) => (
                  <div key={`${dupIndex}-${label}`} className="flex items-center">
                    <div className="flex items-center gap-2 px-4 py-3">
                      <Icon className="w-4 h-4 text-primary shrink-0 drop-shadow-[0_0_4px_hsl(var(--primary)/0.7)]" />
                      <span className="text-xs text-primary font-medium whitespace-nowrap">{label}</span>
                    </div>
                    <div className="w-px h-5 bg-primary/20 shrink-0" />
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>

        {/* Exercise List */}
        <ExerciseList muscleGroups={currentWorkout.muscleGroups} />
      </div>
    </div>
  );
};

export default Index;
