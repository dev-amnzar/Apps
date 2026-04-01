import { Monitor, Cpu, Camera, Battery, MemoryStick, HardDrive, Smartphone, Weight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { PhoneSpecs } from '@/types';

interface SpecRow {
  icon: React.ElementType;
  label: string;
  value: string | undefined;
}

interface PhoneSpecsProps {
  specs: PhoneSpecs;
}

export function PhoneSpecsTable({ specs }: PhoneSpecsProps) {
  const rows: SpecRow[] = [
    { icon: Monitor, label: 'الشاشة', value: specs.display },
    { icon: Cpu, label: 'المعالج', value: specs.chipset },
    { icon: Camera, label: 'الكاميرا', value: specs.camera },
    { icon: Battery, label: 'البطارية', value: specs.battery },
    { icon: MemoryStick, label: 'الذاكرة RAM', value: specs.ram },
    { icon: HardDrive, label: 'التخزين', value: specs.storage },
    { icon: Smartphone, label: 'نظام التشغيل', value: specs.os },
    { icon: Weight, label: 'الوزن', value: specs.weight },
  ].filter((r): r is Required<SpecRow> => Boolean(r.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">المواصفات التقنية</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y dark:divide-gray-800">
          {rows.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-950">
                <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              </div>
              <div className="flex flex-1 items-center justify-between gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 text-end">
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
