export interface Exercise {
  id: string;
  name: string;
  focus: string;
  sets: string;
  videoUrl?: string;
  videoUrlSide?: string;
  targetMuscle: string;
  muscleRegion: string;
}

export interface MuscleGroup {
  name: string;
  exercises: Exercise[];
}

export interface WorkoutDay {
  id: string;
  dayShort: string;
  dayFull: string;
  title: string;
  subtitle: string;
  calories: string;
  muscleGroups: MuscleGroup[];
}

const v = (slug: string) =>
  `https://media.musclewiki.com/media/uploads/videos/branded/${slug}`;

const vWithSide = (slug: string) => {
  const sideSlug = slug.replace('-front.mp4', '-side.mp4');
  return {
    videoUrl: v(slug),
    videoUrlSide: v(sideSlug),
  };
};

const cardioOpcional = (prefix: string): MuscleGroup => ({
  name: "Cardio Opcional",
  exercises: [
    {
      id: `${prefix}-card1`,
      name: "Bike Estacionária",
      focus: "Queima de gordura e resistência cardiovascular",
      sets: "20–45 min",
      ...vWithSide("male-Cardio-stationary-bike-front.mp4"),
      targetMuscle: "Sistema Cardiovascular",
      muscleRegion: "Resistência Aeróbica: Condicionamento cardiovascular e queima de gordura sustentada.",
    },
    {
      id: `${prefix}-card2`,
      name: "Pular Corda",
      focus: "Cardio de alta intensidade e ritmo acelerado",
      sets: "10–20 min",
      ...vWithSide("male-Cardio-jump-rope-front.mp4"),
      targetMuscle: "Sistema Cardiovascular",
      muscleRegion: "Cardio de Alta Intensidade: Ritmo acelerado, coordenação motora e gasto calórico elevado.",
    },
  ],
});

