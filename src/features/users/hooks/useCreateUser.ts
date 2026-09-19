import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createUser } from '@/services/api';

import type { User } from '../types';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,

    onSuccess: (newUser) => {
      const userWithId = {
        ...newUser,
        id: newUser.id ?? Date.now(),
      };

      queryClient.setQueryData<User[]>(['users'], (oldUsers) => {
        if (!oldUsers) {
          return [userWithId];
        }

        return [...oldUsers, userWithId];
      });
    },
  });
}
