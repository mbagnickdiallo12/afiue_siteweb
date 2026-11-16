import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  variant?: "light" | "dark";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Logo({
  className = "",
  imageClassName = "",
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
    xs: "h-7 sm:h-8 w-auto",
    sm: "h-[32px] sm:h-[36px] w-auto",
    md: "h-11 sm:h-12 w-auto",
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
          className={`${imageClassName || sizeClasses[size]} object-contain drop-shadow-xs`}
        />
      </div>
    </Link>
  );
}
