import { redirect } from "next/navigation";
import { CURRENT_USERNAME } from "@/lib/mock_data/profile-info";

// "Mi perfil" es, ni más ni menos, el perfil del usuario logueado.
// En vez de mantener una página duplicada, reusamos /profile/[username].
export default function ProfilePage() {
    redirect(`/profile/${CURRENT_USERNAME}`);
}
