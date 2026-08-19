import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "auto" | "mobile" | "desktop";
}

export default function Logo({
  className = "",
  showText = true,
  variant = "auto",
}: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center group shrink-0 ${className}`}>
      {variant === "mobile" || !showText ? (
        /* Always show mobile logo regardless of screen size */
        <div className="relative h-9 w-9 shrink-0 transition-transform group-hover:scale-105">
          <Image
            src="/mobile_logo.png"
            alt="Bincoz Logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
        </div>
      ) : variant === "desktop" ? (
        /* Always show desktop logo regardless of screen size */
        <div className="relative h-10 w-auto shrink-0 transition-transform group-hover:scale-105">
          <Image
            src="/desktop_logo.png"
            alt="Bincoz Logo"
            width={145}
            height={45}
            className="h-10 w-auto object-contain max-h-10"
            priority
          />
        </div>
      ) : (
        /* Auto mode: mobile logo on mobile screens, desktop logo on desktop screens */
        <>
          {/* Mobile Logo: visible only on mobile screens (< sm) */}
          <div className="block sm:hidden relative h-9 w-9 shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/mobile_logo.png"
              alt="Bincoz Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
          </div>

          {/* Desktop Logo: visible only on desktop screens (>= sm) */}
          <div className="hidden sm:block relative h-10 w-auto shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/desktop_logo.png"
              alt="Bincoz Logo"
              width={145}
              height={45}
              className="h-10 w-auto object-contain max-h-10"
              priority
            />
          </div>
        </>
      )}
    </Link>
  );
}
