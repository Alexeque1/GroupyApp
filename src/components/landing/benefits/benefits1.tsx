import BenefitsCarousel from "./benefits-carousel";
import BenefitsGrid from "./benefits-grid";
import BentoAnimatedGridBenefits from "./benefits-bentoGrid";

export default function Benefits1() {
    return (
        <section className="overflow-hidden">
            <div className="container mx-auto flex flex-col gap-20 px-4 py-20">
                <div className="text-center">
                    <h2 className="h2_title dark-mesh-gradient">
                        Decide what your plan is and make it happen
                    </h2>
                    <div className="flex flex-col gap-10 xl:flex-row">
                        <div className="flex-2">
                            <BenefitsCarousel />
                            <BentoAnimatedGridBenefits />
                        </div>
                        <div className="flex-1 text-center content-center">
                            <p className="mx-auto mt-10 max-w-4xl text-center text-lg leading-8">
                                Whether you're planning a road trip, a football match, a study
                                session or simply grabbing a coffee, Groupy helps you find the
                                right people to make it happen.
                            </p>
                        </div>
                    </div>
                </div>
                <BenefitsGrid />
            </div>
        </section>
    );
}
