import { AuthStatus } from '@/interface';
import useSWR from 'swr';
import { getUserProfile } from '@/queries';

export const useCurrentUser = (isLoggedIn: AuthStatus) => {
    return useSWR(
        isLoggedIn === "auth" ? 'access_token_session' : null,
        getUserProfile,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            dedupingInterval: 60_000, // 1 minute
        }
    );
}