export const workoutData: WorkoutDay[] = [
  {
    id: "seg",
    dayShort: "SEG",
    dayFull: "Segunda-feira",
    title: "Peito & Tríceps",
    subtitle: "Foco em Empurrar",
    calories: "250–550 kcal",
    muscleGroups: [
      {
        name: "Peito",
        exercises: [
          {
            id: "seg-p1",
            name: "Supino Reto (Barra ou Halter)",
            focus: "Base e força total",
            sets: "4×8-12",
            ...vWithSide("male-barbell-bench-press-front.mp4"),
            targetMuscle: "Peitoral Maior",
            muscleRegion: "Porção Esternocostal: Massa bruta e volume central do peito.",
          },
          {
            id: "seg-p2",
            name: "Supino Inclinado (Halteres)",
            focus: "Foco na parte superior (clavicular)",
            sets: "3×10-12",
            ...vWithSide("male-dumbbell-incline-bench-press-front.mp4"),
            targetMuscle: "Peitoral Maior",
            muscleRegion: "Porção Clavicular: A \"parte de cima\" do peito, que dá o aspecto preenchido perto da clavícula.",
          },
          {
            id: "seg-p3",
            name: "Crossover ou Peck Deck",
            focus: "Foco no miolo e isolamento",
            sets: "3×12-15",
            ...vWithSide("male-Machine-machine-pec-fly-front.mp4"),
            targetMuscle: "Peitoral Maior",
            muscleRegion: "Fibras Internas: Foco no \"miolo\" do peito e separação muscular.",
          },
        ],
      },
      {
        name: "Tríceps",
        exercises: [
          {
            id: "seg-t1",
            name: "Tríceps Pulley (Barra)",
            focus: "Aquecimento e foco na cabeça lateral",
            sets: "3×12-15",
            ...vWithSide("male-Cables-cable-bar-pushdown-front.mp4"),
            targetMuscle: "Tríceps Braquial",
            muscleRegion: "Cabeça Lateral: A parte de fora do braço que dá largura quando visto de frente.",
          },
          {
            id: "seg-t2",
            name: "Tríceps Testa (Halteres ou Barra W)",
            focus: "Foco na cabeça longa (volume)",
            sets: "3×10-12",
            ...vWithSide("male-barbell-laying-tricep-extensions-front.mp4"),
            targetMuscle: "Tríceps Braquial",
            muscleRegion: "Cabeça Longa: A maior parte do tríceps. Essencial para o tamanho total do braço.",
          },
          {
            id: "seg-t3",
            name: "Tríceps Corda",
            focus: "Contração máxima e definição",
            sets: "3×12-15",
            ...vWithSide("male-Cables-cable-overhead-tricep-extension-front.mp4"),
            targetMuscle: "Tríceps Braquial",
            muscleRegion: "Cabeça Medial: Foco na contração final e detalhamento próximo ao cotovelo.",
          },
        ],
      },
      cardioOpcional("seg"),
    ],
  },
  {
    id: "ter",
    dayShort: "TER",
    dayFull: "Terça-feira",
    title: "Costas & Bíceps",
    subtitle: "Foco em Puxar",
    calories: "300–600 kcal",
    muscleGroups: [
      {
        name: "Costas",
        exercises: [
          {
            id: "ter-c1",
            name: "Puxada Alta Aberta",
            focus: "Foco em largura (o \"V\")",
            sets: "4×8-12",
            ...vWithSide("male-machine-pulldown-front.mp4"),
            targetMuscle: "Latíssimo do Dorso",
            muscleRegion: "Fibras Superiores: Foco na largura (\"asas\") e expansão lateral.",
          },
          {
            id: "ter-c2",
            name: "Remada Curvada ou Cavalinho",
            focus: "Foco em espessura e densidade",
            sets: "4×8-12",
            ...vWithSide("male-barbell-bent-over-row-front.mp4"),
            targetMuscle: "Latíssimo e Trapézio",
            muscleRegion: "Fibras Médias/Romboides: Foco na \"grossura\" (densidade) das costas.",
          },
          {
            id: "ter-c3",
            name: "Remada Baixa (Triângulo)",
            focus: "Foco na parte inferior da dorsal",
            sets: "3×10-12",
            ...vWithSide("male-Cables-cable-pullover-front.mp4"),
            targetMuscle: "Latíssimo do Dorso",
            muscleRegion: "Fibras Inferiores: Foco na base das costas, próximo à linha da cintura.",
          },
        ],
      },
      {
        name: "Bíceps",
        exercises: [
          {
            id: "ter-b1",
            name: "Rosca Direta (Barra W ou Reta)",
            focus: "Massa bruta do bíceps",
            sets: "3×10-12",
            ...vWithSide("male-Barbell-barbell-curl-front.mp4"),
            targetMuscle: "Bíceps Braquial",
            muscleRegion: "Cabeças Curta e Longa: Massa geral e volume frontal do braço.",
          },
          {
            id: "ter-b2",
            name: "Rosca Martelo",
            focus: "Trabalha o braquial (largura do braço)",
            sets: "3×10-12",
            ...vWithSide("male-Dumbbells-dumbbell-hammer-curl-front.mp4"),
            targetMuscle: "Braquiorradial",
            muscleRegion: "Braquial: Músculo que fica \"abaixo\" do bíceps, empurrando-o para fora e dando largura lateral.",
          },
          {
            id: "ter-b3",
            name: "Rosca Scott (Máquina ou Banco)",
            focus: "Isolamento e pico do bíceps",
            sets: "3×12-15",
            ...vWithSide("male-Machine-machine-seated-plate-loaded-preacher-curl-front.mp4"),
            targetMuscle: "Bíceps Braquial",
            muscleRegion: "Cabeça Curta: Foco no \"pico\" do bíceps e isolamento total (sem roubo).",
          },
        ],
      },
      cardioOpcional("ter"),
    ],
  },
  {
    id: "qua",
    dayShort: "QUA",
    dayFull: "Quarta-feira",
    title: "Ombros & Trapézio",
    subtitle: "Definição Superior",
    calories: "200–500 kcal",
    muscleGroups: [
      {
        name: "Ombro",
        exercises: [
          {
            id: "qua-o1",
            name: "Desenvolvimento Militar (Halteres)",
            focus: "Foco em deltoide anterior/médio",
            sets: "4×8-12",
            ...vWithSide("male-dumbbell-seated-overhead-press-front.mp4"),
            targetMuscle: "Deltoide",
            muscleRegion: "Porção Anterior: A parte da frente do ombro que se conecta com o peito.",
          },
          {
            id: "qua-o2",
            name: "Elevação Lateral",
            focus: "Foco no deltoide lateral (ombros largos)",
            sets: "4×12-15",
            ...vWithSide("male-Dumbbells-dumbbell-lateral-raise-front.mp4"),
            targetMuscle: "Deltoide",
            muscleRegion: "Porção Lateral: A parte do meio que dá o aspecto de ombro \"bola\" e largura visual.",
          },
          {
            id: "qua-o3",
            name: "Elevação Frontal com Halteres",
            focus: "Foco no deltoide anterior",
            sets: "3×12-15",
            ...vWithSide("male-Dumbbells-dumbbell-front-raise-front.mp4"),
            targetMuscle: "Deltoide",
            muscleRegion: "Porção Anterior: Isolamento da parte frontal do ombro para definição e força.",
          },
          {
            id: "qua-o4",
            name: "Elevação Lateral Unilateral com Cabo",
            focus: "Foco no deltoide lateral com tensão constante",
            sets: "3×12-15",
            ...vWithSide("male-Cables-cable-lateral-raise-front.mp4"),
            videoUrlSide: v("male-Cables-cable-lateral-raise-side.mp4"),
            targetMuscle: "Deltoide",
            muscleRegion: "Porção Lateral: Tensão constante do cabo para máxima ativação e controle unilateral.",
          },
        ],
      },
      {
        name: "Trapézio",
        exercises: [
          {
            id: "qua-t1",
            name: "Encolhimento com Halteres",
            focus: "Volume do trapézio superior",
            sets: "4×10-12",
            ...vWithSide("male-Dumbbells-dumbbell-shrug-front.mp4"),
            targetMuscle: "Trapézio",
            muscleRegion: "Porção Superior: A \"montanha\" que liga o pescoço ao ombro.",
          },
          {
            id: "qua-t2",
            name: "Encolhimento com Barra",
            focus: "Por trás ou pela frente",
            sets: "3×10-12",
            ...vWithSide("male-barbell-shrug-front.mp4"),
            targetMuscle: "Trapézio",
            muscleRegion: "Porção Superior: Volume adicional e reforço na base do trapézio.",
          },
          {
            id: "qua-t3",
            name: "Remada Alta (Pegada fechada na polia)",
            focus: "Trapézio e deltoide médio",
            sets: "3×12-15",
            ...vWithSide("male-Barbell-barbell-upright-row-front.mp4"),
            targetMuscle: "Trapézio e Deltoide",
            muscleRegion: "Porção Média do Trapézio: Ajuda na separação entre ombro e trapézio.",
          },
        ],
      },
      cardioOpcional("qua"),
    ],
  },
  {
    id: "qui",
    dayShort: "QUI",
    dayFull: "Quinta-feira",
    title: "Peito & Tríceps",
    subtitle: "Foco em Empurrar",
    calories: "250–550 kcal",
    muscleGroups: [
      {
        name: "Peito",
        exercises: [
          {
            id: "qui-p1",
            name: "Supino Reto (Barra ou Halter)",
            focus: "Base e força total",
            sets: "4×8-12",
            ...vWithSide("male-barbell-bench-press-front.mp4"),
            targetMuscle: "Peitoral Maior",
            muscleRegion: "Porção Esternocostal: Massa bruta e volume central do peito.",
          },
          {
            id: "qui-p2",
            name: "Supino Inclinado (Halteres)",
            focus: "Foco na parte superior (clavicular)",
            sets: "3×10-12",
            ...vWithSide("male-dumbbell-incline-bench-press-front.mp4"),
            targetMuscle: "Peitoral Maior",
            muscleRegion: "Porção Clavicular: A \"parte de cima\" do peito, que dá o aspecto preenchido perto da clavícula.",
          },
          {
            id: "qui-p3",
            name: "Crossover ou Peck Deck",
            focus: "Foco no miolo e isolamento",
            sets: "3×12-15",
            ...vWithSide("male-Machine-machine-pec-fly-front.mp4"),
            targetMuscle: "Peitoral Maior",
            muscleRegion: "Fibras Internas: Foco no \"miolo\" do peito e separação muscular.",
          },
        ],
      },
      {
        name: "Tríceps",
        exercises: [
          {
            id: "qui-t1",
            name: "Tríceps Pulley (Barra)",
            focus: "Aquecimento e foco na cabeça lateral",
            sets: "3×12-15",
            ...vWithSide("male-Cables-cable-bar-pushdown-front.mp4"),
            targetMuscle: "Tríceps Braquial",
            muscleRegion: "Cabeça Lateral: A parte de fora do braço que dá largura quando visto de frente.",
          },
          {
            id: "qui-t2",
            name: "Tríceps Testa (Halteres ou Barra W)",
            focus: "Foco na cabeça longa (volume)",
            sets: "3×10-12",
            ...vWithSide("male-barbell-laying-tricep-extensions-front.mp4"),
            targetMuscle: "Tríceps Braquial",
            muscleRegion: "Cabeça Longa: A maior parte do tríceps. Essencial para o tamanho total do braço.",
          },
          {
            id: "qui-t3",
            name: "Tríceps Corda",
            focus: "Contração máxima e definição",
            sets: "3×12-15",
            ...vWithSide("male-Cables-cable-overhead-tricep-extension-front.mp4"),
            targetMuscle: "Tríceps Braquial",
            muscleRegion: "Cabeça Medial: Foco na contração final e detalhamento próximo ao cotovelo.",
          },
        ],
      },
      cardioOpcional("qui"),
    ],
  },
  {
    id: "sex",
    dayShort: "SEX",
    dayFull: "Sexta-feira",
    title: "Costas & Bíceps",
    subtitle: "Foco em Puxar",
    calories: "300–600 kcal",
    muscleGroups: [
      {
        name: "Costas",
        exercises: [
          {
            id: "sex-c1",
            name: "Puxada Alta Aberta",
            focus: "Foco em largura (o \"V\")",
            sets: "4×8-12",
            ...vWithSide("male-machine-pulldown-front.mp4"),
            targetMuscle: "Latíssimo do Dorso",
            muscleRegion: "Fibras Superiores: Foco na largura (\"asas\") e expansão lateral.",
          },
          {
            id: "sex-c2",
            name: "Remada Curvada ou Cavalinho",
            focus: "Foco em espessura e densidade",
            sets: "4×8-12",
            ...vWithSide("male-barbell-bent-over-row-front.mp4"),
            targetMuscle: "Latíssimo e Trapézio",
            muscleRegion: "Fibras Médias/Romboides: Foco na \"grossura\" (densidade) das costas.",
          },
          {
            id: "sex-c3",
            name: "Remada Baixa (Triângulo)",
            focus: "Foco na parte inferior da dorsal",
            sets: "3×10-12",
            ...vWithSide("male-Cables-cable-pullover-front.mp4"),
            targetMuscle: "Latíssimo do Dorso",
            muscleRegion: "Fibras Inferiores: Foco na base das costas, próximo à linha da cintura.",
          },
        ],
      },
      {
        name: "Bíceps",
        exercises: [
          {
            id: "sex-b1",
            name: "Rosca Direta (Barra W ou Reta)",
            focus: "Massa bruta do bíceps",
            sets: "3×10-12",
            ...vWithSide("male-Barbell-barbell-curl-front.mp4"),
            targetMuscle: "Bíceps Braquial",
            muscleRegion: "Cabeças Curta e Longa: Massa geral e volume frontal do braço.",
          },
          {
            id: "sex-b2",
            name: "Rosca Martelo",
            focus: "Trabalha o braquial (largura do braço)",
            sets: "3×10-12",
            ...vWithSide("male-Dumbbells-dumbbell-hammer-curl-front.mp4"),
            targetMuscle: "Braquiorradial",
            muscleRegion: "Braquial: Músculo que fica \"abaixo\" do bíceps, empurrando-o para fora e dando largura lateral.",
          },
          {
            id: "sex-b3",
            name: "Rosca Scott (Máquina ou Banco)",
            focus: "Isolamento e pico do bíceps",
            sets: "3×12-15",
            ...vWithSide("male-Machine-machine-seated-plate-loaded-preacher-curl-front.mp4"),
            targetMuscle: "Bíceps Braquial",
            muscleRegion: "Cabeça Curta: Foco no \"pico\" do bíceps e isolamento total (sem roubo).",
          },
        ],
      },
      cardioOpcional("sex"),
    ],
  },
];
export const tips = [
  { icon: "📊", title: "Séries e Reps", text: "3 séries de 10–12 reps por exercício" },
  { icon: "⏱", title: "Descanso", text: "45–60 segundos entre séries. Feche em 1 hora" },
  { icon: "💧", title: "Hidratação", text: "Beba bastante água — o pump vai ser forte" },
];

