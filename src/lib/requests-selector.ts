import { REQUESTS_DATA, type JoinRequestType } from "./mock_data/request-data";
import { USERS_DATA, type UserType } from "./mock_data/users-data";

export interface JoinRequestViewModel extends Omit<JoinRequestType, "userId"> {
    requester: Pick<UserType, "id" | "firstName" | "lastName" | "username" | "profileImage" | "city">;
}

export function getRequestsForEvent(eventId: number): JoinRequestViewModel[] {
    return REQUESTS_DATA
        .filter((request) => request.eventId === eventId)
        .map((request): JoinRequestViewModel | null => {
            const { userId, ...requestData } = request;

            const requester = USERS_DATA.find((user) => user.id === userId);

            if (!requester) return null;

            return {
                ...requestData,
                requester,
            };
        })
        .filter((request): request is JoinRequestViewModel => request !== null)
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
}
