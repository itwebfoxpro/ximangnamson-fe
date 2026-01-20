// app/layout.tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

// ===== ROOT METADATA (TRUNG LẬP – KHÔNG SEO LOCAL) =====
export const metadata: Metadata = {
  title: {
    default: "Công ty Cổ phần Nam Sơn | Nhà phân phối xi măng Nam Sơn",
    template: "%s | Nam Sơn JSC",
  },
  description:
    "Công ty Cổ phần Nam Sơn hoạt động trong lĩnh vực phân phối và cung ứng xi măng cho các công trình dân dụng, công nghiệp và hạ tầng.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Công ty Cổ phần Nam Sơn",
    description: "Nhà phân phối và cung ứng xi măng – Nam Sơn JSC.",
    url: "https://namsonjsc.vn",
    siteName: "Nam Sơn JSC",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://namsonjsc.vn/og-image.avif",
        width: 1200,
        height: 630,
        alt: "Nam Sơn JSC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Công ty Cổ phần Nam Sơn",
    description: "Nhà phân phối và cung ứng xi măng – Nam Sơn JSC.",
    images: ["https://namsonjsc.vn/og-image.avif"],
  },
};

// ===== VIEWPORT =====
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
      </head>

      <body className={roboto.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
