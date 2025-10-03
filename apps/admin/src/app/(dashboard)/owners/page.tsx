import Owners from '@/components/owners';
import { RoleGuard } from '@/components/common/guards';
import { Role } from '@riffy/types';

const OwnersPage = () => (
  <RoleGuard requiredRole={Role.ADMIN} showUnauthorized={true}>
    <Owners />
  </RoleGuard>
);

export default OwnersPage;
