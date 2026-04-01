import { cn } from '@/lib/utils';
import type { GuideStep } from '@/types';

interface GuideStepsProps {
  steps: GuideStep[];
}

export function GuideSteps({ steps }: GuideStepsProps) {
  return (
    <ol className="space-y-6">
      {steps.map((step) => (
        <li key={step.step} className="flex gap-4">
          <div className="flex flex-shrink-0 flex-col items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white dark:bg-brand-500">
              {step.step}
            </div>
            {step.step < steps.length && (
              <div className="mt-2 w-0.5 flex-1 bg-gray-200 dark:bg-gray-700" />
            )}
          </div>
          <div className={cn('flex-1 pb-6', step.step === steps.length && 'pb-0')}>
            <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
            {step.tip && (
              <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                <span className="font-semibold">نصيحة: </span>
                {step.tip}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
