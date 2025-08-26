import { IconName } from '../../../../../../packages/riffy-components/src/components/icon';

export interface Item {
  label: string;
  icon: IconName;
  path?: string;
  submenu?: SubmenuItem[];
}

export interface SubmenuItem {
  label: string;
  icon: IconName;
  path?: string;
}

