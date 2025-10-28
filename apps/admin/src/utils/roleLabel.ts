import { Role } from "@riffy/types";

export const roleLabel = (role: Role): string => {
  switch (role) {
    case Role.ADMIN:
      return 'Administrador';
    case Role.OWNER:
      return 'Dueño de Rifa';
    default:
      return 'Usuario';
  }
};
