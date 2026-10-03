import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createUser } from '@/services/api';

import type { User } from '../types';
import { USERS_QUERY_KEY } from './useUsers';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,

    onSuccess: (createdUser) => {
      // JSONPlaceholder only *pretends* to save: it always answers with
      // id 11 and never stores the user. So we write the new user straight
      // into the cache (instead of invalidating, which would refetch the
      // original list and make the new user disappear) and give it a unique id.
      // With a real backend, replace this with
      // `queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })`.
      queryClient.setQueryData<User[]>(USERS_QUERY_KEY, (oldUsers = []) => {
        const nextId = Math.max(0, ...oldUsers.map((user) => user.id)) + 1;

        return [{ ...createdUser, id: nextId }, ...oldUsers];
      });
    },
  });
}
