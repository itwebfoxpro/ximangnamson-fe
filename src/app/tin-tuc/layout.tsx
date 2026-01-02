// src/app/tin-tuc/laytout.tsx

import ContactSection from "@/components/ContactSection/ContactSection";
import HeaderBlog from "@/components/Header/HeaderBlog";

export default function TinTucLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderBlog />
      {children}

      <ContactSection />
    </>
  );
}
