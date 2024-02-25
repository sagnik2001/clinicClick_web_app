import React, { useState } from "react";

export const detectMobileDevice = () => {
  if (window !== undefined) if (window.innerWidth < 768) return true;
  return false;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};


export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};


export const checkIfTokenIsExpired = (token) => {
  const decodeJwt = parseJwt(token);
  return decodeJwt.exp * 1000 < Date.now() ? true : false;
}