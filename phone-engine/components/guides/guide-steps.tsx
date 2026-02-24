import type { GuideStep } from "@/types";

interface GuideStepsProps {
  steps: GuideStep[];
}

export function GuideSteps({ steps }: GuideStepsProps) {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex shrink-0 flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="mt-2 h-full w-px bg-gray-200 dark:bg-gray-700" />
            )}
          </div>
          <div className="pb-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
