import Layout from '@/components/common/Layout';
import { AuthGuard } from '@/components/common/guards';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Layout>
        {children}
      </Layout>
    </AuthGuard>
  );
}
