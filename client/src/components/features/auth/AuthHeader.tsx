import Logo from "@/components/layout/shared/Logo";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export default function AuthHeader({
  title,
  description,
}: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mb-6">
      {/* Brand Logo */}
      <div className="mb-2">
        <Logo />
      </div>

      {/* Main Title */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}