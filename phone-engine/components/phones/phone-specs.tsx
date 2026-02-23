import { Monitor, Cpu, Camera, BatteryFull } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { PhoneSpecs as PhoneSpecsType } from "@/types";

interface PhoneSpecsProps {
  specs: PhoneSpecsType;
}

const specItems = [
  { key: "display" as const, label: "الشاشة", icon: Monitor },
  { key: "chipset" as const, label: "المعالج", icon: Cpu },
  { key: "camera" as const, label: "الكاميرا", icon: Camera },
  { key: "battery" as const, label: "البطارية", icon: BatteryFull },
];

export function PhoneSpecs({ specs }: PhoneSpecsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">المواصفات التقنية</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {specItems.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-cairo">
                  {label}
                </p>
                <p className="font-semibold text-gray-900 dark:text-white font-cairo">
                  {specs[key]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
