import { format } from "date-fns";


export function formatEventDate(isoDate: string): string {
    return format(new Date(isoDate), "MMM d, yyyy");
}
