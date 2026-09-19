import { useState } from 'react';

import { Input } from '@/components/ui/input';

import UserSkeleton from './components/UserSkeleton';
import UsersTable from './components/UsersTable';
import { useUsers } from './hooks/useUsers';
import UserForm from './components/UserForm';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function UsersView() {
  const { data, isLoading, isError } = useUsers();

  const [search, setSearch] = useState('');

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

  const filteredUsers = data.filter((user) => {
    const query = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>

        <p className="mt-2 text-muted-foreground">Manage and search users.</p>
      </div>

      <Input
        placeholder="Search users..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="max-w-sm"
      />

      <Card>
        <CardHeader>
          <CardTitle>Create User</CardTitle>
        </CardHeader>

        <CardContent>
          <UserForm />
        </CardContent>
      </Card>

      {filteredUsers.length > 0 ? (
        <UsersTable users={filteredUsers} />
      ) : (
        <p className="text-muted-foreground">No users match your search.</p>
      )}
    </div>
  );
}
