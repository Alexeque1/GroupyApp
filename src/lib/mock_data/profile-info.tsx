import { getProfileViewModel } from "./profile-selectors";

// Hasta que exista autenticación real, "el usuario logueado" es Alexander (id 1).
// Cuando haya auth, este id vendrá de la sesión en vez de estar fijo.
export const CURRENT_USER_ID = 1;

// PROFILE_INFO ya no es un mock a mano: se calcula desde USERS_DATA con el
// mismo selector que usa /profile/[id], así ambos quedan siempre consistentes.
export const PROFILE_INFO = getProfileViewModel(CURRENT_USER_ID)!;
