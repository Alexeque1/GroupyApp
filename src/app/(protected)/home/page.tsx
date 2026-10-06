import HomeView from "@/components/home/home-view";
import { requireUser } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db/db";
import { User } from "@/model/User";

// Server Component: it can read the session and the database before sending the page to the browser.
export default async function HomePage() {
    // Who is logged in? (id comes from the session cookie)
    const sessionUser = await requireUser();

    // Fresh data from the database, so name changes show up without logging in again.
    await connectDB();
    const user = await User.findById(sessionUser.id).select("firstName").lean();

    return <HomeView firstName={user?.firstName ?? sessionUser.name?.split(" ")[0] ?? ""} />;
}
