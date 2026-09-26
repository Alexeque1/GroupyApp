import { getProfileViewModel } from "./profile-selectors";
import { USERS_DATA } from "./users-data";

export const CURRENT_USER_ID = 1;
export const CURRENT_USERNAME = USERS_DATA.find((u) => u.id === CURRENT_USER_ID)!.username;

export const PROFILE_INFO = getProfileViewModel(CURRENT_USERNAME)!;
