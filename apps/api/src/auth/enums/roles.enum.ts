import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  Admin = 'ADMIN',
  User = 'USER',
}

registerEnumType(Roles, {
  name: 'ValidRoles',
  description:
    'Ullamco labore ut ut adipisicing commodo sit elit ullamco eiusmod ut mollit sint.',
});
