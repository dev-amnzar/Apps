import type { Metadata, Viewport } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WebSiteJsonLd } from '@/components/seo/json-ld';
import { getSiteUrl } from '@/lib/utils';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Phone Engine | أفضل الهواتف الذكية وأدلة شاملة',
    template: '%s | Phone Engine',
  },
  description:
    'اكتشف أفضل الهواتف الذكية مع مواصفات تفصيلية، أدلة إعداد، ونقل البيانات. كل ما تحتاجه لاختيار هاتفك الجديد.',
  keywords: ['هواتف ذكية', 'مواصفات', 'سامسونج', 'آيفون', 'شاومي', 'أدلة', 'مقارنة'],
  authors: [{ name: 'Phone Engine' }],
  creator: 'Phone Engine',
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: siteUrl,
    siteName: 'Phone Engine',
    images: [
      {
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: 'Phone Engine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@phoneengine',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <head>
        <WebSiteJsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
