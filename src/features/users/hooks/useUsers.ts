import { useQuery } from '@tanstack/react-query';

import { fetchUsers } from '@/services/api';

export const USERS_QUERY_KEY = ['users'] as const;

export function useUsers() {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: fetchUsers,
    // The list rarely changes, so don't refetch on every focus/mount.
    staleTime: 5 * 60 * 1000,
  });
}
