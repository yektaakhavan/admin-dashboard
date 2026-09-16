import { useUsers } from './hooks/useUsers';

export default function UsersView() {
  const { data, isLoading, isError } = useUsers();

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Failed to load users.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Users</h1>

      <div className="space-y-2">
        {data?.map((user) => (
          <div key={user.id} className="rounded-lg border p-4">
            <p className="font-semibold">{user.name}</p>

            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
