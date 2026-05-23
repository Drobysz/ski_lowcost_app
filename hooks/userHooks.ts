import { AuthStatus, UserSession } from '@/interface';
import { getUserProfile } from '@/queries';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

export const useCurrentUser = (shouldFetchUser: boolean) => {
    return useSWR(
        shouldFetchUser ? "global-current-user" : null,
        getUserProfile,
        {
            refreshInterval: 10 * 60 * 1000,
            dedupingInterval: 10 * 60 * 1000,
            shouldRetryOnError: (error) => error?.status !== 401,
        }
    );
}

export const useCurrentUserReact = (isLoggedIn: AuthStatus) => {
    const pathname = usePathname();
    const shouldFetchUser = isLoggedIn !== "no_auth";
    const [data, setData] = useState<UserSession | undefined>();
    const [error, setError] = useState<Error | undefined>();
    const [isLoading, setIsLoading] = useState(shouldFetchUser);

    const loadUser = useCallback(async () => {
        if (!shouldFetchUser) {
            setData(undefined);
            setError(undefined);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(undefined);

        try {
            const user = await getUserProfile();
            setData(user);
        } catch (requestError) {
            setData(undefined);
            setError(requestError instanceof Error
                ? requestError
                : new Error("Failed to fetch user")
            );
        } finally {
            setIsLoading(false);
        }
    }, [shouldFetchUser]);

    useEffect(() => {
        let active = true;

        void Promise.resolve().then(() => {
            if (active) {
                void loadUser();
            }
        });

        return () => {
            active = false;
        };
    }, [loadUser, pathname]);

    useEffect(() => {
        const onPageShow = () => {
            void loadUser();
        };
        const onFocus = () => {
            void loadUser();
        };
        const onVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                void loadUser();
            }
        };

        window.addEventListener("pageshow", onPageShow);
        window.addEventListener("focus", onFocus);
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            window.removeEventListener("pageshow", onPageShow);
            window.removeEventListener("focus", onFocus);
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, [loadUser]);

    return { data, error, isLoading };
}
