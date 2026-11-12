"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/motion";
import { SophieChatWidget } from "@/components/sophie/SophieChatWidget";

export function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">{children}</main>;
  }

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">{children}</main>
      <Footer />
      <SophieChatWidget />
    </>
  );
}

