"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface ArticleViewCounterProps {
  slug: string;
  initialCount?: number;
}

export function ArticleViewCounter({
  slug,
  initialCount = 0,
}: ArticleViewCounterProps) {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    if (!slug) return;

    const storageKey = `afi_viewed_${slug}`;
    const alreadyViewed = sessionStorage.getItem(storageKey);

    if (!alreadyViewed) {
      sessionStorage.setItem(storageKey, "1");
      fetch(`/api/articles/${encodeURIComponent(slug)}/view`, {
        method: "POST",
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && typeof data.view_count === "number") {
            setCount(data.view_count);
          }
        })
        .catch(() => {
          // ignore silent network errors
        });
    }
  }, [slug]);

  const formattedCount = count.toLocaleString("fr-FR");

  return (
    <span
      className="inline-flex items-center gap-1.5 text-slate-500 font-medium"
      title={`${formattedCount} consultations`}
    >
      <Eye className="w-3.5 h-3.5 text-slate-400" />
      <span>{formattedCount} vues</span>
    </span>
  );
}
