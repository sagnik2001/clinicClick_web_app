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

export const getBlobFromUrl = (myImageUrl) =>
  new Promise<Blob>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', myImageUrl, true);
    request.responseType = 'blob';
    request.onload = () => {
      resolve(request.response);
    };
    request.onerror = reject;
    request.send();
  });

export const convertUrlToFile = async (url) => {
  try {
    const byteArray = await getBlobFromUrl(url);
    if (byteArray)
      return new File([byteArray], url.split('/').pop() ?? 'profile.jpeg', {
        type: 'image/jpeg',
      });
    return undefined;
  } catch (err) {
    // showNotification({
    //   message: 'Unable to download file.',
    //   color: 'red',
    // });
    return undefined;
  }
};