import { tips } from "@/data/workouts";

const TipsBar = () => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
      {tips.map((tip) => (
        <div
          key={tip.title}
          className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5 min-w-[200px] shrink-0"
        >
          <span className="text-lg">{tip.icon}</span>
          <div>
            <p className="text-[11px] font-mono-display tracking-wider uppercase text-primary font-semibold">
              {tip.title}
            </p>
            <p className="text-[12px] text-muted-foreground leading-tight mt-0.5">
              {tip.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TipsBar;
