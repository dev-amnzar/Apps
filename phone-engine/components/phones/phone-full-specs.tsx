import type { FullPhoneSpecs } from "@/types";
import {
  Signal,
  Rocket,
  Ruler,
  Monitor,
  Cpu,
  HardDrive,
  Camera,
  Aperture,
  Volume2,
  Wifi,
  Fingerprint,
  BatteryCharging,
  Palette,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SpecSectionConfig {
  key: string;
  title: string;
  titleEn: string;
  icon: React.ElementType;
  fields: { key: string; label: string }[];
}

const specSections: SpecSectionConfig[] = [
  {
    key: "network",
    title: "الشبكة",
    titleEn: "Network",
    icon: Signal,
    fields: [
      { key: "technology", label: "التقنية" },
      { key: "bands2G", label: "شبكات 2G" },
      { key: "bands3G", label: "شبكات 3G" },
      { key: "bands4G", label: "شبكات 4G" },
      { key: "bands5G", label: "شبكات 5G" },
      { key: "speed", label: "السرعة" },
    ],
  },
  {
    key: "launch",
    title: "الإطلاق",
    titleEn: "Launch",
    icon: Rocket,
    fields: [
      { key: "announced", label: "تاريخ الإعلان" },
      { key: "status", label: "الحالة" },
    ],
  },
  {
    key: "body",
    title: "الهيكل",
    titleEn: "Body",
    icon: Ruler,
    fields: [
      { key: "dimensions", label: "الأبعاد" },
      { key: "weight", label: "الوزن" },
      { key: "build", label: "المواد" },
      { key: "sim", label: "شريحة SIM" },
      { key: "resistance", label: "الحماية" },
    ],
  },
  {
    key: "display",
    title: "الشاشة",
    titleEn: "Display",
    icon: Monitor,
    fields: [
      { key: "type", label: "النوع" },
      { key: "size", label: "الحجم" },
      { key: "resolution", label: "الدقة" },
      { key: "protection", label: "الحماية" },
      { key: "features", label: "المميزات" },
    ],
  },
  {
    key: "platform",
    title: "المنصة",
    titleEn: "Platform",
    icon: Cpu,
    fields: [
      { key: "os", label: "نظام التشغيل" },
      { key: "chipset", label: "المعالج" },
      { key: "cpu", label: "وحدة المعالجة" },
      { key: "gpu", label: "معالج الرسومات" },
    ],
  },
  {
    key: "memory",
    title: "الذاكرة",
    titleEn: "Memory",
    icon: HardDrive,
    fields: [
      { key: "cardSlot", label: "فتحة الذاكرة" },
      { key: "internal", label: "التخزين الداخلي" },
      { key: "ram", label: "الرام" },
      { key: "type", label: "نوع التخزين" },
    ],
  },
  {
    key: "mainCamera",
    title: "الكاميرا الخلفية",
    titleEn: "Main Camera",
    icon: Camera,
    fields: [
      { key: "features", label: "المميزات" },
      { key: "video", label: "الفيديو" },
    ],
  },
  {
    key: "selfieCamera",
    title: "الكاميرا الأمامية",
    titleEn: "Selfie Camera",
    icon: Aperture,
    fields: [
      { key: "features", label: "المميزات" },
      { key: "video", label: "الفيديو" },
    ],
  },
  {
    key: "sound",
    title: "الصوت",
    titleEn: "Sound",
    icon: Volume2,
    fields: [
      { key: "loudspeaker", label: "مكبر الصوت" },
      { key: "jack", label: "مدخل 3.5mm" },
      { key: "features", label: "المميزات" },
    ],
  },
  {
    key: "comms",
    title: "الاتصالات",
    titleEn: "Comms",
    icon: Wifi,
    fields: [
      { key: "wlan", label: "واي فاي" },
      { key: "bluetooth", label: "بلوتوث" },
      { key: "positioning", label: "تحديد الموقع" },
      { key: "nfc", label: "NFC" },
      { key: "infrared", label: "الأشعة تحت الحمراء" },
      { key: "radio", label: "راديو FM" },
      { key: "usb", label: "USB" },
    ],
  },
  {
    key: "features",
    title: "المميزات",
    titleEn: "Features",
    icon: Fingerprint,
    fields: [
      { key: "sensors", label: "المستشعرات" },
      { key: "other", label: "أخرى" },
    ],
  },
  {
    key: "battery",
    title: "البطارية",
    titleEn: "Battery",
    icon: BatteryCharging,
    fields: [
      { key: "type", label: "النوع" },
      { key: "charging", label: "الشحن السلكي" },
      { key: "wirelessCharging", label: "الشحن اللاسلكي" },
      { key: "reverseCharging", label: "الشحن العكسي" },
    ],
  },
  {
    key: "misc",
    title: "معلومات أخرى",
    titleEn: "Misc",
    icon: Palette,
    fields: [
      { key: "colors", label: "الألوان" },
      { key: "models", label: "الموديلات" },
      { key: "sarUs", label: "SAR (أمريكا)" },
      { key: "sarEu", label: "SAR (أوروبا)" },
      { key: "price", label: "السعر" },
    ],
  },
];

interface PhoneFullSpecsProps {
  fullSpecs: FullPhoneSpecs;
}

function CameraModules({ modules, label }: { modules: { resolution: string; aperture?: string; focalLength?: string; sensorSize?: string; pixelSize?: string; features?: string }[]; label: string }) {
  return (
    <>
      {modules.map((mod, idx) => (
        <tr
          key={idx}
          className="border-b border-gray-100 dark:border-gray-800"
        >
          <td className="px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 w-1/3">
            {idx === 0 ? label : ""}
          </td>
          <td className="px-4 py-2.5 text-sm text-gray-900 dark:text-white">
            <span className="font-semibold">{mod.resolution}</span>
            {mod.aperture && `, ${mod.aperture}`}
            {mod.focalLength && `, ${mod.focalLength}`}
            {mod.sensorSize && ` (${mod.sensorSize})`}
            {mod.pixelSize && `, ${mod.pixelSize}`}
            {mod.features && (
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {mod.features}
              </span>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}

export function PhoneFullSpecs({ fullSpecs }: PhoneFullSpecsProps) {
  return (
    <div className="space-y-6">
      {specSections.map((section) => {
        const sectionData = fullSpecs[section.key as keyof FullPhoneSpecs];
        if (!sectionData) return null;

        const Icon = section.icon;

        return (
          <Card key={section.key} id={`spec-${section.key}`}>
            <CardHeader className="py-3 bg-gray-50 dark:bg-gray-900/50">
              <CardTitle className="flex items-center gap-2 text-base">
                <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <span>{section.title}</span>
                <span className="text-xs font-normal text-gray-400">({section.titleEn})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <tbody>
                  {/* Camera modules */}
                  {section.key === "mainCamera" && "main" in sectionData && (
                    <CameraModules
                      modules={(sectionData as FullPhoneSpecs["mainCamera"]).main}
                      label="العدسات"
                    />
                  )}
                  {section.key === "selfieCamera" && "modules" in sectionData && (
                    <CameraModules
                      modules={(sectionData as FullPhoneSpecs["selfieCamera"]).modules}
                      label="العدسات"
                    />
                  )}

                  {/* Regular fields */}
                  {section.fields.map((field) => {
                    const value = (sectionData as unknown as Record<string, string | undefined>)[field.key];
                    if (!value) return null;

                    return (
                      <tr
                        key={field.key}
                        className="border-b border-gray-100 last:border-0 dark:border-gray-800"
                      >
                        <td className="px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 w-1/3 align-top">
                          {field.label}
                        </td>
                        <td className="px-4 py-2.5 text-sm text-gray-900 dark:text-white">
                          {value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// Spec navigation sidebar for jumping to sections
export function SpecsNav() {
  return (
    <nav className="sticky top-20 space-y-1">
      {specSections.map((section) => {
        const Icon = section.icon;
        return (
          <a
            key={section.key}
            href={`#spec-${section.key}`}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <Icon className="h-4 w-4" />
            {section.title}
          </a>
        );
      })}
    </nav>
  );
}
