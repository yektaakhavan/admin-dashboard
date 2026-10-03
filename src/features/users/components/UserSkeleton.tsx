import { Skeleton } from '@/components/ui/skeleton';

// Placeholder rows shown while the users request is loading.
export default function UserSkeleton() {
  return (
    <div role="status" aria-label="Loading users" className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/5" />
          <Skeleton className="h-5 flex-1" />
        </div>
      ))}
    </div>
  );
}
