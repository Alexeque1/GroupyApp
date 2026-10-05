"use client";

import { useState } from "react";
import AnimatedBackgroundLight from "../ui/backgrounds/animated-background-light";
import Button from "../ui/button";
import Image from "next/image";
import { Pencil, UserMinus, BadgeCheck, Star } from "lucide-react";
import ProfileCover from "./profile-cover";
import type { EventType } from "./profile-events-cards";
import ProfileModalChangeProfilePhoto from "./profile-modal-changeprofilephoto";
import ProfileModalChangeCoverPhoto from "./profile-modal-changecoverphoto";
import Link from "next/link";
import BackButton from "../ui/back-button";
import ConfirmAlert from "../ui/alerts/confirm-alert";
import StatusAlert from "../ui/alerts/status-alert";

const isLocalPreviewUrl = (src: string) => src.startsWith("blob:") || src.startsWith("data:");

type ProfileHeaderProps = {
    user: {
        name: string;
        lastName: string;
        bio: string;
        username: string;
        profileImage: string;
        events: EventType[];
        communities: unknown[];
        friends: unknown[];
        verified?: boolean;
        rating: number;
        reviewsCount: number;
    };
    isOwnProfile?: boolean;
    isUserFollowing?: boolean;
    isSettings?: boolean;
};

