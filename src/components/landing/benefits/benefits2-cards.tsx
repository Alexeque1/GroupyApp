import Image from "next/image";

interface Benefit2CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function Benefit2Card({
  imageSrc,
  title,
  description,
}: Benefit2CardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      
      {/* Mitad superior: Imagen */}
      <div className="relative h-56 w-full shrink-0 sm:h-64">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Mitad inferior: Texto */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h4 className="mb-3 text-xl font-semibold uppercase tracking-wide">
          {title}
        </h4>

        <p className="text-muted-foreground leading-7">
          {description}
        </p>
      </div>
      
    </div>
  );
}