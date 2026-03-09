import type { WorkoutDay } from "./workouts";

const v = (slug: string) =>
  `https://media.musclewiki.com/media/uploads/videos/branded/${slug}`;

const vWithSide = (slug: string) => {
  const sideSlug = slug.replace('-front.mp4', '-side.mp4');
  return {
    videoUrl: v(slug),
    videoUrlSide: v(sideSlug),
  };
};

const cardioOpcional = (prefix: string) => ({
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

export const workoutDataInferior: WorkoutDay[] = [
  {
    id: "seg",
    dayShort: "SEG",
    dayFull: "Segunda-feira",
    title: "Quadríceps",
    subtitle: "Foco em Massa Frontal",
    calories: "300–600 kcal",
    muscleGroups: [
      {
        name: "Quadríceps",
        exercises: [
          {
            id: "inf-seg-q1",
            name: "Agachamento Livre (Barra)",
            focus: "Volume geral e força",
            sets: "4×8-12",
            ...vWithSide("male-Barbell-barbell-squat-front.mp4"),
            targetMuscle: "Quadríceps e Glúteo Maior",
            muscleRegion: "Vasto Lateral, Medial, Intermédio e Reto Femoral: Base para volume geral e força da coxa.",
          },
          {
            id: "inf-seg-q2",
            name: "Leg Press 45º",
            focus: "Carga e densidade da coxa",
            sets: "4×10-12",
            ...vWithSide("male-Machine-machine-leg-press-front.mp4"),
            targetMuscle: "Quadríceps",
            muscleRegion: "Vasto Medial (\"gota\" do joelho) e Vasto Lateral: Densidade e volume frontal da coxa.",
          },
          {
            id: "inf-seg-q3",
            name: "Cadeira Extensora",
            focus: "Isolamento e definição",
            sets: "3×12-15",
            ...vWithSide("male-machine-leg-extension-front.mp4"),
            targetMuscle: "Quadríceps",
            muscleRegion: "Reto Femoral: Isolamento para definir cortes e separação muscular da frente da coxa.",
          },
        ],
      },
      cardioOpcional("inf-seg"),
    ],
  },
  {
    id: "ter",
    dayShort: "TER",
    dayFull: "Terça-feira",
    title: "Posterior de Coxa",
    subtitle: "Isquiotibiais",
    calories: "250–550 kcal",
    muscleGroups: [
      {
        name: "Isquiotibiais",
        exercises: [
          {
            id: "inf-ter-i1",
            name: "Stiff (Barra ou Halter)",
            focus: "Alongamento dos isquiotibiais",
            sets: "4×8-12",
            ...vWithSide("male-Barbell-barbell-romanian-deadlift-front.mp4"),
            targetMuscle: "Isquiotibiais",
            muscleRegion: "Bíceps Femoral, Semitendíneo e Semimembranáceo: Trabalha a \"curva\" de trás da perna.",
          },
          {
            id: "inf-ter-i2",
            name: "Mesa Flexora (ou Cadeira Flexora)",
            focus: "Contração do bíceps femoral",
            sets: "3×10-12",
            ...vWithSide("male-machine-hamstring-curl-front.mp4"),
            targetMuscle: "Bíceps Femoral",
            muscleRegion: "Formato arredondado na parte de trás quando vista de perfil.",
          },
          {
            id: "inf-ter-i3",
            name: "Elevação Pélvica (Pés à frente)",
            focus: "Posterior e glúteo",
            sets: "3×12-15",
            ...vWithSide("male-Barbell-barbell-hip-thrust-front.mp4"),
            targetMuscle: "Isquiotibiais e Glúteo",
            muscleRegion: "Posterior: Pés mais à frente aumentam a tensão nos isquiotibiais.",
          },
        ],
      },
      cardioOpcional("inf-ter"),
    ],
  },
  {
    id: "qua",
    dayShort: "QUA",
    dayFull: "Quarta-feira",
    title: "Glúteos",
    subtitle: "Desenho e Estabilidade",
    calories: "250–550 kcal",
    muscleGroups: [
      {
        name: "Glúteos",
        exercises: [
          {
            id: "inf-qua-g1",
            name: "Afundo ou Passada (Halteres)",
            focus: "Separação glúteo-perna",
            sets: "3×10-12",
            ...vWithSide("male-Dumbbells-dumbbell-forward-lunge-front.mp4"),
            targetMuscle: "Glúteo Maior e Quadríceps",
            muscleRegion: "Glúteo Maior: Separação muscular entre o bumbum e a perna.",
          },
          {
            id: "inf-qua-g2",
            name: "Agachamento Búlgaro",
            focus: "Foco intenso unilateral",
            sets: "3×10-12",
            ...vWithSide("male-Dumbbells-dumbbell-bulgarian-split-squat-front.mp4"),
            targetMuscle: "Glúteo Maior e Médio",
            muscleRegion: "Fibras Profundas: Unilateral que recruta fibras que o agachamento comum não alcança.",
          },
          {
            id: "inf-qua-g3",
            name: "Abdução de Quadril Na Máquina",
            focus: "Lateral do quadril",
            sets: "3×12-15",
            ...vWithSide("male-Machine-machine-hip-abduction-front.mp4"),
            targetMuscle: "Glúteo Médio e Mínimo",
            muscleRegion: "Lateral do Quadril: Preenche a lateral, dando aspecto de \"quadril largo\".",
          },
        ],
      },
      cardioOpcional("inf-qua"),
    ],
  },
  {
    id: "qui",
    dayShort: "QUI",
    dayFull: "Quinta-feira",
    title: "Panturrilhas & Adutores",
    subtitle: "Interno da Coxa e Batata",
    calories: "200–450 kcal",
    muscleGroups: [
      {
        name: "Adutores",
        exercises: [
          {
            id: "inf-qui-a1",
            name: "Agachamento Sumô (Halter)",
            focus: "Parte interna da coxa",
            sets: "4×10-12",
            ...vWithSide("male-dumbbell-sumo-squat-front.mp4"),
            targetMuscle: "Adutores e Glúteo",
            muscleRegion: "Adutores (Curto, Longo e Magno): Firmeza e volume interno da coxa.",
          },
        ],
      },
      {
        name: "Panturrilhas",
        exercises: [
          {
            id: "inf-qui-p1",
            name: "Gêmeos em Pé (Máquina ou Degrau)",
            focus: "Parte alta da panturrilha",
            sets: "4×12-15",
            ...vWithSide("male-machine-standing-calf-raises-front.mp4"),
            targetMuscle: "Gastrocnêmio",
            muscleRegion: "Gastrocnêmio: Parte alta com \"dois gomos\" da panturrilha.",
          },
          {
            id: "inf-qui-p2",
            name: "Gêmeos Sentado (Cavalinho)",
            focus: "Largura lateral da panturrilha",
            sets: "4×12-15",
            videoUrl: v("male-machine-seated-calf-raise-side.mp4"),
            targetMuscle: "Sóleo",
            muscleRegion: "Sóleo: Fica por baixo da panturrilha, dá largura lateral quando vista de frente.",
          },
        ],
      },
      cardioOpcional("inf-qui"),
    ],
  },
  {
    id: "sex",
    dayShort: "SEX",
    dayFull: "Sexta-feira",
    title: "Perna Completa",
    subtitle: "Finalização e Exaustão",
    calories: "300–600 kcal",
    muscleGroups: [
      {
        name: "Perna Completa",
        exercises: [
          {
            id: "inf-sex-l1",
            name: "Leg Press (Pés Altos)",
            focus: "Glúteo e posterior",
            sets: "4×10-12",
            ...vWithSide("male-Machine-machine-leg-press-front.mp4"),
            targetMuscle: "Glúteo e Posterior",
            muscleRegion: "Pés no topo da plataforma dividem o trabalho entre Glúteo e Posterior.",
          },
          {
            id: "inf-sex-l2",
            name: "Cadeira Extensora (Exaustão)",
            focus: "Repetições altas, sangue no músculo",
            sets: "3×15-20",
            ...vWithSide("male-machine-leg-extension-front.mp4"),
            targetMuscle: "Quadríceps",
            muscleRegion: "Reto Femoral: Carga moderada com reps altas para pump e estímulo metabólico.",
          },
          {
            id: "inf-sex-l3",
            name: "Flexora em Pé (ou Mesa Flexora)",
            focus: "Finalização do posterior",
            sets: "3×12-15",
            ...vWithSide("male-machine-hamstring-curl-front.mp4"),
            targetMuscle: "Bíceps Femoral",
            muscleRegion: "Bíceps Femoral: Finaliza garantindo que o posterior foi totalmente estimulado.",
          },
        ],
      },
      cardioOpcional("inf-sex"),
    ],
  },
];

