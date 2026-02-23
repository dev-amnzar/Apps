import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { GuideStep } from "@/types";

interface GuideStepsProps {
  steps: GuideStep[];
}

export function GuideSteps({ steps }: GuideStepsProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex gap-4">
              {/* Step Number */}
              <div className="flex flex-col items-center shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-lg font-cairo">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-primary-200 dark:bg-primary-800 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-4">
                <h3 className="font-cairo font-bold text-lg text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-cairo leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Completion */}
      <div className="flex items-center justify-center gap-3 py-6 text-green-600 dark:text-green-400">
        <CheckCircle2 className="h-6 w-6" />
        <span className="font-cairo font-semibold text-lg">
          تم الانتهاء من جميع الخطوات!
        </span>
      </div>
    </div>
  );
}
