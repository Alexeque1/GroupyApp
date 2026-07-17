"use client";

import { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const slides = [
    { image: "/benefits_carrousel/party_carrousel.jpg", title: "Party" },
    { image: "/benefits_carrousel/fitness_carrousel.jpg", title: "Fitness" },
    { image: "/benefits_carrousel/hobbies_carrousel.jpg", title: "Hobbies" },
    { image: "/benefits_carrousel/meeting_carrousel.jpg", title: "Meeting" },
    { image: "/benefits_carrousel/nature_carrousel.jpg", title: "Nature" },
    { image: "/benefits_carrousel/events_carrousel.jpg", title: "Events" },
];

export default function BenefitsCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
    });

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            const slides = emblaApi.slideNodes();

            slides.forEach((slide) => slide.classList.remove("is-snapped"));

            slides[emblaApi.selectedScrollSnap()]?.classList.add("is-snapped");
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    return (
        <div className="embla lg:hidden" ref={emblaRef}>
            <div className="embla__container flex gap-4">
                {slides.map((slide) => (
                    <div
                        key={slide.title}
                        className="embla__slide flex-[0_0_80%] min-w-[220px] max-w-[320px] h-[280px]"
                    >
                        <div className="relative h-full overflow-hidden rounded-3xl shadow-xl transition-all duration-500 scale-90 [&.is-snapped]:scale-100">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
