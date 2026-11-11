import Link from "next/link";
import { GraduationCap, Home } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/80 shadow-lg text-center max-w-lg mx-auto space-y-6">
        <div className="flex justify-center pb-2">
          <Logo variant="dark" size="md" />
        </div>

        <div className="font-heading font-black text-6xl sm:text-7xl text-afi-red tracking-tight">
          404
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-bold text-2xl text-slate-900">
            Page Non Trouvée
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            La page que vous recherchez a peut-être été déplacée, renommée ou n&apos;existe plus dans la nouvelle arborescence.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-afi-navy text-white text-xs font-bold hover:bg-afi-navy-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Page d&apos;accueil</span>
          </Link>

          <Link
            href="/formations"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-afi-red text-white text-xs font-bold hover:bg-afi-red-800 transition-colors shadow-sm"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Catalogue des formations</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
