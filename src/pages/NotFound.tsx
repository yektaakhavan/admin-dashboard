import { FileQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';

import EmptyState from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');

  return (
    <div className="py-8">
      <EmptyState
        icon={FileQuestion}
        title="404 – Page not found"
        description="The page you are looking for doesn't exist or has been moved."
      >
        <Button asChild>
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
      </EmptyState>
    </div>
  );
}
