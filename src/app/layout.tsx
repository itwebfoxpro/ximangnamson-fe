import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import CartToast from "@/components/CartToast/CartToast";
import ChatBubbleGroup from "@/components/ChatBubbleGroup/ChatBubbleGroup";

export const metadata: Metadata = {
  title: "Xi măng Nam Sơn",
  description: "Website Xi măng Nam Sơn",
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
        ></script>
      </head>
      <body>
        <Providers>
          {children}

          {/* UI global */}
          <CartToast />
          <ChatBubbleGroup
            messengerUrl="https://m.me/your_page"
            zaloPhone="0909090000"
          />
        </Providers>
      </body>
    </html>
  );
}
