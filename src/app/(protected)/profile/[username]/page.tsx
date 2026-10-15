import { notFound } from "next/navigation";
import ProfileView from "@/components/profile/profile-view";
import { requireUser } from "@/lib/auth/guards";
import { getProfileEvents, getProfileUser } from "@/lib/data/profile";

interface ProfilePageProps {
    params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { username } = await params;
    const sessionUser = await requireUser();

    // Quick query, and we need it to know whether to show the 404
    const user = await getProfileUser(decodeURIComponent(username));
    if (!user) notFound();

    // Not awaited on purpose: the page shows right away and each section that needs
    // the events shows a skeleton until they arrive.
    const eventsPromise = getProfileEvents(user.id);

    return <ProfileView user={user} eventsPromise={eventsPromise} isOwnProfile={user.id === sessionUser.id} />;
}
