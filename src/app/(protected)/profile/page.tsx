import ProfileHeader from "@/components/profile/profile-header";
import ProfileMain from "@/components/profile/profile-main-section";
import ProfileAside from "@/components/profile/profile-aside-section";

export default function Profile() {
    return (
        <div className="flex flex-col gap-8 -mt-10">
            <ProfileHeader />

            <div className="flex flex-col gap-5 md:flex-row p-5">
                <ProfileAside />
                <ProfileMain />
            </div>
        </div>
    );
}