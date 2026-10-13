"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, SearchX, Shield } from "lucide-react";
import FriendCard from "@/components/profile/profile-friends-cards";
import ProfileSectionGrid from "@/components/profile/profile-section-grid";
import { FilterEmptyState, FilterPopover, FilterSearch, FilterSelect } from "@/components/ui/filter-popover";
import { MEMBER_ROLE_ORDER, type EventMemberRole, type EventMemberViewModel } from "@/lib/members-selector";

type RoleFilter = "all" | EventMemberRole;
type SortBy = "role" | "name-asc" | "name-desc";

type EventMembersSectionProps = {
    // Owned by EventMainSection, so accepted requests show up here.
    members: EventMemberViewModel[];
    currentUserId: number;
};

export default function MembersSection({ members, currentUserId }: EventMembersSectionProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
    const [sortBy, setSortBy] = useState<SortBy>("role");

    const filteredMembers = useMemo(() => {
        return members
            .filter((member) => {
                const memberName = `${member.name} ${member.username}`.toLowerCase();
                const matchesSearch = memberName.includes(searchQuery.toLowerCase());
                const matchesRole = roleFilter === "all" || member.role === roleFilter;

                return matchesSearch && matchesRole;
            })
            .sort((a, b) => {
                if (sortBy === "name-asc") return a.name.localeCompare(b.name);
                if (sortBy === "name-desc") return b.name.localeCompare(a.name);
                return MEMBER_ROLE_ORDER[a.role] - MEMBER_ROLE_ORDER[b.role] || a.name.localeCompare(b.name);
            });
    }, [members, searchQuery, roleFilter, sortBy]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setRoleFilter("all");
        setSortBy("role");
    };

    const hasActiveFilters = searchQuery !== "" || roleFilter !== "all" || sortBy !== "role";

    return (
        <section className="flex flex-col gap-4 sm:gap-5">
            {/* CONTADOR + BOTÓN DE FILTROS */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-semibold text-black/60">
                    {hasActiveFilters
                        ? `${filteredMembers.length} of ${members.length} members`
                        : `${members.length} members`}
                </span>

                <FilterPopover hasActiveFilters={hasActiveFilters} onClear={handleClearFilters}>
                    <FilterSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search members by name..." />
                    <FilterSelect
                        value={roleFilter}
                        onChange={setRoleFilter}
                        icon={Shield}
                        ariaLabel="Filter by role"
                        options={[
                            { value: "all", label: "All roles" },
                            { value: "owner", label: "Host" },
                            { value: "admin", label: "Admins" },
                            { value: "member", label: "Members" },
                        ]}
                    />
                    <FilterSelect
                        value={sortBy}
                        onChange={setSortBy}
                        icon={ArrowUpDown}
                        ariaLabel="Sort by"
                        options={[
                            { value: "role", label: "Host & admins first" },
                            { value: "name-asc", label: "Alphabetical (A-Z)" },
                            { value: "name-desc", label: "Alphabetical (Z-A)" },
                        ]}
                    />
                </FilterPopover>
            </div>

            {filteredMembers.length === 0 ? (
                <FilterEmptyState
                    icon={SearchX}
                    title="No members found"
                    description="Try adjusting your search query or filters."
                />
            ) : (
                <ProfileSectionGrid
                    items={filteredMembers}
                    columns="grid-cols-1 lg:grid-cols-2"
                    renderItem={(member) => (
                        <FriendCard
                            friend={member}
                            currentUserId={currentUserId}
                            role={member.role === "member" ? undefined : member.role}
                        />
                    )}
                />
            )}
        </section>
    );
}
