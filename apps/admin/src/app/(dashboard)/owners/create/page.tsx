import OwnerForm from "@/components/owners/owners-form";
import { RoleGuard } from "@/components/common/guards";
import { Role } from "@riffy/types";

const CreateOwnerPage = () => (
  <RoleGuard requiredRole={Role.ADMIN}>
    <OwnerForm />
  </RoleGuard>
);

export default CreateOwnerPage;
