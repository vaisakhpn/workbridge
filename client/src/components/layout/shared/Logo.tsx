import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-xl font-bold">
        W
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-bold">WorkBridge</span>

        <span className="text-muted-foreground text-xs">Find Work Faster</span>
      </div>
    </Link>
  );
}
