// Full GSMArena-compatible phone specifications model

export interface NetworkBands {
  technology: string;       // "GSM / CDMA / HSPA / EVDO / LTE / 5G"
  bands2G?: string;         // "GSM 850 / 900 / 1800 / 1900"
  bands3G?: string;         // "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100"
  bands4G?: string;         // "LTE band 1(2100)..."
  bands5G?: string;         // "Sub6/mmWave"
  speed?: string;           // "HSPA 42.2/5.76 Mbps, LTE-A, 5G"
}

export interface LaunchInfo {
  announced: string;        // "2024, January 17"
  status: string;           // "Available. Released 2024, January 26"
}

export interface BodyInfo {
  dimensions: string;       // "162.3 x 79 x 8.6 mm"
  weight: string;           // "232 g / 8.18 oz"
  build: string;            // "Glass front (Gorilla Armor), titanium frame..."
  sim: string;              // "Nano-SIM and eSIM"
  resistance?: string;      // "IP68 dust/water resistant"
}

export interface DisplayInfo {
  type: string;             // "Dynamic AMOLED 2X, 120Hz"
  size: string;             // "6.8 inches, 114.7 cm2"
  resolution: string;       // "1440 x 3120 pixels (QHD+)"
  protection?: string;      // "Corning Gorilla Armor"
  features?: string;        // "1750 nits (HBM), 2600 nits (peak)"
}

export interface PlatformInfo {
  os: string;               // "Android 14, One UI 6.1"
  chipset: string;          // "Qualcomm SM8650-AC Snapdragon 8 Gen 3"
  cpu: string;              // "Octa-core"
  gpu: string;              // "Adreno 750"
}

export interface MemoryInfo {
  cardSlot: string;         // "No" or "microSDXC"
  internal: string;         // "256GB 12GB RAM, 512GB 12GB RAM, 1TB 12GB RAM"
  ram: string;              // "12 GB"
  type?: string;            // "UFS 4.0"
}

export interface CameraModule {
  resolution: string;       // "200 MP"
  aperture?: string;        // "f/1.7"
  focalLength?: string;     // "23mm (wide)"
  sensorSize?: string;      // "1/1.3"
  pixelSize?: string;       // "0.6µm"
  features?: string;        // "PDAF, Laser AF, OIS"
}

export interface CameraInfo {
  main: CameraModule[];     // Array of camera modules
  features: string;         // "LED flash, HDR, panorama"
  video: string;            // "8K@30fps, 4K@30/60/120fps..."
}

export interface SelfieCameraInfo {
  modules: CameraModule[];
  features: string;
  video: string;
}

export interface SoundInfo {
  loudspeaker: string;      // "Yes, with stereo speakers"
  jack: string;             // "No" or "Yes"
  features?: string;        // "32-bit/384kHz audio"
}

export interface CommsInfo {
  wlan: string;             // "Wi-Fi 802.11 a/b/g/n/ac/6e/7"
  bluetooth: string;        // "5.3, A2DP, LE, aptX HD"
  positioning: string;      // "GPS, GLONASS, BDS, GALILEO"
  nfc: string;              // "Yes"
  infrared?: string;        // "Yes" or "No"
  radio: string;            // "No" or "FM radio"
  usb: string;              // "USB Type-C 3.2, OTG"
}

export interface FeaturesInfo {
  sensors: string;          // "Fingerprint (under display), accelerometer..."
  other?: string;           // "Samsung DeX, Samsung Wireless DeX..."
}

export interface BatteryInfo {
  type: string;             // "Li-Ion 5000 mAh"
  capacity: string;         // "5000 mAh"
  charging: string;         // "45W wired, PD3.0"
  wirelessCharging?: string;// "15W wireless (Qi/PMA)"
  reverseCharging?: string; // "4.5W reverse wireless"
}

export interface MiscInfo {
  colors: string;           // "Titanium Black, Titanium Gray..."
  models: string;           // "SM-S928B, SM-S928B/DS..."
  sarUs?: string;           // "1.18 W/kg (head)"
  sarEu?: string;           // "0.89 W/kg (head)"
  price: string;            // "$ 1,319.99 / € 1,469.00 / £ 1,299.00"
}

// Full phone specifications matching GSMArena structure
export interface FullPhoneSpecs {
  network: NetworkBands;
  launch: LaunchInfo;
  body: BodyInfo;
  display: DisplayInfo;
  platform: PlatformInfo;
  memory: MemoryInfo;
  mainCamera: CameraInfo;
  selfieCamera: SelfieCameraInfo;
  sound: SoundInfo;
  comms: CommsInfo;
  features: FeaturesInfo;
  battery: BatteryInfo;
  misc: MiscInfo;
}

// Keep backward compat with simple specs
export interface PhoneSpecs {
  display: string;
  chipset: string;
  camera: string;
  battery: string;
}

export interface Phone {
  brand: string;
  slug: string;
  name: string;
  nameAr?: string;
  price: number;
  images: string[];
  releaseDate?: string;
  specs: PhoneSpecs;
  fullSpecs?: FullPhoneSpecs;
  issues: string[];
  guides: string[];
  popularity?: number;      // 0-100 popularity score
  rating?: number;          // 0-5 user rating
  reviewSlug?: string;      // link to review
}

export interface Brand {
  slug: string;
  name: string;
  nameAr: string;
  phoneCount: number;
  logo?: string;
  description?: string;
  descriptionAr?: string;
}
