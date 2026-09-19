import { Skeleton } from '@/components/ui/skeleton';

export default function UserSkeleton() {
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-56" />
    </div>
  );
}
