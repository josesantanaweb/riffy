'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { clsx } from 'clsx';
import { ASSETS } from '@/constants';
import { useBreakpoint } from '@/hooks';
import { useTheme } from '@riffy/hooks';
import { Logo } from '@riffy/components';

interface NavBrandProps {
  collapseSidebar: boolean;
}

const NavBrand = ({ collapseSidebar }: NavBrandProps): ReactElement => {
  const { isDesktop } = useBreakpoint();
  const { theme } = useTheme();

  const shouldCollapse = isDesktop && collapseSidebar;
  const collapseClass = shouldCollapse
    ? 'max-w-[80px]'
    : 'max-w-[120px] lg:max-w-[230px]';

  const baseLogo = theme === 'dark' ? ASSETS.IMAGES.LOGO : ASSETS.IMAGES.LOGO_BLACK;
  const logoSrc = shouldCollapse ? ASSETS.IMAGES.LOGO_SMALL : baseLogo;
  const logoSmallSrc = theme === 'dark' ? ASSETS.IMAGES.LOGO_SMALL : ASSETS.IMAGES.LOGO_SMALL_BLACK;

  return (
    <div
      className={clsx(
        'w-full transition-all justify-center items-center h-[52px] hidden lg:flex bg-navbar-bg',
        collapseClass,
      )}
    >
      <Logo
        className={`${shouldCollapse ? 'w-[24px]' : 'w-[64px] lg:w-[74px]'} transition-all`}
        src={shouldCollapse ? logoSmallSrc : logoSrc}
      />
    </div>
  );
};

export default NavBrand;
