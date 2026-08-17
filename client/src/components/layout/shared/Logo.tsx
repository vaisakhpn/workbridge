import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 font-extrabold text-white text-lg shadow-xs transition-transform group-hover:scale-105">
        J
      </div>

      <div className="flex flex-col">
        <span className="text-foreground text-lg font-bold tracking-tight">
          Job<span className="text-orange-600">ora</span>
        </span>
        <span className="text-muted-foreground text-[10px] font-medium leading-none">Find Work Faster</span>
      </div>
    </Link>
  );
}
