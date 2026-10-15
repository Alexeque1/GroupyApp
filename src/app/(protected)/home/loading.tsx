import Skeleton from "@/components/ui/skeleton";

// Shown the instant the user goes to Home, while the server looks up their name.
// It mirrors HomeView's grid so nothing jumps when the real page replaces it.
// TODO: once the home sections read from the DB instead of mock data, give the slow ones
// their own <Suspense> + skeleton, like the profile and event pages.
export default function Loading() {
    const card = "rounded-3xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]";

    return (
        <div className="relative flex flex-col py-10 px-5 gap-8" role="status" aria-label="Loading home">
            {/* Greeting */}
            <div className="flex flex-col gap-3">
                <Skeleton className="h-9 w-64 rounded-lg md:h-16 md:w-[28rem]" />
                <Skeleton className="h-4 w-48 rounded-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5">
                {/* Next event hero */}
                <Skeleton className="order-2 min-h-[240px] w-full rounded-3xl md:order-1 xl:col-span-4" />

                {/* Needs action */}
                <div className={`order-1 flex flex-col gap-3 md:order-2 xl:col-span-2 ${card}`}>
                    <Skeleton className="h-5 w-32 rounded-md" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full rounded-2xl" />
                    ))}
                </div>

                {/* Agenda */}
                <div className={`order-3 flex flex-col gap-3 xl:col-span-4 ${card}`}>
                    <Skeleton className="h-5 w-28 rounded-md" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-2xl" />
                    ))}
                </div>

                {/* Communities + fast event */}
                <div className="order-4 flex flex-col gap-5 xl:col-span-2">
                    <div className={`flex flex-col gap-3 ${card}`}>
                        <Skeleton className="h-5 w-32 rounded-md" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Skeleton className="size-10 shrink-0 rounded-full" />
                                <Skeleton className="h-4 flex-1 rounded-md" />
                            </div>
                        ))}
                    </div>
                    <Skeleton className="h-16 w-full rounded-3xl" />
                </div>
            </div>

            {/* Event suggestions */}
            <div className={`flex flex-col gap-4 ${card}`}>
                <Skeleton className="h-5 w-40 rounded-md" />
                <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-56 w-full rounded-2xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}
