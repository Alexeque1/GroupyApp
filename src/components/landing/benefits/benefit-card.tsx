import { ReactNode } from "react";
import { BorderBeam } from "@/components/ui/border-beam";

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function BenefitCard({
  icon,
  title,
  description,
}: BenefitCardProps) {
  return (
    <div className="relative overflow-hidden flex h-full flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>

      <h4 className="mb-3 text-xl font-semibold uppercase tracking-wide">
        {title}
      </h4>

      <p className="mt-4 text-muted-foreground leading-7">
        {description}
      </p>
      <BorderBeam />
    </div>
  );
}
