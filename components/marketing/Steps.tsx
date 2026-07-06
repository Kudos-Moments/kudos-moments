export interface Step {
  title: string;
  body: string;
}

/** 3-column "Create / Collect / Reveal" explanation on the Home page. */
export function StepGrid({ steps }: { steps: Step[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
      {steps.map((step, index) => (
        <div key={step.title} className="text-left">
          <div className="text-[14px] font-semibold text-accent font-sans">{index + 1}</div>
          <h3 className="mt-2 mb-[6px] font-serif text-[22px] text-text-primary">{step.title}</h3>
          <p className="text-[15px] leading-[1.6] text-text-secondary">{step.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Vertical numbered timeline used on the How It Works page. */
export function StepTimeline({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      <div
        className="absolute left-6 top-2 bottom-2 w-px bg-border md:block"
        aria-hidden
      />
      <ol className="space-y-8">
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-6 pl-0">
            <span className="relative z-10 w-12 shrink-0 text-center font-serif text-[20px] text-accent">
              {index + 1}
            </span>
            <div>
              <h3 className="text-[18px] font-semibold text-text-primary font-sans">
                {step.title}
              </h3>
              <p className="mt-1 text-[15px] text-text-secondary leading-[1.6]">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
