import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
            className="w-full sm:w-auto inline-flex items-center justify-between gap-3.5 pl-5 pr-1.5 py-1.5 rounded-full bg-afi-navy hover:bg-slate-900 text-white text-xs font-bold transition-all group"
          >
            <span>Page d&apos;accueil</span>
            <span className="w-8 h-8 rounded-full bg-white text-afi-navy flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

          <Link
            href="/formations"
            className="w-full sm:w-auto inline-flex items-center justify-between gap-3.5 pl-5 pr-1.5 py-1.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm group"
          >
            <span>Catalogue des formations</span>
            <span className="w-8 h-8 rounded-full bg-white text-afi-red flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
