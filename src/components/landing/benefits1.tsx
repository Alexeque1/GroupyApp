"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

export default function Benefits1() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
    });

    // Esto es vital para el efecto de sombra/brillo
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            const slides = emblaApi.slideNodes();

            slides.forEach((slide) => slide.classList.remove("is-snapped"));
            slides[emblaApi.selectedScrollSnap()].classList.add("is-snapped");
        };

        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi]);

    const slides = [1, 2, 3];

    return (
        <section className="overflow-hidden">
            <div className="container mx-auto px-4 py-16 flex flex-col gap-12">
                {/* MAKE IT HAPPEN */ }
                <div>
                    <h2 className="mb-10 text-5xl font-bold dark-mesh-gradient md:text-7xl">
                    Decide what your plan is and make it happen
                </h2>

                <div>
                    {/* Carrusel para móvil */}
                    <div className="embla touch-pan-x xl:hidden" ref={emblaRef}>
                        <div className="embla__container flex gap-4">
                            {slides.map((_, index) => (
                                <div
                                    key={index}
                                    className="
                  embla__slide
                  flex-[0_0_80%]
                  min-w-[280px]
                  max-w-[320px]
                  h-[300px]
                  transition-all
                  duration-500
                  ease-in-out
                "
                                >
                                    <div
                                        className="
                    relative
                    h-full
                    overflow-hidden
                    rounded-3xl
                    shadow-2xl
                    scale-90
                    opacity-100
                    brightness-50
                    transition-all
                    duration-500
                    [&.is-snapped]:scale-100
                    [&.is-snapped]:opacity-100
                    [&.is-snapped]:brightness-100
                  "
                                    >
                                        <Image
                                            src="/party_carrousel.png"
                                            alt={`Party ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center mt-8 md:mt-12">
                        <p className="text-1xl md:text-2xl leading-[45px]">
                            Whether you're planning a road trip, a football match, a study session, or just grabbing coffee, Groupy helps you find the right people to make it happen. Every plan is better when shared.
                        </p>
                    </div>
                </div>
                </div>

                {/* BUILD YOUR GROUP */ }
                <div>
                    {/* TITLE */ }
                    <div>
                        <h2 className="mt-[20px] text-5xl font-bold dark-mesh-gradient md:text-7xl">
                            Groupy helps you build your group
                        </h2>
                    </div>
                    {/* CARDS */ }

                </div>
            </div>
        </section>
    );
}