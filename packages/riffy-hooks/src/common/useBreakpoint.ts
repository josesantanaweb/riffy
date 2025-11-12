import { useEffect, useState } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
}

const defaultBreakpoints: BreakpointConfig = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
};

export interface UseBreakpointReturn {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

export const useBreakpoint = (
  customBreakpoints?: Partial<BreakpointConfig>
): UseBreakpointReturn => {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };

  const [breakpoint, setBreakpoint] = useState<Breakpoint>('mobile');
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateBreakpoint = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);

      if (currentWidth >= breakpoints.desktop) {
        setBreakpoint('desktop');
      } else if (currentWidth >= breakpoints.tablet) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('mobile');
      }
    };

    updateBreakpoint();

    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, [breakpoints.desktop, breakpoints.tablet]);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    width,
  };
};
