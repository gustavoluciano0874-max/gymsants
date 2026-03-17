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

const peitoTriceps = (prefix: string): MuscleGroup[] => [
  {
    name: "Peito",
    exercises: [
      {
        id: `${prefix}-p1`,
        name: "Supino Inclinado com Halteres",
        focus: "Foco na parte superior (clavicular)",
        sets: "4×8-12",
        ...vWithSide("male-dumbbell-incline-bench-press-front.mp4"),
        targetMuscle: "Peitoral Maior",
        muscleRegion: "Porção Clavicular: A parte de cima do peito, que dá o aspecto preenchido perto da clavícula.",
      },
      {
        id: `${prefix}-p2`,
        name: "Supino Reto com Barra",
        focus: "Base e força total do peitoral",
        sets: "4×8-12",
        ...vWithSide("male-barbell-bench-press-front.mp4"),
        targetMuscle: "Peitoral Maior",
        muscleRegion: "Porção Esternocostal: Massa bruta e volume central do peito.",
      },
      {
        id: `${prefix}-p4`,
        name: "Peck Deck (Voador na Máquina)",
        focus: "Isolamento e contração máxima",
        sets: "3×12-15",
        ...vWithSide("male-Machine-machine-pec-fly-front.mp4"),
        targetMuscle: "Peitoral Maior",
        muscleRegion: "Fibras Internas: Foco no miolo do peito e separação muscular.",
      },
      {
        id: `${prefix}-p5`,
        name: "Pullover",
        focus: "Expansão da caixa torácica e dorsal",
        sets: "3×12-15",
        ...vWithSide("male-Barbell-barbell-pullover-front.mp4"),
        targetMuscle: "Peitoral e Dorsal",
        muscleRegion: "Serrátil e Peitoral: Expande a caixa torácica e trabalha a transição peito-dorsal.",
      },
    ],
  },
  {
    name: "Tríceps",
    exercises: [
      {
        id: `${prefix}-t1`,
        name: "Tríceps Corda",
        focus: "Contração máxima e definição",
        sets: "3×12-15",
        videoUrl: v("male-Cables-cable-push-down-front.mp4"),
        videoUrlSide: v("male-Cables-cable-push-down-side.mp4"),
        targetMuscle: "Tríceps Braquial",
        muscleRegion: "Cabeça Medial: Foco na contração final e detalhamento próximo ao cotovelo.",
      },
      {
        id: `${prefix}-t3`,
        name: "Tríceps Francês",
        focus: "Cabeça longa e volume total",
        sets: "3×10-12",
        ...vWithSide("male-Dumbbells-dumbbell-overhead-tricep-extension-front.mp4"),
        targetMuscle: "Tríceps Braquial",
        muscleRegion: "Cabeça Longa: A maior parte do tríceps. Essencial para o tamanho total do braço.",
      },
      {
        id: `${prefix}-t4`,
        name: "Tríceps Testa no Banco Reto",
        focus: "Isolamento e pico do tríceps",
        sets: "3×10-12",
        ...vWithSide("male-barbell-laying-tricep-extensions-front.mp4"),
        targetMuscle: "Tríceps Braquial",
        muscleRegion: "Cabeça Longa: Isolamento total com cotovelo fixo para máximo recrutamento.",
      },
    ],
  },
];

