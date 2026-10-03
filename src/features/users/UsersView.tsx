import { SearchX, UsersRound } from 'lucide-react';
import { useState } from 'react';

import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import PageHeader from '@/components/common/PageHeader';
import SectionCard from '@/components/common/SectionCard';
import { Input } from '@/components/ui/input';

import UserForm from './components/UserForm';
import UserSkeleton from './components/UserSkeleton';
import UsersTable from './components/UsersTable';
import { useUsers } from './hooks/useUsers';
import type { User } from './types';

function filterUsers(users: User[], search: string) {
  const query = search.trim().toLowerCase();

  if (!query) return users;

  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query),
  );
}

export default function UsersView() {
  const { data: users, isPending, isError, refetch } = useUsers();
  const [search, setSearch] = useState('');

  const filteredUsers = users ? filterUsers(users, search) : [];

  const renderList = () => {
    if (isPending) return <UserSkeleton />;

    if (isError) {
      return (
        <ErrorState
          title="Failed to load users"
          description="Something went wrong while fetching the users."
          onRetry={() => refetch()}
        />
      );
    }

    if (users.length === 0) {
      return (
        <EmptyState
          icon={UsersRound}
          title="No users yet"
          description="Create the first user using the form above."
        />
      );
    }

    if (filteredUsers.length === 0) {
      return (
        <EmptyState
          icon={SearchX}
          title="No users match your search"
          description="Try a different name, username or email."
        />
      );
    }

    return <UsersTable users={filteredUsers} />;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Create, browse and search users."
      />

      <SectionCard
        title="Create user"
        description="Add a new user to the list."
      >
        <UserForm />
      </SectionCard>

      <SectionCard
        title="All users"
        description={
          users
            ? `Showing ${filteredUsers.length} of ${users.length} users`
            : undefined
        }
      >
        <div className="space-y-4">
          <Input
            type="search"
            aria-label="Search users"
            placeholder="Search by name, username or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            disabled={isPending || isError}
            className="sm:max-w-sm"
          />

          {renderList()}
        </div>
      </SectionCard>
    </div>
  );
}
