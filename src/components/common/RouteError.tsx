import { useNavigate, useRouteError } from 'react-router-dom';

import ErrorState from './ErrorState';

// Shown when a route fails to load or throws while rendering.
export default function RouteError() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (import.meta.env?.DEV) console.error(error);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ErrorState
        title="Something went wrong"
        description="An unexpected error occurred while loading this page."
        onRetry={() => navigate(0)}
      />
    </div>
  );
}