const costasBiceps = (prefix: string): MuscleGroup[] => [
  {
    name: "Costas",
    exercises: [
      {
        id: `${prefix}-c1`,
        name: "Puxada Alta Aberta",
        focus: "Foco em largura (o \"V\")",
        sets: "4×8-12",
        ...vWithSide("male-machine-pulldown-front.mp4"),
        targetMuscle: "Latíssimo do Dorso",
        muscleRegion: "Fibras Superiores: Foco na largura (\"asas\") e expansão lateral.",
      },
      {
        id: `${prefix}-c2`,
        name: "Remada Curvada ou Cavalinho",
        focus: "Foco em espessura e densidade",
        sets: "4×8-12",
        ...vWithSide("male-barbell-bent-over-row-front.mp4"),
        targetMuscle: "Latíssimo e Trapézio",
        muscleRegion: "Fibras Médias/Romboides: Foco na grossura (densidade) das costas.",
      },
      {
        id: `${prefix}-c3`,
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
        id: `${prefix}-b1`,
        name: "Rosca Direta (Barra W ou Reta)",
        focus: "Massa bruta do bíceps",
        sets: "3×10-12",
        ...vWithSide("male-Barbell-barbell-curl-front.mp4"),
        targetMuscle: "Bíceps Braquial",
        muscleRegion: "Cabeças Curta e Longa: Massa geral e volume frontal do braço.",
      },
      {
        id: `${prefix}-b2`,
        name: "Rosca Martelo",
        focus: "Trabalha o braquial (largura do braço)",
        sets: "3×10-12",
        ...vWithSide("male-Dumbbells-dumbbell-hammer-curl-front.mp4"),
        targetMuscle: "Braquiorradial",
        muscleRegion: "Braquial: Músculo que fica abaixo do bíceps, empurrando-o para fora e dando largura lateral.",
      },
      {
        id: `${prefix}-b3`,
        name: "Rosca Scott (Máquina ou Banco)",
        focus: "Isolamento e pico do bíceps",
        sets: "3×12-15",
        ...vWithSide("male-Machine-machine-seated-plate-loaded-preacher-curl-front.mp4"),
        targetMuscle: "Bíceps Braquial",
        muscleRegion: "Cabeça Curta: Foco no pico do bíceps e isolamento total (sem roubo).",
      },
    ],
  },
];

export const workoutData: WorkoutDay[] = [
  {
    id: "seg",
    dayShort: "SEG",
    dayFull: "Segunda-feira",
    title: "Peito & Tríceps",
    subtitle: "Foco em Empurrar",
    calories: "300–600 kcal",
    muscleGroups: [
      ...peitoTriceps("seg"),
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
      ...costasBiceps("ter"),
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
            id: "qua-o2",
            name: "Elevação Frontal com Halteres",
            focus: "Foco no deltoide anterior",
            sets: "3×12-15",
            ...vWithSide("male-Dumbbells-dumbbell-front-raise-front.mp4"),
            targetMuscle: "Deltoide",
            muscleRegion: "Porção Anterior: Isolamento da parte frontal do ombro para definição e força.",
          },
          {
            id: "qua-o3",
            name: "Desenvolvimento com Barra",
            focus: "Força e volume total do ombro",
            sets: "4×8-12",
            ...vWithSide("male-barbell-overhead-press-front.mp4"),
            targetMuscle: "Deltoide",
            muscleRegion: "Porção Anterior e Lateral: Exercício composto base para volume e força do ombro.",
          },
          {
            id: "qua-o5",
            name: "Elevação Lateral de Braços com Cabo",
            focus: "Tensão constante no deltoide lateral",
            sets: "3×12-15",
            videoUrl: v("male-Cables-cable-lateral-raise-front.mp4"),
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
            name: "Encolhimento Barra Livre",
            focus: "Carga máxima no trapézio",
            sets: "3×10-12",
            ...vWithSide("male-barbell-shrug-front.mp4"),
            targetMuscle: "Trapézio",
            muscleRegion: "Porção Superior: Volume adicional e reforço na base do trapézio.",
          },
          {
            id: "qua-t2",
            name: "Face Pull",
            focus: "Trapézio médio, deltoide posterior e manguito rotador",
            sets: "3×12-15",
            videoUrl: v("male-Machine-machine-face-pulls-front.mp4"),
            videoUrlSide: v("male-Machine-machine-face-pulls-side.mp4"),
            targetMuscle: "Trapézio e Deltoide Posterior",
            muscleRegion: "Trapézio Médio e Deltoide Posterior: Essencial para postura e saúde do ombro.",
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
    calories: "300–600 kcal",
    muscleGroups: [
      ...peitoTriceps("qui"),
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
      ...costasBiceps("sex"),
      cardioOpcional("sex"),
    ],
  },
];

export const tips = [
  { icon: "📊", title: "Séries e Reps", text: "3 séries de 10–12 reps por exercício" },
  { icon: "⏱", title: "Descanso", text: "45–60 segundos entre séries. Feche em 1 hora" },
  { icon: "💧", title: "Hidratação", text: "Beba bastante água — o pump vai ser forte" },
];
