import UserSkeleton from './components/UserSkeleton';
import { useUsers } from './hooks/useUsers';

export default function UsersView() {
  const { data, isLoading, isError } = useUsers();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Users</h1>

        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <UserSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Users</h1>

        <p className="text-destructive">Failed to load users.</p>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Users</h1>

        <p className="text-muted-foreground">No users found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Users</h1>

      <div className="space-y-2">
        {data.map((user) => (
          <div key={user.id} className="rounded-lg border p-4">
            <p className="font-semibold">{user.name}</p>

            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
