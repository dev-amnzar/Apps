import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Phone Engine - أفضل الهواتف الذكية';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #1e3a8a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 80,
            height: 80,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            fontSize: 40,
          }}
        >
          📱
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: 'white',
            marginBottom: 16,
            letterSpacing: '-2px',
          }}
        >
          Phone Engine
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          اكتشف أفضل الهواتف الذكية مع أدلة شاملة
        </div>

        {/* Stats bar */}
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            gap: 32,
          }}
        >
          {['50+ هاتف', '100+ دليل', 'مجاني 100%'].map((stat) => (
            <div
              key={stat}
              style={{
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: '10px 24px',
                color: 'white',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
