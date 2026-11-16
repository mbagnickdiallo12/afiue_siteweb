"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/motion";
import { SophieChatWidget } from "@/components/sophie/SophieChatWidget";
import { SiteSettings } from "@/types/database";

export function SiteLayoutWrapper({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings?: SiteSettings;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">
        {children}
      </main>
    );
  }

  return (
    <>
      <ScrollProgress />
      <Header settings={settings} />
      <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">
        {children}
      </main>
      <Footer settings={settings} />
      <SophieChatWidget />
    </>
  );
}
