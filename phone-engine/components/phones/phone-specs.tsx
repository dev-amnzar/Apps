import type { PhoneSpecs as PhoneSpecsType } from "@/types";
import { Monitor, Cpu, Camera, Battery } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PhoneSpecsProps {
  specs: PhoneSpecsType;
}

const specItems = [
  { key: "display" as const, label: "الشاشة", labelEn: "Display", Icon: Monitor },
  { key: "chipset" as const, label: "المعالج", labelEn: "Chipset", Icon: Cpu },
  { key: "camera" as const, label: "الكاميرا", labelEn: "Camera", Icon: Camera },
  { key: "battery" as const, label: "البطارية", labelEn: "Battery", Icon: Battery },
];

export function PhoneSpecs({ specs }: PhoneSpecsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>المواصفات التقنية</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {specItems.map(({ key, label, Icon }) => (
            <div
              key={key}
              className="flex items-start gap-3 rounded-lg border border-gray-100 p-4 dark:border-gray-800"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{specs[key]}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
