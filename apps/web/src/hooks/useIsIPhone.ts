import { useState, useEffect } from 'react';

export const useIsIPhone = () => {
  const [isIPhone, setIsIPhone] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isIPhone = /iPhone/.test(userAgent);

    setIsIPhone(isIPhone);
  }, []);

  return isIPhone;
};
