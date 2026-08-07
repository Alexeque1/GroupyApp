import { getProfileViewModel } from "./profile-selectors";

export const CURRENT_USER_ID = 1;


export const PROFILE_INFO = getProfileViewModel(CURRENT_USER_ID)!;
