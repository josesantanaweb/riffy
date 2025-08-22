import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Roles, {
  name: 'ValidRoles',
  description:
    'Ullamco labore ut ut adipisicing commodo sit elit ullamco eiusmod ut mollit sint.',
});
