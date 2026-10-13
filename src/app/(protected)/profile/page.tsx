import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/guards";

// "My profile" is, quite simply, the logged-in user's profile.
// Instead of keeping a duplicate page around, we reuse /profile/[username].
export default async function ProfilePage() {
    const user = await requireUser();
    redirect(`/profile/${user.username}`);
}
