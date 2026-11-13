"use client";

import { useEffect, useState, useMemo } from "react";
import { ListOrdered, ChevronRight } from "lucide-react";
import { slugifyHeading } from "./ArticleContentRenderer";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface ArticleTableOfContentsProps {
  content: string;
}

export function ArticleTableOfContents({ content }: ArticleTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const items = useMemo<TocItem[]>(() => {
    if (!content) return [];
    const lines = content.split("\n");
    const parsed: TocItem[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) {
        const title = trimmed.slice(3).replace(/[*_~`]/g, "").trim();
        if (title) {
          parsed.push({
            id: slugifyHeading(title),
            title,
            level: 2,
          });
        }
      } else if (trimmed.startsWith("### ")) {
        const title = trimmed.slice(4).replace(/[*_~`]/g, "").trim();
        if (title) {
          parsed.push({
            id: slugifyHeading(title),
            title,
            level: 3,
          });
        }
      }
    });

    return parsed;
  }, [content]);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) {
    return null;
  }

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Table des matières"
      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-afi-red" />
          <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-900">
            Sommaire
          </h3>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {items.length} sections
        </span>
      </div>

      <ul className="space-y-1 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`${item.level === 3 ? "pl-3.5" : "pl-0"}`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToHeading(e, item.id)}
                className={`group flex items-start gap-1.5 py-1.5 px-2 rounded-lg transition-colors leading-relaxed ${
                  isActive
                    ? "bg-slate-900 text-white font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-transform ${
                    isActive
                      ? "text-afi-red translate-x-0.5"
                      : "text-slate-300 group-hover:text-slate-500"
                  }`}
                />
                <span className="line-clamp-2">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
