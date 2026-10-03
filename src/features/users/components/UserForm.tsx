import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import TextField from '@/components/common/TextField';
import { Button } from '@/components/ui/button';

import { useCreateUser } from '../hooks/useCreateUser';
import { userSchema, type UserFormData } from '../schema';

export default function UserForm() {
  const createUser = useCreateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', username: '', email: '' },
  });

  const onSubmit = (data: UserFormData) => {
    createUser.mutate(data, { onSuccess: () => reset() });
  };

  return (
    // noValidate: let Zod show the messages instead of the browser's own bubbles.
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Create user"
      className="space-y-5"
    >
      <div className="grid gap-5 md:grid-cols-3">
        <TextField
          label="Name"
          autoComplete="off"
          error={errors.name?.message}
          {...register('name')}
        />

        <TextField
          label="Username"
          autoComplete="off"
          error={errors.username?.message}
          {...register('username')}
        />

        <TextField
          label="Email"
          type="email"
          autoComplete="off"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={createUser.isPending}>
          {createUser.isPending ? 'Creating...' : 'Create user'}
        </Button>

        {createUser.isSuccess && (
          <p role="status" className="text-sm text-success">
            User “{createUser.data.name}” was created.
          </p>
        )}

        {createUser.isError && (
          <p role="alert" className="text-sm text-destructive">
            Failed to create user. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
