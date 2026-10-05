// app/layout.tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

// ===== ROOT METADATA =====
export const metadata: Metadata = {
  metadataBase: new URL("https://namsonjsc.vn"), // 🔥 BẮT BUỘC

  title: {
    default:
      "Công ty Cổ phần Nam Sơn – Nhà phân phối xi măng Vicem Hà Tiên, Fico YTL, SCG tại Bình Dương",
    template: "%s | Công ty Cổ phần Nam Sơn",
  },

  description:
    "Công ty Cổ phần Nam Sơn là nhà phân phối chính thức xi măng Vicem Hà Tiên, Fico YTL, SCG tại Bình Dương, cung ứng cho công trình dân dụng, công nghiệp và hạ tầng.",

  alternates: {
    canonical: "/", // 🔥 canonical TRANG CHỦ
  },

  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.json",

  openGraph: {
    title: "Công ty Cổ phần Nam Sơn – Nhà phân phối xi măng tại Bình Dương",
    description:
      "Nhà phân phối chính thức xi măng Vicem Hà Tiên, Fico YTL, SCG tại Bình Dương – Công ty Cổ phần Nam Sơn.",
    url: "/", // sẽ tự resolve thành https://namsonjsc.vn
    siteName: "Công ty Cổ phần Nam Sơn",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.avif",
        width: 1200,
        height: 630,
        alt: "Công ty Cổ phần Nam Sơn",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Công ty Cổ phần Nam Sơn",
    description:
      "Nhà phân phối xi măng Vicem Hà Tiên, Fico YTL, SCG tại Bình Dương.",
    images: ["/og-image.avif"],
  },
};

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
