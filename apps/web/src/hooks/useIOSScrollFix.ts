import { useEffect } from 'react';

export const useIOSScrollFix = () => {
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      const preventBounce = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        const scrollableParent = target.closest('.safe-scroll');

        if (scrollableParent) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableParent as HTMLElement;

          if (scrollTop === 0 && e.touches[0].clientY > e.touches[0].pageY) {
            e.preventDefault();
          }

          if (scrollTop + clientHeight >= scrollHeight && e.touches[0].clientY < e.touches[0].pageY) {
            e.preventDefault();
          }
        }
      };

      document.addEventListener('touchstart', preventBounce, { passive: false });
      document.addEventListener('touchmove', preventBounce, { passive: false });

      return () => {
        document.removeEventListener('touchstart', preventBounce);
        document.removeEventListener('touchmove', preventBounce);
      };
    }
  }, []);
};
