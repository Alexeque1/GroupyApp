import { redirect } from "next/navigation";
import { CURRENT_USER_ID } from "@/lib/mock_data/profile-info";

// "Mi perfil" es, ni más ni menos, el perfil del usuario logueado.
// En vez de mantener una página duplicada, reusamos /profile/[id].
export default function ProfilePage() {
    redirect(`/profile/${CURRENT_USER_ID}`);
}
