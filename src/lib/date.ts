import { format, formatDistanceToNow } from "date-fns";


export function formatEventDate(isoDate: string): string {
    return format(new Date(isoDate), "MMM d, yyyy");
}

export function formatTimeAgo(isoDate: string): string { 
    return formatDistanceToNow(new Date(isoDate), { addSuffix: true, }); 
}