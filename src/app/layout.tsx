import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xi măng Nam Sơn",
  description: "Website Xi măng Nam Sơn",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <script
          src="https://kit.fontawesome.com/f5201aaf90.js"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
