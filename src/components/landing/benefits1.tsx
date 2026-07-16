"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import {
    Calendar,
    Users,
    Folder,
    Sparkles,
} from "lucide-react";

import Benefit1Card from "./beneifts1_cards";

const benefits = [
    {
        icon: <Calendar className="h-8 w-8" />,
        title: "Everything in one place",
        description:
            "Organize groups, events and conversations without jumping between different apps.",
    },
    {
        icon: <Users className="h-8 w-8" />,
        title: "Know who's coming",
        description:
            "Everyone can confirm their attendance so you always know who's joining.",
    },
    {
        icon: <Folder className="h-8 w-8" />,
        title: "Keep your groups organized",
        description:
            "Separate friends, work, university or any community into dedicated spaces.",
    },
    {
        icon: <Sparkles className="h-8 w-8" />,
        title: "Discover new plans",
        description:
            "Explore events and communities based on your interests and meet new people.",
    },
];

const slides = [
    { image: "/benefits_carrousel/party_carrousel.jpg", title: "Party" },
    { image: "/benefits_carrousel/fitness_carrousel.jpg", title: "Fitness" },
    { image: "/benefits_carrousel/hobbies_carrousel.jpg", title: "Hobbies" },
    { image: "/benefits_carrousel/meeting_carrousel.jpg", title: "Meeting" },
    { image: "/benefits_carrousel/nature_carrousel.jpg", title: "Nature" },
    { image: "/benefits_carrousel/concerts_carrousel.jpg", title: "Concerts" },
];

export default function Benefits1() {
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
        <section className="overflow-hidden">
            <div className="container mx-auto flex flex-col gap-20 px-4 py-20">
                {/* SECTION 1 */}
                <div className="text-center">
                    <h2 className="h2_title dark-mesh-gradient">
                        Decide what your plan is and make it happen
                    </h2>

                    <div className="mt-10">
                        {/* Mobile Carousel */}
                        <div className="embla xl:hidden" ref={emblaRef}>
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

                        <p className="mx-auto mt-10 max-w-4xl text-center text-lg leading-8 md:text-2xl">
                            Whether you're planning a road trip, a football match, a study
                            session or simply grabbing a coffee, Groupy helps you find the
                            right people to make it happen.
                        </p>
                    </div>
                </div>

                {/* SECTION 2 */}
                <div className="text-center">
                    <h2 className="h2_title dark-mesh-gradient">
                        Groupy helps you build your group
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                className="h-full"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                }}
                            >
                                <Benefit1Card
                                    icon={benefit.icon}
                                    title={benefit.title}
                                    description={benefit.description}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}