import Benefit2Card from "./benefits2_cards";

const benefitsData = [
    {
        title: "Community",
        description: "Join a group of vibrant people and create meaningful connections. The foundation of great experiences starts with a strong community.",
        imageSrc: "/benefits_typegroups/community.jpg",
    },
    {
        title: "Shared Spaces",
        description: "Whether you're working or creating, our coworking environments are designed to foster collaboration and productivity.",
        imageSrc: "/benefits_typegroups/coworking.jpg",
    },
    {
        title: "Meet New People",
        description: "Break the ice in relaxed environments and meet fascinating profiles. There's always someone interesting to share a coffee with.",
        imageSrc: "/benefits_typegroups/new people.jpg",
    },
    {
        title: "New Friends",
        description: "Beyond networking, foster lasting friendships based on hobbies, interests, and shared experiences.",
        imageSrc: "/benefits_typegroups/friends.jpg",
    },
];

export default function Benefits2Section() {
    return (

        <section className="relative isolate overflow-hidden benefit-section_parallax">

            {/* Background mesh parallax */}
            <div className="absolute inset-0 z-0">
                <div className="absolute left-[-10%] top-20 h-[400px] w-[400px] rounded-full bg-[#D2FFEA] blur-[120px] mesh-parallax" />

                <div className="absolute right-[-10%] top-40 h-[450px] w-[450px] rounded-full bg-[#F8AAE4] blur-[140px] mesh-parallax" />

                <div className="absolute bottom-0 left-[35%] h-[300px] w-[300px] rounded-full bg-[#CDE9FF] blur-[120px] mesh-parallax" />
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 container mx-auto px-4 py-16">
                <div className="mb-12 text-center">
                    <h2 className="h2_title dark-mesh-gradient">
                        Live unique experiences with friends or new people
                    </h2>
                    <p className="mx-auto mt-10 max-w-4xl text-center text-lg leading-8">
                        Discover new ways to connect, create and share unforgettable moments.
                        Whether you're looking for new friends, a community with the same passions,
                        or people to join your next adventure, Groupy helps you find the right people.
                    </p>
                </div>

                {/* Grid responsivo: 1 columna en móvil, 2 en tablets, 4 en pantallas grandes (o 2x2 si prefieres grid-cols-2) */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                    {benefitsData.map((benefit, index) => (
                        <Benefit2Card
                            key={index}
                            title={benefit.title}
                            description={benefit.description}
                            imageSrc={benefit.imageSrc}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}