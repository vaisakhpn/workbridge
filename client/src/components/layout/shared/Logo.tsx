import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl transition-transform group-hover:scale-105">
        <Image
          src={logo}
          alt="Bincoz Logo"
          fill
          className="object-contain"
          sizes="36px"
          priority
        />
      </div>

      {showText && (
        <div className="hidden sm:flex flex-col">
          <span className="text-foreground text-lg font-bold tracking-tight">
            Bin<span className="text-orange-600">coz</span>
          </span>
          <span className="text-muted-foreground text-[10px] font-medium leading-none">
            Find Work Faster
          </span>
        </div>
      )}
    </Link>
  );
}
