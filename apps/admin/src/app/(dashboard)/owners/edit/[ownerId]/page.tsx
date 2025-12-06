import UsersForm from "@/components/common/users/form";
import { RoleGuard } from "@/components/common/guards";
import { Role } from "@riffy/types";

const EditOwnerPage = () => (
  <RoleGuard requiredRole={Role.ADMIN} showUnauthorized={true}>
    <UsersForm />
  </RoleGuard>
);

export default EditOwnerPage;
