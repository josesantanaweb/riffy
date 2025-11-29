import { useState, useEffect } from 'react';
import { isIOS, isMobile } from 'react-device-detect';

export const useIsIPhone = () => {
  const [isIPhone, setIsIPhone] = useState(false);

  useEffect(() => {
    setIsIPhone(isIOS && isMobile);
  }, []);

  return isIPhone;
};