export default function ProfileHeader({ user, isOwnProfile = false, isUserFollowing = false, isSettings = false }: ProfileHeaderProps) {

    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(user.profileImage);
    const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [isFollowing, setIsFollowing] = useState(isUserFollowing);
    const [showUnfollow, setShowUnfollow] = useState(false);
    const [statusAlert, setStatusAlert] = useState<{ description: string; type: "success" | "error" } | null>(null);

    const eventsAttended = user.events.filter((event) => event.role === "member").length;
    const eventsHosted = user.events.filter((event) => event.role === "owner" || event.role === "admin").length;

    const handleFollowToggle = () => {
        if (isFollowing) {
            setShowUnfollow(true);
        } else {
            setIsFollowing(true);
            setStatusAlert({
                description: `You are now following ${user.name} ${user.lastName}.`,
                type: "success",
            });
        }
    }

    const handleUnfollow = () => {
        setIsFollowing(false);
        setShowUnfollow(false);
        setStatusAlert({
            description: `You have unfollowed ${user.name} ${user.lastName}.`,
            type: "success",
        });
    }

    return (
        <>
            <ConfirmAlert
                isOpen={showUnfollow}
                onClose={() => setShowUnfollow(false)}
                onConfirm={handleUnfollow}
                icon={UserMinus}
                title="Unfollow user"
                description="You'll stop seeing their posts in your feed."
                confirmLabel="Unfollow"
                variant="neutral"
            />
            <StatusAlert
                isOpen={statusAlert !== null}
                onClose={() => setStatusAlert(null)}
                description={statusAlert?.description ?? ""}
                type={statusAlert?.type ?? "success"}
                duration={3000}
            />
            <section className="flex flex-col items-center">
                {/* CARD */}
                <div className="relative z-10 w-full overflow-hidden md:rounded-3xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:w-[85%]">

                    {/* PORTADA */}
                    <ProfileCover
                        canEdit={isOwnProfile}
                        image={coverImage}
                        onEditClick={() => setIsCoverModalOpen(true)}
                    />

                    {/* BOTÓN VOLVER */}
                    <BackButton />

                    {/* CONTENIDO */}
                    <div className="relative px-6 pb-6 pt-0 md:px-10 md:pb-8">

                        {/* MESHY BACKGROUND */}
                        <AnimatedBackgroundLight />

                        {/* BLOQUE SUPERIOR: Avatar + Nombre */}
                        <div className="relative z-10 flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-6">

                            {/* PROFILE IMAGE  */}
                            <div className="relative -mt-14 h-28 w-28 shrink-0 md:-mt-16 md:h-36 md:w-36">
                                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                                    {isLocalPreviewUrl(profileImage) ? (
                                        <img
                                            src={profileImage}
                                            alt="Foto de perfil"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <Image
                                            src={profileImage}
                                            alt="Foto de perfil"
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>

                                {isOwnProfile && (
                                    <button
                                        onClick={() => setIsPhotoModalOpen(true)}
                                        className="absolute cursor-pointer bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black/70 shadow-[0_4px_10px_rgba(0,0,0,0.15)] border border-black/10 transition-transform hover:scale-110 hover:text-black md:h-9 md:w-9"
                                        aria-label="Editar foto de perfil"
                                    >
                                        <Pencil size={16} className="cursor-pointer" />
                                    </button>
                                )}
                            </div>

                            {/* NOMBRE + USUARIO */}
                            <div className="flex flex-col items-center pb-1 text-center md:items-start md:text-left">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="dark-mesh-gradient text-2xl font-bold tracking-tight md:text-3xl">
                                        {user.name} {user.lastName}
                                    </h3>
                                    {user.verified && (
                                        <>
                                            <BadgeCheck
                                                size={20}
                                                className="shrink-0 fill-brand-purple text-white md:h-5.5 md:w-5.5"
                                                aria-label="Verified"
                                            />
                                        </>
                                    )}
                                </div>
                                <p className="text-black/60">@{user.username}</p>
                            </div>
                            
                            <div className="md:hidden text-center leading-relaxed text-black/70">
                                {user.bio}
                            </div>
                        </div>

                        {
                            !isSettings && (
                                <div className="relative z-10 mt-6 flex flex-col items-center gap-6 border-t border-black/10 pt-5 min-[1200px]:flex-row min-[1200px]:justify-between">

                                    {/* STATS */}
                                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:justify-start md:gap-x-7">
                                        {/* Eventos a los que asistió */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-lg font-bold text-black/90 md:text-xl">
                                                {eventsAttended}
                                            </span>
                                            <span className="mt-0.5 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.15em] text-black/70 md:text-[10px]">
                                                Events attended
                                            </span>
                                        </div>

                                        <div className="h-7 w-px bg-black/10" />

                                        {/* Eventos que organizó */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-lg font-bold text-black/90 md:text-xl">
                                                {eventsHosted}
                                            </span>
                                            <span className="mt-0.5 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.15em] text-black/70 md:text-[10px]">
                                                Hosted events
                                            </span>
                                        </div>

                                        <div className="h-7 w-px bg-black/10" />

                                        {/* Comunidades */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-lg font-bold text-black/90 md:text-xl">
                                                {user.communities.length}
                                            </span>
                                            <span className="mt-0.5 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.15em] text-black/70 md:text-[10px]">
                                                Communities
                                            </span>
                                        </div>

                                        <div className="h-7 w-px bg-black/10" />

                                        {/* Amigos */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-lg font-bold text-black/90 md:text-xl">
                                                {user.friends.length}
                                            </span>
                                            <span className="mt-0.5 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.15em] text-black/70 md:text-[10px]">
                                                Friends
                                            </span>
                                        </div>

                                        <div className="h-7 w-px bg-black/10" />

                                        {/* Rating: métrica destacada por sobre el resto */}
                                        <div className="flex flex-col items-center rounded-xl bg-brand-purple/10 px-3 py-1">
                                            <span className="flex items-center gap-1 text-lg font-bold text-brand-purple-deep md:text-xl">
                                                <Star size={14} className="fill-brand-purple-deep md:h-4 md:w-4" />
                                                {user.rating.toFixed(1)}
                                            </span>
                                            <span className="mt-0.5 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.15em] text-brand-purple-deep/70 md:text-[10px]">
                                                Rating · {user.reviewsCount} reviews
                                            </span>
                                        </div>
                                    </div>

                                    {/* BOTONES */}
                                    <div className="flex justify-center px-5 w-full gap-3 sm:w-auto min-[1200px]:flex-row">
                                        {isOwnProfile ? (
                                            <Link href="/settings">
                                                <Button
                                                    tone="dark"
                                                    className="flex-1 px-8 py-3 sm:flex-none"
                                                    textClassName="text-sm"
                                                >
                                                    Edit profile
                                                </Button>
                                            </Link>
                                        ) : (
                                            <>
                                                {isFollowing ? (
                                                    <Button
                                                        tone="following"
                                                        variant="outline"
                                                        onClick={handleFollowToggle}
                                                        className="flex-1 px-8 py-3 sm:flex-none"
                                                        textClassName="text-sm"
                                                    >
                                                        Following
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        tone="dark"
                                                        onClick={handleFollowToggle}
                                                        className="flex-1 px-8 py-3 sm:flex-none"
                                                        textClassName="text-sm"
                                                    >
                                                        Follow
                                                    </Button>
                                                )}
                                                <Button
                                                    tone="dark"
                                                    className="flex-1 px-8 py-3 sm:flex-none"
                                                    textClassName="text-sm"
                                                >
                                                    Send message
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>

                {isOwnProfile && (
                    <>
                        <ProfileModalChangeProfilePhoto
                            isOpen={isPhotoModalOpen}
                            onClose={() => setIsPhotoModalOpen(false)}
                            onSave={setProfileImage}
                            currentImage={profileImage}
                        />
                        <ProfileModalChangeCoverPhoto
                            isOpen={isCoverModalOpen}
                            onClose={() => setIsCoverModalOpen(false)}
                            onSave={setCoverImage}
                            currentImage={coverImage}
                        />
                    </>
                )}
            </section>
        </>
    );
}