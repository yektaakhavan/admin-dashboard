import { useEffect } from 'react';

const APP_NAME = 'Admin Dashboard';

// Sets the browser tab title for the current page (helps navigation,
// screen-reader users and browser history).
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`;
  }, [title]);
}
