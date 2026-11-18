import * as React from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type LogoItem = {
  src?: string;
  alt?: string;
  name?: string;
  sub_label?: string;
  width?: number;
  height?: number;
  render?: () => React.ReactNode;
};

const DEFAULT_LOGOS: LogoItem[] = [
  {
    src: "https://cdn.21st.dev/assets/mirror/bd/bdf5f3ae72bcfda892a686c03b7932985c694e9a9828643c980601bbc9e53cb4.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/31/319eeae853dd1af99d442b6c16b6c38dc52a66a719f8e502c65f85d26255cbd3.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/90/90f01a9537335666282ae5acc80bd4305f86d085a92d60904c3aa3ccc4414570.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/2b/2bcdd4124223e3bf8e66bc08ce0ac32a6cc42ffe3584bbecfd377847176a188d.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/fc/fc7b090ebcfc468d24a1dc482b2db1fcbfd99ca14568552a30ce553d6dda7fcb.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/96/96517bce3574d648280ff639d01d9889f354b488b3f826db5df746d730232a0c.svg",
    alt: "Clerk Logo",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/e8/e8514b1206f79e1abdafcc1d2632393cc7cfbcbbe25426ac5143b17b184b56b8.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/56/5624b7c243ac8d60e848fb5ea222ec932c1600df54a2762238b37498372fb0c8.svg",
    alt: "Vercel Logo",
  },
];

export type LogoCloudProps = React.ComponentProps<"div"> & {
  items?: LogoItem[];
};

export function LogoCloud({ className, items, ...props }: LogoCloudProps) {
  const logos = items && items.length >= 8 ? items : DEFAULT_LOGOS;

  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x border-slate-200 md:grid-cols-4",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-slate-200" />

      <LogoCard
        className="relative border-r border-b border-slate-200 bg-slate-50/70"
        logo={logos[0]}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-slate-400 pointer-events-none"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b md:border-r border-slate-200 bg-white"
        logo={logos[1]}
      />

      <LogoCard
        className="relative border-r border-b border-slate-200 md:bg-slate-50/70 bg-white"
        logo={logos[2]}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-slate-400 pointer-events-none"
          strokeWidth={1}
        />
        <PlusIcon
          className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block text-slate-400 pointer-events-none"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="relative border-b border-slate-200 bg-slate-50/70 md:bg-white"
        logo={logos[3]}
      />

      <LogoCard
        className="relative border-r border-b border-slate-200 bg-slate-50/70 md:border-b-0 md:bg-white"
        logo={logos[4]}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 md:hidden text-slate-400 pointer-events-none"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b border-slate-200 bg-white md:border-r md:border-b-0 md:bg-slate-50/70"
        logo={logos[5]}
      />

      <LogoCard
        className="border-r border-slate-200 bg-white"
        logo={logos[6]}
      />

      <LogoCard
        className="bg-slate-50/70"
        logo={logos[7]}
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-slate-200" />
    </div>
  );
}

export type LogoCardProps = React.ComponentProps<"div"> & {
  logo?: LogoItem;
};

export function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-[100px] sm:min-h-[120px] items-center justify-center bg-white px-4 py-8 md:p-8 transition-colors",
        className
      )}
      {...props}
    >
      {logo?.render ? (
        logo.render()
      ) : logo?.src ? (
        <img
          alt={logo.alt || logo.name || "Logo"}
          className="pointer-events-none h-4 sm:h-5 max-w-[140px] select-none object-contain"
          height={logo.height || "auto"}
          src={logo.src}
          width={logo.width || "auto"}
        />
      ) : logo?.name ? (
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-heading font-black text-lg sm:text-xl text-slate-900 tracking-tight">
            {logo.name}
          </span>
          {logo.sub_label && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
              {logo.sub_label}
            </span>
          )}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export default LogoCloud;
