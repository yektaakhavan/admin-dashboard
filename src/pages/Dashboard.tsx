import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import DashboardView from '@/features/dashboard/DashboardView';

export default function Dashboard() {
  useDocumentTitle('Dashboard');

  return <DashboardView />;
}
