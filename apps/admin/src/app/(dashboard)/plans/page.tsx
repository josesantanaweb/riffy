import { RoleGuard } from '@/components/common/guards';
import Plans from '@/components/plans';
import { Role } from '@riffy/types';

const PlansPage = () => (
  <RoleGuard requiredRole={Role.ADMIN} showUnauthorized={true}>
    <Plans />
  </RoleGuard>
);

export default PlansPage;
