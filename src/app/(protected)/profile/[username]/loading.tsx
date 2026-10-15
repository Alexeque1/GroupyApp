import Skeleton from "@/components/ui/skeleton";

// Shown the instant the user clicks a profile link, while the server looks up the user.
// It mirrors ProfileView's layout so nothing jumps when the real page replaces it.
export default function Loading() {
    return (
        <div className="flex flex-col gap-8 -mt-10" role="status" aria-label="Loading profile">
            {/* HEADER: same card as ProfileHeader */}
            <section className="flex flex-col items-center">
                <div className="w-full overflow-hidden md:rounded-3xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:w-[85%]">
                    <Skeleton className="h-[180px] w-full rounded-none md:h-[250px]" />

                    <div className="px-6 pb-6 md:px-10 md:pb-8">
                        <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-6">
                            <div className="-mt-14 h-28 w-28 shrink-0 rounded-full border-4 border-white bg-white md:-mt-16 md:h-36 md:w-36">
                                <Skeleton className="h-full w-full rounded-full" />
                            </div>
                            <div className="flex flex-col items-center gap-2 pb-1 md:items-start">
                                <Skeleton className="h-8 w-56 rounded-lg" />
                                <Skeleton className="h-4 w-28 rounded-md" />
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col items-center gap-6 border-t border-black/10 pt-5 min-[1200px]:flex-row min-[1200px]:justify-between">
                            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-7">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1.5">
                                        <Skeleton className="h-6 w-8 rounded-md" />
                                        <Skeleton className="h-2.5 w-16 rounded-sm" />
                                    </div>
                                ))}
                            </div>
                            <Skeleton className="h-11 w-36 rounded-full" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex flex-col gap-5 md:flex-row items-start p-5">
                {/* ASIDE: same cards as ProfileAside */}
                <div className="flex w-full min-w-0 flex-1 flex-col gap-5">
                    {[4, 2, 1].map((lines, i) => (
                        <div key={i} className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                            <Skeleton className="h-5 w-28 rounded-md" />
                            {Array.from({ length: lines }).map((_, j) => (
                                <Skeleton key={j} className="h-3.5 w-full rounded-md last:w-2/3" />
                            ))}
                        </div>
                    ))}
                </div>

                {/* MAIN: tabs + content, same shape as ProfileMain */}
                <div className="flex w-full min-w-0 flex-[2] flex-col overflow-hidden rounded-3xl bg-black/5 pt-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:pt-4">
                    <div className="flex gap-1 px-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-28 rounded-b-none rounded-t-xl" />
                        ))}
                    </div>
                    <div className="flex min-h-[500px] flex-col gap-4 bg-white p-6 sm:rounded-b-3xl md:p-8">
                        <Skeleton className="h-6 w-48 rounded-md" />
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-4/5 rounded-md" />
                        <div className="mt-2 grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-56 w-full rounded-2xl" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
