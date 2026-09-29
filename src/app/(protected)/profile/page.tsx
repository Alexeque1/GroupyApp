import { redirect } from "next/navigation";
import { CURRENT_USERNAME } from "@/lib/mock_data/profile-info";

// "My profile" is, quite simply, the logged-in user's profile.
// Instead of keeping a duplicate page around, we reuse /profile/[username].
export default function ProfilePage() {
    redirect(`/profile/${CURRENT_USERNAME}`);
}
