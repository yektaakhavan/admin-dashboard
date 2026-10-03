import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import UsersView from '@/features/users/UsersView';

export default function Users() {
  useDocumentTitle('Users');

  return <UsersView />;
}
