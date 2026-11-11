import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({
  className = "",
  variant = "dark",
  size = "md",
}: LogoProps) {
  const isLight = variant === "light";

  // Light variant has white baseline text for dark backgrounds
  // Dark variant has dark baseline text for light backgrounds
  const logoSrc = isLight
    ? "/images/logo-afi-light.png"
    : "/images/logo-afi-dark.png";

  const sizeClasses = {
    sm: "h-9 w-auto",
    md: "h-12 sm:h-14 w-auto",
    lg: "h-16 sm:h-20 w-auto",
    xl: "h-20 sm:h-24 w-auto",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center group focus:outline-none focus:ring-0 rounded-xl transition-transform hover:scale-[1.02] ${className}`}
      aria-label="AFI-L'Université de l'Entreprise - Accueil"
    >
      <div className="relative flex items-center">
        <Image
          src={logoSrc}
          alt="AFI-L'Université de l'Entreprise"
          width={1024}
          height={417}
          priority
          className={`${sizeClasses[size]} object-contain drop-shadow-xs`}
        />
      </div>
    </Link>
  );
}
