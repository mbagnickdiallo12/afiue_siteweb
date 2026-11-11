import React from "react";
import Image from "next/image";
import { Info, AlertCircle, Lightbulb } from "lucide-react";

interface ArticleContentRendererProps {
  content: string;
  className?: string;
}

export function ArticleContentRenderer({
  content,
  className = "",
}: ArticleContentRendererProps) {
  if (!content) return null;

  // Split content by blocks
  // Custom blocks:
  // :::gallery ... :::
  // :::callout-info ... :::
  // :::callout-warning ... :::

  const lines = content.split("\n");
  const renderedElements: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // 1. Gallery Block :::gallery
    if (line.trim().startsWith(":::gallery")) {
      i++;
      const galleryItems: { url: string; caption?: string }[] = [];
      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        const itemLine = lines[i].trim();
        if (itemLine) {
          const parts = itemLine.split("|");
          const url = parts[0].trim();
          const caption = parts[1]?.trim();
          if (url) {
            galleryItems.push({ url, caption });
          }
        }
        i++;
      }
      i++; // skip closing :::

      if (galleryItems.length > 0) {
        renderedElements.push(
          <div key={`gallery-${i}`} className="my-8">
            <div
              className={`grid gap-4 ${
                galleryItems.length === 1
                  ? "grid-cols-1"
                  : galleryItems.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {galleryItems.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs flex flex-col"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                    <Image
                      src={img.url}
                      alt={img.caption || `Photo ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {img.caption && (
                    <div className="p-3 bg-white border-t border-slate-100 text-xs text-slate-600 font-medium">
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 italic text-center mt-2">
              Galerie photos ({galleryItems.length} visuels)
            </p>
          </div>
        );
      }
      continue;
    }

    // 2. Callout Block :::callout-info or :::callout-warning
    if (line.trim().startsWith(":::callout")) {
      const isWarning = line.includes("warning") || line.includes("important");
      const isTip = line.includes("tip") || line.includes("astuce");
      i++;
      const calloutLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        calloutLines.push(lines[i]);
        i++;
      }
      i++; // skip closing :::

      renderedElements.push(
        <div
          key={`callout-${i}`}
          className={`my-6 p-5 rounded-2xl border flex items-start gap-3.5 ${
            isWarning
              ? "bg-slate-900 text-white border-slate-800"
              : isTip
              ? "bg-slate-800 text-white border-slate-700"
              : "bg-afi-navy text-white border-afi-navy-800"
          }`}
        >
          {isWarning ? (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          ) : isTip ? (
            <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-white shrink-0 mt-0.5" />
          )}
          <div className="text-xs sm:text-sm leading-relaxed space-y-1">
            {calloutLines.map((cl, cIdx) => (
              <p key={cIdx}>{formatInlineMarkdown(cl)}</p>
            ))}
          </div>
        </div>
      );
      continue;
    }

    // 3. Headings
    if (line.startsWith("#### ")) {
      renderedElements.push(
        <h4
          key={`h4-${i}`}
          className="font-heading font-bold text-base text-slate-900 mt-6 mb-2"
        >
          {formatInlineMarkdown(line.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      renderedElements.push(
        <h3
          key={`h3-${i}`}
          className="font-heading font-black text-lg sm:text-xl text-slate-900 mt-8 mb-3 pt-2"
        >
          {formatInlineMarkdown(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      renderedElements.push(
        <h2
          key={`h2-${i}`}
          className="font-heading font-black text-xl sm:text-2xl text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-100"
        >
          {formatInlineMarkdown(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // 4. Standalone Image: ![Caption](URL)
    const imgMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      const caption = imgMatch[1];
      const url = imgMatch[2];
      renderedElements.push(
        <figure key={`img-${i}`} className="my-8">
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            <Image
              src={url}
              alt={caption || "Illustration article"}
              fill
              sizes="(max-width: 800px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {caption && (
            <figcaption className="text-center text-xs text-slate-500 mt-2.5 font-medium italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // 5. Blockquote
    if (line.startsWith("> ")) {
      renderedElements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-5 border-l-4 border-afi-red pl-5 py-1 text-slate-700 italic text-sm sm:text-base leading-relaxed bg-slate-50 rounded-r-xl"
        >
          {formatInlineMarkdown(line.slice(2))}
        </blockquote>
      );
      i++;
      continue;
    }

    // 6. Horizontal separator
    if (line.trim() === "---" || line.trim() === "***") {
      renderedElements.push(
        <hr key={`hr-${i}`} className="my-8 border-t border-slate-200" />
      );
      i++;
      continue;
    }

    // 7. Lists (unordered)
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      renderedElements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 list-none pl-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0" />
              <span>{formatInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 8. Lists (ordered)
    if (line.trim().match(/^\d+\.\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      renderedElements.push(
        <ol key={`ol-${i}`} className="my-4 space-y-2 list-none pl-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{formatInlineMarkdown(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 9. Standard Paragraph
    if (line.trim().length > 0) {
      renderedElements.push(
        <p
          key={`p-${i}`}
          className="text-xs sm:text-sm lg:text-base text-slate-700 leading-relaxed my-3"
        >
          {formatInlineMarkdown(line)}
        </p>
      );
    }

    i++;
  }

  return (
    <div className={`space-y-1 font-body text-slate-800 ${className}`}>
      {renderedElements}
    </div>
  );
}

/**
 * Format inline markdown like **bold**, *italic*, <u>underline</u>, ~~strikethrough~~, [link](url)
 */
function formatInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  // Simple token parser for bold, italic, links, underline, strikethrough
  // Replace links: [label](url)
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const parts: React.ReactNode[] = [];

  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(parseFormatting(text.substring(lastIndex, match.index)));
    }
    const label = match[1];
    const url = match[2];
    parts.push(
      <a
        key={`link-${match.index}`}
        href={url}
        target="_blank"
        rel="noreferrer"
        className="font-bold text-afi-red hover:underline inline-flex items-center gap-0.5"
      >
        {label}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(parseFormatting(text.substring(lastIndex)));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function parseFormatting(text: string): React.ReactNode {
  // Bold: **text**
  // Italic: *text*
  // Underline: <u>text</u>
  // Strikethrough: ~~text~~
  // Code: `text`

  // Split by bold first
  const boldParts = text.split(/\*\*(.*?)\*\*/g);
  if (boldParts.length > 1) {
    return boldParts.map((part, idx) =>
      idx % 2 === 1 ? (
        <strong key={idx} className="font-bold text-slate-900">
          {parseFormatting(part)}
        </strong>
      ) : (
        parseFormatting(part)
      )
    );
  }

  // Italic: *text*
  const italicParts = text.split(/\*(.*?)\*/g);
  if (italicParts.length > 1) {
    return italicParts.map((part, idx) =>
      idx % 2 === 1 ? (
        <em key={idx} className="italic text-slate-800">
          {parseFormatting(part)}
        </em>
      ) : (
        parseFormatting(part)
      )
    );
  }

  // Strikethrough: ~~text~~
  const strikeParts = text.split(/~~(.*?)~~/g);
  if (strikeParts.length > 1) {
    return strikeParts.map((part, idx) =>
      idx % 2 === 1 ? (
        <del key={idx} className="line-through text-slate-400">
          {parseFormatting(part)}
        </del>
      ) : (
        parseFormatting(part)
      )
    );
  }

  // Underline: <u>text</u>
  const uParts = text.split(/<u>(.*?)<\/u>/g);
  if (uParts.length > 1) {
    return uParts.map((part, idx) =>
      idx % 2 === 1 ? (
        <u key={idx} className="underline underline-offset-2">
          {parseFormatting(part)}
        </u>
      ) : (
        parseFormatting(part)
      )
    );
  }

  // Inline code: `text`
  const codeParts = text.split(/`(.*?)`/g);
  if (codeParts.length > 1) {
    return codeParts.map((part, idx) =>
      idx % 2 === 1 ? (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs text-afi-navy font-semibold"
        >
          {part}
        </code>
      ) : (
        part
      )
    );
  }

  return text;
}

