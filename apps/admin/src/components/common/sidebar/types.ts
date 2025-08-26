import { IconName } from '../icon';

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

