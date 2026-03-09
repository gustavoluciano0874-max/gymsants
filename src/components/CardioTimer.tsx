import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square } from "lucide-react";

interface CardioTimerProps {
  exerciseName: string;
}

const CardioTimer = ({ exerciseName }: CardioTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showStopMessage, setShowStopMessage] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastMilestoneRef = useRef(0);

  const motivationalMessages = [
    "🎉 Parabéns, continue se esforçando!",
    "💪 Você está arrasando!",
    "🔥 Isso aí, não pare agora!",
    "⚡ Energia total, continue assim!",
    "🏆 Excelente trabalho!",
    "💯 Você é imparável!",
    "🚀 Voando alto, continue!",
    "⭐ Brilhando muito!",
    "👏 Mandando muito bem!",
    "🎯 Foco total, parabéns!",
  ];

  const stopMessages = [
    "💪 Ótimo treino! Amanhã você volta ainda mais forte!",
    "🔥 Descanse bem! Te vejo amanhã para mais!",
    "⭐ Parabéns pelo esforço! Até o próximo treino!",
    "🏆 Treino concluído! Amanhã é dia de superar limites!",
    "💯 Excelente! Recupere-se bem para o próximo!",
    "🚀 Missão cumprida! Nos vemos no próximo treino!",
    "👏 Muito bem! Amanhã você vai ainda melhor!",
    "⚡ Descanse e se prepare! Amanhã tem mais!",
  ];

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    return motivationalMessages[randomIndex];
  };

  const getRandomStopMessage = () => {
    const randomIndex = Math.floor(Math.random() * stopMessages.length);
    return stopMessages[randomIndex];
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;
          
          // Check for 10-minute milestones (600 seconds)
          const currentMilestone = Math.floor(newTime / 600);
          if (currentMilestone > lastMilestoneRef.current && newTime % 600 === 0) {
            lastMilestoneRef.current = currentMilestone;
            playBeep();
            setCurrentMessage(getRandomMessage());
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const playBeep = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    if (time > 0) {
      setCurrentMessage(getRandomStopMessage());
      setShowStopMessage(true);
      setTimeout(() => setShowStopMessage(false), 4000);
    }
    setIsRunning(false);
    setTime(0);
    lastMilestoneRef.current = 0;
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1 bg-primary/10 rounded-lg px-3 py-2 text-center">
          <p className="text-lg font-mono-display font-bold text-primary">
            {formatTime(time)}
          </p>
        </div>
        <div className="flex gap-2">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Iniciar cronômetro"
            >
              <Play className="w-4 h-4 fill-current" />
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Pausar cronômetro"
            >
              <Pause className="w-4 h-4 fill-current" />
            </button>
          )}
          <button
            onClick={handleStop}
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Parar cronômetro"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      {/* Motivational Message */}
      {showMessage && (
        <div className="absolute -top-12 left-0 right-0 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-center text-sm font-semibold shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
          {currentMessage}
        </div>
      )}

      {/* Stop Message */}
      {showStopMessage && (
        <div className="absolute -top-12 left-0 right-0 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-center text-sm font-semibold shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
          {currentMessage}
        </div>
      )}
    </div>
  );
};

export default CardioTimer;
