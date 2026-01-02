// app/layout.tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { localBusinessSchema } from "@/lib/schema/localBusiness";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

// ===== SEO METADATA =====
export const metadata: Metadata = {
  title: {
    default: "Xi Măng Bình Dương – Nhà Phân Phối Xi Măng Nam Sơn Chính Hãng",
    template: "%s | Xi Măng Nam Sơn",
  },
  description:
    "Nhà phân phối xi măng Nam Sơn chuyên cung cấp xi măng Vicem, Fico chính hãng, giao nhanh, giá tốt tại Bình Dương.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  keywords: [
    "xi măng nam sơn",
    "xi măng bình dương",
    "xi măng vicem",
    "xi măng fico",
  ],
  openGraph: {
    title: "Nhà Phân Phối Xi Măng Nam Sơn",
    description:
      "Xi măng Vicem – Fico chính hãng, giao nhanh, giá tốt tại Bình Dương.",
    url: "https://namsonjsc.vn",
    siteName: "Xi Măng Nam Sơn",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://namsonjsc.vn/og-image.avif",
        width: 1200,
        height: 630,
        alt: "Xi Măng Nam Sơn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhà Phân Phối Xi Măng Nam Sơn",
    description: "Cung cấp xi măng Vicem – Fico chính hãng, giao nhanh.",
    images: ["https://namsonjsc.vn/og-image.avif"],
  },
};

// ✅ PHẢI TÁCH RIÊNG
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>

      <body className={roboto.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
