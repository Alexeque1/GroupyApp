import {GROUPS_DATA} from "./group-data";
import {FRIENDS_DATA} from "./friends-data";
import {COMMUNITIES_DATA} from "./community-data";

export const PROFILE_INFO = {
    name: "Alexander",
    lastName: "Sequera",
    profileImage: "/profile-image.png",
    username: "Alexeque1",
    groups: GROUPS_DATA.filter((group) => group.role !== undefined),
    friends: FRIENDS_DATA,
    communities: COMMUNITIES_DATA,
    country: "Argentina",
    city: "Buenos Aires",
    bio: "A lover of technology, live music, and good coffee. Always seeking new adventures and groups to share interests with.",
    profession: "UX/UI Designer",
    languages: ["English", "Spanish"],
    joined: "October 2023"
}