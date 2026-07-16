import { ReactNode } from "react";

interface Benefit1CardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function Benefit1Card({
  icon,
  title,
  description,
}: Benefit1CardProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-semibold uppercase tracking-wide">
        {title}
      </h3>

      <p className="mt-4 text-muted-foreground leading-7">
        {description}
      </p>
    </div>
  );
}