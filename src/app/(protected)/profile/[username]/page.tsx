import { notFound } from "next/navigation";
import ProfileView from "@/components/profile/profile-view";
import { requireUser } from "@/lib/auth/guards";
import { getProfileData } from "@/lib/data/profile";

interface ProfilePageProps {
    params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { username } = await params;
    const sessionUser = await requireUser();

    const profile = await getProfileData(decodeURIComponent(username));
    if (!profile) notFound();

    return <ProfileView profile={profile} isOwnProfile={profile.id === sessionUser.id} />;
}
