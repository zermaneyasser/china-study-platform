import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Cairo, Tajawal } from "next/font/google";

import { DEFAULT_SITE_NAME } from "@/lib/branding";

import "./globals.css";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-sans",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ar",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: DEFAULT_SITE_NAME,
    template: `%s | ${DEFAULT_SITE_NAME}`,
  },
  description: "Platform for Algerian students who want to study in China.",
  applicationName: DEFAULT_SITE_NAME,
  openGraph: {
    type: "website",
    title: DEFAULT_SITE_NAME,
    description: "Platform for Algerian students who want to study in China.",
    siteName: DEFAULT_SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SITE_NAME,
    description: "Platform for Algerian students who want to study in China.",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieLocale = cookies().get("NEXT_LOCALE")?.value;
  const locale = cookieLocale === "ar" ? "ar" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${tajawal.variable} ${
          locale === "ar" ? "font-ar" : "font-sans"
        }`}
      >
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var seg=location.pathname.split('/')[1];if(seg==='ar'||seg==='en'){document.documentElement.lang=seg;document.documentElement.dir=(seg==='ar'?'rtl':'ltr');}}catch(e){}})();",
          }}
        />
        {children}
      </body>
    </html>
  );
}
