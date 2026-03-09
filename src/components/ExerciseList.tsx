import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MuscleGroup, Exercise } from "@/data/workouts";
import { Target, Play, X, ExternalLink, Crosshair, ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";
import CardioTimer from "./CardioTimer";

interface ExerciseListProps {
  muscleGroups: MuscleGroup[];
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const ExerciseList = ({ muscleGroups }: ExerciseListProps) => {
  let globalIndex = 0;
  const [activeVideo, setActiveVideo] = useState<Exercise | null>(null);
  const [brokenVideos, setBrokenVideos] = useState<Set<string>>(new Set());
  const [useYoutubeFallback, setUseYoutubeFallback] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupName)) {
        next.delete(groupName);
      } else {
        next.add(groupName);
      }
      return next;
    });
  };

  const toggleComplete = (exerciseId: string) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev);
      if (next.has(exerciseId)) {
        next.delete(exerciseId);
      } else {
        next.add(exerciseId);
      }
      return next;
    });
  };

  const getYoutubeQuery = (exercise: Exercise) =>
    `${exercise.name} execução exercício academia`;

  const getYoutubeSearchUrl = (exercise: Exercise) =>
    `https://www.youtube.com/results?search_query=${encodeURIComponent(getYoutubeQuery(exercise))}`;

  const openExerciseVideo = (exercise: Exercise) => {
    setActiveVideo(exercise);
    setUseYoutubeFallback(brokenVideos.has(exercise.id) || !exercise.videoUrl);
  };

  const handleVideoError = (id: string) => {
    setBrokenVideos((prev) => new Set(prev).add(id));
    setUseYoutubeFallback(true);
  };

  // Split "Region Name: description" into two parts
  const parseMuscleRegion = (region: string) => {
    const colonIdx = region.indexOf(":");
    if (colonIdx === -1) return { label: region, desc: "" };
    return {
      label: region.slice(0, colonIdx).trim(),
      desc: region.slice(colonIdx + 1).trim(),
    };
  };

  return (
    <>
      <motion.div
        key={muscleGroups.map((g) => g.name).join(",")}
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-10"
      >
        {muscleGroups.map((group) => (
          <div key={group.name}>
            {/* Group header */}
            <button
              onClick={() => toggleGroup(group.name)}
              className="flex items-center gap-2.5 mb-5 w-full group"
            >
              <Target className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono-display text-[15px] tracking-[0.2em] uppercase text-primary font-semibold drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)]">
                {group.name}
              </span>
              <div className="h-px flex-1 bg-border" />
              {collapsedGroups.has(group.name) ? (
                <ChevronDown className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              ) : (
                <ChevronUp className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              )}
            </button>

            {/* Exercises */}
            {!collapsedGroups.has(group.name) && (
              <div className="space-y-2">
                {group.exercises.map((exercise) => {
                globalIndex++;
                const num = String(globalIndex).padStart(2, "0");
                const { label: regionLabel, desc: regionDesc } = parseMuscleRegion(exercise.muscleRegion);
                const isCompleted = completedExercises.has(exercise.id);
                
                return (
                  <motion.div
                    key={exercise.id}
                    variants={item}
                    className={`relative flex items-start gap-4 py-4 px-4 rounded-xl border transition-all duration-300 ${
                      isCompleted
                        ? "bg-primary/10 border-primary/30"
                        : "bg-secondary/40 border-border/50 hover:border-primary/30 hover:bg-secondary/70"
                    }`}
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleComplete(exercise.id)}
                      className="shrink-0 mt-0.5 transition-transform active:scale-90"
                      aria-label={isCompleted ? "Marcar como não concluído" : "Marcar como concluído"}
                    >
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                          <CheckCircle2 className="w-6 h-6 text-primary fill-primary/20" />
                        </motion.div>
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      )}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="font-mono-display text-xs font-bold text-primary">
                            {num}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[14px] font-semibold leading-tight transition-all ${
                            isCompleted ? "text-muted-foreground line-through" : "text-foreground"
                          }`}>
                            {exercise.name}
                          </p>
                          <p className="text-[12px] text-muted-foreground mt-1 leading-snug">
                            {exercise.focus}
                          </p>
                        </div>
                      </div>

                      {/* Muscle target row */}
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full">
                          <Crosshair className="w-3 h-3 text-primary shrink-0" />
                          <span className="text-[10px] font-semibold text-primary">
                            {exercise.targetMuscle}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {exercise.sets}
                        </span>
                      </div>

                      {/* Muscle region */}
                      {exercise.muscleRegion && (
                        <p className="text-[11px] mt-1.5 leading-snug">
                          <span className="font-semibold text-foreground/70">{regionLabel}:</span>{" "}
                          <span className="text-muted-foreground">{regionDesc}</span>
                        </p>
                      )}

                      {/* Cardio Timer */}
                      {exercise.targetMuscle === "Sistema Cardiovascular" && (
                        <CardioTimer exerciseName={exercise.name} />
                      )}
                    </div>

                    {/* Play button */}
                    <button
                      onClick={() => openExerciseVideo(exercise)}
                      className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors mt-0.5"
                      aria-label={`Ver execução de ${exercise.name}`}
                    >
                      <Play className="w-4 h-4 text-primary fill-primary" />
                    </button>
                  </motion.div>
                );
              })}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-card border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {activeVideo.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {activeVideo.targetMuscle} · {activeVideo.focus}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  {useYoutubeFallback && (
                    <a
                      href={getYoutubeSearchUrl(activeVideo)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`Abrir ${activeVideo.name} no YouTube`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Video */}
              <div className="bg-muted">
                {useYoutubeFallback ? (
                  <div className="h-full w-full flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Play className="w-7 h-7 text-primary fill-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Vídeo indisponível nesta fonte.
                    </p>
                    <button
                      onClick={() => window.open(getYoutubeSearchUrl(activeVideo), '_blank', 'noopener,noreferrer')}
                      className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Buscar no YouTube
                    </button>
                  </div>
                ) : (
                  <div className={activeVideo.videoUrlSide ? "grid grid-cols-1 gap-2 p-2" : ""}>
                    <video
                      key={`${activeVideo.id}-front`}
                      src={activeVideo.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                      onError={() => handleVideoError(activeVideo.id)}
                    />
                    {activeVideo.videoUrlSide && (
                      <video
                        key={`${activeVideo.id}-side`}
                        src={activeVideo.videoUrlSide}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain"
                        onError={() => handleVideoError(activeVideo.id)}
                      />
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExerciseList;
