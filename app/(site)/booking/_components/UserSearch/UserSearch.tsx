"use client";

import { Plus, Search, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { fetchUsers } from "@/queries";
import styles from "./style.module.scss";
import type { UserSearchProps } from "./UserSearch.props";

export const UserSearch = ({ selectedUsers, onAddUser }: UserSearchProps) => {
    const [query, setQuery] = useState("");
    const normalizedQuery = query.trim();
    const selectedIds = useMemo(
        () => new Set(selectedUsers.map((user) => user.id)),
        [selectedUsers],
    );
    const {
        data: users = [],
        isLoading,
        error
    } = useSWR(
        normalizedQuery.length >= 2 ? ["booking-users", normalizedQuery] : null,
        ([, search]) => fetchUsers(search),
        { keepPreviousData: true },
    );

    const visibleUsers = users.filter((user) => !selectedIds.has(user.id));

    return (
        <div className={styles.searchBox}>
            <label className={styles.label} htmlFor="booking-user-search">
                Add guests
            </label>
            <div className={styles.inputWrap}>
                <Search size={17} aria-hidden="true" />
                <input
                    id="booking-user-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by first or last name"
                    aria-label="Search users by first or last name"
                />
            </div>

            {normalizedQuery.length >= 2 && (
                <div className={styles.results} role="listbox" aria-label="Matching users">
                    {isLoading && <p className={styles.state}>Searching guests...</p>}
                    {error && <p className={styles.state}>Could not load users</p>}
                    {!isLoading && !error && visibleUsers.length === 0 && (
                        <p className={styles.state}>No matching users</p>
                    )}
                    {!isLoading && !error && visibleUsers.map((user) => {
                        const fullName = `${user.first_name} ${user.last_name}`;

                        return (
                            <div className={styles.result} key={user.id} role="option" aria-selected="false">
                                <div className={styles.resultIcon} aria-hidden="true">
                                    <UserRound size={17} />
                                </div>
                                <div className={styles.resultCopy}>
                                    <strong>{fullName}</strong>
                                    <span>{user.age} years, {user.skiing_level}</span>
                                </div>
                                <button
                                    type="button"
                                    aria-label={`Add ${fullName} to booking group`}
                                    onClick={() => {
                                        onAddUser(user);
                                        setQuery("");
                                    }}
                                >
                                    <Plus size={17} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
