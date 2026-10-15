import Skeleton from "@/components/ui/skeleton";

// Shown the instant the user clicks an event link, while the server loads the event.
// It mirrors EventView's layout so nothing jumps when the real page replaces it.
export default function Loading() {
    return (
        <div className="flex flex-col gap-8 -mt-10" role="status" aria-label="Loading event">
            {/* HEADER: same card as EventHeader */}
            <section className="flex flex-col items-center">
                <div className="w-[92%] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:w-[85%]">
                    <Skeleton className="h-48 w-full rounded-none md:h-72" />

                    <div className="flex flex-col gap-3 px-6 pb-6 pt-6 md:px-10 md:pb-8">
                        {/* Category + status chips */}
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                        {/* Title */}
                        <Skeleton className="h-8 w-2/3 rounded-lg" />
                        {/* Date, place, members */}
                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                            <Skeleton className="h-4 w-32 rounded-md" />
                            <Skeleton className="h-4 w-40 rounded-md" />
                            <Skeleton className="h-4 w-24 rounded-md" />
                        </div>
                        {/* Host + action button */}
                        <div className="mt-3 flex items-center justify-between gap-4 border-t border-black/10 pt-5">
                            <div className="flex items-center gap-3">
                                <Skeleton className="size-10 rounded-full" />
                                <Skeleton className="h-4 w-28 rounded-md" />
                            </div>
                            <Skeleton className="h-11 w-36 rounded-full" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex flex-col gap-5 md:flex-row items-start p-5">
                {/* ASIDE: same cards as EventAsideSection */}
                <div className="flex w-full min-w-0 flex-1 flex-col gap-5">
                    {[4, 2, 2].map((lines, i) => (
                        <div key={i} className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                            <Skeleton className="h-5 w-28 rounded-md" />
                            {Array.from({ length: lines }).map((_, j) => (
                                <Skeleton key={j} className="h-3.5 w-full rounded-md last:w-2/3" />
                            ))}
                        </div>
                    ))}
                </div>

                {/* MAIN: tabs + feed, same shape as EventMainSection */}
                <div className="flex w-full min-w-0 flex-[2] flex-col overflow-hidden rounded-3xl bg-black/5 pt-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:pt-4">
                    <div className="flex gap-1 px-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-28 rounded-b-none rounded-t-xl" />
                        ))}
                    </div>
                    <div className="flex min-h-[500px] flex-col gap-4 rounded-b-3xl bg-white p-4 md:p-6">
                        {/* Post box */}
                        <Skeleton className="h-24 w-full rounded-2xl" />
                        {/* Posts */}
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-3 rounded-2xl border border-black/5 p-4">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="size-10 rounded-full" />
                                    <div className="flex flex-col gap-2">
                                        <Skeleton className="h-4 w-32 rounded-md" />
                                        <Skeleton className="h-3 w-20 rounded-md" />
                                    </div>
                                </div>
                                <Skeleton className="h-3.5 w-full rounded-md" />
                                <Skeleton className="h-3.5 w-4/5 rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
