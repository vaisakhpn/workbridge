interface AuthHeaderProps {
  title: string;
  description: string;
}

export default function AuthHeader({
  title,
  description,
}: AuthHeaderProps) {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <p className="text-muted">
        {description}
      </p>
    </div>
  );
}