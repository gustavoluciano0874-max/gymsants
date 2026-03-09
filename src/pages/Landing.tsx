import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dumbbell, ArrowRight, Calendar, Clock, Flame, Droplets, BarChart3, Zap, TrendingUp, Target, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import heroImg from "@/assets/hero-gym.jpg";

const Landing = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Theme Toggle - Fixed position */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 transition-all active:scale-95"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      {/* Hero */}
      <div className="relative h-[65vh] min-h-[420px]">
        <img
          src={heroImg}
          alt="Gym atmosphere"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />

        <div className="relative z-10 h-full flex flex-col justify-end px-5 pb-8 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-mono-display text-[11px] tracking-[0.25em] uppercase text-primary font-semibold">
                Full Body Split
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
              Seu plano de
              <br />
              treino <span className="text-primary">completo</span>
            </h1>

            <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-[320px]">
              5 dias de treino focados em membros superiores e inferiores. Organizado, direto
              ao ponto e pronto pra você seguir na academia.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-5 -mt-2">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Calendar, label: "2 Planos", value: "Sup + Inf" },
              { icon: Clock, label: "Por Sessão", value: "~1 hora" },
              { icon: Flame, label: "Por Dia", value: "3-7 Exercícios" },
              { icon: Target, label: "Grupos", value: "12 Músculos" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-secondary rounded-xl px-4 py-3.5 text-center"
              >
                <Icon className="w-4 h-4 text-primary mx-auto mb-2" />
                <p className="text-[13px] font-bold text-foreground">{value}</p>
                <p className="text-[10px] text-muted-foreground font-mono-display tracking-wider uppercase mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-10"
        >
          <p className="text-[11px] font-mono-display tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Dicas importantes
          </p>

          <div className="space-y-3">
            {[
              {
                icon: BarChart3,
                title: "Séries e Repetições",
                desc: "Exercícios compostos (supino, remada, agachamento) usam 4×8-12. Os isolados usam 3×10-15. Priorize a execução antes de aumentar a carga.",
              },
              {
                icon: Zap,
                title: "Descanso entre Séries",
                desc: "60–90 seg nos compostos e 45–60 seg nos isolados. Respeite os tempos para manter a intensidade e fechar em ~1 hora.",
              },
              {
                icon: Droplets,
                title: "Hidratação",
                desc: "Com treinos intensos de superiores e inferiores, o pump vai ser forte. Beba água antes, durante e após o treino para manter a performance.",
              },
              {
                icon: TrendingUp,
                title: "Progressão de Carga",
                desc: "A cada semana, tente aumentar a carga ou o número de repetições. A progressão constante é o principal gatilho para o crescimento muscular.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-3.5 bg-secondary/60 rounded-xl p-4"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">
                    {title}
                  </p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed mt-1">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pb-6"
        >
          <button
            onClick={() => navigate("/treinos")}
            className="relative w-full bg-primary text-primary-foreground font-bold text-[15px] py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform overflow-hidden"
          >
            {/* Pulsing ghost effect */}
            <span className="absolute inset-0 rounded-xl bg-primary animate-ping opacity-20" style={{ animationDuration: '2s' }} />
            <span className="relative z-10 flex items-center gap-2">
              Ver meus treinos
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </motion.div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="pb-10 text-center"
        >
          <p className="text-[11px] text-muted-foreground font-mono-display tracking-wider uppercase mb-1">
            Créditos Developer
          </p>
          <p className="text-sm text-foreground font-semibold">
            Gusta Sants
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Apoie o criador
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
