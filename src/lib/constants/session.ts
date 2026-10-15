// Shared between the server (Auth.js session maxAge) and the client (idle watcher),
// so both sides agree on when an inactive session ends.
export const SESSION_IDLE_TIMEOUT_SECONDS = 10 * 60;
